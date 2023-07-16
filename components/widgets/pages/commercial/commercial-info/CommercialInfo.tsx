import React, { useRef } from 'react';
import styles from './CommercialInfo.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export interface ICommercialInfo {}

const CommercialInfo: React.FC<ICommercialInfo> = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });
    const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const toTopBlock = useTransform(smoothYProgress, [0.6, 1], [100, 0]);

    return (
        <motion.section className={styles.container} ref={sectionRef}>
            <div className={styles.left}>
                <h2 className={styles.title}>перспективный трафик локации</h2>
                <div className={styles.cell}>
                    <SvgIcons id={'infographics'} />
                </div>
            </div>
            <motion.div className={styles.right} style={{ y: toTopBlock }}>
                <motion.div className={styles.card}>
                    <p className={styles.text}>жителей в&nbsp;квартале</p>
                    <div className={styles.number}>
                        <span>6</span>
                        <span>&nbsp;тыс.</span>
                    </div>
                </motion.div>
                <motion.div className={styles.card}>
                    <p className={styles.text}>офисных сотрудников</p>
                    <div className={styles.number}>
                        <span>12</span>
                        <span>&nbsp;тыс.</span>
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default CommercialInfo;
