import { motion, useScroll, useSpring, useTransform, Variants } from 'framer-motion';
import React, { useRef } from 'react';
import styles from './HistoryGallery1.module.scss';
import Image from 'next/image';
import moscowImg2 from '../../../../../public/images/history-page/gallery-2.jpg';
import { useMobileOrientation, isMobileOnly, isTablet } from 'react-device-detect';

const HistoryGallery = () => {
    const { isLandscape } = useMobileOrientation();

    const animationText = {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true },
        transition: { duration: 0.8 },
        variants: {
            visible: (isMobileOnly || isTablet) && !isLandscape ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 },
            hidden: (isMobileOnly || isTablet) && !isLandscape ? { opacity: 0, x: -150 } : { opacity: 0, y: -150 },
        },
    };

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end end'],
    });

    const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const y = useTransform(smoothYProgress, [0, 1], [20, -20]);

    return (
        <div className={styles.moscow} ref={ref}>
            <motion.h3 className={styles.moscowTitle} {...animationText}>
                Москва подобна плавильному котлу. Культуры и традиции, события и моды растворяются в ней, а на дне оседает чистое золото
            </motion.h3>
            <div className={styles.moscowRight}>
                <div className={styles.moscowDesc}>
                    <motion.p
                        viewport={{ once: true }}
                        initial={{ opacity: 0, x: 150 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className={styles.moscowDescText}
                    >
                        Старые улочки и небоскребы Сити, пруды и парки, многовековая история и ваши детские воспоминания. Остается всё, из
                        чего состоит Пресня — квинтэссенция Москвы и «место силы» для будущих жителей Republic.
                    </motion.p>
                    <div className={styles.moscowDescImgWrapper}>
                        <motion.div
                            className={styles.moscowDescImg}
                            initial={{ opacity: 0, scale: 1.1 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            // style={{y}}
                        />
                    </div>
                </div>
                <div className={styles.moscowImgWrapper}>
                    <motion.div
                        className={styles.moscowImg}
                        initial={{ scale: 1 }}
                        whileInView={{ scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{ y }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HistoryGallery;
