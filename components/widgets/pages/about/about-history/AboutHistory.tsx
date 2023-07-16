import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import AnimatedSimpleButton from '../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
import SvgIcons from '../../../../svgs/SvgIcons';
import ROUTES from '../../../../../constants/routes';
import styles from './AboutHistory.module.scss';

const AboutHistory: React.FC = () => {
    const titleRef = useRef<HTMLElement | null>(null);
    const textRef = useRef<HTMLElement | null>(null);
    const descriptionRef = useRef<HTMLElement | null>(null);
    const btnRef = useRef<HTMLElement | null>(null);

    const isTitleInView = useInView(titleRef, { once: true, amount: 0.35 });
    const isTextInView = useInView(textRef, { once: true, amount: 0.5 });
    const isDescriptionInView = useInView(descriptionRef, { once: true, amount: 0.35 });
    const isBtnInView = useInView(btnRef, { once: true, amount: 0.9 });

    return (
        <div id='about-history' className={styles.history}>
            <div className={styles.wrapper}>
                <motion.section ref={titleRef}>
                    <motion.h3
                        className={styles.title}
                        style={{
                            transform: isTitleInView ? 'none' : 'translateY(200px)',
                            opacity: isTitleInView ? 1 : 0,
                        }}
                    >
                        Объединяя современную архитектуру с&nbsp;историей города, квартал становится новым{' '}
                        <div className={styles.title_brick}>центром притяжения Пресни</div>
                    </motion.h3>
                </motion.section>
				<div className={styles.scheme}>
					<Image src='/images/about/history/about_scheme.png' alt='scheme' fill sizes='100vw' className={styles.schemeImg}/>
				</div>
                <div className={`${styles.imageBlock} ${styles.mobileVersion}`}>
                    <Image src='/images/about/history/about_architecture.png' alt='house' fill sizes='100vw' />
                </div>
                <motion.section className={styles.description} ref={descriptionRef}>
                    <motion.p
                        className={styles.description_text}
                        style={{
                            transform: isDescriptionInView ? 'none' : 'translateY(100px)',
                            opacity: isDescriptionInView ? 1 : 0,
                        }}
                    >
                        Квартал украшают памятники промышленной архитектуры&nbsp;&mdash; цеха Московско-Брестской железной дороги,
                        построенные в&nbsp;1869&ndash;1907&nbsp;гг.
                    </motion.p>
                    <motion.p
                        className={styles.description_text}
                        style={{
                            transform: isDescriptionInView ? 'none' : 'translateY(100px)',
                            opacity: isDescriptionInView ? 1 : 0,
                        }}
                    >
                        Здания Republic вырастают среди исторических декораций и&nbsp;пересматривают использование промышленных пространств.
                    </motion.p>
                </motion.section>
                <div className={styles.images}>
                    <div className={styles.images_first}>
                        <Image src='/images/about/history/about_house.png' alt='house' fill sizes='100vw' />
                    </div>
                    <div className={styles.images_second}>
                        <div className={`${styles.imageBlock} ${styles.desktopVersion}`}>
                            <Image
                                src='/images/about/history/about_architecture.png'
                                alt='house'
                                fill
                                sizes='(max-width: 1023px) 1000vw, 900vw'
                            />
                        </div>
                        <motion.section ref={textRef}>
                            <motion.h4
                                className={styles.text}
                                style={{
                                    transform: isTextInView ? 'none' : 'translateY(60px)',
                                    opacity: isTextInView ? 1 : 0,
                                }}
                            >
                                Исторические здания спроектированы в&nbsp;стиле заводских корпусов XIX&nbsp;века, поэтому обеспечение
                                сохранности старинного кирпича стало одной из&nbsp;важнейших задач проекта
                            </motion.h4>
                        </motion.section>
                        <motion.section ref={btnRef}>
                            <motion.div className={styles.btn} style={{ opacity: isBtnInView ? 1 : 0 }}>
                                <AnimatedSimpleButton text='История' theme='dark-outline' link={ROUTES.history} withIcon>
                                    <SvgIcons id='arrow right' />
                                </AnimatedSimpleButton>
                            </motion.div>
                        </motion.section>
                    </div>
                </div>
                <div className={styles.realization}>
                    <div className={styles.realization_block}>
                        <Image src='/images/about/history/about_brick.png' alt='brick' fill sizes='100vw' />
                    </div>
                    <div className={`${styles.realization_block} ${styles.realization_info}`}>
                        <div>
                            <p className={styles.implementationPeriod}>Срок</p>
                            <p className={styles.implementationPeriod}>реализации</p>
                        </div>
                        <div className={styles.dataRealization}>
                            <h1 className={styles.dataRealization_number}>IV</h1>
                            <h5 className={styles.dataRealization_quarter}>кв. 2029</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutHistory;
