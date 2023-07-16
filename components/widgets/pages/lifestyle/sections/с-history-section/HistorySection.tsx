import React, { useRef } from 'react';
import Image from 'next/image';
import styles from './HistorySection.module.scss';
import { motion, useInView } from 'framer-motion';
import DescriptionCard from '../../../../cards/description/DescriptionCard';
import bgImage from '../../../../../../public/images/lifestyle/history-desktop.jpg';
import bgImageMobile from '../../../../../../public/images/lifestyle/history-mobile.jpg';
import { IHeader } from '../../../../../layouts/header/Header';
import getScaledSize from '../../../../../../tools/getScaledSize';
import { useAppSelector } from '../../../../../../hook';

interface IHistoryProps {
    onTopSection?: () => void;
    onChangeTheme?: (theme: IHeader['theme']) => void;
}

const HistorySection: React.FC<IHistoryProps> = ({ onChangeTheme, onTopSection }) => {
    const width = useAppSelector((state) => state.main.width);
    const sectionRef = useRef<HTMLElement>(null);
    const sectionWrapperRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const isInViewTitle = useInView(titleRef, { once: true });
    const isInViewCard = useInView(cardRef, { once: true });

    return (
        <motion.section className={`${styles.section} ${styles.portrait}`} ref={sectionRef}>
            <motion.div className={`${styles.sectionWrapper}`} ref={sectionWrapperRef}>
                <motion.div className={styles.bgWrapper}>
                    <Image
                        src={bgImage}
                        alt={'Девушка на скамейке'}
                        fill={true}
                        className={styles.bgDesktop}
                        sizes='(max-width: 1023px) 1200vw'
                    />
                    <Image
                        src={bgImageMobile}
                        alt={'Девушка на скамейке'}
                        fill={true}
                        className={styles.bgMobile}
                        sizes='(max-width: 1023px) 1200vw'
                    />
                </motion.div>
                <h2 className={styles.title} ref={titleRef}>
                    <span>
                        <motion.span
                            className={styles.title__highlighted}
                            style={{
                                transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(-750, width)}px)`,
                                transition: 'transform 0.6s ease 0.1s',
                            }}
                        >
                            Жить&nbsp;
                        </motion.span>
                        <motion.span
                            className={styles.title__1}
                            style={{
                                transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(-750, width)}px)`,
                                transition: 'transform 0.6s ease 0.1s',
                            }}
                        >
                            современно
                        </motion.span>
                    </span>
                    <motion.span
                        className={styles.title__2}
                        style={{
                            transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(1300, width)}px)`,
                            transition: 'transform 0.6s ease 0.1s',
                        }}
                    >
                        в исторических
                    </motion.span>
                    <motion.span
                        className={styles.title__4}
                        style={{
                            transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(-450, width)}px)`,
                            transition: 'transform 0.6s ease 0.1s',
                        }}
                    >
                        декорациях
                    </motion.span>
                </h2>
                <motion.div
                    className={styles.card}
                    ref={cardRef}
                    style={{
                        transform: isInViewCard ? 'none' : `translateY(${getScaledSize(110, width)}px)`,
                        transition: 'transform 0.6s ease 0.1s',
                    }}
                >
                    <DescriptionCard>
                        <p className={styles.cardText}>
                            Republic удивляет контрастами: здесь украшают стены прошлого искусством будущего и&nbsp;учат малышей
                            в&nbsp;прогрессивном детсаде, расположенном в&nbsp;здании конца ХIХ века.
                        </p>
                    </DescriptionCard>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default HistorySection;
