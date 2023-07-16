import React, { useRef, useState } from 'react';
import styles from './HistoryNow.module.scss';
import { motion } from 'framer-motion';
import DescriptionCard from '../../../cards/description/DescriptionCard';
import Image from 'next/image';
import bg from '../../../../../public/images/history-page/history-now-bg.webp';
import bgMobile from '../../../../../public/images/history-page/history-now-mobile.webp';
import { isMobileOnly } from 'react-device-detect';

const HistoryNow = () => {
    return (
        <motion.section data-scroll-section className={styles.now}>
            <motion.div>
                <motion.h2
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    variants={{
                        visible: { opacity: 1, x: 0 },
                        hidden: { opacity: 0, x: -100 },
                    }}
                    className={styles.nowTitle}
                >
                    XXI век
                </motion.h2>
                <motion.div
                    whileInView='visible'
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    variants={{
                        visible: { opacity: 1, x: 0 },
                        hidden: { opacity: 0, x: 100 },
                    }}
                    className={styles.nowCard}
                >
                    <DescriptionCard link={'/about'}>
                        <p className={styles.nowCardText}>
                            В новое время Пресня устремилась ввысь. Небоскребы Сити стали местом работы и жизни бизнес-элиты. Переосмысление
                            индустриальных памятников привело к возникновению культовых проектов, Republic — самый новый из них.
                        </p>
                    </DescriptionCard>
                </motion.div>
            </motion.div>

            {!isMobileOnly ? (
                <Image src={bg} fill={true} alt={'История'} className={styles.nowBg} placeholder={'blur'} />
            ) : (
                <Image src={bgMobile} fill={true} alt={'История'} className={styles.nowBg} placeholder={'blur'} />
            )}
        </motion.section>
    );
};

export default HistoryNow;
