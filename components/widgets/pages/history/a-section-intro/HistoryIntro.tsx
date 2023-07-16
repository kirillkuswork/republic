import { motion, Variants } from 'framer-motion';
import React, { FC } from 'react';
import { isMobileOnly, isTablet, useMobileOrientation } from 'react-device-detect';
import IconButton from '../../../../features/buttons/icon-button/IconButton';
import SvgIcons from '../../../../svgs/SvgIcons';
import { transition1800 } from '../../../../shared/page-scroll/animation_helpers';
import styles from './HistoryIntro.module.scss';

const textMotion: Variants = {
    hidden: (x) => ({
        x: x,
        opacity: 0,
    }),
    visible: {
        x: 0,
        opacity: 1,
        transition: transition1800,
    },
};

const HistoryIntro: FC = () => {
    const { isLandscape } = useMobileOrientation();

    return (
        <>
            <motion.section data-scroll-section className={styles.intro}>
                <motion.div
                    viewport={{ once: true }}
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className={styles.introBg}
                />
                <motion.h2 initial={'hidden'} whileInView={'visible'} className={styles.introTitle}>
                    <motion.span custom={-470} variants={textMotion} className={styles.introTitleFirst}>
                        увид<span className={styles.introTitleKerning}>е</span>ть {!isMobileOnly && 'пресню'}
                    </motion.span>
                    {isMobileOnly && (
                        <motion.span custom={-470} variants={textMotion} className={styles.introTitleFirstRight}>
                            пресню
                        </motion.span>
                    )}
                    <motion.span custom={470} variants={textMotion} className={styles.introTitleSecond}>
                        во всей
                    </motion.span>
                    <motion.span custom={-2000} variants={textMotion} className={styles.introTitleThird}>
                        глубине
                    </motion.span>
                </motion.h2>
                {(isMobileOnly || isTablet) && !isLandscape && (
                    <div className={styles.scrollDownBtn}>
                        <IconButton
                            type={'button'}
                            children={<SvgIcons id={'arrow down light'} />}
                            func={() => window.scrollTo(0, window.innerHeight)}
                        />
                    </div>
                )}
            </motion.section>
        </>
    );
};

export default HistoryIntro;
