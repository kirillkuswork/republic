import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './AboutLegend.module.scss';

interface IAboutLegend {}
const AboutLegend: React.FC<IAboutLegend> = () => {
    const textRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLElement | null>(null);

    const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 });
    const isTextInView = useInView(textRef, { once: true, amount: 0.1 });

    return (
        <div className={styles.legend}>
            <div className={styles.background} />
            <div className={styles.preview}>
                <motion.section ref={titleRef} className={styles.preview_title}>
                    <motion.div
                        className={`${styles.title} ${styles.text1}`}
                        style={{ transform: isTitleInView ? 'none' : 'translateX(-900px)' }}
                    >
                        Прикосн<div className={styles.letterSpacing}>ут</div>ься
                    </motion.div>
                    <motion.div
                        className={`${styles.title} ${styles.text2}`}
                        style={{ transform: isTitleInView ? 'none' : 'translateX(500px)' }}
                    >
                        к легенде
                    </motion.div>
                </motion.section>
                <motion.section className={styles.description} ref={textRef}>
                    <motion.p className={styles.description_text} style={{ opacity: isTextInView ? 1 : 0 }}>
                        КВАРТАЛ ДЫШИТ ПАМЯТЬЮ МЕСТА И&nbsp;СТАНОВИТСЯ ЛЮБИМЫМ ДОМОМ В&nbsp;ДЕКОРАЦИЯХ СТАРОГО ЛОКОМОТИВНОГО ДЕПО
                    </motion.p>
                </motion.section>
            </div>
        </div>
    );
};

export default AboutLegend;
