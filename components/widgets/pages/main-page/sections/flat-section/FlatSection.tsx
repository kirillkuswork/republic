import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './FlatSection.module.scss';
import { motion, useScroll, useSpring, useTransform, cubicBezier, useInView, useMotionValue, useMotionTemplate } from 'framer-motion';
import ROUTES from '../../../../../../constants/routes';
import SvgIcons from '../../../../../svgs/SvgIcons';
import Image from 'next/image';
import AnimatedIconButton from '../../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import { IAnimation, responsive, reverseAnimation, transition1200 } from '../../../../../shared/page-scroll/animation_helpers';

const FlatSection: React.FC<{}> = ({}) => {
    const sectionRef = useRef<HTMLElement>(null);

    const scale = useMotionValue(1.0);
    const smoothScale = useSpring(1.0, { damping: 15, mass: 0.27, stiffness: 55 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });
    const smoothY = useSpring(scrollYProgress, { damping: 15, mass: 0.27, stiffness: 55 });
    const scrollScale = useTransform(smoothY, [0.3, 0.9], [0, 0.1], { ease: cubicBezier(0.6, 0, 0.4, 1) });

    const scaleTemplate = useMotionTemplate`calc(${smoothScale} + ${scrollScale})`;

    return (
        <motion.section className={styles.section} ref={sectionRef}>
            <motion.div className={styles.bg_image} style={{ scale: scaleTemplate }}>
                <Image src={'/images/main-page/flat-section.png'} alt={''} sizes='100%' priority fill={true} key={'flat_bg'} />
            </motion.div>
            <div className={styles.section__wrapper}>
                <div className={styles.contain}>
                    <div className={styles.text}>
                        выбрать свою
                        <br />
                        квартиру
                    </div>
                    <div
                        className={styles.button}
                        onMouseOver={() => {
                            smoothScale.set(1.2);
                        }}
                        onMouseLeave={() => {
                            smoothScale.set(1.0);
                        }}
                    >
                        <AnimatedIconButton
                            type={'Link'}
                            variant={'square'}
                            outline={false}
                            color={'dark-grey-brick'}
                            direction='right'
                            href={`${ROUTES.visual.root}`}
                            className={styles.animated_button}
                        >
                            <SvgIcons id={'arrow right'} />
                        </AnimatedIconButton>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default FlatSection;
