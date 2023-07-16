import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SvgIcons from '../../../../svgs/SvgIcons';
import { IAnimation, transition1200, transition1800 } from '../../../../shared/page-scroll/animation_helpers';
import styles from './LocationIntro.module.scss';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

export interface ILocationIntro {}

type IntroAnimations = {
    [key in 'find_text' | 'freedom_text' | 'movement_text' | 'button' | 'bg']?: IAnimation;
};

const initial: IntroAnimations = {
    find_text: {
        initial: { x: -470 },
        animate: { x: 0 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 1, type: 'tween' },
    },
    freedom_text: {
        initial: { x: 390 },
        animate: { x: 0 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 1, type: 'tween' },
    },
    movement_text: {
        initial: { x: -1280 },
        animate: { x: 0 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 1, type: 'tween' },
    },
    button: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 1, type: 'tween' },
    },
    bg: {
        initial: { scale: 1.1 },
        animate: { scale: 1 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 1.5, type: 'tween' },
    },
};

const LocationIntro: React.FC<ILocationIntro> = () => {
    const handleClickArrowDown = () => {
        const element = document.querySelector('#location-gallery');
        element && element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className={styles.main}>
            <motion.div className={styles.bgWrapper} {...initial.bg}>
                <Image
                    src='/images/location/preview_image.png'
                    alt='background image'
                    fill
                    className={styles.bg}
                    sizes='(max-width: 1023px) 1000vw, 900vw'
                />
            </motion.div>
            <div className={styles.preview}>
                <motion.h1 className={styles.title} {...initial.find_text}>
                    Обрести
                </motion.h1>
                <motion.h1 className={`${styles.title} ${styles.text2}`} {...initial.freedom_text}>
                    Свободу
                </motion.h1>
                <motion.h1 className={`${styles.title} ${styles.text3}`} {...initial.movement_text}>
                    Передвижения
                </motion.h1>
            </div>
            <motion.div className={styles.arrowDown} onClick={handleClickArrowDown} {...initial.button}>
                {/* <div className={styles.arrowDown_wrapper}>
                    <SvgIcons id='arrow down narrow' />
                </div> */}
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
        </div>
    );
};

export default LocationIntro;
