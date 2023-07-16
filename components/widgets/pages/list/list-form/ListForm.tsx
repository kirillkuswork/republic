import React from 'react';
import styles from './ListForm.module.scss';
import BlockWrapper from '../../../sorting-form/block-wrapper/BlockWrapper';
import CheckboxBlock from '../../../sorting-form/checkbox-block/CheckboxBlock';
import RangeSlider from '../../../sorting-form/range-slider/RangeSlider';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import { sortFlats, toggleActiveSearchParams, toggleOnlyPromo } from '../../../../../store/slices/catalog/catalogSlice';
import CheckboxButton from '../../../../features/buttons/checkbox-button/CheckboxButton';
import Tooltip from '../../../../features/tooltip/Tooltip';
import Checkbox from '../../../../features/inputs/checkbox/Checkbox';

export interface IListForm {}

const ListForm: React.FC<IListForm> = () => {
    const filterParameters = useAppSelector((state) => state.catalogPage.filterParameters);
    const advantagesSvgIcons = useAppSelector((state) => state.catalogPage.filterParameters.advantagesSvgIcons);
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const width = useAppSelector((state) => state.main.width);

    //выбор только тех характеристик, под которые загружены иконки
    let currentAdvantages = filterParameters.byCheckbox.advantages.filter((advantage) => advantagesSvgIcons.includes(advantage.value));

    const sortParameters = useAppSelector((state) => state.catalogPage.sortParameters);
    const inForm = useAppSelector((state) => state.catalogPage.inForm);

    const dispatch = useAppDispatch();

    const selectParameter = (value: string, id: string) => {
        //Изменение состояния искомого параметра на активное
        dispatch(toggleActiveSearchParams({ value, id }));
        //сортировка получившегося массива по кретерию в шапке таблицы
        dispatch(sortFlats({ value: sortParameters.value, placeCall: inForm, array: 'shownFlats' }));
    };

    const onlyPromo = useAppSelector((state) => state.catalogPage.onlyPromo);
    const togglePromo = () => {
        dispatch(toggleOnlyPromo());
    };

    return (
        <aside className={styles.aside}>
            <div className={styles.aside__block}>
                <BlockWrapper label={'Дом'}>
                    <CheckboxBlock id={'sections'}>
                        {filterParameters.byCheckbox.houseName?.map((item) => {
                            if (!('empty' in item && item.empty === true)) {
                                return (
                                    <div className={styles.button} key={item.value}>
                                        <CheckboxButton
                                            id={'houseName'}
                                            name={item.name}
                                            theme={'classic'}
                                            value={item.value}
                                            active={item.active}
                                            selectParameter={selectParameter}
                                            disabled={item.disabled}
                                            checkboxWithIcon={false}
                                            disabledText={'Не в продаже'}
                                        />
                                    </div>
                                );
                            }
                        })}
                    </CheckboxBlock>
                </BlockWrapper>
            </div>
            <div className={styles.aside__block}>
                <BlockWrapper label={'Спальни'}>
                    <CheckboxBlock description={'ST— студия, BR (bedroom) — количество спален'}>
                        {filterParameters.byCheckbox.rooms?.map((item) => {
                            if (!('empty' in item && item.empty === true)) {
                                return (
                                    <div className={styles.button} key={item.value}>
                                        <CheckboxButton
                                            id={'rooms'}
                                            name={item.name}
                                            theme={'classic'}
                                            value={item.value}
                                            active={item.active}
                                            selectParameter={selectParameter}
                                            disabled={item.disabled}
                                            checkboxWithIcon={false}
                                            disabledText={'Не в продаже'}
                                        />
                                    </div>
                                );
                            }
                        })}
                    </CheckboxBlock>
                </BlockWrapper>
            </div>
            <div className={styles.aside__block}>
                <BlockWrapper label={'Цена'}>
                    <RangeSlider slider={'price'} units={'₽'} />
                </BlockWrapper>
            </div>
            <div className={styles.aside__block}>
                <BlockWrapper label={'Площадь'}>
                    <RangeSlider slider={'area'} units={'м2'} />
                </BlockWrapper>
            </div>
            <div className={styles.aside__block}>
                <BlockWrapper label={'Этаж'}>
                    <RangeSlider slider={'floor'} units={''} />
                </BlockWrapper>
            </div>
            <div className={styles.aside__block}>
                <BlockWrapper label={'Отделка'}>
                    <CheckboxBlock>
                        {filterParameters.byCheckbox.finish?.map((item) => {
                            if (!('empty' in item && item.empty === true)) {
                                return (
                                    <div className={styles.button} key={item.value}>
                                        <CheckboxButton
                                            id={'finish'}
                                            name={item.name}
                                            theme={'classic'}
                                            value={item.value}
                                            active={item.active}
                                            selectParameter={selectParameter}
                                            disabled={item.disabled}
                                            icon={item.value}
                                            checkboxWithIcon={true}
                                            disabledText={'Не в продаже'}
                                        />
                                    </div>
                                );
                            }
                        })}
                    </CheckboxBlock>
                </BlockWrapper>
            </div>
            <div className={styles.aside__block}>
                <BlockWrapper label={'Особенности'}>
                    <CheckboxBlock>
                        {currentAdvantages?.map((item) => {
                            if (!('empty' in item && item.empty === true)) {
                                return (
                                    <div className={styles.button} key={item.value}>
                                        <Tooltip content={item.name} theme={'base'} behavior={width > widthTablet ? 'hover' : 'click'}>
                                            <CheckboxButton
                                                id={'advantages'}
                                                name={item.name}
                                                theme={'classic'}
                                                value={item.value}
                                                active={item.active}
                                                selectParameter={selectParameter}
                                                disabled={item.disabled}
                                                icon={item.value}
                                                checkboxWithIcon={true}
                                                checkboxWithoutText={true}
                                                disabledText={'Не в продаже'}
                                            />
                                        </Tooltip>
                                    </div>
                                );
                            }
                        })}
                    </CheckboxBlock>
                </BlockWrapper>
            </div>
            <div className={styles.aside__block}>
                <Checkbox text={'Показывать только квартиры по акции'} checked={onlyPromo} onChange={togglePromo} />
            </div>
        </aside>
    );
};

export default ListForm;
