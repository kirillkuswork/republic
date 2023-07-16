import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from './SliderSection.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar, Navigation, Mousewheel } from 'swiper';
import { usePageScroll } from './page-scroll/PageScroller';
import { Swiper as SwiperClass } from 'swiper/types';
import Header from '../../../layouts/header/Header';
import SvgIcons from '../../../svgs/SvgIcons';
import SliderModal from '../../slider-modal/SliderModal';
import apiUrls from '../../../../constants/API';
import { useAppSelector } from '../../../../hook';
import AnimatedIconButton from '../../../features/buttons/animated-icon-button/AnimatedIconButton';

SwiperCore.use([Scrollbar, Mousewheel]);

export interface SliderSection {}

const SliderSection: React.FC<SliderSection> = ({}) => {
    const width = useAppSelector((state) => state.main.width);
    const height = useAppSelector((state) => state.main.height);

    const [coverPhotos, setCoverPhotos] = useState([]);
    const [gallerySections, setGallerySections] = useState<any>([]);
    const [modalPhotos, setModalPhotos] = useState([]);
    const [modalPhotoDescr, setModalPhotoDescr] = useState([]);
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
    const [isButtonActive, setIsButtonActive] = useState(false);

    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        axios.get(apiUrls.urlGallery).then((resp) => {
            const sections = resp.data;
            let coverImages: any = [];
            sections.forEach((el: any) => coverImages.push({ path: el.absolutePath[1], title: el.title }));
            setCoverPhotos(coverImages);
            setModalPhotos(sections[0]?.absolutePath);
            setModalPhotoDescr(sections[0]?.descriptions)
            setGallerySections(sections);
        });
    }, []);

    useEffect(() => {
        if (gallerySections[activeSlideIndex]?.absolutePath.length > 0) {
            setModalPhotos(gallerySections[activeSlideIndex].absolutePath);
            setModalPhotoDescr(gallerySections[activeSlideIndex].descriptions);
        }
    }, [activeSlideIndex, gallerySections]);

    // console.log("gallerySections", gallerySections);
    const pageScroll = usePageScroll();
    const swiper = useRef<SwiperClass | null>(null);
    const swiperSecond = useRef<SwiperClass | null>(null);

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
        pageScroll.addStage(1, {
            slideIn: (forward) => {
                if (forward) {
                    handleNextSlide();
                    return 1000;
                } else {
                    handlePrevSlide();
                    return 1000;
                }
            },
            slideOut: (forward) => {
                if (forward) {
                    handleNextSlide();
                    return 1000;
                } else {
                    handlePrevSlide();
                    return 1000;
                }
            },
        });
    }, [pageScroll]);

    useEffect(() => {
        if (isOpenModal) {
            pageScroll.blockScroll(true);
        } else {
            pageScroll.blockScroll(false);
        }
    }, [isOpenModal]);

    return (
        <>
            <Header theme='light' />

            <section className={styles.sliderSection} style={{ height: `${height}px` }}>
                <div className={styles.sliderContainer}>
                    {coverPhotos.length > 0 && (
                        <Swiper
                            className={`${styles.slider} houses-slider`}
                            spaceBetween={width > 540 ? 20 : 10}
                            slidesPerView={'auto'}
                            loop={true}
                            onSwiper={(s) => {
                                swiper.current = s;
                                if (s) s.wrapperEl.style.transitionTimingFunction = 'cubic-bezier(0.6, 0, 0.4, 1)';
                            }}
                            centeredSlides={true}
                            mousewheel={false}
                            initialSlide={0}
                            simulateTouch={false}
                            allowTouchMove={false}
                        >
                            {coverPhotos.map((item: any, index) => (
                                <SwiperSlide
                                    key={index}
                                    className={index === activeSlideIndex ? `${styles.slide} ${styles.slideActive}` : styles.slide}
                                    onClick={() => {
                                        if (index === activeSlideIndex) setIsOpenModal(true);
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundImage: `url(${item.path})`,
                                        }}
                                        className={styles.slideDiv}
                                    ></div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
                <div className={styles.sliderContainer2}>
                    {coverPhotos.length > 0 && (
                        <>
                            <div className={styles.arrowDown} onClick={() => handlePrevSlide()}>
                                {/* <SvgIcons id='arrow down transparent dark' /> */}
                                <AnimatedIconButton type={'button'} variant='round' outline={true} color='dark-grey-brick' direction='down'>
                                    <SvgIcons id={'arrow down'} />
                                </AnimatedIconButton>
                            </div>
                            <div className={styles.arrowUp} onClick={() => handleNextSlide()}>
                                {/* <SvgIcons id='arrow up transparent dark' /> */}
                                <AnimatedIconButton type={'button'} variant='round' outline={true} color='dark-grey-brick' direction='up'>
                                    <SvgIcons id={'arrow up'} />
                                </AnimatedIconButton>
                            </div>
                            <Swiper
                                className={`${styles.slider2} houses-slider`}
                                spaceBetween={0}
                                slidesPerView={'auto'}
                                loop={true}
                                onSwiper={(s) => {
                                    swiperSecond.current = s;
                                    if (s) s.wrapperEl.style.transitionTimingFunction = 'cubic-bezier(0.6, 0, 0.4, 1)';
                                    // const index = s.activeIndex;
                                    // console.log("11", s);
                                    // setActiveSlideIndex(index);
                                }}
                                onSlideChange={(index) => {
                                    setActiveSlideIndex(index.realIndex);
                                }}
                                centeredSlides={true}
                                initialSlide={0}
                                simulateTouch={false}
                                allowTouchMove={false}
                            >
                                {coverPhotos.map((item: any, index) => (
                                    <SwiperSlide
                                        key={index}
                                        className={styles.slide2}
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
                                        <div className={styles.slide2Text}>
                                            {/* <div className={styles.arrowDown}><SvgIcons id="arrow down transparent dark" /></div> */}
                                            <div
                                                className={
                                                    index === activeSlideIndex
                                                        ? `${styles.slideDiv2} ${styles.slideDiv2Active}`
                                                        : styles.slideDiv2
                                                }
                                                dangerouslySetInnerHTML={{
                                                    // __html: item.title.replace(" ", "&nbsp;"),
                                                    __html: item.title,
                                                }}
                                            />
                                            {index === activeSlideIndex && (
                                                <AnimatedIconButton
                                                    type={'button'}
                                                    variant='round'
                                                    outline={false}
                                                    color={'brick'}
                                                    direction='up'
                                                    isActive={isButtonActive}
                                                    className={styles.openCircle}
                                                >
                                                    <SvgIcons id={'plus'} />
                                                </AnimatedIconButton>
                                            )}

                                            {/* <div className={styles.arrowUp}><SvgIcons id="arrow up transparent dark" /></div> */}
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </>
                    )}
                </div>

                {/* <div className={styles.coverDiv}></div> */}
            </section>

            <section>
                {modalPhotos.length > 0 && (
                    <SliderModal
                        isOpen={isOpenModal}
                        setIsOpen={setIsOpenModal}
                        arrow={modalPhotos.length > 1}
                        isLoop={modalPhotos.length > 1}
                        isKeyboardEnabled={true}
                        firstSlide={0}
                        photos={modalPhotos}
                        descriptions={modalPhotoDescr}
                    />
                )}
            </section>
        </>
    );
};

export default SliderSection;
