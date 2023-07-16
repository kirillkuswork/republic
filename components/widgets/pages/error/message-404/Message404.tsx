import React from 'react';
import styles from './Message404.module.scss';

const Message404 = () => {
    return <span className={styles.text}>Такой страницы не&nbsp;существует или она была удалена, проверьте правильность ссылки.</span>;
};

export default Message404;
