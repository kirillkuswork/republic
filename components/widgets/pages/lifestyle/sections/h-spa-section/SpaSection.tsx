import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './SpaSection.module.scss';
import parentStyles from '../../LifestyleComponent.module.scss';
import SvgIcons from '../../../../../svgs/SvgIcons';
import { motion, useInView, useMotionValueEvent, useScroll, useTransform, useSpring } from 'framer-motion';
import image from '../../../../../../public/images/lifestyle/spa-desktop.jpg';
import detailImage from '../../../../../../public/images/lifestyle/detailsMain-2.jpg';
import getScaledSize from '../../../../../../tools/getScaledSize';
import DetailsSlider from '../../../../details-slider/DetailsSlider';
import DetailsMainContent from '../../components/DetailsMainContent/DetailsMainContent';

import axios from 'axios';
import apiUrls from '../../../../../../constants/API';
import { useAppSelector } from '../../../../../../hook';
import DetailsModal from '../../../../modal/details-modal/DetailsModal';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';

const SpaSection: React.FC<{}> = ({}) => {
    const width = useAppSelector((state) => state.main.width);

    const [once, setOnce] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const sectionWrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const btnRefDesktop = useRef<HTMLDivElement>(null);
    const btnRefMobile = useRef<HTMLDivElement>(null);

    const isInView = useInView(sectionRef, {
        margin: '1000px 0px 1000px 0px',
    });

    const isInViewForMedia = useInView(sectionRef, {
        margin: '0px 0px 0px 0px',
        once: once,
    });

    const isInViewForVideo = useInView(sectionRef);
    const isInViewVideo = useInView(videoWrapperRef);
    const isInViewTitle = useInView(titleRef, { once: once });
    const isInViewMedia = useInView(mediaRef, { once: true });
    const isInViewText = useInView(textRef, { once: once });
    const isInViewBtnDesktop = useInView(btnRefDesktop, { once: once });
    const isInViewBtnMobile = useInView(btnRefMobile, { once: once });

    // const [isFixed, setIsFixed] = useState(isTablet ? false : true);
    const [isFixed, setIsFixed] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [sliderPhotos, setSliderPhotos] = useState([]);

    const matchesDesktop = width >= 1024;
    const matchesTablet = width <= 1023;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });

    const { scrollYProgress: scrollYProgressStart } = useScroll({
        target: sectionRef,
        offset: ['start end', 'start start'],
    });

    const { scrollYProgress: scrollYProgressBack } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const smoothYProgress = useSpring(scrollYProgress, { stiffness: modalIsOpen ? 300 : 100, damping: 30, restDelta: 0.001 });
    const smoothYProgressTitle = useSpring(scrollYProgressStart, { stiffness: modalIsOpen ? 300 : 200, damping: 30, restDelta: 0.001 });
    const planOpacity = useTransform(modalIsOpen ? scrollYProgress : smoothYProgress, [0.2, 0.7], [0, 1]);
    const textOpacity = useTransform(modalIsOpen ? scrollYProgress : smoothYProgress, [0.2, 0.7], [0, 1]);

    const toLeft1 = useTransform(modalIsOpen ? scrollYProgress : smoothYProgressTitle, [0.4, 0.8], [getScaledSize(500, width), 0]);
    const toLeft2 = useTransform(modalIsOpen ? scrollYProgress : smoothYProgressTitle, [0.4, 0.8], [getScaledSize(850, width), 0]);

    const toRight1_mobile = useTransform(modalIsOpen ? scrollYProgress : smoothYProgress, [0.2, 0.5], [getScaledSize(-400, width), 0]);
    const toRight2_mobile = useTransform(modalIsOpen ? scrollYProgress : smoothYProgress, [0.2, 0.5], [getScaledSize(-750, width), 0]);
    const toRight3_mobile = useTransform(modalIsOpen ? scrollYProgress : smoothYProgress, [0.2, 0.5], [getScaledSize(-550, width), 0]);

    const backImgHeight = useTransform(scrollYProgressBack, [0.7, 1], ['100%', '70%']);
    const fade = useTransform(scrollYProgressBack, [0.7, 1], [1, 0]);

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

    useMotionValueEvent(scrollYProgressStart, 'change', (latest) => {
        // console.log(latest);
        if (latest > 0) {
            setOnce(true);
        }
        if (latest >= 1) {
            // setIsFixed(false);
        } else {
            // setIsFixed(true);
        }
    });

    useEffect(() => {
        if (isInViewVideo) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    }, [isInViewVideo]);

    useEffect(() => {
        axios.get(apiUrls.urlSliderSpa).then((resp) => {
            const sliderData = resp.data.absolutePath;
            setSliderPhotos(sliderData || []);
        });
    }, []);

    useEffect(() => {
        setOnce(false);
    }, [width]);

    const mainContent = (
        <motion.div className={styles.sectionWrapper} ref={sectionWrapperRef}>
            <motion.div
                className={styles.mediaWrapper}
                ref={mediaRef}
                style={{
                    transform: isInViewForMedia ? 'none' : `translateY(${getScaledSize(100, width)}px)`,
                    opacity: isInViewForMedia ? 1 : 0,
                    transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                }}
            >
                <motion.div
                    className={styles.videoWrapper}
                    style={{
                        transform: isInViewForMedia ? 'none' : matchesTablet ? 'none' : `translateY(${getScaledSize(200, width)}px)`,
                        opacity: isInViewForMedia ? 1 : 0,
                        transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                    }}
                    ref={videoWrapperRef}
                >
                    <video muted loop playsInline ref={videoRef}>
                        <source src='/videos/lifestyle_spa.webp' type='video/webp' />
                        <source src='/videos/lifestyle_spa.mp4' type='video/mp4' />
                    </video>
                </motion.div>
                {matchesDesktop && (
                    <motion.p className={styles.text} style={{ opacity: !modalIsOpen ? textOpacity : 1 }}>
                        Жители Republic плавают под сводами Александровских железнодорожных мастерских, построенных в конце XIX-начале XX в.
                        В большом водно-термальном комплексе – бассейны для детей и взрослых, все популярные виды бань – от финской сауны до
                        хаммама, флоатинг и регулярные спортивные праздники.
                    </motion.p>
                )}
                <motion.div
                    className={styles.imgWrapper}
                    style={
                        matchesTablet
                            ? {
                                  transform: isInViewForMedia ? 'none' : `translateY(100px)`,
                                  opacity: isInViewForMedia ? 1 : 0,
                                  transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                              }
                            : { y: 0, opacity: 1 }
                    }
                >
                    <Image src={image} fill={true} alt={'специи'} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
                    {!matchesTablet && <motion.div className={styles.imgWrapper__hider} layout style={{ y: backImgHeight }}></motion.div>}
                </motion.div>
            </motion.div>
            <div className={styles.colRightTop}>
                {!matchesTablet ? (
                    <h2 className={styles.title} ref={titleRef}>
                        <motion.span
                            className={styles.title__highlighted}
                            style={
                                isFixed
                                    ? { x: !modalIsOpen ? (!matchesTablet ? toLeft1 : toRight1_mobile) : 0 }
                                    : {
                                          transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(500, width)}px)`,
                                          transition: 'transform 0.6s ease 0.1s',
                                      }
                            }
                        >
                            Плавать
                        </motion.span>
                        <motion.span
                            className={styles.title__1}
                            style={
                                isFixed
                                    ? { x: !modalIsOpen ? (!matchesTablet ? toLeft2 : toRight2_mobile) : 0 }
                                    : {
                                          transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(850, width)}px)`,
                                          transition: 'transform 0.6s ease 0.1s',
                                      }
                            }
                        >
                            в аутентичной
                        </motion.span>
                        <motion.span
                            className={styles.title__2}
                            style={
                                isFixed
                                    ? { x: !modalIsOpen ? (!matchesTablet ? toLeft1 : toRight3_mobile) : 0 }
                                    : {
                                          transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(500, width)}px)`,
                                          transition: 'transform 0.6s ease 0.1s',
                                      }
                            }
                        >
                            атмосфере
                        </motion.span>
                    </h2>
                ) : (
                    <h2 className={styles.title} ref={titleRef}>
                        <motion.span
                            className={styles.title__highlighted}
                            style={{
                                transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(!matchesTablet ? 500 : -450, width)}px)`,
                                transition: 'transform 0.6s ease 0.1s',
                            }}
                        >
                            Плавать
                        </motion.span>
                        <motion.span
                            className={styles.title__1}
                            style={{
                                transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(!matchesTablet ? 850 : -750, width)}px)`,
                                transition: 'transform 0.6s ease 0.1s',
                            }}
                        >
                            в аутентичной
                        </motion.span>
                        <motion.span
                            className={styles.title__2}
                            style={{
                                transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(!matchesTablet ? 500 : -550, width)}px)`,
                                transition: 'transform 0.6s ease 0.1s',
                            }}
                        >
                            атмосфере
                        </motion.span>
                    </h2>
                )}
                {matchesDesktop && (
                    <motion.div
                        className={styles.btnWrapper}
                        ref={btnRefDesktop}
                        style={{
                            opacity: isInViewBtnDesktop ? 1 : 0,
                            transition: 'opacity 0.6s ease 0.1s',
                        }}
                    >
                        <AnimatedSimpleButton text='Узнать больше' theme='light-outline' onClick={openModal} withIcon>
                            <SvgIcons id='arrow right' />
                        </AnimatedSimpleButton>
                    </motion.div>
                )}
            </div>
            <div className={styles.bottomElements}>
                {matchesTablet && (
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
                                : { opacity: !modalIsOpen ? textOpacity : 1 }
                        }
                    >
                        Жители Republic плавают под сводами Александровских железнодорожных мастерских, построенных в&nbsp;конце XIX-начале
                        XX&nbsp;в. В&nbsp;большом водно-термальном комплексе&nbsp;&mdash; бассейны для детей и&nbsp;взрослых, все популярные
                        виды бань&nbsp;&mdash; от&nbsp;финской сауны до хаммама, флоатинг и&nbsp;регулярные спортивные праздники.
                    </motion.p>
                )}
                {matchesTablet && (
                    <motion.div
                        className={styles.btnWrapper}
                        ref={btnRefMobile}
                        style={{
                            opacity: isInViewBtnMobile ? 1 : 0,
                            transition: 'opacity 0.6s ease 0.1s',
                        }}
                    >
                        <AnimatedSimpleButton text='Узнать больше' theme='light-outline' onClick={openModal} withIcon>
                            <SvgIcons id='arrow right' />
                        </AnimatedSimpleButton>
                    </motion.div>
                )}
                <motion.div className={styles.company} style={matchesTablet ? {} : { opacity: fade }}>
                    <div className={styles.company__icon}>
                        <SvgIcons id='encore logo' />
                    </div>
                    <p className={styles.company__text}>
                        За&nbsp;концепцию и&nbsp;наполнение нового пространства отвечает сеть фитнес-клубов премиум класса
                        Encore&nbsp;Fitness.
                    </p>
                </motion.div>

                <motion.div className={styles.plan} style={matchesTablet ? { opacity: planOpacity } : { opacity: fade }}>
                    {!matchesTablet && <SvgIcons id='plan workshop' />}
                    {matchesTablet && <SvgIcons id='plan workshop mobile' />}
                </motion.div>
            </div>
        </motion.div>
    );

    return (
        <>
            <motion.section className={`${styles.section} ${isFixed ? styles.fixed : ''} ${styles.portrait}`} ref={sectionRef}>
                <>{mainContent}</>
            </motion.section>
            <DetailsModal
                show={modalIsOpen}
                closeDetailsModal={() => closeModal()}
                title={'Термальный компекс'}
                location={'Спортивно-термальный компекс'}
            >
                <DetailsMainContent image={detailImage}>
                    Квартал Republic открывает новые грани релакса. Только здесь можно поплавать в&nbsp;современном бассейне под сводами
                    Александровских железнодорожных мастерских, построенных в&nbsp;конце XIX&nbsp;века, выбрать сауну по&nbsp;вкусу
                    и&nbsp;по-настоящему перезагрузиться.
                </DetailsMainContent>
                <div className={parentStyles.columns}>
                    <div className={parentStyles.column__1}>
                        <div className={parentStyles.fitness}>
                            <p className={parentStyles.fitness__text}>
                                За&nbsp;концепцию и&nbsp;наполнение нового пространства отвечает сеть фитнес-клубов премиум класса
                                Encore&nbsp;Fitness.
                            </p>
                            <div className={parentStyles.fitness__icon}>
                                <SvgIcons id='encore logo dark' />
                            </div>
                        </div>
                    </div>
                    <div className={parentStyles.column__2}>
                        <div className={parentStyles.exterior}>
                            <p className={parentStyles.exterior__text}>
                                Стены здесь такие же, как и сто лет назад – красный кирпич, витражные окна, и кажется, что вот-вот застучат
                                механизмы. Но вместо машин – 25-метровый бассейн, все популярные виды бань, флоатинг и современный спортзал,
                                концепция которого разработана сетью премиальных фитнес-пространств Encore Fitness.
                            </p>
                        </div>
                        <div className={parentStyles.interior}>
                            <p className={parentStyles.interior__text}>
                                Восстановленные части исторического интерьера дополнены мягкой эстетикой и&nbsp;обтекаемыми очертаниями
                                внутренних объектов. Природные материалы светлых оттенков контрастируют с&nbsp;деталями, подчёркивающими
                                индустриальное прошлое здания.
                            </p>
                        </div>
                    </div>
                </div>
                {sliderPhotos.length > 1 && <DetailsSlider sliderImages={sliderPhotos} sliderWrapperClass={styles.sliderWrapper} />}
            </DetailsModal>
        </>
    );
};

export default SpaSection;
