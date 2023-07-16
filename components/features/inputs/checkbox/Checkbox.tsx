import React from 'react';
import styles from './Checkbox.module.scss';

export interface ICheckbox {
    text: string;
    checked: boolean | undefined;
    onChange: () => void;
}

const Checkbox: React.FC<ICheckbox> = ({ text, checked, onChange}) => {

    return (
        <label className={styles.container}>
            {text}
            <input type='checkbox' checked={checked} onChange={onChange} />
            <span className={styles.checkmark}></span>
        </label>
    );
};

export default Checkbox;
