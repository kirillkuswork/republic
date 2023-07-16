import React from 'react';
import styles from './ListItem.module.scss';
import SvgIcons from '../../svgs/SvgIcons';

export interface IListItem {
    text: string;
    iconId: string;
}

const ListItem: React.FC<IListItem> = ({ text, iconId }) => {
    return (
        <li className={styles.item}>
            <div className={styles.itemIcon}>
                <SvgIcons id={iconId} />
            </div>
            <div className={styles.itemRightSide}>
                <div className={styles.itemText} dangerouslySetInnerHTML={{ __html: text }} />
            </div>
        </li>
    );
};

export default ListItem;
