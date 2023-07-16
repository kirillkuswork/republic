import React, { useRef, useState } from 'react';
import styles from './MobileLocationSection.module.scss';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import ROUTES from '../../../../../../constants/routes';
import SvgIcons from '../../../../../svgs/SvgIcons';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
import AnimatedMap from '../../../../../shared/animated-map/AnimatedMap';

const MobileLocationSection: React.FC<{}> = ({}) => {
    function vwAll(x: number) {
        const viewport =
            document.documentElement.clientWidth > 1370
                ? 1460
                : document.documentElement.clientWidth >= 1024
                ? 1200
                : document.documentElement.clientWidth >= 541
                ? 768
                : 380;

        return (x / viewport) * document.documentElement.clientWidth;
    }
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLElement | null>(null);
    const locationRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });
    const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
    const isWalkInView = useInView(locationRef, { once: true, amount: 0.3 });
    const isLocationInView = useInView(locationRef, { once: true, amount: 0.5 });
    const isButtonInView = useInView(locationRef, { once: true, amount: 0.6 });
    //  const isDriveInView = useInView(locationRef, { once: true, amount: 0.7 });
    const smoothY = useSpring(scrollYProgress, { damping: 15, mass: 0.27, stiffness: 55 });
    const mapScale = useTransform(smoothY, [0.1, 0.5], [1.1, 1]);
    const [showScrollableIndicator, setShowScrollableIndicator] = useState<boolean>(true);
    let isPressed = false;
    const onMouseDown = () => {
        isPressed = true;
    };

    const onMouseMove = () => {
        if (!isPressed) return;
        if (!showScrollableIndicator) return;
        setShowScrollableIndicator(false);
    };

    const onMouseUp = () => {
        isPressed = false;
        setShowScrollableIndicator(true);
    };
    const data = [
        {
            title: 'гулять',
            items: [
                {
                    place: 'до м. Белорусская и Аэроэкспресса',
                    time: '',
                },
                {
                    place: 'в Шереметьево',
                    time: '5-10 мин.',
                },
                {
                    place: 'до м. 1905 года',
                    time: '7-13 мин.',
                },
                {
                    place: 'до Белой площади',
                    time: '12 мин.',
                },
                {
                    place: 'до фудмолла «Депо»',
                    time: '15 мин.',
                },
                {
                    place: 'до Московского зоопарка',
                    time: '16 мин.',
                },
                {
                    place: 'до Патриарших',
                    time: '18 мин.',
                },
            ],
        },
        {
            title: 'ехать',
            items: [
                {
                    place: 'до Ленинградского проспекта ',
                    time: '2 мин.',
                },
                {
                    place: 'до ТТК',
                    time: '4 мин.',
                },
                {
                    place: 'до Ипподрома',
                    time: '5 мин. на авто',
                },
                {
                    place: 'до Садового кольца',
                    time: '8 мин.',
                },
                {
                    place: 'до Москва-Сити',
                    time: '11 мин.',
                },
                {
                    place: 'до Кремля',
                    time: '16 мин.',
                },
                {
                    place: 'до МКАД',
                    time: '20 мин.',
                },
                {
                    place: 'до аэропорта Шереметьево',
                    time: '30 мин.',
                },
            ],
        },
    ];

    return (
        <motion.section className={styles.section} ref={sectionRef}>
            <div className={styles.section__map_wrapper}>
                <motion.section className={styles.section__header} ref={titleRef}>
                    <div className={styles.section__titles}>
                        <motion.div
                            style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(-400)}px)` }}
                            className={styles.section__get_text}
                        >
                            Взять
                        </motion.div>
                        <motion.div
                            className={styles.section__presnya_text}
                            style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(830)}px)` }}
                        >
                            от&nbsp;&nbsp;Пресни
                        </motion.div>
                        <motion.div
                            className={styles.section__main_text}
                            style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(-830)}px)` }}
                        >
                            Главное
                        </motion.div>
                    </div>
                    <motion.div
                        className={styles.section__button}
                        style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(-330)}px)` }}
                    >
                        <AnimatedSimpleButton
                            text='Расположение'
                            theme='dark-outline'
                            link={ROUTES.location}
                            withIcon={true}
                            iconAnimation={'right'}
                            iconPosition={'right'}
                            size={'default'}
                        >
                            <SvgIcons id='arrow right' />
                        </AnimatedSimpleButton>
                    </motion.div>
                </motion.section>
                <div className={styles.map_container}>
                    <motion.div className={styles.map} style={{ scale: mapScale }}></motion.div>
                </div>
            </div>
            <motion.section className={styles.location_wrapper} ref={locationRef}>
                <motion.div
                    className={styles.walk_container}
                    style={{ transform: isWalkInView ? 'none' : `translateY(${vwAll(330)}px)`, opacity: isWalkInView ? '1' : '0' }}
                >
                    <div className={styles.walk_container__title}>Гулять</div>
                    <ul className={styles.walk_container__points}>
                        {data[0].items.map((elem) => {
                            return (
                                <span className={styles.point_item}>
                                    {elem.place} <span className={styles.point_time}>{elem.time}</span>
                                </span>
                            );
                        })}
                    </ul>
                </motion.div>

                <motion.div
                    className={styles.scheme}
                    onTouchStart={onMouseDown}
                    onTouchMove={onMouseMove}
                    onTouchEnd={onMouseUp}
                    style={{ transform: isLocationInView ? 'none' : `translateX(${vwAll(500)}px)`, opacity: isLocationInView ? '1' : '0' }}
                >
                    <AnimatedMap />
                </motion.div>
                <motion.div
                    className={`${styles.help_button} ${showScrollableIndicator ? styles.help_button_show : styles.help_button_hide}`}
                    style={{ transform: isButtonInView ? 'translateX(-50%)' : `translateY(${vwAll(500)}px) translateX(-50%)` }}
                >
                    <SvgIcons id={'arrows'} />
                </motion.div>
                <motion.div className={styles.drive_container}>
                    <div className={styles.drive_container__title}>Ехать</div>
                    <ul className={styles.drive_container__points}>
                        {data[1].items.map((elem) => {
                            return (
                                <span className={styles.point_item}>
                                    {elem.place} <span className={styles.point_time}>{elem.time}</span>
                                </span>
                            );
                        })}
                    </ul>
                </motion.div>
            </motion.section>
        </motion.section>
    );
};

export default MobileLocationSection;
