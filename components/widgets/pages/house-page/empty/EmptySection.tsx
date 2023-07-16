import React from 'react';
import styles from './EmptySection.module.scss';

export interface IEmptySection {}

const EmptySection: React.FC<IEmptySection> = ({}) => {
    return <div className={styles.container}></div>;
};

export default EmptySection;
