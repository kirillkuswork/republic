import React, { useState } from 'react';
import styles from './HousePageMain.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import { motion } from 'framer-motion';
import { IAnimation, transition1200, transition1800 } from '../../../../shared/page-scroll/animation_helpers';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

type IArtefactSectionAnimations = {
    [key in 'title' | 'text1' | 'text2' | 'text3' | 'bg' | 'arrowDown']?: IAnimation;
};

const animations: IArtefactSectionAnimations = {
    title: {
        initial: { x: -470 },
        animate: { x: 0 },
        transition: transition1200,
        responsive: { x: 'vw1460' },
    },
    text1: {
        initial: { x: 633 },
        animate: { x: 0 },
        transition: transition1200,
        responsive: { x: 'vw1460' },
    },
    text2: {
        initial: { x: -1280 },
        animate: { x: 0 },
        transition: transition1200,
        responsive: { x: 'vw1460' },
    },
    text3: {
        initial: { x: 495 },
        animate: { x: 0 },
        transition: transition1200,
        responsive: { x: 'vw1460' },
    },
    bg: {
        initial: { scale: 1.1 },
        animate: { scale: 1 },
        transition: transition1800,
    },
    arrowDown: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: transition1200,
    },
};

export interface HousePageMain {
    mainData: {
        title: string;
        text1: string;
        text2: string;
        text3: string;
        img: string;
        imgMobile: string;
    };
}

const BaseTemplate: React.FC<HousePageMain> = ({ mainData }) => {
    const handleClickArrowDown = () => {
        const element: any = document.querySelector('#house-scheme');
        element && element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section className={styles.container}>
            <motion.div className={styles.bgWrapper} {...animations.bg}>
                <picture>
                    <source media='(max-width:540px)' srcSet={mainData.imgMobile} />
                    <img className={styles.picture} src={mainData.img} alt='' />
                </picture>
            </motion.div>
            <div className={styles.contain}>
                <motion.h1 className={styles.title} {...animations.title}>
                    {mainData.title}
                </motion.h1>
                <div className={styles.text}>
                    <motion.div className={styles.text1} {...animations.text1}>
                        {mainData.text1}
                    </motion.div>
                    <motion.div className={styles.text2} {...animations.text2}>
                        {mainData.text2}
                    </motion.div>
                    <motion.div className={styles.text3} {...animations.text3}>
                        {mainData.text3}
                    </motion.div>
                </div>
            </div>
            <motion.div onClick={handleClickArrowDown} {...animations.arrowDown} className={styles.arrowDown}>
                <AnimatedIconButton
                    type={'button'}
                    variant='round'
                    outline={false}
                    color={'white'}
                    direction='down'
                    onClick={handleClickArrowDown}
                >
                    <SvgIcons id={'arrow down'} />
                </AnimatedIconButton>
            </motion.div>
        </section>
    );
};

export default BaseTemplate;
