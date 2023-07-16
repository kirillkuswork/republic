import { motion } from 'framer-motion';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import useInterval from '../../../tools/hooks/useInterval';
import Year from './components/Year/Year';
import styles from './MainLoader.module.scss';

import Images from './components/Images/Images';

interface MainLoader {
    onFinish: (isFinished: boolean) => void;
}

export type YearType = 1560 | 1800 | 1920 | 1980 | 2023 | 9784 | null;

const MainLoader: React.FC<MainLoader> = ({ onFinish }) => {
    const [count, setCount] = useState<number>(0);
    const [delay, setDelay] = useState<number>(54);

    const [year, setYear] = React.useState<YearType>(null);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    useInterval(
        () => {
            setCount(count + 1);
        },
        !isFinished ? delay : null,
    );

    if (count >= 100) {
        if (!isFinished) {
            setIsFinished(true);
        }
    }

    useEffect(() => {
        if (count >= 4 && count < 20) {
            setYear(1560);
        } else if (count >= 20 && count < 36) {
            setYear(1800);
        } else if (count >= 36 && count < 52) {
            setYear(1920);
        } else if (count >= 52 && count < 68) {
            setYear(1980);
        } else if (count >= 68 && count < 84) {
            setYear(2023);
        } else if (count >= 84) {
            setYear(9784);

            setTimeout(() => {
                onFinish(true);
            }, 1500);

            setTimeout(() => {
                sessionStorage.setItem('loaderIsWatched', 'watched');
            }, 4000);
        }
    }, [count]);

    useLayoutEffect(() => {
        document.documentElement.style.removeProperty('--window-inner-height');
        document.documentElement.style.removeProperty('height');
    }, []);

    return (
        <motion.div className={styles.loader} initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={styles.progressBar} style={{ scaleX: count * 0.01 }}></motion.div>
            <Year year={year} />
            <Images year={year} />
        </motion.div>
    );
};

export default MainLoader;
