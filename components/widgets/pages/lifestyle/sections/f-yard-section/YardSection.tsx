import React, { useRef } from 'react';
import Image from 'next/image';
import styles from './YardSection.module.scss';
import { motion, useMotionValueEvent, useScroll, useInView } from 'framer-motion';
import DescriptionCard from '../../../../cards/description/DescriptionCard';
import { IHeader } from '../../../../../layouts/header/Header';
import bgImage from '../../../../../../public/images/lifestyle/yard-desktop.jpg';
import bgImageMobile from '../../../../../../public/images/lifestyle/yard-mobile.jpg';
import getScaledSize from '../../../../../../tools/getScaledSize';
import { useAppSelector } from '../../../../../../hook';

interface IYardProps {
    onTopSection?: () => void;
    onChangeTheme?: (theme: IHeader['theme']) => void;
}

const YardSection: React.FC<IYardProps> = ({ onChangeTheme, onTopSection }) => {
    const width = useAppSelector((state) => state.main.width);

    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const matchesMobile = width <= 540;

    const isInViewTitle = useInView(titleRef, { once: true });
    const isInViewCard = useInView(cardRef, { once: true });

    const { scrollYProgress: sectionStartProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'start start'],
    });

    useMotionValueEvent(sectionStartProgress, 'change', (latest) => {
        // console.log('x changed to', latest);
        if (latest >= 1) {
            if (onTopSection) {
                onTopSection();
            }
        }
    });

    return (
        <motion.section className={`${styles.section} ${styles.portrait}`} ref={sectionRef}>
            <h2 className={styles.title} ref={titleRef}>
                <motion.span
                    className={styles.title__highlighted}
                    style={{
                        transform: isInViewTitle ? 'none' : `translateX(-100vw)`,
                        transition: 'transform 0.6s ease 0.1s',
                    }}
                >
                    Раствориться
                </motion.span>
                <motion.span
                    className={styles.title__1}
                    style={{
                        transform: isInViewTitle ? 'none' : `translateX(100vw)`,
                        transition: 'transform 0.6s ease 0.1s',
                    }}
                >
                    в городе
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
                <DescriptionCard link={'/about'}>
                    <p className={styles.cardText}>
                        Сотни взрослых деревьев наполняют Republic атмосферой старых московских двориков и&nbsp;спасают от&nbsp;знойного
                        летнего солнца. Большие площади становятся сценой, на&nbsp;которой Москва играет лучшие роли для своих горожан.
                    </p>
                </DescriptionCard>
            </motion.div>
            <motion.div className={styles.bgWrapper}>
                {!matchesMobile && (
                    <Image src={bgImage} alt={'Девушка на скамейке'} fill={true} className={styles.bg} sizes='(max-width: 1023px) 1200vw' />
                )}
                {matchesMobile && (
                    <Image
                        src={bgImageMobile}
                        alt={'Девушка на скамейке'}
                        fill={true}
                        className={styles.bg}
                        sizes='(max-width: 1023px) 1200vw'
                    />
                )}
            </motion.div>
        </motion.section>
    );
};

export default YardSection;
