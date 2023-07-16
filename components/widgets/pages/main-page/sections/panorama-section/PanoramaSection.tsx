import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './PanoramaSection.module.scss';
import { motion, useAnimationControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import panoramaLight from '../../../../../../public/images/main-page/panorama-light.jpg';
import panoramaDark from '../../../../../../public/images/main-page/panorama-dark.jpg';
import AnimatedIconButton from '../../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import SvgIcons from '../../../../../svgs/SvgIcons';

const PanoramaSection: React.FC<{}> = ({}) => {
    const [isDarkTheme, setIsDarkTeme] = useState(true);
    const [sectionRef, inView] = useInView();
    const controls = useAnimationControls();

    useEffect(() => {
        if (inView) {
            controls.start('move').then(() => {
                controls.start('start');
            });
        }
    }, [controls, inView]);

    const motionVariant = {
        initial: {
            x: '-39%',
            transition: {
                ease: [0.9, 0.9, 0.9, 0.9],
            },
        },
        start: {
            x: '-49%',
            transition: {
                ease: [0.9, 0.9, 0.9, 0.9],
                repeat: Infinity,
                duration: 30,
            },
        },
        move: {
            x: '0%',
            transition: {
                ease: [0.9, 0.9, 0.9, 0.9],
                duration: 30,
            },
        },
    };

    const refWrapper = useRef(null);
    return (
        <motion.section className={styles.section} ref={sectionRef}>
            <div ref={refWrapper} className={styles.panorama_wrapper}>
                <motion.img
                    drag='x'
                    dragElastic={0}
                    dragTransition={{ bounceStiffness: 400, bounceDamping: 60 }}
                    dragConstraints={refWrapper}
                    className={styles.panorama}
                    src={isDarkTheme ? panoramaDark.src : panoramaLight.src}
                    alt='Панорама Пресня Republic'
                    initial='initial'
                    animate={controls}
                    variants={motionVariant}
                />
            </div>
            <div className={styles.panorama__controls}>
                <AnimatedIconButton
                    type={'button'}
                    variant={'round'}
                    outline={isDarkTheme}
                    color={'white'}
                    direction='up'
                    onClick={() => setIsDarkTeme(false)}
                >
                    <SvgIcons id={'sun'} />
                </AnimatedIconButton>
                <AnimatedIconButton
                    type={'button'}
                    variant={'round'}
                    outline={!isDarkTheme}
                    color={'white'}
                    direction='up'
                    onClick={() => setIsDarkTeme(true)}
                >
                    <SvgIcons id={'moon'} />
                </AnimatedIconButton>
            </div>
        </motion.section>
    );
};

export default PanoramaSection;
