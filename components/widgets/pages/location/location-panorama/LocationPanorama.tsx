import React, { useRef, useState } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import SvgIcons from '../../../../svgs/SvgIcons';
import styles from './LocationPanorama.module.scss';

export interface ILocationPanorama {}

const LocationPanorama: React.FC<ILocationPanorama> = () => {
    const [showScrollableIndicator, setShowScrollableIndicator] = useState<boolean>(true);
    const panoramaRef = useRef(null);
    const titleRef = useRef<HTMLElement | null>(null);
    const controls = useAnimationControls();
    let isPressed = false;

    const isTitleInView = useInView(titleRef, { once: true, amount: 0.15 });

    const onMouseDown = () => {
        isPressed = true;
    };

    const onMouseMove = () => {
        if (!isPressed) return;
        if (!showScrollableIndicator) return;
        setShowScrollableIndicator(false);
    };

    const onMouseUp = () => {
        isPressed = false;
        setShowScrollableIndicator(true);
    };

    return (
        <motion.section ref={titleRef} className={styles.panoramaContainer}>
            <h1 className={`${styles.title} ${styles.title_text1}`} style={{ transform: isTitleInView ? 'none' : 'translateX(-750px)' }}>
                Панорамные
            </h1>
            <h1 className={`${styles.title} ${styles.title_text2}`} style={{ transform: isTitleInView ? 'none' : 'translateX(350px)' }}>
                Виды
            </h1>
            <h1 className={`${styles.title} ${styles.title_text3}`} style={{ transform: isTitleInView ? 'none' : 'translateX(-1000px)' }}>
                На москву
            </h1>
            <div
                ref={panoramaRef}
                className={styles.wrapper}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onTouchStart={onMouseDown}
                onTouchMove={onMouseMove}
                onTouchEnd={onMouseUp}
            >
                <motion.img
                    drag='x'
                    dragElastic={0.1}
                    dragTransition={{ bounceStiffness: 400, bounceDamping: 60 }}
                    dragConstraints={panoramaRef}
                    className={styles.panorama}
                    src='/images/location/panorama-dark.jpg'
                    alt='Панорама Пресня Republic'
                    initial={{ x: '-30%' }}
                    animate={controls}
                />
            </div>
            <div
                className={`${styles.scrollableIndicator} ${
                    showScrollableIndicator ? styles.scrollableIndicator_show : styles.scrollableIndicator_hide
                }`}
            >
                <div className={styles.desktop}>
                    <div className={styles.svg}>
                        <SvgIcons id='scrollable indicator' theme='light' />
                    </div>
                    <div className={styles.cursor}>
                        <SvgIcons id='cursor' />
                    </div>
                </div>
                <div className={styles.mobile}>
                    <SvgIcons id='arrows panorama' />
                </div>
            </div>
        </motion.section>
    );
};

export default LocationPanorama;
