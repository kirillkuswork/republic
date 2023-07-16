import React from 'react';
import Nouislider from 'nouislider-react';
import styles from './NumberSlider.module.scss';

//Создание интерфейса для пропсов компонента
export interface INumberSlider<T> {
    min: number | string;
    max: number | string;
    start: number | string;
    step: number;
    slider: T;
    units?: string;
    textValue: string | number;
    disabled?: boolean;
    onUpdateSlider: (slider: T, values: number[]) => void; //Выполняется при передвижении ползунков
    onChangeSlider: (slider: T, values: number[]) => void; //Выполняется, когда закончили двигать ползунки (встроенный debounce)
}

const NumberSlider: <T>(p: INumberSlider<T>) => React.ReactElement = ({
    min,
    max,
    start,
    step,
    slider,
    textValue,
    units,
    disabled,
    onUpdateSlider,
    onChangeSlider,
}) => {
    return (
        <div className={styles.range}>
            <div className={styles.slider}>
                <div className={styles.block}>
                    <div className={styles.input}>
                        <span>{textValue}</span>
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
                    disabled={disabled}
                    connect={[true, false]}
                    range={{ min: +min, max: +max }}
                    step={step}
                    start={start}
                    onUpdate={(values) => onUpdateSlider(slider, values)}
                    onChange={(values) => onChangeSlider(slider, values)}
                />
            </div>
        </div>
    );
};

export default NumberSlider;
