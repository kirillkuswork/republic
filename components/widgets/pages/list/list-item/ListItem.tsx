import React from 'react';
import styles from './ListItem.module.scss';
import Link from 'next/link';
import editRoomsLabel from '../../../../../tools/edit-rooms-label';
import formatShortPrice from '../../../../../tools/format-short-price';
import Image from 'next/image';
import FavoriteButton from '../../../../features/buttons/favorite-button/FavoriteButton';
import Price from '../../../../shared/price/Price';
import RedPrice from '../../../../shared/red-price/RedPrice';
import { IApiCatalogFlat } from '../../../../../store/api/apiTypes';
import FinishIcons from '../../../../shared/finish-icons/FinishIcons';
import { AdvantageIcons } from '../../../../features/advantage-icons/AdvantageIcons';
import capitalizeFirstLetter from '../../../../../tools/capitalize-first-letter';

interface IListItem {
    flat: IApiCatalogFlat;
}

const ListItem: React.FC<IListItem> = ({ flat }) => {
    //Вывод корректных лейблов с количеством спален
    let rooms = editRoomsLabel(flat);

    return (
        <Link href={`/visual/${flat.bulk_id}/${flat.floor}/${flat.id}`} className={styles.row}>
            <div className={styles.image}>
                <Image
                    src={`/plans/${flat.bulk_id}/flats/furnished-plan/${flat.number}.svg`}
                    fill={true}
                    alt={''}
                    sizes={'20vw'}
                    quality={20}
                />
            </div>
            <div className={styles.parameter}>{flat.number}</div>
            <div className={styles.parameter}>{rooms.rooms}</div>
            <div className={styles.parameter}>
                {formatShortPrice(flat.area)}м<sup>2</sup>
            </div>
            <div className={styles.parameter}>{flat.floor}</div>
            <div className={styles.parameter}>{flat.section.number}</div>
            <div className={styles.parameter}>{capitalizeFirstLetter(flat.houseName)}</div>
            <div className={styles.svg}>
                <FinishIcons flat={flat} theme={'dark-grey'} withText={false} withTooltip={true} />
            </div>
            <div className={styles.svg}>
                <AdvantageIcons flat={flat} theme={'dark-grey'} short={true} amount={2} />
            </div>
            <Price flat={flat} size={'h5'} />
            <RedPrice flat={flat} tooltip={true} size={'h5'} tooltipTheme={'red_price_catalog'} />
            <div>
                <FavoriteButton flat={flat} />
            </div>
        </Link>
    );
};

export default ListItem;
