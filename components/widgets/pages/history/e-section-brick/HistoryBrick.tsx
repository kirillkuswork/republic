import { motion, useScroll, useSpring, useTransform, Variants } from 'framer-motion';
import React, { useRef } from 'react';
import SvgIcons from '../../../../svgs/SvgIcons';
import { transition1800 } from '../../gallery/page-scroll/animation_helpers';
import styles from './HistoryBrick.module.scss';

const HistoryBrick = () => {
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
        <motion.div viewport={{ once: true }} initial={'hidden'} whileInView={'visible'} className={styles.brick} ref={ref}>
            <motion.h4 custom={470} variants={textMotion} className={styles.brickTitle}>
                сохранение исторического кирпича — важнейшая задача мастеров republic
            </motion.h4>

            <motion.div className={styles.brickImg} style={{ x: '-50%', y: toTop }}></motion.div>
            <div className={styles.brickDesc}>
                <motion.p custom={-470} variants={textMotion} className={styles.brickDescSmall}>
                    специалистов привлечены <br /> к реставрации кирпичной <br /> кладки
                </motion.p>
                <motion.p custom={-470} variants={textMotion} className={styles.brickDescLarge}>
                    <SvgIcons id='100' width='100%' />
                </motion.p>
            </div>
        </motion.div>
    );
};

export default HistoryBrick;
