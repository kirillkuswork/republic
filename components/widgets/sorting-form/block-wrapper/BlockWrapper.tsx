import React from 'react';
import styles from './BlockWrapper.module.scss';

export interface IBlockWrapper {
    label: string;
    children: React.ReactNode;
}

const BlockWrapper: React.FC<IBlockWrapper> = ({ label, children }) => {
    return (
        <div className={styles.container}>
            <span className={styles.label}>{label}</span>
            {children}
        </div>
    );
};

export default BlockWrapper;
