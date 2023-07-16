import React, {FC, useEffect, useState} from 'react';
import Nouislider from 'nouislider-react';
import styles from './RangeSlider.module.scss';
import {slidersType} from "../../../../models";
import {sortFlats, updateInputValues, updateSliderValues} from "../../../../store/slices/catalog/catalogSlice";
import {useAppDispatch, useAppSelector} from "../../../../hook";

//Создание интерфейса для пропсов компонента
export interface IRangeSlider {
    slider: slidersType;
    units?: string;
}

const RangeSlider: FC<IRangeSlider> = ({
    slider,
    units,
}) => {
    const {inputsValues, slidersValues, slidersExtremeValues, inactiveSliders} = useAppSelector((state) => state.catalogPage.filterParameters);
    const dispatch = useAppDispatch();
    const sortParameters = useAppSelector((state) => state.catalogPage.sortParameters);
    const inForm = useAppSelector((state) => state.catalogPage.inForm);

    //Эта доработка фиксит баг с тем, что при фильтрации поисковой строкой не обновляются значения в слайдере, несмотря на изменившийся стейт
    const [params, setParam] = useState<number[]>([+slidersValues[slider][0], +slidersValues[slider][1]]);
    useEffect(() => {
        setParam([+slidersValues[slider][0], +slidersValues[slider][1]]);
    }, [slidersValues]);

    //Получение новых значений слайдера и запуск фильтрации
    const onSlideSlider = (slider: slidersType, values: number[]) => {
        //Обновляем значения конкретного range-слайдера
        dispatch(updateInputValues({ slider, values }));
    };

    const onChangeSlider = (slider: slidersType, values: number[]) => {
        //Запускаем фильтрацию по всем слайдерам
        dispatch(updateSliderValues({ slider, values }));
        //Сортируем получившиеся данные с учетом текущих параметров таблицы
        dispatch(sortFlats({ value: sortParameters.value, placeCall: inForm, array: 'shownFlats' }));
    };

    return (
        <div className={`${styles.range} ${inactiveSliders[slider] ? styles.range__disabled : ""}`}>
            <div className={styles.slider}>
                <div className={styles.block}>
                    <span className={styles.label}>ОТ</span>
                    <div className={styles.input}>
                        <span>{inputsValues[slider][0]}</span>
                        {units === 'м2' ? (
                            <span>
                                {' '}
                                м<sup className={styles.sup}>2</sup>
                            </span>
                        ) : (
                            <span> {units}</span>
                        )}
                    </div>
                </div>
                <div className={styles.block}>
                    <span className={styles.label}>ДО</span>
                    <div className={styles.input}>
                        <span>{inputsValues[slider][1]}</span>
                        {units === 'м2' ? (
                            <span>
                                {' '}
                                м<sup className={styles.sup}>2</sup>
                            </span>
                        ) : (
                            <span> {units}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.range__container}>
                <Nouislider
                    connect={true}
                    range={{ min: +slidersExtremeValues[slider][0], max:  +slidersExtremeValues[slider][1] }}
                    step={1}
                    start={[+slidersValues[slider][0], +slidersValues[slider][1]]}
                    onSlide={(values) => onSlideSlider(slider, values)}
                    onChange={(values) => onChangeSlider(slider, values)}
                    disabled={inactiveSliders[slider]}
                />
            </div>
        </div>
    );
};

export default RangeSlider;
