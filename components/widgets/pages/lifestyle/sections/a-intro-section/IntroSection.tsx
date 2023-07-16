import React, { useRef } from 'react';
import styles from './IntroSection.module.scss';
import SvgIcons from '../../../../../svgs/SvgIcons';
import { motion } from 'framer-motion';
import { IAnimation, transition1800 } from '../../../../../shared/page-scroll/animation_helpers';
import Image from 'next/image';
import bgImage from '../../../../../../public/images/lifestyle/intro-desktop.jpg';
import AnimatedIconButton from '../../../../../features/buttons/animated-icon-button/AnimatedIconButton';

type IntroAnimations = {
    [key in 'section' | 'title_highlighted' | 'title_1' | 'title_2' | 'title_3' | 'button' | 'bg']?: IAnimation;
};

const transition900 = { ease: [0.6, 0, 0.4, 1], duration: 0.9, type: 'tween' };

const initial: IntroAnimations = {
    title_highlighted: {
        initial: { x: '-100%' },
        animate: { x: 0 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    title_1: {
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
    button: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: transition900,
    },
    bg: {
        initial: { scale: 1.1 },
        animate: { scale: 1 },
        transition: transition1800,
    },
};

const IntroSection: React.FC<{}> = ({}) => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    const handleButtonClick = () => {
        const section = document.getElementById('lifestyle_about_section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.section className={`${styles.section} ${styles.portrait}`} ref={sectionRef} layoutScroll style={{ y: 0 }}>
            <motion.div className={styles.sectionWrapper} ref={contentRef}>
                <h1 className={styles.title}>
                    <motion.span className={styles.title__highlighted} {...initial.title_highlighted}>
                        Жизнь
                    </motion.span>
                    <motion.span className={styles.title__1} {...initial.title_1}>
                        В&nbsp;обществе
                    </motion.span>
                    <motion.span className={styles.title__2} {...initial.title_2}>
                        Своих
                    </motion.span>
                    <motion.span className={styles.title__3} {...initial.title_3}>
                        Людей
                    </motion.span>
                </h1>

                <motion.div {...initial.button} className={styles.buttonWrapper}>
                    <AnimatedIconButton
                        type={'button'}
                        variant='round'
                        outline={false}
                        color={'white'}
                        direction='down'
                        onClick={handleButtonClick}
                    >
                        <SvgIcons id={'arrow down'} />
                    </AnimatedIconButton>
                </motion.div>
                <motion.div className={styles.bgWrapper} {...initial.bg}>
                    <Image
                        src={bgImage}
                        alt={'background image'}
                        fill={true}
                        className={styles.bg}
                        priority={true}
                        sizes='(max-width: 1023px) 1200vw'
                    />
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default IntroSection;
