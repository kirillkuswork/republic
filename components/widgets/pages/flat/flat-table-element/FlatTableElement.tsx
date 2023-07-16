import React from 'react';
import styles from './FlatTableElement.module.scss';

export interface IFlatTableElement extends React.ComponentProps<'div'> {
    title: string;
}

const FlatTableElement: React.FC<IFlatTableElement> = ({ title, children }) => {
    return (
        <div className={styles.element}>
            <span className={styles.element__title}>{title}</span>
            <span className={styles.element__content}>{children}</span>
        </div>
    );
};

export default FlatTableElement;
