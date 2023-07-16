import { motion, useScroll, useSpring, useTransform, Variants } from 'framer-motion';
import React, { useRef } from 'react';
import SvgIcons from '../../../../svgs/SvgIcons';
import { transition1800 } from '../../gallery/page-scroll/animation_helpers';
import styles from './HistoryTiles.module.scss';

const HistoryTiles = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end end'],
    });
    const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const toTop = useTransform(smoothYProgress, [0, 1], ['0', '-50%']);

    const textMotion: Variants = {
        hidden: (x) => ({
            x: x,
            opacity: 0,
        }),
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8 },
        },
    };

    return (
        <motion.div viewport={{ once: true }} initial={'hidden'} whileInView={'visible'} className={styles.tiles} ref={ref}>
            <motion.h4 className={styles.tilesTitle} custom={470} variants={textMotion}>
                О промышленном прошлом квартала напоминает также чугунная плитка, ставшая визуальным лейтмотивом Republic
            </motion.h4>

            <motion.div className={styles.tilesImg} style={{ x: '-50%', y: toTop }}></motion.div>
            <div className={styles.tilesDesc}>
                <motion.p className={styles.tilesDescSmall} custom={-470} variants={textMotion}>
                    чугунных пластин <br /> были спасены от забвения
                </motion.p>
                <motion.p className={styles.tilesDescLarge} custom={-470} variants={textMotion}>
                    <SvgIcons id='5000' width='100%' />
                </motion.p>
            </div>
        </motion.div>
    );
};

export default HistoryTiles;
