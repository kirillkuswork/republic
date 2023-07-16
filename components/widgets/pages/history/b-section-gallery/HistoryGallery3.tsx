import { motion, Variants } from 'framer-motion';
import React from 'react';
import { transition1800 } from '../../../../shared/page-scroll/animation_helpers';
import styles from './HistoryGallery3.module.scss';
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

    return (
        <div className={styles.presna}>
            {(isMobileOnly || isTablet) && !isLandscape && (
                <motion.h3
                    className={styles.presnaTitle}
                    viewport={{ once: true }}
                    initial={{ opacity: 0, x: 150 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    со временем слово &laquo;Приездня&raquo; упростилось до &laquo;Пресня&raquo;
                </motion.h3>
            )}

            <motion.p className={styles.presnaDesc} {...animationText}>
                Своим именем Пресня обязана маленькой речке. Берущая исток в Горелом болоте (район нынешних Бутырок), река Пресня с давних
                времен славилась чистой и студеной водой: недаром общий праиндоевропейский корень -preisk- роднит славянское слово «пресный»
                с английским «fresh». Впрочем, испить эталонной воды из Пресни уже не получится: с 1908 года она бежит по подземному
                коллектору, пролегающему под Скаковой улицей, Московским зоопарком и Белым домом. Сегодня увидеть Пресню можно, только
                записавшись на экскурсию к диггерам.
            </motion.p>
            <div className={styles.presnaRight}>
                {!((isMobileOnly || isTablet) && !isLandscape) && (
                    <motion.h3 className={styles.presnaTitle} {...animationText}>
                        со временем <br /> слово &laquo;Приездня&raquo; упростилось <br /> до &laquo;Пресня&raquo;
                    </motion.h3>
                )}
                <div className={styles.presnaImgWrapper}>
                    <motion.div
                        className={styles.presnaImg}
                        initial={{ opacity: 0, scale: 1.1 }}
                        viewport={{ once: true }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HistoryGallery;
