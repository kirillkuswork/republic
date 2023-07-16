import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './FilterForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import CheckboxButton from '../../../../features/buttons/checkbox-button/CheckboxButton';
import BlockWrapper from '../../../sorting-form/block-wrapper/BlockWrapper';
import CheckboxBlock from '../../../sorting-form/checkbox-block/CheckboxBlock';
import { IApiCatalogFlat, IApiTermsCalcData } from '../../../../../store/api/apiTypes';
import cloneDeep from 'lodash/cloneDeep';
import formatLongPrice from '../../../../../tools/format-long-price';
import { IBank, IMortgageFilters } from '../../../../../store/slices/terms/termsSliceTypes';
import {
    setFilteredBanks,
    setIsFamilyMortgageFilter,
    setMortgageFilters,
    setNumberOfRoomsFilter,
} from '../../../../../store/slices/terms/termsSlice';
import NumberSlider from '../../../sorting-form/number-slider/NumberSlider';
import { isMobileOnly } from 'react-device-detect';
import Tooltip from '../../../../features/tooltip/Tooltip';

interface IFilterForm {
    minFlatPrice: number;
    maxFlatPrice: number;
    flats: IApiCatalogFlat[];
    maxFamilyMortgageCreditAmount: number;
    maxCreditTime: string;
}

type SliderNames = 'cost' | 'initialPayment' | 'creditAmount' | 'creditTime';

export function initPayPercent(filters: IMortgageFilters) {
    return Math.round((filters.initialPayment * 100) / filters.cost);
}

function credAmountPercent(filters: IMortgageFilters) {
    return Math.round((filters.creditAmount * 100) / filters.cost);
}

