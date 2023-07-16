import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import styles from './ChildhoodSection.module.scss';
import parentStyles from '../../LifestyleComponent.module.scss';

import SvgIcons from '../../../../../svgs/SvgIcons';
import { motion, useInView, useMotionValueEvent, useScroll, useTransform, useSpring } from 'framer-motion';
import image from '../../../../../../public/images/lifestyle/childhood-desktop.jpg';
import getScaledSize from '../../../../../../tools/getScaledSize';
import DetailsSlider from '../../../../details-slider/DetailsSlider';
import DetailsMainContent from '../../components/DetailsMainContent/DetailsMainContent';

import axios from 'axios';
import apiUrls from '../../../../../../constants/API';
import { useAppSelector } from '../../../../../../hook';
import DetailsModal from '../../../../modal/details-modal/DetailsModal';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';

const ChildhoodSection: React.FC<{}> = ({}) => {
    const width = useAppSelector((state) => state.main.width);
    const [once, setOnce] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const sectionWrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const titleWrapperRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);

    const isInViewTitle = useInView(titleRef, { once: once });
    const isInViewTitleWrapper = useInView(titleWrapperRef, { once: once });
    const isInViewVideo = useInView(videoRef);
    // const isInViewTitle = useInView(titleRef, { once: true });
    const isInViewText = useInView(textRef, { once: once });
    const isInViewMedia = useInView(mediaRef, { once: true });
    const isInViewBtn = useInView(btnRef, { once: once });

    const [modalIsOpen, setIsOpen] = useState(false);
    const [sliderPhotos, setSliderPhotos] = useState([]);

    const matchesTablet = width <= 1023;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });

    const { scrollYProgress: scrollYProgressBack } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const smoothYProgress = useSpring(scrollYProgress, { stiffness: modalIsOpen ? 300 : 100, damping: 30, restDelta: 0.001 });
    const smoothYProgressTitle = useSpring(scrollYProgress, { stiffness: modalIsOpen ? 300 : 200, damping: 30, restDelta: 0.001 });

    const [isFixed, setIsFixed] = useState(false);

    const toRight1 = useTransform(modalIsOpen ? scrollYProgress : smoothYProgressTitle, [0.4, 0.8], [getScaledSize(-400, width), 0]);
    const toRight2 = useTransform(modalIsOpen ? scrollYProgress : smoothYProgressTitle, [0.4, 0.8], [getScaledSize(-750, width), 0]);
    const toRight1_mobile = useTransform(modalIsOpen ? scrollYProgress : smoothYProgress, [0.1, 0.5], [getScaledSize(-400, width), 0]);
    const toRight2_mobile = useTransform(modalIsOpen ? scrollYProgress : smoothYProgress, [0.1, 0.5], [getScaledSize(-750, width), 0]);
    const toRight3_mobile = useTransform(modalIsOpen ? scrollYProgress : smoothYProgress, [0.1, 0.5], [getScaledSize(-550, width), 0]);

    const backImgHeight = useTransform(scrollYProgressBack, [0.7, 1], ['100%', '70%']);
    const fade = useTransform(scrollYProgressBack, [0.7, 1], [1, 0]);

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        // console.log(latest);
        if (latest > 0) {
            setOnce(true);
        }
        if (latest >= 1 && !matchesTablet) {
            // setIsFixed(false);
        } else {
            // setIsFixed(true);
        }
    });

    const openModal = () => {
        setIsOpen(true);

        if (!matchesTablet) {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const closeModal = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    useEffect(() => {
        if (isInViewVideo) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    }, [isInViewVideo]);

    useEffect(() => {
        axios.get(apiUrls.urlSliderChildhood).then((resp) => {
            const sliderData = resp.data.absolutePath;
            setSliderPhotos(sliderData || []);
        });
    }, []);

    useEffect(() => {
        setOnce(false);
    }, [width]);

    return (
        <>
            <motion.section className={`${styles.section} ${isFixed ? styles.fixed : ''} ${styles.portrait}`} ref={sectionRef}>
                <section className={styles.sectionWrapper} ref={sectionWrapperRef}>
                    {matchesTablet ? (
                        <h2 className={styles.title} ref={titleRef}>
                            <motion.span
                                className={styles.title__highlighted}
                                style={{
                                    transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(-400, width)}px)`,
                                    transition: 'transform 0.6s ease 0.1s',
                                }}
                            >
                                Проживать
                            </motion.span>
                            <motion.span
                                className={styles.title__1}
                                style={{
                                    transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(-750, width)}px)`,
                                    transition: 'transform 0.6s ease 0.1s',
                                }}
                            >
                                детство
                            </motion.span>
                            <motion.span
                                className={styles.title__2}
                                style={{
                                    transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(-550, width)}px)`,
                                    transition: 'transform 0.6s ease 0.1s',
                                }}
                            >
                                по-новому
                            </motion.span>
                        </h2>
                    ) : (
                        <div className={styles.titleWrapper} ref={titleWrapperRef}>
                            <h2 className={styles.title}>
                                <motion.span
                                    className={styles.title__highlighted}
                                    style={
                                        isFixed
                                            ? { x: !modalIsOpen ? (!matchesTablet ? toRight1 : toRight1_mobile) : 0 }
                                            : {
                                                  transform: isInViewTitleWrapper ? 'none' : `translateX(${getScaledSize(-400, width)}px)`,
                                                  transition: 'transform 0.6s ease 0.1s',
                                              }
                                    }
                                >
                                    Проживать
                                </motion.span>
                                <motion.span
                                    className={styles.title__1}
                                    style={
                                        isFixed
                                            ? { x: !modalIsOpen ? (!matchesTablet ? toRight2 : toRight2_mobile) : 0 }
                                            : {
                                                  transform: isInViewTitleWrapper ? 'none' : `translateX(${getScaledSize(-750, width)}px)`,
                                                  transition: 'transform 0.6s ease 0.1s',
                                              }
                                    }
                                >
                                    детство
                                </motion.span>
                                <motion.span
                                    className={styles.title__2}
                                    style={
                                        isFixed
                                            ? { x: !modalIsOpen ? (!matchesTablet ? toRight1 : toRight3_mobile) : 0 }
                                            : {
                                                  transform: isInViewTitleWrapper ? 'none' : `translateX(${getScaledSize(-550, width)}px)`,
                                                  transition: 'transform 0.6s ease 0.1s',
                                              }
                                    }
                                >
                                    по-новому
                                </motion.span>
                            </h2>
                            <motion.div
                                className={styles.btnWrapper}
                                ref={btnRef}
                                style={{
                                    opacity: isInViewBtn ? 1 : 0,
                                    transition: 'opacity 0.6s ease 0.5s',
                                }}
                            >
                                <AnimatedSimpleButton text='Узнать больше' theme='dark-outline' onClick={openModal} withIcon>
                                    <SvgIcons id='arrow right' />
                                </AnimatedSimpleButton>
                            </motion.div>
                        </div>
                    )}

                    <div className={styles.textWrapper}>
                        {matchesTablet ? (
                            <motion.div
                                className={styles.btnWrapper}
                                ref={btnRef}
                                style={{
                                    opacity: isInViewBtn ? 1 : 0,
                                    transition: 'opacity 0.6s ease 0.5s',
                                }}
                            >
                                <AnimatedSimpleButton text='Узнать больше' theme='dark-outline' onClick={openModal} withIcon>
                                    <SvgIcons id='arrow right' />
                                </AnimatedSimpleButton>
                            </motion.div>
                        ) : null}

                        <motion.p
                            className={styles.text}
                            ref={textRef}
                            style={
                                matchesTablet
                                    ? {
                                          transform: isInViewText ? 'none' : `translateY(30px)`,
                                          opacity: isInViewText ? 1 : 0,
                                          transition: 'transform 0.6s ease 0.2s, opacity 0.6s ease 0.1s',
                                      }
                                    : { opacity: fade }
                            }
                        >
                            Дети Republic видят взаимосвязь времен, обучаясь в&nbsp;ультрасовременных группах в&nbsp;здании 1880&nbsp;года.
                            Постигают мир не&nbsp;по&nbsp;букварям, а&nbsp;в&nbsp;развлечениях на&nbsp;круто придуманных игровых площадках.
                            Становятся маленькими Большими Личностями с&nbsp;помощью одного из&nbsp;самых прогрессивных операторов
                            дошкольного образования в&nbsp;Москве.
                        </motion.p>
                    </div>
                    <motion.div className={styles.mediaWrapper} ref={mediaRef}>
                        <motion.div
                            className={styles.imgWrapper}
                            style={
                                matchesTablet
                                    ? {
                                          transform: isInViewMedia ? 'none' : `translateY(100px)`,
                                          opacity: isInViewMedia ? 1 : 0,
                                          transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                                      }
                                    : {}
                            }
                        >
                            <Image src={image} fill={true} alt={'специи'} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
                            {!matchesTablet && <motion.div className={styles.imgWrapper__hider} style={{ y: backImgHeight }}></motion.div>}
                        </motion.div>
                        <motion.div
                            className={styles.videoWrapper}
                            style={
                                matchesTablet
                                    ? {
                                          transform: isInViewMedia ? 'none' : `translateY(200px)`,
                                          opacity: isInViewMedia ? 1 : 0,
                                          transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                                      }
                                    : { y: 0, opacity: 1 }
                            }
                        >
                            <video muted loop playsInline ref={videoRef}>
                                <source src='/videos/lifestyle_childhood.webp' type='video/webp' />
                                <source src='/videos/lifestyle_childhood.mp4' type='video/mp4' />
                            </video>
                        </motion.div>
                    </motion.div>
                    <motion.div className={styles.plan} style={{ opacity: fade }}>
                        {matchesTablet ? <SvgIcons id='plan kindergarten mobile' /> : <SvgIcons id='plan kindergarten' />}
                    </motion.div>
                </section>
            </motion.section>
            <DetailsModal show={modalIsOpen} closeDetailsModal={() => closeModal()} title={'Детский центр'} location={'Детский сад'}>
                <DetailsMainContent image={image}>
                    Первые шаги в&nbsp;жизни&nbsp;&mdash; самые важные, но&nbsp;юные резиденты Republic точно смогут выбрать верное
                    направление. Ведь в&nbsp;жилом квартале на&nbsp;Пресне есть всё для будущего тех, от&nbsp;кого зависит будущее.
                </DetailsMainContent>
                <div className={parentStyles.columns}>
                    <div className={parentStyles.column__2}>
                        <div className={parentStyles.exterior}>
                            <p className={parentStyles.exterior__text}>
                                Детский сад расположен в&nbsp;историческом здании 1880 года&nbsp;&mdash; и&nbsp;этот контраст позволяет ещё
                                ярче почувствовать, как прошлое перетекает в&nbsp;будущее. Рядом оборудованные и&nbsp;безопасные детские
                                площадки.
                            </p>
                        </div>
                        <div className={parentStyles.interior}>
                            <p className={parentStyles.interior__text}>
                                Внутри современные интерьеры, эргономичные пространства, прогрессивные педагоги&nbsp;&mdash; чтобы учиться
                                было не&nbsp;только интересно, но&nbsp;и&nbsp;максимально комфортно. Собственная Вселенная для самых
                                маленьких, в&nbsp;которую захочется возвращаться снова и&nbsp;снова.
                            </p>
                        </div>
                    </div>
                </div>
                {sliderPhotos.length > 1 && <DetailsSlider sliderImages={sliderPhotos} sliderWrapperClass={styles.sliderWrapper} />}
            </DetailsModal>
        </>
    );
};

export default ChildhoodSection;
