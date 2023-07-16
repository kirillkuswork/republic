import React from 'react';
import styles from './CommercialList.module.scss';
import ListItem from '../../../../shared/list-item/ListItem';

export interface ICommercialList {}

const CommercialList: React.FC<ICommercialList> = ({}) => {
    const data = [
        {
            text: 'Первые этажи жилых башен',
            icon: 'towers',
        },
        {
            text: 'отдельный вход в каждое помещение',
            icon: 'entrance',
        },
        {
            text: 'высота потолков от 6 метров',
            icon: '6m-ceiling',
        },
        {
            text: 'витринное остекление',
            icon: 'glass-window',
        },
        {
            text: 'все необходимые коммуникации',
            icon: 'communication',
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.title}>
                    Торговые помещения расположены на&nbsp;первых этажах жилых башен, с&nbsp;отдельными входами и&nbsp;витринами.
                </div>
                <div className={styles.title}>
                    Возможное использование: продуктовый магазин, винотека, кафе/ресторан, салон красоты, аптека, пункт выдачи и&nbsp;др.
                </div>
                <ul className={styles.list}>
                    {data.map((item, index) => {
                        return <ListItem text={item.text} iconId={item.icon} key={index}/>;
                    })}
                </ul>
                <div className={styles.info}>
                    <div className={styles.infoItem}>
                        <span className={styles.brick}>Всего помещений:</span>&nbsp;<span className={styles.big}>12</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.brick}>Цена:</span>&nbsp;
                        <span>
                            от&nbsp;<span className={styles.big}>640&nbsp;000</span> руб./м&sup2;
                        </span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.brick}>Площади:</span>&nbsp;
                        <span>
                            от&nbsp;<span className={styles.big}>85</span>&nbsp;до&nbsp;<span className={styles.big}>200</span>&nbsp;м&sup2;
                        </span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.brick}>Условия покупки:</span>&nbsp;100% оплата, ипотека, рассрочка
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommercialList;