export const FilterForm: React.FC<IFilterForm> = ({ minFlatPrice, maxFlatPrice, flats, maxFamilyMortgageCreditAmount, maxCreditTime }) => {
    const dispatch = useAppDispatch();

    const roomsTypes = useAppSelector((state) => state.catalogPage.filterParameters.byCheckbox.rooms);
    const { mortgageFilters, isFamilyMortgageFilter, numberOfRoomsFilter } = useAppSelector((state) => state.termsPage);
    const familyMortgageTooltip =
        'Семьи, в которых с 1 января 2018 года по 31 декабря 2023 года родился первый ребенок или последующие дети, могут рассчитывать на получение ипотеки по льготной ставке до 6%. Ипотечный кредит можно оформить до 1 июля 2024 года. Первоначальный взнос не менее 15% от суммы кредита. Лимит кредитования до 12 млн рублей.';
    //const [selectedOffer, setSelectedOffer] = useState<IBank|null>(null);

    //Внутренние данные слайдеров, меняются каждое обновление слайдера
    //используются для отрисовки текста в слайдере
    const filtersToSliderText = (f: IMortgageFilters) => ({
        cost: formatLongPrice(Math.round(f.cost)),
        initialPayment: formatLongPrice(Math.round(f.initialPayment)),
        creditAmount: formatLongPrice(Math.round(f.creditAmount)),
        creditTime: formatLongPrice(f.creditTime),
    });
    const [sliderTextData, setSliderTextData] = useState(filtersToSliderText(mortgageFilters));
    useEffect(() => setSliderTextData(filtersToSliderText(mortgageFilters)), [mortgageFilters]);

    //При движении слайдера меняем только его внутренние данные
    //Не запускаем тяжелых пересчетов, чтоб не лагало
    const onUpdateSlider = (slider: SliderNames, values: number[]) => {
        setSliderTextData((prev) => ({
            ...prev,
            [slider]: formatLongPrice(Number(values[0])),
        }));
    };

    //Перекладочный стейт, для вызова setFiltersTemp((prev) => ...), так как redux-экшн так не умеет
    const [filtersTemp, setFiltersTemp] = useState<IMortgageFilters>(mortgageFilters);
    useEffect(() => {
        dispatch(setMortgageFilters(filtersTemp));
    }, [filtersTemp]);

    //При заврешении движения слайдера (debounce)
    //Меняем сами фильтры и запускаем расчеты
    const onChangeSlider = (slider: SliderNames, values: number[]) => {
        //Тут делаем сразу через setFilters т.к. у либы слайдера это походу
        //нативный листенер, и переменная filters тут может иметь старые значения
        setFiltersTemp((prev) => {
            const newFilters = cloneDeep({ ...prev, [slider]: Number(values[0]) });
            switch (slider) {
                case 'cost':
                    newFilters.creditAmount = newFilters.cost - newFilters.initialPayment;
                    break;
                case 'initialPayment':
                    newFilters.creditAmount = newFilters.cost - newFilters.initialPayment;
                    break;
                case 'creditAmount':
                    newFilters.initialPayment = newFilters.cost - newFilters.creditAmount;
                    break;
            }
            //Проверяем цену а мин/макс
            const cost = Math.min(maxFlatPrice, Math.max(minFlatPrice, newFilters.cost));
            if (cost !== newFilters.cost) {
                console.log('cost !== newFilters.cost');
                newFilters.cost = cost;
                newFilters.initialPayment = Math.min(newFilters.cost * 0.9, newFilters.initialPayment);
                newFilters.creditAmount = newFilters.cost - newFilters.initialPayment;
            }
            //Проверяем сумму кредита по семейной ипотеке + не менее 10% от цены квартиры
            const creditAmount = isFamilyMortgageFilter
                ? Math.min(maxFamilyMortgageCreditAmount, Math.max(newFilters.creditAmount, newFilters.cost * 0.1))
                : Math.max(newFilters.creditAmount, newFilters.cost * 0.1);
            if (creditAmount !== newFilters.creditAmount) {
                console.log('creditAmount !== newFilters.creditAmount');
                newFilters.creditAmount = creditAmount;
                newFilters.initialPayment = newFilters.cost - newFilters.creditAmount;
            }
            //Проверяем начальный платеж не более 90% от цены квартиры
            const initialPayment = Math.min(newFilters.cost * 0.9, newFilters.initialPayment);
            if (initialPayment !== newFilters.initialPayment) {
                console.log('initialPayment !== newFilters.initialPayment');
                newFilters.initialPayment = initialPayment;
                newFilters.creditAmount = newFilters.cost - newFilters.initialPayment;
            }
            return newFilters;
        });
    };
    console.log('cost' + mortgageFilters.cost);
    console.log('max' + maxFamilyMortgageCreditAmount);
    console.log('minus' + (mortgageFilters.cost - maxFamilyMortgageCreditAmount));
    return (
        <aside className={styles.aside}>
            <div className={styles.aside__block}>
                <BlockWrapper label={'Количество комнат'}>
                    <CheckboxBlock description={'ST— студия, BR (bedroom) — количество спален'}>
                        {roomsTypes.map((room) => (
                            <CheckboxButton
                                disabled={false}
                                theme='classic'
                                name={room.name}
                                value={room.value}
                                id={'rooms'}
                                disabledText=''
                                active={room.value === numberOfRoomsFilter.toString()}
                                checkboxWithIcon={false}
                                selectParameter={() => dispatch(setNumberOfRoomsFilter(Number(room.value)))}
                                key={room.value}
                            />
                        ))}
                    </CheckboxBlock>
                </BlockWrapper>
            </div>
            <div className={styles.aside__block}>
                <BlockWrapper label={'Цена'}>
                    <NumberSlider<SliderNames>
                        min={minFlatPrice}
                        max={maxFlatPrice}
                        disabled={maxFlatPrice - minFlatPrice <= 1}
                        start={mortgageFilters.cost}
                        textValue={sliderTextData.cost}
                        step={100}
                        onUpdateSlider={onUpdateSlider}
                        onChangeSlider={onChangeSlider}
                        slider={'cost'}
                        units={'₽'}
                    />
                </BlockWrapper>
            </div>
            <div className={styles.aside__block}>
                <BlockWrapper label={`Первоначальный взнос (${initPayPercent(mortgageFilters)}%)`}>
                    <NumberSlider
                        min={isFamilyMortgageFilter ? Math.max(mortgageFilters.cost - maxFamilyMortgageCreditAmount, 0) : 0}
                        max={mortgageFilters.cost * 0.9}
                        disabled={maxFlatPrice - minFlatPrice <= 1}
                        start={mortgageFilters.initialPayment}
                        textValue={sliderTextData.initialPayment}
                        step={100}
                        onUpdateSlider={onUpdateSlider}
                        onChangeSlider={onChangeSlider}
                        slider={'initialPayment'}
                        units={'₽'}
                    />
                </BlockWrapper>
            </div>
            <div className={styles.aside__block}>
                <BlockWrapper label={`Сумма кредита (${credAmountPercent(mortgageFilters)}%)`}>
                    <NumberSlider
                        min={mortgageFilters.cost * 0.1}
                        max={isFamilyMortgageFilter ? Math.min(maxFamilyMortgageCreditAmount, mortgageFilters.cost) : mortgageFilters.cost}
                        disabled={true}
                        start={mortgageFilters.creditAmount}
                        textValue={sliderTextData.creditAmount}
                        step={100}
                        onUpdateSlider={onUpdateSlider}
                        onChangeSlider={onChangeSlider}
                        slider={'creditAmount'}
                        units={'₽'}
                    />
                </BlockWrapper>
            </div>
            <div className={styles.aside__block}>
                <BlockWrapper label={'Срок кредита'}>
                    <NumberSlider
                        min={1}
                        max={maxCreditTime}
                        disabled={maxFlatPrice - minFlatPrice <= 1}
                        start={mortgageFilters.creditTime}
                        textValue={sliderTextData.creditTime}
                        step={1}
                        onUpdateSlider={onUpdateSlider}
                        onChangeSlider={onChangeSlider}
                        slider={'creditTime'}
                        units={'лет'}
                    />
                </BlockWrapper>
            </div>
            <div className={styles.aside__block}>
                <BlockWrapper label={'Специальные условия'}>
                    <Tooltip
                        behavior='hover'
                        content={familyMortgageTooltip}
                        theme='base'
                        placement={'bottom'}
                        size={!isMobileOnly ? 400 : undefined}
                        text={'content_left'}
                    >
                        <CheckboxButton
                            disabled={false}
                            theme='classic'
                            name='Семейная ипотека'
                            value='familyMortgage'
                            id='familyMortgage'
                            disabledText=''
                            active={isFamilyMortgageFilter}
                            checkboxWithIcon={true}
                            icon='info'
                            themeIcon={'light'}
                            locationIcon='after'
                            selectParameter={() => dispatch(setIsFamilyMortgageFilter(!isFamilyMortgageFilter))}
                        />
                    </Tooltip>
                </BlockWrapper>
            </div>
        </aside>
    );
};

export default FilterForm;
