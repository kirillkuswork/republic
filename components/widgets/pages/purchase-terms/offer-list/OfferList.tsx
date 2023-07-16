import styles from './OfferList.module.scss';
import OfferItem from '../offer-item/OfferItem';
import { useAppSelector } from '../../../../../hook';
import React, { useMemo } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { isMobileOnly } from 'react-device-detect';

interface IOfferList {}

const OfferList: React.FC<IOfferList> = ({}) => {
    const banks = useAppSelector((state) => state.termsPage.filteredBanks);
    const banksArray = useMemo(() => {
        if (!banks) return [];
        let ba = cloneDeep(Object.values(banks));
        //Сортируем программы ипотек а банках по наименьшей ставке
        for (let bank of ba)
            bank.items.sort((a, b) => Number(a.mortgage_rate.replace(/,/, '.')) - Number(b.mortgage_rate.replace(/,/, '.')));
        //Сортируем банки от наименьшей ставки
        ba.sort((a, b) =>
            !a.items.length
                ? 1
                : !b.items.length
                ? -1
                : Number(a.items[0].mortgage_rate.replace(/,/, '.')) - Number(b.items[0].mortgage_rate.replace(/,/, '.')),
        );
        return ba;
    }, [banks]);
    return (
        <div className={styles.offer_table}>
            {!isMobileOnly && (
                <div className={styles.offer_table__header}>
                    <span>Банк</span>
                    <span>Вид</span>
                    <span>Ставка</span>
                    <span>Срок кредита</span>
                    <span>Платеж в месяц</span>
                    <span></span>
                </div>
            )}
            <div>
                {!!banksArray &&
                    banksArray.map((bank, i, row) => {
                        return <OfferItem bank={bank} key={i} />;
                    })}
            </div>
        </div>
    );
};

export default OfferList;
