import styles from './OfferItem.module.scss';
import React, { MouseEvent, useState } from 'react';
import { IBank } from '../../../../../store/slices/terms/termsSliceTypes';
import SvgIcons from '../../../../svgs/SvgIcons';
import numberOfYearsToString from '../../../../../tools/number-of-years-to-string';
import formatShortPrice from '../../../../../tools/format-short-price';
import { isMobileOnly } from 'react-device-detect';

interface IOfferItem {
    bank: IBank;
}

const OfferItem: React.FC<IOfferItem> = ({ bank }) => {
    const monthlyPayment = (mortgage_rate: string, mortgage_minus_one_year: boolean | number) => {
        let p = +mortgage_rate.replace(',', '.') / 100 / 12;
        const n = mortgage_minus_one_year === 1 ? (+bank.filter_term - 1) * 12 : +bank.filter_term * 12;
        const payment = Math.round((bank.filter_amount * p) / (1 - Math.pow(1 + p, -n)));

        return formatShortPrice(payment);
    };
    const [open, setOpen] = useState<{ [key: string]: boolean | undefined }>({});
    const handleClick = (e: MouseEvent<HTMLElement>, id: string) => {
        e.preventDefault();
        setOpen({
            [id]: open[id] ? undefined : true,
        });
    };

    const textDetails =
        bank.items.length == 2 ? 'предложение' : bank.items.length > 2 && bank.items.length < 6 ? 'предложения' : 'предложений';
    return (
        <>
            <div className={styles.item}>
                <details
                    className={isMobileOnly && bank.items.length > 1 ? styles.details + ' ' + styles.details__border : styles.details}
                    id={bank.id}
                    open={open[bank.id]}
                >
                    <summary className={styles.details__summary}>
                        <div className={styles.row}>
                            <div className={styles.title}>
                                <img src={bank.image} alt={bank.title} className={styles.bank_img} />
                                <span>{bank.title}</span>
                            </div>
                            <div className={styles.type}>
                                <span>{bank.items[0].title}</span>
                            </div>
                            {!isMobileOnly && (
                                <>
                                    <div className={styles.rate}>
                                        <span>от {bank.items[0].mortgage_rate}%</span>
                                    </div>
                                    <div className={styles.time}>
                                        <span>до {numberOfYearsToString(Number(bank.items[0].mortgage_time))}</span>
                                    </div>
                                    <div className={styles.cost}>
                                        <span>{monthlyPayment(bank.items[0].mortgage_rate, bank.items[0].mortgage_minus_one_year)} ₽</span>
                                    </div>
                                </>
                            )}
                            {isMobileOnly && (
                                <div className={styles.mortgage_table}>
                                    <div className={styles.mortgage_table__item}>
                                        <div className={styles.mortgage_table__title}>Ставка</div>
                                        <div className={styles.rate}>
                                            <span>от {bank.items[0].mortgage_rate}%</span>
                                        </div>
                                    </div>
                                    <div className={styles.mortgage_table__item}>
                                        <div className={styles.mortgage_table__title}>Срок кредита</div>
                                        <div className={styles.time}>
                                            <span>до {numberOfYearsToString(Number(bank.items[0].mortgage_time))}</span>
                                        </div>
                                    </div>
                                    <div className={styles.mortgage_table__item}>
                                        <div className={styles.mortgage_table__title}>Платеж в месяц</div>
                                        <div className={styles.cost}>
                                            <span>
                                                {monthlyPayment(bank.items[0].mortgage_rate, bank.items[0].mortgage_minus_one_year)} ₽
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {bank.items.length > 1 && (
                                <div className={styles.details__block} onClick={(e) => handleClick(e, bank.id)}>
                                    <div className={!open[bank.id] ? styles.details__title : styles.details__title__active}>
                                        <span>{!open[bank.id] ? `Еще ${bank.items.length - 1} ${textDetails}` : 'Cвернуть'}</span>
                                    </div>
                                    <div className={styles.details__btn}>
                                        <SvgIcons
                                            id={!open[bank.id] ? 'arrow down dark small' : 'arrow up dark small'}
                                            theme={!open[bank.id] ? 'dark-grey' : 'brick'}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </summary>
                    <div className={styles.details__content}>
                        {!!bank.items &&
                            bank.items.slice(1).map((item, i, row) => {
                                return (
                                    <div className={styles.row_details} key={i}>
                                        {!isMobileOnly && <div className={styles.title}></div>}
                                        <div className={styles.type}>
                                            <span>{item.title}</span>
                                        </div>
                                        {!isMobileOnly && (
                                            <>
                                                <div className={styles.rate}>
                                                    <span>от {item.mortgage_rate}%</span>
                                                </div>
                                                <div className={styles.time}>
                                                    <span>до {numberOfYearsToString(Number(item.mortgage_time))}</span>
                                                </div>
                                                <div className={styles.cost}>
                                                    <span>{monthlyPayment(item.mortgage_rate, item.mortgage_minus_one_year)} ₽</span>
                                                </div>
                                            </>
                                        )}
                                        {isMobileOnly && (
                                            <div className={styles.mortgage_table__details}>
                                                <div className={styles.mortgage_table__item}>
                                                    <div className={styles.mortgage_table__title}>Ставка</div>
                                                    <div className={styles.rate}>
                                                        <span>от {bank.items[0].mortgage_rate}%</span>
                                                    </div>
                                                </div>
                                                <div className={styles.mortgage_table__item}>
                                                    <div className={styles.mortgage_table__title}>Срок кредита</div>
                                                    <div className={styles.time}>
                                                        <span>до {numberOfYearsToString(Number(bank.items[0].mortgage_time))}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.mortgage_table__item}>
                                                    <div className={styles.mortgage_table__title}>Платеж в месяц</div>
                                                    <div className={styles.cost}>
                                                        <span>
                                                            {monthlyPayment(bank.items[0].mortgage_rate, item.mortgage_minus_one_year)} ₽
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </details>
            </div>
        </>
    );
};

export default OfferItem;
