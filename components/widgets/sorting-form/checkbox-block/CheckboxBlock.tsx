import styles from './CheckboxBlock.module.scss';
import React from 'react';

export interface ICheckboxBlock extends React.ComponentProps<'div'> {
    description?: string;
}

const CheckboxBlock: React.FC<ICheckboxBlock> = ({ description, children }) => {
    return (
        <>
            <div className={styles.buttons}>{children}</div>
            {description && <span className={styles.description}>{description}</span>}
        </>
    );
};

export default CheckboxBlock;
