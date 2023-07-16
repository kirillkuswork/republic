import React, { useRef } from 'react';
import Image from 'next/image';
import { useScroll, useSpring, motion, useTransform, useInView } from 'framer-motion';
import { useAppSelector } from '../../../../../hook';
import styles from './AboutArchitecture.module.scss';

interface IAboutArchitecture {}

const AboutArchitecture: React.FC<IAboutArchitecture> = () => {
    const { tablet } = useAppSelector((state) => state.main.breakpoint);
    const width = useAppSelector((state) => state.main.width);
    const sectionRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLElement | null>(null);
    const descriptionDesktopRef = useRef<HTMLElement | null>(null);
    const descriptionMobileRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });
    const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const toTopBlock1 = useTransform(smoothYProgress, [0.6, 1], [150, 0]);
    const toTopBlock2 = useTransform(smoothYProgress, [0.7, 1], [150, 0]);

    const isTitleRefInView = useInView(titleRef, { once: true, amount: 0.3 });
    const isDescriptionDesktopInView = useInView(descriptionDesktopRef, { once: true, amount: 0.4 });
    const isDescriptionMobileInView = useInView(descriptionMobileRef, { once: true, amount: 0.4 });

    return (
        <motion.section className={styles.architecture} ref={sectionRef}>
            <div className={styles.wrapper}>
                <div className={styles.description}>
                    <motion.section ref={titleRef}>
                        <motion.h3
                            className={styles.description_title}
                            style={{
                                transform: isTitleRefInView ? 'none' : 'translateY(120px)',
                                opacity: isTitleRefInView ? 1 : 0,
                                transition: 'all 1s',
                            }}
                        >
                            Каждое здание здесь&nbsp;&mdash; автограф одного из&nbsp;лучших современных архитекторов, а&nbsp;Republic
                            целиком&nbsp;&mdash; парк архитектурных шедевров
                        </motion.h3>
                    </motion.section>
                    <motion.section className={`${styles.descriptionBlocks} ${styles.desktopVersion}`} ref={descriptionDesktopRef}>
                        <motion.p
                            className={styles.text}
                            style={{
                                transform: isDescriptionDesktopInView ? 'none' : 'translateY(90px)',
                                opacity: isDescriptionDesktopInView ? 1 : 0,
                                transition: 'all 1s',
                            }}
                        >
                            Главный концептуализатор Москвы Илья Осколков-Ценципер и&nbsp;творческие наследники ландшафтного дизайнера
                            Уильяма&nbsp;Гиллеспи.
                        </motion.p>
                        <motion.p
                            className={styles.text}
                            style={{
                                transform: isDescriptionDesktopInView ? 'none' : 'translateY(90px)',
                                opacity: isDescriptionDesktopInView ? 1 : 0,
                                transition: 'all 1s',
                            }}
                        >
                            Швейцарский архитектор Макс Дадлер. Британцы Стив Браун и&nbsp;Эйдан Поттер, Ян&nbsp;Симпсон и&nbsp;Рейчел Хаф.
                            Их&nbsp;российские коллеги из&nbsp;архитектурных бюро &laquo;Меганом&raquo;&nbsp;и&nbsp;Wall.
                        </motion.p>
                    </motion.section>
                </div>
                <div className={styles.image}>
                    <div className={styles.image_block}>
                        <Image
                            src='/images/about/architecture-block.jpg'
                            alt='architecture'
                            fill
                            sizes='(max-width: 1023px) 1000vw, 900vw'
                        />
                    </div>
                </div>
                <motion.section className={`${styles.descriptionBlocks} ${styles.mobileVersion}`} ref={descriptionMobileRef}>
                    <motion.p
                        className={styles.text}
                        style={{
                            transform: isDescriptionMobileInView ? 'none' : 'translateY(90px)',
                            opacity: isDescriptionMobileInView ? 1 : 0,
                            transition: 'all 1s',
                        }}
                    >
                        Главный концептуализатор Москвы Илья Осколков-Ценципер и&nbsp;творческие наследники ландшафтного дизайнера
                        Уильяма&nbsp;Гиллеспи.
                    </motion.p>
                    <motion.p
                        className={styles.text}
                        style={{
                            transform: isDescriptionMobileInView ? 'none' : 'translateY(90px)',
                            opacity: isDescriptionMobileInView ? 1 : 0,
                            transition: 'all 1s',
                        }}
                    >
                        Швейцарский архитектор Макс Дадлер. Британцы Стив Браун и&nbsp;Эйдан Поттер, Ян Симпсон и&nbsp;Рейчел Хо.
                        Их&nbsp;российские коллеги из&nbsp;архитектурных бюро &laquo;Меганом&raquo;&nbsp;и&nbsp;Wall.
                    </motion.p>
                </motion.section>
                <div className={styles.info}>
					<motion.div className={`${styles.block} ${styles.block0}`} style={width > tablet ? { y: toTopBlock2 } : {}}>
						<div className={styles.textContainer}>
							<p className={styles.textInBlock}>Машиномест</p>
							<p className={styles.textInBlock}>в квартале</p>
						</div>
						<div className={styles.numberInBlock}>1789</div>
					</motion.div>
                    <motion.div className={`${styles.block} ${styles.block1}`} style={width > tablet ? { y: toTopBlock1 } : {}}>
                        <div className={styles.textContainer}>
                            <p className={styles.textInBlock}>аутентичных</p>
                            <p className={styles.textInBlock}>жилых башен</p>
                        </div>
                        <div className={styles.numberInBlock}>10</div>
                    </motion.div>
                    <motion.div className={`${styles.block} ${styles.block2}`} style={width > tablet ? { y: toTopBlock2 } : {}}>
                        <div className={styles.textContainer}>
                            <p className={styles.textInBlock}>квартира</p>
                            <p className={styles.textInBlock}>в квартале</p>
                        </div>
                        <div className={styles.numberInBlock}>2651</div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default AboutArchitecture;
