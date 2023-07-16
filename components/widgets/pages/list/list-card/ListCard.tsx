import Link from 'next/link';
import React from 'react';
import styles from './ListCard.module.scss';
import Image from 'next/image';
import editRoomsLabel from '../../../../../tools/edit-rooms-label';
import formatShortPrice from '../../../../../tools/format-short-price';
import capitalizeFirstLetter from '../../../../../tools/capitalize-first-letter';
import FavoriteButton from '../../../../features/buttons/favorite-button/FavoriteButton';
import Price from '../../../../shared/price/Price';
import RedPrice from '../../../../shared/red-price/RedPrice';
import { IApiCatalogFlat } from '../../../../../store/api/apiTypes';
import FinishIcons from '../../../../shared/finish-icons/FinishIcons';
import { AdvantageIcons } from '../../../../features/advantage-icons/AdvantageIcons';

export interface IListCard {
    flat: IApiCatalogFlat;
}

const ListCard: React.FC<IListCard> = ({ flat }) => {
    //Вывод корректных лейблов с количеством спален
    let rooms = editRoomsLabel(flat);

    return (
        <Link href={`/visual/${flat.bulk_id}/${flat.floor}/${flat.id}`} className={styles.card}>
            <div className={styles.image}>
                <Image src={`/plans/${flat.bulk_id}/flats/furnished-plan/${flat.number}.svg`} fill={true} alt={''} sizes={'50vw'} />
            </div>
            <div className={styles.parameters}>
                <div className={styles.flex}>
                    <span>{rooms.rooms}</span>
                    <span>
                        {formatShortPrice(flat.area)}м<sup>2</sup>
                    </span>
                </div>
                <span className={styles.params}>{capitalizeFirstLetter(flat.houseName)}</span>
                <span className={styles.params}>{flat.section.number} секция</span>
                <span className={styles.params}>{flat.floor} этаж</span>
                <span className={styles.params}>№{flat.number}</span>
            </div>
            <div className={styles.favorite}>
                <FavoriteButton flat={flat} />
            </div>
            <div></div>
            <Price flat={flat} size={'h5'} />
            <RedPrice flat={flat} tooltip={true} size={'h5'} tooltipTheme={'base'} />
            <div className={styles.svg}>
                <FinishIcons flat={flat} theme={'dark-grey'} withText={false} withTooltip={true} />
                <AdvantageIcons flat={flat} theme={'dark-grey'} short={true} amount={1} direction={'right'} />
            </div>
        </Link>
    );
};

export default ListCard;
