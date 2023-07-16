import React, { useEffect, useMemo, useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import SvgIcons from '../../../svgs/SvgIcons';
import styles from './TermsComponent.module.scss';
import SimpleButton from '../../../features/buttons/simple-button/SimpleButton';
import Navigation from './navigation/Navigation';
import TermsMortgage from './sections/terms-mortgage/TermsMortgage';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import {
    fetchSpecialMortgages,
    fetchQa,
    fetchCalcData,
    fetchInstallments,
    fetchSpecialInstallments,
    fetchCatalog,
} from '../../../../store/api/api';
import Loader from '../../../shared/loader/Loader';
import { useRouter } from 'next/router';
import ROUTES from '../../../../constants/routes';
import TermsInstallment from './sections/terms-installment/TermsInstallment';
import TermsOnline from './sections/terms-online/TermsOnline';
import TermsFullPayment from './sections/terms-full-payment/TermsFullPayment';
import TermsTradeIn from './sections/terms-tradeIn/TermsTradeIn';
import AnimatedSimpleButton from '../../../features/buttons/animated-simple-button/AnimatedSimpleButton';

interface ITermsComponent {}

const TermsComponent: React.FC<ITermsComponent> = ({}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const specialMortgages = useAppSelector((state) => state.termsPage.specialMortgages);
    const qa = useAppSelector((state) => state.termsPage.qa);
    const calcData = useAppSelector((state) => state.termsPage.calcData);
    const installments = useAppSelector((state) => state.termsPage.installments);
    const specialInstallments = useAppSelector((state) => state.termsPage.specialInstallments);
    const catalogData = useAppSelector((state) => state.termsPage.catalog);
    const [showCalcButton, setShowCalcButton] = useState(false);
    useEffect(() => {
        dispatch(fetchSpecialMortgages());
        dispatch(fetchQa());
        dispatch(fetchCalcData());
        dispatch(fetchInstallments());
        dispatch(fetchSpecialInstallments());
        dispatch(fetchCatalog());
    }, [dispatch]);

    const allDataLoaded = calcData && specialInstallments && installments && specialMortgages && qa && catalogData;

    const currentTab = useMemo(() => {
        if (!allDataLoaded) return null;
        let pattern = new RegExp(`.*${ROUTES.purchaseTerms.root}/`, 'g');
        const cutPath = router.route.replace(pattern, '').replace('/', '');
        switch (cutPath) {
            case ROUTES.purchaseTerms.mortgage:
                setShowCalcButton(true);
                return <TermsMortgage specialMortgages={specialMortgages} calcData={calcData} allFlats={catalogData.flats} />;
            case ROUTES.purchaseTerms.installmentPlan:
                setShowCalcButton(false);
                return <TermsInstallment specialInstallments={specialInstallments} installments={installments} />;
            case ROUTES.purchaseTerms.fullPayment:
                setShowCalcButton(false);
                return <TermsFullPayment />;
            case ROUTES.purchaseTerms.onlinePurchase:
                setShowCalcButton(false);
                return <TermsOnline qa={qa} />;
            case ROUTES.purchaseTerms.tradeIn:
                setShowCalcButton(false);
                return <TermsTradeIn />;
        }
    }, [router.route, calcData, specialInstallments, installments, specialMortgages, qa, catalogData]);

    if (!allDataLoaded) {
        return <Loader />;
    }

    return (
        <div className={styles.container}>
            <section className={styles.container__main}>
                <div className={styles.header}>
                    <div className={styles.header__block}>
                        <h1 className={styles.h1}>
                            условия
                            {isMobileOnly ? <div>покупки</div> : ' покупки'}
                        </h1>
                    </div>
                    {showCalcButton && !isMobileOnly && (
                        <div className={styles.calc_btn}>
                            <AnimatedSimpleButton
                                text='Калькулятор ипотеки'
                                theme={'dark-outline'}
                                link='#calc_block'
                                withIcon={true}
                                iconAnimation={'down'}
                                iconPosition={'right'}
                                size={'default'}
                            >
                                <SvgIcons id='arrow down' />
                            </AnimatedSimpleButton>
                        </div>
                    )}
                </div>
                <Navigation />
            </section>
            <main>{currentTab}</main>
        </div>
    );
};

export default TermsComponent;
