import React, { useCallback, useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import styles from './LifestyleSection.module.scss';
import { cubicBezier, motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
import ROUTES from '../../../../../../constants/routes';
import SvgIcons from '../../../../../svgs/SvgIcons';
import { useAppSelector } from '../../../../../../hook';
import { IApiGallery } from '../../../../../../store/api/apiTypes';
import { disableBodyScroll, enableBodyScroll } from '../../../../../../tools/body-scroll-lock';
import Slider from '../../../../slider/Slider';
import SimpleCard from '../../../../cards/simple-card/SimpleCard';
import Image from 'next/image';
import AnimatedIconButton from '../../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import SliderModal from '../../../../slider-modal/SliderModal';

interface ILifestyleSection {
    gallery: IApiGallery[];
}
const LifestyleSection: React.FC<ILifestyleSection> = ({ gallery }) => {
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
    const sliderRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });
    const isTitleInView = useInView(titleRef, { once: true, amount: 0.6 });
    const isSliderInView = useInView(sliderRef, { once: true, amount: 0.9 });
    const smoothY = useSpring(scrollYProgress, { damping: 15, mass: 0.27, stiffness: 55 });
    const blockOpacity = useTransform(smoothY, [0.3, 0.6], [0, 1], { ease: cubicBezier(0.6, 0, 0.4, 1) });
    const blockTitleY = useTransform(smoothY, [0.3, 0.6], [200, 0], { ease: cubicBezier(0.6, 0, 0.4, 1) });
    const buttonX = useTransform(smoothY, [0.3, 0.6], [-500, 0], { ease: cubicBezier(0.6, 0, 0.4, 1) });
    useEffect(() => {
        if (isSliderInView) handleNextSlide();
        else handleStartSlide();
    }, [isSliderInView]);
    useEffect(() => {
        let coverImages: any = [];
        gallery.forEach((el: any) => coverImages.push({ path: el.absolutePath[1], title: el.title }));
        setCoverPhotos(coverImages);
        setModalPhotos(gallery[0]?.absolutePath);
        setModalPhotosDescr(gallery[0]?.descriptions);
        setGallerySections(gallery);
    }, [gallery]);
    useEffect(() => {
        if (gallerySections[activeSlideIndex]?.absolutePath.length > 0) {
            setModalPhotos(gallerySections[activeSlideIndex].absolutePath);
            setModalPhotosDescr(gallerySections[activeSlideIndex].descriptions);
        }
        if (swiper.current && swiperSecond.current) {
            swiperSecond.current.slideToLoop(activeSlideIndex, 1000);
            //swiper.current.slideToLoop(activeSlideIndex, 500);
        }
    }, [activeSlideIndex, gallerySections]);
    const handleNextSlide = () => {
        if (swiper.current && swiperSecond.current) {
            swiper.current.slideNext(1000);
            //  swiperSecond.current.slideNext(1000);
        }
    };

    const handleStartSlide = () => {
        if (swiper.current && swiperSecond.current) {
            swiper.current?.slideToLoop(0, 1000);
            //  swiperSecond.current.slideToLoop(0, 1000);
        }
    };
    const handlePrevSlide = () => {
        if (swiper.current && swiperSecond.current) {
            swiper.current.slidePrev(1000);
            //   swiperSecond.current.slidePrev(1000);
        }
    };
    return (
        <motion.section className={styles.section} ref={sectionRef}>
            <div className={styles.section__wrapper}>
                <motion.section className={styles.section__titles} ref={titleRef}>
                    <motion.div
                        className={styles.section__taste_text}
                        style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(-830)}px)` }}
                    >
                        Распробовать
                    </motion.div>
                    <motion.div
                        className={styles.section__multi_text}
                        style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(860)}px)` }}
                    >
                        многообразие
                    </motion.div>
                    <motion.div
                        className={styles.section__life_text}
                        style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(-420)}px)` }}
                    >
                        жизни
                    </motion.div>
                </motion.section>
                <div className={styles.section__video}>
                    <video playsInline autoPlay loop muted data-keepplaying>
                        <source src={'/videos/video2.webm' || '/videos/video2.mp4'} />

                        <source src={'/videos/video2.mp4'} type='video/mp4'></source>
                        <source src={'/videos/video2.webm'} type='video/webm'></source>
                    </video>
                </div>
                <div className={styles.lifestyle}>
                    <motion.div className={styles.lifestyle__button} style={{ x: buttonX, opacity: blockOpacity }}>
                        <AnimatedSimpleButton
                            text='лайфстайл'
                            theme='dark-outline'
                            link={ROUTES.lifestyle}
                            withIcon={true}
                            iconAnimation={'right'}
                            iconPosition={'right'}
                            size={'default'}
                        >
                            <SvgIcons id='arrow right' />
                        </AnimatedSimpleButton>
                    </motion.div>
                    <motion.div className={styles.lifestyle__titles} style={{ y: blockTitleY, opacity: blockOpacity }}>
                        <motion.div className={styles.lifestyle__title}>
                            Republic — это не дом и не квартал, а часть городской ткани, включающая в себя, помимо домов, историю, дух места
                            и сообщество
                        </motion.div>
                        <motion.div className={styles.lifestyle__desc}>
                            Republic удивляет контрастами и создает новый опыт жизни: здесь плавают в бассейне под сводами ремонтных
                            мастерских и покупают редкие специи в паровозном цехе, украшают стены прошлого искусством будущего и учат
                            малышей в прогрессивном детсаде.
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            <motion.section className={`${styles.gallery_slider} LifeStyleSection-gallery`} ref={sliderRef}>
                <div className={styles.arrow}>
                    <AnimatedIconButton
                        type={'button'}
                        variant={width > widthTablet ? 'square' : 'round'}
                        outline={false}
                        color={'white'}
                        direction='left'
                        onClick={handlePrevSlide}
                    >
                        <SvgIcons id={'arrow left'} />
                    </AnimatedIconButton>
                    <AnimatedIconButton
                        type={'button'}
                        variant={width > widthTablet ? 'square' : 'round'}
                        outline={false}
                        color={'white'}
                        direction='right'
                        onClick={handleNextSlide}
                    >
                        <SvgIcons id={'arrow right'} />
                    </AnimatedIconButton>
                </div>
                {coverPhotos.length > 0 && (
                    <div className={styles.imgSlider}>
                        <Slider
                            size={'content'}
                            arrow={false}
                            centerSlide={true}
                            isLoop={true}
                            onSwiper={(s) => {
                                swiper.current = s;
                                if (s) s.wrapperEl.style.transitionTimingFunction = 'cubic-bezier(0.6, 0, 0.4, 1)';
                            }}
                            onSlideChange={setActiveSlideIndex}
                            slidesPerView={2.11}
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
                    </div>
                )}
                <div className={styles.text_slider}>
                    {coverPhotos.length > 0 && (
                        <Slider
                            centerSlide={true}
                            size={'content'}
                            arrow={false}
                            isLoop={true}
                            onSwiper={(s) => {
                                swiperSecond.current = s;
                                if (s) s.wrapperEl.style.transitionTimingFunction = 'cubic-bezier(0.6, 0, 0.4, 1)';
                            }}
                            simulateTouch={false}
                            allowTouchMove={false}
                            slidesPerView={2.11}
                        >
                            {coverPhotos.map((item: any, index) => (
                                <div
                                    className={
                                        index === activeSlideIndex
                                            ? `${styles.text_slider__container} ${styles.text_slider__container__active}`
                                            : styles.text_slider__container
                                    }
                                    key={index}
                                    onClick={() => {
                                        if (index === activeSlideIndex) setIsOpenModal(true);
                                    }}
                                    onMouseEnter={() => {
                                        if (index === activeSlideIndex) setIsButtonActive(true);
                                    }}
                                    onMouseLeave={() => {
                                        if (index === activeSlideIndex) setIsButtonActive(false);
                                    }}
                                >
                                    <div className={styles.text_slider__textDiv}>
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
                                        {index === activeSlideIndex && (
                                            <div className={styles.text_slider__button}>
                                                <AnimatedIconButton
                                                    type={'button'}
                                                    variant='round'
                                                    outline={false}
                                                    color={'brick'}
                                                    direction='up'
                                                    isActive={isButtonActive}
                                                    // className={styles.text_slider__button}
                                                >
                                                    <SvgIcons id={'plus'} />
                                                </AnimatedIconButton>
                                                {!isMobile &&
                                                    <div className={styles.text_slider__button_text}>Смотреть</div>
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </Slider>
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
    );
};

export default LifestyleSection;
