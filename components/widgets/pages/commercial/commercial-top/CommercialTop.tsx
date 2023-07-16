import React from 'react';
import styles from './CommercialTop.module.scss';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IAnimation } from '../../../../shared/page-scroll/animation_helpers';
import { useAppSelector } from '../../../../../hook';

export interface ICommercialTop {}

type IntroAnimations = {
    [key in 'bg' | 'title_highlighted' | 'title_2' | 'title_3']?: IAnimation;
};

const transition900 = { ease: [0.6, 0, 0.4, 1], duration: 0.9, type: 'tween' };

const initial: IntroAnimations = {
    title_highlighted: {
        initial: { x: '100%' },
        animate: { x: 0 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    title_2: {
        initial: { x: '-100vw' },
        animate: { x: 0 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    title_3: {
        initial: { x: '100%' },
        animate: { x: 0 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    bg: {
        initial: { scale: 1.1 },
        animate: { scale: 1 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 1.5, type: 'tween' },
    },
};

const CommercialTop: React.FC<ICommercialTop> = ({}) => {
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const width = useAppSelector((state) => state.main.width);

    return (
        <motion.section className={styles.top} layoutScroll style={{ y: 0 }}>
            <h1 className={styles.title}>
                <motion.span className={styles.title__highlighted} {...initial.title_highlighted}>
                    ритейл
                </motion.span>
                <motion.span className={styles.title__1} {...initial.title_2}>
                    {width > widthTablet ? <>в&nbsp;жилом квартале</> : <>в&nbsp;жилом</>}
                </motion.span>
                <motion.span className={styles.title__2} {...initial.title_3}>
                    {width > widthTablet ? <>Republic</> : <>квартале</>}
                </motion.span>
            </h1>
            <motion.div className={styles.image} {...initial.bg}>
                <Image
                    src={width > widthTablet ? '/images/commercial/1.jpeg' : '/images/commercial/1-mbl.png'}
                    alt={''}
                    fill={true}
                    priority={true}
                    className={styles.bg}
                />
            </motion.div>
        </motion.section>
    );
};

export default CommercialTop;
