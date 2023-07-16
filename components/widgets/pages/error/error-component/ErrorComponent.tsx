import React from 'react';
import styles from './ErrorComponent.module.scss';
import SimpleButton from '../../../../features/buttons/simple-button/SimpleButton';
import SvgIcons from '../../../../svgs/SvgIcons';
import ROUTES from '../../../../../constants/routes';
import Head from 'next/head';
import Header from '../../../../layouts/header/Header';
import AnimatedSimpleButton from '../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';

export interface IErrorComponent {
    title1: string;
    title2: string;
    children: React.ReactNode;
    head: string;
}

const ErrorComponent: React.FC<IErrorComponent> = ({ title1, title2, children, head }) => {
    return (
        <>
            <Head>
                <title>{head}</title>
            </Head>
            <Header theme={'dark'} />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <div className={styles.title__item}>{title1}</div>
                        <div className={`${styles.relative} ${styles.title__item}`}>
                            <span>{title2}</span>
                        </div>
                    </div>
                    <div className={styles.block}>{children}</div>
                    <div className={styles.button}>
                        <AnimatedSimpleButton text='На главную' theme='light-outline' link={ROUTES.root} withIcon>
                            <SvgIcons id='arrow right' />
                        </AnimatedSimpleButton>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ErrorComponent;
