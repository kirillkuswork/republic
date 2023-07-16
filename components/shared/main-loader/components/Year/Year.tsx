import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Year.module.scss';
import useMediaQuery from '../../../../../tools/hooks/useMediaQuery';
import getScaledSize from '../../../../../tools/getScaledSize';
import { useAppSelector } from '../../../../../hook';

export interface Year {
    year: number | null;
}

const container = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 1,
        },
    },
};

const charVariantsMobile = {
    hidden: { y: '400px' },
    visible: {
        y: 0,
    },
    exit: { y: '-400px' },
};

const Year: React.FC<Year> = memo(({ year }) => {
    const matchesMobile = useMediaQuery('(max-width: 540px)');
    const width = useAppSelector((state) => state.main.width);

    return (
        <motion.h2 className={styles.year} variants={container} initial='hidden' animate='visible'>
            {year && (
                <AnimatePresence mode='popLayout'>
                    {String(year)
                        .split('')
                        .map((char, i) => {
                            return (
                                <motion.span
                                    layout
                                    key={char + i}
                                    className={styles.char}
                                    variants={
                                        matchesMobile
                                            ? charVariantsMobile
                                            : {
                                                  hidden: { y: `${getScaledSize(600, width)}px` },
                                                  visible: {
                                                      y: 0,
                                                  },
                                                  exit: { y: `-${getScaledSize(600, width)}px` },
                                              }
                                    }
                                    initial='hidden'
                                    animate='visible'
                                    exit='exit'
                                    transition={{ type: 'spring', stiffness: year === 9784 ? 10 : 170, damping: 50 }}
                                >
                                    {char}
                                </motion.span>
                            );
                        })}
                </AnimatePresence>
            )}
        </motion.h2>
    );
});

export default Year;
