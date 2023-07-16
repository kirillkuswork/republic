import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SvgIcons from '../../../../svgs/SvgIcons';
import { IAnimation, transition1200, transition1800 } from '../../../../shared/page-scroll/animation_helpers';
import styles from './AboutIntro.module.scss';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

interface IAboutIntro {}

type IntroAnimations = {
    [key in 'feel_text' | 'presnya_text' | 'myself_text' | 'button' | 'bg']?: IAnimation;
};

const initial: IntroAnimations = {
    feel_text: {
        initial: { x: -470 },
        animate: { x: 0 },
        transition: transition1200,
    },
    presnya_text: {
        initial: { x: 390 },
        animate: { x: 0 },
        transition: transition1200,
    },
    myself_text: {
        initial: { x: -1280 },
        animate: { x: 0 },
        transition: transition1200,
    },
    button: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: transition1200,
    },
    bg: {
        initial: { scale: 1.1 },
        animate: { scale: 1 },
        transition: transition1800,
    },
};

const AboutIntro: React.FC<IAboutIntro> = () => {
    const handleClickArrowDown = () => {
        const element: any = document.querySelector('#about-history');
        element && element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className={styles.main}>
            <motion.div className={styles.bgWrapper} {...initial.bg}>
                <Image
                    src='/images/about/preview-image.jpg'
                    alt='background image'
                    fill
                    className={styles.bg}
                    sizes='(max-width: 1023px) 1000vw, 900vw'
                />
            </motion.div>
            <div className={styles.preview}>
                <motion.div className={`${styles.title} ${styles.text1}`} {...initial.feel_text}>
                    Ощ<div className={styles.letterSpacing}>ут</div>ить
                </motion.div>
                <motion.div className={`${styles.title} ${styles.text2}`} {...initial.presnya_text}>
                    Пресню
                </motion.div>
                <motion.div className={`${styles.title} ${styles.text3}`} {...initial.myself_text}>
                    В себе
                </motion.div>
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

export default AboutIntro;
