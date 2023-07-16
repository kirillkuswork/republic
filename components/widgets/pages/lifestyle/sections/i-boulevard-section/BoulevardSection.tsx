import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './BoulevardSection.module.scss';
import parentStyles from '../../LifestyleComponent.module.scss';

import SvgIcons from '../../../../../svgs/SvgIcons';
import { motion, useInView, useMotionValueEvent, useScroll, useTransform, useSpring } from 'framer-motion';
import image from '../../../../../../public/images/lifestyle/boulevard-desktop.jpg';
import imageVideo from '../../../../../../public/images/lifestyle/boulevard-video.jpg';
import getScaledSize from '../../../../../../tools/getScaledSize';
import { IHeader } from '../../../../../layouts/header/Header';
import DetailsMainContent from '../../components/DetailsMainContent/DetailsMainContent';
import DetailsSlider from '../../../../details-slider/DetailsSlider';

import axios from 'axios';
import apiUrls from '../../../../../../constants/API';
import { useAppSelector } from '../../../../../../hook';
import DetailsModal from '../../../../modal/details-modal/DetailsModal';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';

interface IBoulevardProps {
    onTopSection?: () => void;
    onChangeTheme?: (theme: IHeader['theme']) => void;
}

const BoulevardSection: React.FC<IBoulevardProps> = ({ onChangeTheme, onTopSection }) => {
    const width = useAppSelector((state) => state.main.width);

    const [once, setOnce] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const videoRefDesktop = useRef<HTMLVideoElement>(null);
    const videoRefMobile = useRef<HTMLVideoElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [changeView, setChangeView] = useState(false);

    const [sliderPhotos, setSliderPhotos] = useState([]);

    const isInView = useInView(sectionRef, { once: once });
    const isInViewVideoWrapper = useInView(videoWrapperRef, { once: true });
    const isInViewTitle = useInView(sectionRef, { once: true });
    const isInViewBtn = useInView(btnRef, { once: once });
    const isInViewImage = useInView(imageRef, { once: true });
    const isInViewMedia = useInView(mediaRef, { once: true });
    const isInViewText = useInView(textRef, { once: once });

    const matchesDesktop = width >= 1024;
    const matchesTablet = width <= 1023;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });

    const smoothYProgress = useSpring(scrollYProgress, { stiffness: modalIsOpen ? 300 : 100, damping: 30, restDelta: 0.001 });
    const { scrollYProgress: scrollYProgressBack } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const [isFixed, setIsFixed] = useState(false);
    const opacity_mobile = useTransform(smoothYProgress, [0, 0.5], [0, 1]);
    const planOpacity = useTransform(smoothYProgress, [0.6, 1], [0, 1]);

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

    useEffect(() => {
        if (isInView) {
            videoRefDesktop.current?.play();
            videoRefMobile.current?.play();
        } else {
            videoRefDesktop.current?.pause();
            videoRefMobile.current?.pause();
        }

        setOnce(true);
    }, [isInView]);

    useEffect(() => {
        axios.get(apiUrls.urlSliderWalk).then((resp) => {
            const sliderData = resp.data.absolutePath;
            setSliderPhotos(sliderData || []);
        });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            videoRefDesktop.current?.play();
            videoRefMobile.current?.play();
        }, 200);
        setOnce(false);
    }, [width]);

    const desktopLayout = (
        <>
            <div className={styles.col}>
                <h2 className={styles.title} ref={titleRef}>
                    <motion.span
                        className={styles.title__highlighted}
                        style={{
                            transform: isInView ? 'none' : `translateX(${getScaledSize(-400, width)}px)`,
                            transition: 'transform 0.6s ease 0.1s',
                        }}
                    >
                        Выбрать
                    </motion.span>
                    <motion.span
                        className={styles.title__1}
                        style={{
                            transform: isInView ? 'none' : `translateX(${getScaledSize(-750, width)}px)`,
                            transition: 'transform 0.6s ease 0.1s',
                        }}
                    >
                        прогулку
                    </motion.span>
                    <motion.span
                        className={styles.title__2}
                        style={{
                            transform: isInView ? 'none' : `translateX(${getScaledSize(-400, width)}px)`,
                            transition: 'transform 0.6s ease 0.1s',
                        }}
                    >
                        по вкусу
                    </motion.span>
                </h2>
                <motion.div
                    className={styles.btnWrapper}
                    ref={btnRef}
                    style={{
                        opacity: isInView ? 1 : 0,
                        transition: 'opacity 0.6s ease 0.5s',
                    }}
                >
                    <AnimatedSimpleButton text='Узнать больше' theme='dark-outline' onClick={openModal} withIcon>
                        <SvgIcons id='arrow right' />
                    </AnimatedSimpleButton>
                </motion.div>
                <motion.div
                    className={styles.imgWrapper}
                    ref={imageRef}
                    style={{
                        opacity: isInView ? 1 : 0,
                        transition: 'opacity 0.6s ease 0.1s',
                    }}
                >
                    <Image src={imageVideo} fill={true} alt={'специи'} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
                    {!matchesTablet && <motion.div className={styles.imgWrapper__hider} style={{ y: backImgHeight }}></motion.div>}
                </motion.div>
            </div>
            <div className={styles.col}>
                <motion.div
                    className={styles.videoWrapper}
                    ref={videoWrapperRef}
                    style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? 'none' : `translateY(${getScaledSize(300, width)}px)`,
                        transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                    }}
                >
                    <video muted loop playsInline ref={videoRefDesktop}>
                        <source src='/videos/lifestyle_walk.webp' type='video/webp' />
                        <source src='/videos/lifestyle_walk.mp4' type='video/mp4' />
                    </video>
                    {!matchesTablet && <motion.div className={styles.videoWrapper__hider} style={{ y: backImgHeight }}></motion.div>}
                </motion.div>
            </div>
            <div className={styles.col}>
                <motion.p
                    className={styles.text}
                    style={{
                        opacity: isInView ? 1 : 0,
                        transition: 'opacity 0.6s ease 0.1s',
                    }}
                >
                    Верхний бульвар проложен по&nbsp;историческому Камер-Коллежскому валу и&nbsp;ведет к&nbsp;гастрономическому центру:
                    здесь встречаются с друзьями и&nbsp;устраивают бар-хоппинг до&nbsp;утра. Атмосфера нижнего бульвара более камерная: тут
                    хорошо гулять вдвоем или будить себя чашкой утреннего кофе во&nbsp;французском кафе. У&nbsp;жителей Republic свой вайб:
                    кроме бульваров в&nbsp;общественной части квартала у&nbsp;них есть уютные улочки и&nbsp;дворы, закрытые для посторонних.
                </motion.p>
                <motion.div className={styles.plan} style={{ opacity: fade }}>
                    <SvgIcons id='plan boulevard' />
                </motion.div>
            </div>
        </>
    );

    const mobileLayout = (
        <div className={styles.sectionWrapper}>
            <h2 className={styles.title} ref={titleRef}>
                <motion.span
                    className={styles.title__highlighted}
                    style={{
                        transform: isInView ? 'none' : `translateX(${400}px)`,
                        transition: 'transform 0.6s ease 0.1s',
                    }}
                >
                    Выбрать
                </motion.span>
                <motion.span
                    className={styles.title__1}
                    style={{
                        transform: isInView ? 'none' : `translateX(${750}px)`,
                        transition: 'transform 0.6s ease 0.1s',
                    }}
                >
                    прогулку
                </motion.span>
                <motion.span
                    className={styles.title__2}
                    style={{
                        transform: isInView ? 'none' : `translateX(${400}px)`,
                        transition: 'transform 0.6s ease 0.1s',
                    }}
                >
                    по вкусу
                </motion.span>
            </h2>
            <motion.div className={styles.mediaWrapper} ref={mediaRef} style={{ y: 0 }}>
                <motion.div
                    className={styles.videoWrapper}
                    style={
                        matchesTablet
                            ? {
                                  transform: isInView ? 'none' : `translateY(${getScaledSize(100, width)}px)`,
                                  opacity: isInView ? 1 : 0,
                                  transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                              }
                            : { y: 0, opacity: opacity_mobile }
                    }
                >
                    <video muted loop playsInline ref={videoRefMobile}>
                        <source src='/videos/lifestyle_walk.webp' type='video/webp' />
                        <source src='/videos/lifestyle_walk.mp4' type='video/mp4' />
                    </video>
                </motion.div>
                <motion.div
                    className={styles.imgWrapper}
                    style={{
                        transform: isInView ? 'none' : `translateY(${getScaledSize(200, width)}px)`,
                        opacity: isInView ? 1 : 0,
                        transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                    }}
                >
                    <Image src={imageVideo} fill={true} alt={'специи'} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
                </motion.div>
            </motion.div>
            <motion.p
                className={styles.text}
                ref={textRef}
                style={{
                    transform: isInViewText ? 'none' : `translateY(30px)`,
                    opacity: isInViewText ? 1 : 0,
                    transition: 'transform 0.6s ease 0.2s, opacity 0.6s ease 0.1s',
                }}
            >
                Верхний бульвар проложен по&nbsp;историческому Камер-Коллежскому валу и&nbsp;ведет к&nbsp;гастрономическому центру: здесь
                встречаются с друзьями и&nbsp;устраивают бар-хоппинг до&nbsp;утра. Атмосфера нижнего бульвара более камерная: тут хорошо
                гулять вдвоем или будить себя чашкой утреннего кофе во&nbsp;французском кафе. У&nbsp;жителей Republic свой вайб: кроме
                бульваров в&nbsp;общественной части квартала у&nbsp;них есть уютные улочки и&nbsp;дворы, закрытые для посторонних.
            </motion.p>
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
            <motion.div className={styles.plan} style={{ opacity: planOpacity }}>
                {!matchesTablet && <SvgIcons id='plan boulevard' />}
                {matchesTablet && <SvgIcons id='plan boulevard mobile' />}
            </motion.div>
        </div>
    );

    return (
        <>
            <motion.section className={`${styles.section} ${isFixed ? styles.fixed : ''} ${styles.portrait}`} ref={sectionRef}>
                {matchesDesktop ? desktopLayout : ''}
                {matchesTablet ? mobileLayout : ''}
            </motion.section>
            <DetailsModal show={modalIsOpen} closeDetailsModal={() => closeModal()} title={'Уединенный парк'} location={'Бульвар'}>
                <DetailsMainContent image={image}>
                    Любоваться дореволюционными зданиями, удивляться современным технологиям, чувствовать дух любимого города, практически
                    не&nbsp;отходя от&nbsp;дома&nbsp;&mdash; мечта, которая стала реальностью. Прогулки в&nbsp;Republic&nbsp;&mdash; это
                    коктейль из&nbsp;удовольствия, открытий и&nbsp;переосмысления.
                </DetailsMainContent>
                <div className={parentStyles.columns}>
                    <div className={parentStyles.column__2}>
                        <div className={parentStyles.exterior}>
                            <p className={parentStyles.exterior__text}>
                                Идеальный выходной здесь начинается в&nbsp;водно-термальном комплексе, дальше&nbsp;&mdash; прогулка
                                по&nbsp;Низкому бульвару, где можно провести драгоценное время наедине с&nbsp;собой, оттуда&nbsp;&mdash;
                                на&nbsp;Высокий бульвар, чтобы встретиться с&nbsp;друзьями и&nbsp;вместе посетить бар
                                в&nbsp;гастрономическом центре.
                            </p>
                        </div>
                        <div className={parentStyles.interior}>
                            <p className={parentStyles.interior__text}>
                                А&nbsp;можно пройтись по&nbsp;магазинам, которые находятся в&nbsp;шопинг-аллее&nbsp;&mdash; и&nbsp;вернуться
                                домой с&nbsp;новыми аутфитами, эмоциями и&nbsp;впечатлениями.
                            </p>
                        </div>
                    </div>
                </div>
                {sliderPhotos.length > 1 && <DetailsSlider sliderImages={sliderPhotos} sliderWrapperClass={styles.sliderWrapper} />}
            </DetailsModal>
        </>
    );
};

export default BoulevardSection;
