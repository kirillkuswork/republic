import React from 'react';
import styles from './RedPrice.module.scss';
import formatLongPrice from '../../../tools/format-long-price';
import Tooltip from '../../features/tooltip/Tooltip';
import { IApiCatalogFlat } from '../../../store/api/apiTypes';

export interface IRedPrice {
    flat: IApiCatalogFlat;
    tooltip: true;
    tooltipTheme: 'base' | 'red_price_catalog';
    size: 'h5' | 'small' | 'h4';
}

const RedPrice: React.FC<IRedPrice> = ({ flat, tooltip, size, tooltipTheme }) => {
    return (
        <>
            {flat.redPrice && (
                <div className={`${styles.price_red} ${styles[size]}`}>
                    {tooltip ? (
                        <Tooltip content={'Акция, сумму выгоды уточняйте у менеджера'} theme={tooltipTheme} behavior={'hover'}>
                            <span className={styles.span}> {formatLongPrice(flat.currentPrice)} ₽ </span>
                        </Tooltip>
                    ) : (
                        <span className={styles.span}> {formatLongPrice(flat.currentPrice)} ₽ </span>
                    )}
                </div>
            )}
        </>
    );
};

export default RedPrice;
