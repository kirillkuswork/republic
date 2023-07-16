import React, { useMemo } from 'react';
import styles from './FlatCard.module.scss';
import { IApiCatalogFlat } from '../../../../store/api/apiTypes';
import FavoriteButton from '../../../features/buttons/favorite-button/FavoriteButton';
import editRoomsLabel from '../../../../tools/edit-rooms-label';
import SVG from 'react-inlinesvg';
import Price from '../../../shared/price/Price';
import RedPrice from '../../../shared/red-price/RedPrice';
import { AdvantageIcons } from '../../../features/advantage-icons/AdvantageIcons';
import FinishIcons from '../../../shared/finish-icons/FinishIcons';
import Link from 'next/link';
import capitalizeFirstLetter from '../../../../tools/capitalize-first-letter';

export interface IFlatCard {
    flat: IApiCatalogFlat;
}

const FlatCard: React.FC<IFlatCard> = ({ flat }) => {
    if (!flat) return <></>;
    let rooms = editRoomsLabel(flat);

    const pathToFlatPlan = useMemo(() => `/plans/${flat.bulk_id}/flats/furnished-plan/${flat.number}.svg`, [flat.bulk_id, flat.number]);

    return (
        <Link href={`/visual/${flat.bulk_id}/${flat.floor}/${flat.id}`} className={styles.container}>
            <div className={styles.header}>
                <span className={styles.number}> {flat.number} </span>
                <div className={styles.favorite}>
                    <FavoriteButton flat={flat} />
                </div>
            </div>
            <div className={styles.table}>
                <div className={styles.element}>
                    <span>Комнаты</span>
                    <span>{rooms.rooms}</span>
                </div>
                <div className={styles.element}>
                    <span>Площадь</span>
                    <span>
                        {flat.area}м<sup>2</sup>
                    </span>
                </div>
                <div className={styles.element}>
                    <span>Этаж</span>
                    <span>{flat.floor}</span>
                </div>
                <div className={styles.element}>
                    <span>Секция</span>
                    <span>{flat.section.number}</span>
                </div>
            </div>
            <div className={styles.info}>
                <span className={styles.text}> {capitalizeFirstLetter(flat.houseName)} </span>
                <div className={styles.scheme}>
                    <SVG src={pathToFlatPlan} className={styles.scheme__svg} />
                </div>
                <div className={styles.footer}>
                    <div className={styles.icons}>
                        <FinishIcons flat={flat} theme={'dark-grey'} withText={false} withTooltip={true} />
                        <AdvantageIcons flat={flat} theme={'dark-grey'} short={true} amount={1} direction={'right'} />
                    </div>
                    <Price flat={flat} size={'h5'} />
                    <RedPrice flat={flat} tooltip={true} size={'h5'} tooltipTheme={'base'} />
                </div>
            </div>
        </Link>
    );
};

export default FlatCard;
