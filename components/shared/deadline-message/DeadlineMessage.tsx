import React from 'react';
import styles from './DeadlineMessage.module.scss';

export interface IDeadlineMessage {
    text: string;
    date: string;
    theme: 'light' | 'dark';
}

const DeadlineMessage: React.FC<IDeadlineMessage> = ({ text, date, theme }) => {
    return (
        <div className={`${styles.deadline} ${styles[theme]}`}>
            <span>{text}:</span>
            <span>{date}</span>
        </div>
    );
};

export default DeadlineMessage;
