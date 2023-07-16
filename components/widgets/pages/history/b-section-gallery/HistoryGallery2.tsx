import { motion, useScroll, useSpring, useTransform, Variants } from 'framer-motion';
import React, { useRef } from 'react';
import { transition1800 } from '../../../../shared/page-scroll/animation_helpers';
import styles from './HistoryGallery2.module.scss';
import Image from 'next/image';
import moscowImg2 from '../../../../../public/images/history-page/gallery-2.jpg';
import { useMobileOrientation, isMobileOnly, isTablet } from 'react-device-detect';

const HistoryGallery = () => {
    const { isLandscape } = useMobileOrientation();

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end end'],
    });

    const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const y = useTransform(smoothYProgress, [0, 1], [20, -20]);

    return (
        <div className={styles.song} ref={ref}>
            <div className={styles.songDesc}>
                <motion.h2 className={styles.songDescTitle}>
                    <motion.span
                        initial={{ x: 300 }}
                        viewport={{ once: true }}
                        whileInView={{ x: 0 }}
                        transition={{ duration: 0.8 }}
                        className={styles.songDescTitleFirst}
                    >
                        песня
                    </motion.span>
                    <motion.span
                        initial={{ x: -300 }}
                        viewport={{ once: true }}
                        whileInView={{ x: 0 }}
                        transition={{ duration: 0.8 }}
                        className={styles.songDescTitleSecond}
                    >
                        о пресне
                    </motion.span>
                </motion.h2>
                <motion.p
                    initial={(isMobileOnly || isTablet) && !isLandscape ? { x: -300 } : { y: -100 }}
                    viewport={{ once: true }}
                    whileInView={(isMobileOnly || isTablet) && !isLandscape ? { x: 0 } : { y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.songDescText}
                >
                    Альтернативная этимологическая версия связывает имя Пресни с Приездной слободой — районом, где иногородние гости и
                    иностранцы дожидались визы московского князя на въезд в город. Новгородцы и смоляне, немцы и свейский («шведский») люд
                    останавливались в Приездне и подробно отчитывались о целях приезда в Москву. Лишь после этого они получали разрешение
                    или отказ: «без приговора князя великого не ступали нежданные по землям города русского», — писал русский фольклорист М.
                    Макаров. Со временем слово «Приездня» упростилось до «Пресня».
                </motion.p>
            </div>
            <div className={styles.songImgWrapper}>
                <motion.div
                    className={styles.songImg}
                    style={{ y }}
                    viewport={{ once: true }}
                    initial={{ scale: 1 }}
                    whileInView={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                />
            </div>
        </div>
    );
};

export default HistoryGallery;
