import React from 'react';
import styles from './PrimaryLayout.module.scss';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import DefaultHead from '../../shared/head/DefaultHead';

export interface IPrimaryLayout {
    children: React.ReactNode;
    theme: 'light' | 'dark' | 'dark-light' | 'transparent';
    header_theme: 'light' | 'dark' | 'dark-light' | 'transparent';
    height: 'one-screen' | 'fit-content';
    pathname?: string;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children, theme, height, header_theme }) => {
    return (
        <>
            <DefaultHead />
            <Header theme={header_theme} />
            <main className={styles.container + ` ${styles[theme]}` + ` ${styles[height]}`}>{children}</main>
            <Footer />
        </>
    );
};

export default PrimaryLayout;
