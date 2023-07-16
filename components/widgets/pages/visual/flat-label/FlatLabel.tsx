import React from 'react';
import styles from './FlatLabel.module.scss';

export interface IFlatLabel {
    text: string;
}

const FlatLabel: React.FC<IFlatLabel> = ({ text }) => {
    return <div className={`${styles.container} ${styles.classic}`}>{text}</div>;
};

export default FlatLabel;
