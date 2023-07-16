import React from 'react';
import styles from './Loader.module.scss';

export interface ILoader {
    isLoading?: boolean;
}

const Loader: React.FC<ILoader> = ({ isLoading }) => {
    return (
        <div className={styles.nl_reploader_father + ' ' + `${isLoading ? styles.__hide : ''}`}>
            <div className={styles.nl_preloader}>
                <div className={styles.loader}>Loading...</div>
            </div>
        </div>
    );
};

export default Loader;
