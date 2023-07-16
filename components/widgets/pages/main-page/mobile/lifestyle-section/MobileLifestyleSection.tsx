import React, { useEffect, useRef, useState } from 'react';
import styles from './MobileLifestyleSection.module.scss';
import {
    AnimationProps,
    cubicBezier,
    motion,
    useAnimationControls,
    useInView,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from 'framer-motion';

import SimpleButton from '../../../../../features/buttons/simple-button/SimpleButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import ROUTES from '../../../../../../constants/routes';
import Slider from '../../../../slider/Slider';
import { Slide } from 'transitions-kit';
import { isMobileOnly } from 'react-device-detect';
import SimpleCard from '../../../../cards/simple-card/SimpleCard';
import { Swiper as SwiperClass } from 'swiper/types';
import Image from 'next/image';
import AnimatedIconButton from '../../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import SliderModal from '../../../../slider-modal/SliderModal';
import { useAppSelector } from '../../../../../../hook';
import { IApiGallery } from '../../../../../../store/api/apiTypes';
import { disableBodyScroll, enableBodyScroll } from '../../../../../../tools/body-scroll-lock';
interface ILifestyleSection {
    gallery: IApiGallery[];
}
const MobileLifestyleSection: React.FC<ILifestyleSection> = ({ gallery }) => {
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
    const width = useAppSelector((state) => state.main.width);
    const height = useAppSelector((state) => state.main.height);
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const [coverPhotos, setCoverPhotos] = useState([]);
    const [gallerySections, setGallerySections] = useState<IApiGallery[]>([]);
    const [modalPhotos, setModalPhotos] = useState<string[]>([]);
    const [modalPhotosDescr, setModalPhotosDescr] = useState([]);
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const swiper = useRef<SwiperClass | null>(null);
    const swiperSecond = useRef<SwiperClass | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLElement | null>(null);
    const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 });
    const isDescInView = useInView(titleRef, { once: true, amount: 0.6 });
    const isLifeTitleInView = useInView(titleRef, { once: true, amount: 0.65 });

    useEffect(() => {
        let coverImages: any = [];
        gallery.forEach((el: any) => coverImages.push({ path: el.absolutePath[1], title: el.title }));
        setCoverPhotos(coverImages);
        setModalPhotos(gallery[0]?.absolutePath);
        setModalPhotosDescr(gallery[0]?.descriptions)
        setGallerySections(gallery);
        console.log('gallery', gallery)
    }, [gallery]);

    useEffect(() => {
        if (gallerySections[activeSlideIndex]?.absolutePath.length > 0) {
          setModalPhotos(gallerySections[activeSlideIndex].absolutePath)
          setModalPhotosDescr(gallerySections[activeSlideIndex].descriptions)
        };
        if (swiper.current && swiperSecond.current) {
            if (swiperSecond.current?.realIndex !== activeSlideIndex) swiperSecond.current.slideToLoop(activeSlideIndex, 1);
        }
    }, [activeSlideIndex, gallerySections]);

    const handleNextSlide = () => {
        if (swiper.current && swiperSecond.current) {
            swiper.current.slideNext(1000);
            swiperSecond.current.slideNext(1000);
        }
    };

    const handlePrevSlide = () => {
        if (swiper.current && swiperSecond.current) {
            swiper.current.slidePrev(1000);
            swiperSecond.current.slidePrev(1000);
        }
    };

    useEffect(() => {
        if (isOpenModal) {
            window.scrollTo(0, window.scrollY - 1);
            disableBodyScroll();
        } else {
            enableBodyScroll();
        }
    }, [isOpenModal]);

    return (
        <>
            <motion.section id='lifestyle_wrapper' className={styles.wrapper} ref={sectionRef}>
                <motion.section className={styles.top_content_wrapper} ref={titleRef}>
                    <motion.div
                        className={styles.top_content_wrapper__taste_text}
                        style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(-340)}px)` }}
                    >
                        распробовать
                    </motion.div>
                    <motion.div
                        className={styles.top_content_wrapper__multi_text}
                        style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(340)}px)` }}
                    >
                        многообразие
                    </motion.div>
                    <motion.div
                        className={styles.top_content_wrapper__life_text}
                        style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(-180)}px)` }}
                    >
                        жизни
                    </motion.div>
                    <div className={styles.top_content_wrapper__video_party}>
                        <video playsInline autoPlay loop muted data-keepplaying>
                            <source src={'/videos/video2.webm' || '/videos/video2.mp4'} />

                            <source src={'/videos/video2.mp4'} type='video/mp4'></source>
                            <source src={'/videos/video2.webm'} type='video/webm'></source>
                        </video>
                    </div>

                    <motion.div
                        className={styles.top_content_wrapper__desc}
                        style={{ transform: isDescInView ? 'none' : `translateY(${vwAll(180)}px)`, opacity: isDescInView ? '1' : '0' }}
                    >
                        Republic удивляет контрастами и создает новый опыт жизни: здесь плавают в бассейне под сводами ремонтных мастерских
                        и покупают редкие специи в паровозном цехе, украшают стены прошлого искусством будущего и учат малышей в
                        прогрессивном детсаде.
                    </motion.div>
                    <div
                        className={styles.top_content_wrapper__button}
                        style={{ transform: isDescInView ? 'none' : `translateX(${vwAll(-200)}px)`, opacity: isDescInView ? '1' : '0' }}
                    >
                        <SimpleButton
                            text='лайфстайл'
                            type='Link'
                            link={ROUTES.lifestyle}
                            outline={true}
                            color={'dark-grey'}
                            size={'medium'}
                            children={<SvgIcons id={'arrow next dark small'} />}
                        />
                    </div>
                    <motion.div
                        className={styles.top_content_wrapper__title}
                        style={{
                            transform: isLifeTitleInView ? 'none' : `translateY(${vwAll(100)}px)`,
                            opacity: isLifeTitleInView ? '1' : '0',
                        }}
                    >
                        Republic — это не дом и не квартал, а часть городской ткани, включающая в себя, помимо домов, историю, дух места и
                        сообщество
                    </motion.div>
                </motion.section>
                <motion.section className={styles.gallery_slider}>
                    {coverPhotos.length > 0 && (
                        <Slider
                            size={'content'}
                            arrow={false}
                            centerSlide={true}
                            isLoop={true}
                            firstSlide={0}
                            onSwiper={(s) => {
                                swiper.current = s;
                                if (s) s.wrapperEl.style.transitionTimingFunction = 'cubic-bezier(0.6, 0, 0.4, 1)';
                                swiper.current.on('slideNextTransitionStart', function () {
                                    if (swiper.current && swiperSecond.current) {
                                        swiperSecond.current.slideNext(1000);
                                        // else if (swiper.current.swipeDirection == 'prev') swiperSecond.current.slidePrev(1000);
                                        // else swiperSecond.current.slideToLoop(activeSlideIndex, 1000);
                                    }
                                });
                                swiper.current.on('slidePrevTransitionStart', function () {
                                    if (swiper.current && swiperSecond.current) {
                                        swiperSecond.current.slidePrev(1000);
                                        // else if (swiper.current.swipeDirection == 'prev') swiperSecond.current.slidePrev(1000);
                                        // else swiperSecond.current.slideToLoop(activeSlideIndex, 1000);
                                    }
                                });
                            }}
                            onSlideChange={setActiveSlideIndex}
                        >
                            {coverPhotos.map((item: any, index) => (
                                <SimpleCard
                                    theme='light'
                                    key={index}
                                    className={
                                        index === activeSlideIndex
                                            ? `${styles.gallery_slider__card} ${styles.gallery_slider__card__active}`
                                            : styles.gallery_slider__card
                                    }
                                    onClick={() => {
                                        if (index === activeSlideIndex) setIsOpenModal(true);
                                    }}
                                >
                                    <Image
                                        src={item.path}
                                        className={styles.gallery_slider__card__bg}
                                        fill
                                        alt={'slider' + index}
                                        sizes='100%'
                                        unoptimized={true}
                                    />
                                </SimpleCard>
                            ))}
                        </Slider>
                    )}
                    <div className={styles.text_slider}>
                        {coverPhotos.length > 0 && (
                            <>
                                <div className={styles.arrowDown} onClick={() => handlePrevSlide()}>
                                    {/* <SvgIcons id='arrow down transparent dark' /> */}
                                    <AnimatedIconButton
                                        type={'button'}
                                        variant='round'
                                        outline={true}
                                        color='dark-grey-brick'
                                        direction='down'
                                    >
                                        <SvgIcons id={'arrow down'} />
                                    </AnimatedIconButton>
                                </div>
                                <div className={styles.arrowUp} onClick={() => handleNextSlide()}>
                                    {/* <SvgIcons id='arrow up transparent dark' /> */}
                                    <AnimatedIconButton
                                        type={'button'}
                                        variant='round'
                                        outline={true}
                                        color='dark-grey-brick'
                                        direction='up'
                                    >
                                        <SvgIcons id={'arrow up'} />
                                    </AnimatedIconButton>
                                </div>
                                <Slider
                                    centerSlide={true}
                                    size={'default'}
                                    arrow={false}
                                    isLoop={true}
                                    firstSlide={0}
                                    onSwiper={(s) => {
                                        swiperSecond.current = s;
                                        if (s) s.wrapperEl.style.transitionTimingFunction = 'cubic-bezier(0.6, 0, 0.4, 1)';
                                    }}
                                    simulateTouch={false}
                                    allowTouchMove={false}
                                >
                                    {coverPhotos.map((item: any, index) => (
                                        <div
                                            className={styles.text_slider__container}
                                            key={index}
                                            onClick={() => {
                                                if (index === activeSlideIndex) setIsOpenModal(true);
                                            }}
                                            onMouseEnter={() => {
                                                setIsButtonActive(true);
                                            }}
                                            onMouseLeave={() => {
                                                setIsButtonActive(false);
                                            }}
                                        >
                                            <div
                                                className={
                                                    index === activeSlideIndex
                                                        ? `${styles.text_slider__text} ${styles.text_slider__text__active}`
                                                        : styles.text_slider__text
                                                }
                                                dangerouslySetInnerHTML={{
                                                    __html: item.title,
                                                }}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </>
                        )}
                    </div>
                </motion.section>
                {modalPhotos.length > 0 && (
                    <SliderModal
                        isOpen={isOpenModal}
                        setIsOpen={setIsOpenModal}
                        arrow={modalPhotos.length > 1}
                        isLoop={modalPhotos.length > 1}
                        isKeyboardEnabled={true}
                        firstSlide={0}
                        photos={modalPhotos}
                        descriptions={modalPhotosDescr}
                    />
                )}
            </motion.section>
        </>
    );
};

export default MobileLifestyleSection;
