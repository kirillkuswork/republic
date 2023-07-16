import React from 'react';
import styles from './FinishIcons.module.scss';
import { IApiCatalogFlat } from '../../../store/api/apiTypes';
import { useAppSelector } from '../../../hook';
import Tooltip from '../../features/tooltip/Tooltip';
import SvgIcons from '../../svgs/SvgIcons';

export interface IFinishIcons {
    flat: IApiCatalogFlat;
    theme: 'white' | 'light' | 'darker-light' | 'grey' | 'dark-grey' | 'brick' | 'brick-light';
    withText: boolean;
    withTooltip: boolean;
}

const FinishIcons: React.FC<IFinishIcons> = ({ flat, theme, withText, withTooltip }) => {
    const finish = useAppSelector((state) => state.catalogPage.filterParameters.byCheckbox.finish);

    //Получение списка активных характеристик у квартиры
    let activeAttributes = Object.entries(flat.attributes)
        .filter((item) => item.includes(true))
        .map((item) => item.slice(0, 1).toString());

    //Получение данных об актуальных характеристик из хранилища (кроме отделки)
    let activeFinishParams = finish.filter((item) => activeAttributes.includes(item.value));

    let iconFinishWithTooltip = activeFinishParams.map((item, index) => {
        return (
            <Tooltip behavior={'hover'} content={item.name} theme={'base'} key={`${item.value} + ${index}`}>
                <div className={styles.label}>
                    <SvgIcons id={item.value} theme={theme} />
                    {withText && <span className={styles.label__text}>{item.name}</span>}
                </div>
            </Tooltip>
        );
    });

    let iconFinish = activeFinishParams.map((item) => {
        return (
            <div className={`${styles.label} ${withText ? styles.pointerNone : ''}`} key={'active-' + item.name}>
                <SvgIcons id={item.value} theme={theme} />
                {withText && <span className={styles.label__text}>{item.name}</span>}
            </div>
        );
    });

    return <div className={styles.container}>{withTooltip ? <>{iconFinishWithTooltip}</> : <>{iconFinish}</>}</div>;
};

export default FinishIcons;
