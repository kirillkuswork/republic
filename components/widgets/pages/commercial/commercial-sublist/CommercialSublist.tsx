import React, { useRef } from 'react';
import styles from './CommercialSublist.module.scss';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';

export interface ICommercialSublist {}

const CommercialSublist: React.FC<ICommercialSublist> = ({}) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const blockRef = useRef<HTMLElement | null>(null);
    const isBlockInView = useInView(blockRef, { once: true, amount: 0.2 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });
    const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 40, restDelta: 0 });
    const toTopBlock = useTransform(smoothYProgress, [0.5, 1], [150, 0]);

    const data = [
        {
            id: 1,
            text: 'Продуктовый магазин',
        },
        {
            id: 2,
            text: 'Винотека',
        },
        {
            id: 3,
            text: 'Кафе/ресторан',
        },
        {
            id: 4,
            text: 'Салон красоты',
        },
        {
            id: 5,
            text: 'Аптека',
        },
        {
            id: 6,
            text: 'Пункт выдачи и др.',
        },
    ];

    return (
        <motion.section className={styles.container} ref={sectionRef}>
            <motion.section
                className={styles.content}
                ref={blockRef}
                style={{
                    transform: isBlockInView ? 'none' : 'translateY(200px)',
                    opacity: isBlockInView ? 1 : 0,
                }}
            >
                <span className={styles.title}>Функциональное назначение</span>
                <motion.div>
                    <ul className={styles.list}>
                        {data.map((item) => {
                            return (
                                <div className={styles.item}>
                                    <div className={styles.number}>
                                        <span>{item.id}</span>
                                    </div>
                                    <span className={styles.text}>{item.text}</span>
                                </div>
                            );
                        })}
                    </ul>
                </motion.div>
            </motion.section>
        </motion.section>
    );
};

export default CommercialSublist;
