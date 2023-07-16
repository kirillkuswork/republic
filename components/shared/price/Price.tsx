import React from 'react';
import styles from './Price.module.scss';
import formatLongPrice from '../../../tools/format-long-price';
import { IApiCatalogFlat } from '../../../store/api/apiTypes';

export interface IPrice {
    flat: IApiCatalogFlat;
    size: 'h4' | 'small' | 'h5';
}

const Price: React.FC<IPrice> = ({ flat, size }) => {
    return <>{!flat.redPrice && <span className={`${styles.price} ${styles[size]}`}>{formatLongPrice(flat.currentPrice)} ₽</span>}</>;
};

export default Price;
