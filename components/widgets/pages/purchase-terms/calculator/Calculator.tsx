import styles from './Calculator.module.scss';
import FilterForm, { initPayPercent } from '../filter-form/FilterForm';
import { IApiCatalogFlat, IApiTermsCalcData } from '../../../../../store/api/apiTypes';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import OfferList from '../offer-list/OfferList';
import { isMobileOnly } from 'react-device-detect';
import SimpleButton from '../../../../features/buttons/simple-button/SimpleButton';
import SvgIcons from '../../../../svgs/SvgIcons';
import MainModal from '../../../modal/main-modal/MainModal';
import { IBank } from '../../../../../store/slices/terms/termsSliceTypes';
import {
    setFilteredBanks,
    setIsFamilyMortgageFilter,
    setMortgageFilters,
    setNumberOfRoomsFilter,
} from '../../../../../store/slices/terms/termsSlice';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import maxBy from 'lodash/maxBy';
//@ts-ignore
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
interface ICalculator {
    calcData: IApiTermsCalcData[];
    allFlats: IApiCatalogFlat[];
}

function flatPrice(flat: IApiCatalogFlat) {
    return flat.currentPrice;
}

const Calculator: React.FC<ICalculator> = ({ calcData, allFlats }) => {
    const dispatch = useAppDispatch();
    const html = document.querySelector('html');
    const [showModal, setShowModal] = useState(false);
    const { mortgageFilters, isFamilyMortgageFilter, numberOfRoomsFilter } = useAppSelector((state) => state.termsPage);
    const mobileSavedFilters = useRef({
        mortgageFilters,
        isFamilyMortgageFilter,
        numberOfRoomsFilter,
    });

    const openModal = () => {
        mobileSavedFilters.current = {
            mortgageFilters,
            isFamilyMortgageFilter,
            numberOfRoomsFilter,
        };
        setShowModal(true);
        disablePageScroll(html);
    };

    const closeModal = () => {
        setShowModal(false);
        enablePageScroll();
    };
    const reset = () => {
        dispatch(setIsFamilyMortgageFilter(mobileSavedFilters.current.isFamilyMortgageFilter));
        dispatch(setNumberOfRoomsFilter(mobileSavedFilters.current.numberOfRoomsFilter));
        dispatch(setMortgageFilters(mobileSavedFilters.current.mortgageFilters));
    };

    const { maxFamilyMortgageCreditAmount, maxCreditTime } = useMemo(() => {
        const maxAmountElement = calcData
            .filter((m) => m.mortgage_type.mortgage_type_name === 'Семейная' || m.title.includes('Семейная'))
            .reduce((prev, curr) => (Number(prev.mortgage_max_sum) > Number(curr.mortgage_max_sum) ? prev : curr));
        const maxTimeMortgage = maxBy(calcData, (mortgage) => mortgage.mortgage_time);
        return {
            maxFamilyMortgageCreditAmount: maxAmountElement ? Number(maxAmountElement.mortgage_max_sum) * 1000000 : 30000000,
            maxCreditTime: maxTimeMortgage ? maxTimeMortgage.mortgage_time : '30',
        };
    }, [calcData]);

    const { minFlatPrice, maxFlatPrice, flats } = useMemo(() => {
        //Сортируем квартиры по количеству комнат
        let flats = allFlats.filter((f) =>
            numberOfRoomsFilter === 0
                ? f.rooms === numberOfRoomsFilter.toString().replace('0', 'studio')
                : Number(f.rooms) === numberOfRoomsFilter,
        );
        //Убираем квартиры, которые не подойдут по макс. размеру кредита семейной ипотеки
        //Т.к. мин размер кредита - 10% от цены
        if (isFamilyMortgageFilter) {
            flats = flats.filter((f) => flatPrice(f) * 0.1 <= maxFamilyMortgageCreditAmount);
        }
        //Получаем из оставшихся квартир мин/макс стоимость
        const minFlatPrice = !!flats.length
            ? flatPrice(flats.reduce((prev, curr) => (flatPrice(prev) < flatPrice(curr) ? prev : curr)))
            : 0;
        const maxFlatPrice = !!flats.length
            ? flatPrice(flats.reduce((prev, curr) => (flatPrice(prev) > flatPrice(curr) ? prev : curr)))
            : 1;
        //Сбрасываем фильтры (цена - середина диапазона, ипотека 20/80)
        const cost = minFlatPrice + (maxFlatPrice - minFlatPrice) * 0.5;
        const creditAmount = isFamilyMortgageFilter ? Math.min(maxFamilyMortgageCreditAmount, cost * 0.8) : cost * 0.8;
        dispatch(
            setMortgageFilters({
                ...mortgageFilters,
                cost,
                initialPayment: cost - creditAmount,
                creditAmount,
            }),
        );

        return {
            minFlatPrice,
            maxFlatPrice,
            flats,
        };
    }, [allFlats, numberOfRoomsFilter, isFamilyMortgageFilter, maxFamilyMortgageCreditAmount]);

    //Фильтруем доступные программы ипотеки при изменении фильтров и запичываем в redux
    useEffect(() => {
        const filtered = calcData.reduce((result: { [key: string]: IBank }, current) => {
            const { bank, ...item } = current;
            if (bank._id in result) result[bank._id].items.push(item);
            else
                result[bank._id] = {
                    id: bank._id,
                    title: bank.title,
                    image: bank.imgUrl,
                    items: [item],
                    filter_term: mortgageFilters.creditTime,
                    filter_amount: mortgageFilters.creditAmount,
                };
            return result;
        }, {});

        const regex = new RegExp('семейная', 'iu');
        for (const mortgage in filtered) {
            filtered[mortgage].items = filtered[mortgage].items.filter(
                (m) =>
                    (isFamilyMortgageFilter
                        ? regex.test(m.title) && parseInt(m.mortgage_max_sum) >= mortgageFilters.creditAmount / 1000000
                        : !regex.test(m.title)) &&
                    +parseInt(m.mortgage_time) >= mortgageFilters.creditTime &&
                    +parseInt(m.mortgage_an_initial_fee) <= initPayPercent(mortgageFilters),
            );

            if (!filtered[mortgage].items.length) {
                delete filtered[mortgage];
            }
        }
        dispatch(setFilteredBanks(Object.values(filtered)));
        // setSelectedOffer((selected) =>
        //     selected
        //         ? (Object.values(filtered).find((b) => b.id === selected.id) ?? Object.values(filtered)[0])
        //         : Object.values(filtered)[0]
        // );
    }, [calcData, mortgageFilters, isFamilyMortgageFilter]);

    return (
        <div className={styles.calc_container} id={'calc_block'}>
            <section className={styles.section_container}>
                <div className={styles.section_header}>
                    <div className={styles.header_title}>Калькулятор</div>
                    <div className={styles.header_title_right}>ипотеки</div>
                </div>
                <div className={styles.calc_block}>
                    <div className={styles.offer_container}>
                        <OfferList />
                    </div>
                    <div className={styles.calc_flats}>
                        {!isMobileOnly && (
                            <FilterForm
                                flats={flats}
                                maxFlatPrice={maxFlatPrice}
                                minFlatPrice={minFlatPrice}
                                maxCreditTime={maxCreditTime}
                                maxFamilyMortgageCreditAmount={maxFamilyMortgageCreditAmount}
                            />
                        )}
                        {isMobileOnly && (
                            <>
                                <SimpleButton text={'фильтр'} type={'button'} size={'mini'} color={'brick'} func={() => openModal()}>
                                    <div className={styles.btn_label}>
                                        <span>{isFamilyMortgageFilter ? 2 : 1}</span>
                                    </div>
                                </SimpleButton>
                                <MainModal
                                    theme={'dark'}
                                    show={showModal}
                                    iconMobileId={'close-modal-small-light'}
                                    iconDesktopId={'close-modal-large-light'}
                                    closeModal={() => {
                                        reset();
                                        closeModal();
                                    }}
                                    closeFixed={true}
                                >
                                    <div className={styles.modal}>
                                        <FilterForm
                                            flats={flats}
                                            maxFlatPrice={maxFlatPrice}
                                            minFlatPrice={minFlatPrice}
                                            maxCreditTime={maxCreditTime}
                                            maxFamilyMortgageCreditAmount={maxFamilyMortgageCreditAmount}
                                        />
                                        <div className={styles.buttons}>
                                            <SimpleButton
                                                func={() => reset()}
                                                text={'сбросить'}
                                                type={'button'}
                                                size={'medium'}
                                                color={'light'}
                                                outline={true}
                                            >
                                                <SvgIcons id={'reset filter circle light'} />
                                            </SimpleButton>
                                            <div className={styles.button__second}>
                                                <SimpleButton
                                                    func={() => closeModal()}
                                                    outline={true}
                                                    text={'применить'}
                                                    type={'button'}
                                                    color={'light'}
                                                    size={'medium'}
                                                >
                                                    <SvgIcons id={'arrow next light small'} />
                                                </SimpleButton>
                                            </div>
                                        </div>
                                    </div>
                                </MainModal>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Calculator;
