import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './SocietySection.module.scss';
import parentStyles from '../../LifestyleComponent.module.scss';

import SvgIcons from '../../../../../svgs/SvgIcons';
import { motion, useInView } from 'framer-motion';
import image from '../../../../../../public/images/lifestyle/society-desktop.jpg';
import DetailsSlider from '../../../../details-slider/DetailsSlider';
import DetailsMainContent from '../../components/DetailsMainContent/DetailsMainContent';
import getScaledSize from '../../../../../../tools/getScaledSize';

import axios from 'axios';
import apiUrls from '../../../../../../constants/API';
import { useAppSelector } from '../../../../../../hook';
import DetailsModal from '../../../../modal/details-modal/DetailsModal';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';

const SocietySection: React.FC<{}> = ({}) => {
    const width = useAppSelector((state) => state.main.width);

    const sectionRef = useRef<HTMLElement>(null);
    const sectionWrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    const isInViewVideo = useInView(videoRef);
    const isInViewTitle = useInView(sectionRef, { once: true });
    const isInViewBtn = useInView(btnRef, { once: true });
    const isInViewMedia = useInView(mediaRef, { once: true });
    const isInViewText = useInView(textRef, { once: true });

    const matchesDesktop = width >= 1024;
    const matchesTablet = width <= 1023;

    const [modalIsOpen, setIsOpen] = useState(false);
    const [sliderPhotos, setSliderPhotos] = useState([]);

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
        axios.get(apiUrls.urlSliderSociety).then((resp) => {
            const sliderData = resp.data.absolutePath;
            setSliderPhotos(sliderData || []);
        });
    }, []);

    return (
        <>
            <motion.section className={`${styles.section} ${styles.portrait}`} ref={sectionRef}>
                <motion.div className={styles.sectionWrapper} ref={sectionWrapperRef}>
                    {matchesTablet && (
                        <h2 className={styles.title} ref={titleRef}>
                            <motion.span
                                className={styles.title__highlighted}
                                style={{
                                    transform: isInViewTitle
                                        ? 'none'
                                        : `translateX(${getScaledSize(!matchesTablet ? 1000 : 450, width)}px)`,
                                    transition: 'transform 0.6s ease 0.1s',
                                }}
                            >
                                Наслаждаться
                            </motion.span>
                            <motion.span
                                className={styles.title__1}
                                style={{
                                    transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(500, width)}px)`,
                                    transition: 'transform 0.6s ease 0.1s',
                                }}
                            >
                                обществом
                            </motion.span>
                            <motion.span
                                className={styles.title__2}
                                style={{
                                    transform: isInViewTitle
                                        ? 'none'
                                        : `translateX(${getScaledSize(!matchesTablet ? 1000 : 600, width)}px)`,
                                    transition: 'transform 0.6s ease 0.1s',
                                }}
                            >
                                своих людей
                            </motion.span>
                        </h2>
                    )}
                    <div className={styles.mediaWrapper} ref={mediaRef}>
                        <motion.div
                            className={styles.imgWrapper}
                            style={
                                matchesTablet
                                    ? {
                                          transform: isInViewMedia ? 'none' : `translateY(100px)`,
                                          opacity: isInViewMedia ? 1 : 0,
                                          transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                                      }
                                    : {
                                          opacity: isInViewMedia ? 1 : 0,
                                          transition: 'opacity 0.6s ease 0.1s',
                                      }
                            }
                        >
                            <Image src={image} fill={true} alt={'специи'} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
                            {!matchesTablet && (
                                <motion.div
                                    className={styles.imgWrapper__hiderRight}
                                    layout
                                    style={{
                                        transform: isInViewMedia ? 'translateX(100%)' : `none`,
                                        transition: 'transform 0.6s ease 0.1s',
                                    }}
                                ></motion.div>
                            )}
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
                                    : {
                                          transform: isInViewMedia ? `none` : `translateX(${getScaledSize(-150, width)}px)`,
                                          opacity: isInViewMedia ? 1 : 0,
                                          transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                                      }
                            }
                        >
                            <video muted loop playsInline ref={videoRef}>
                                <source src='/videos/lifestyle_society.webp' type='video/webp' />
                                <source src='/videos/lifestyle_society.mp4' type='video/mp4' />
                            </video>
                        </motion.div>
                    </div>
                    <div className={styles.content}>
                        {matchesDesktop && (
                            <h2 className={styles.title} ref={titleRef}>
                                <motion.span
                                    className={styles.title__highlighted}
                                    style={{
                                        transform: isInViewTitle
                                            ? 'none'
                                            : `translateX(${getScaledSize(!matchesTablet ? 1000 : 450, width)}px)`,
                                        transition: 'transform 0.6s ease 0.1s',
                                    }}
                                >
                                    Наслаждаться
                                </motion.span>
                                <motion.span
                                    className={styles.title__1}
                                    style={{
                                        transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(800, width)}px)`,
                                        transition: 'transform 0.6s ease 0.1s',
                                    }}
                                >
                                    обществом
                                </motion.span>
                                <motion.span
                                    className={styles.title__2}
                                    style={{
                                        transform: isInViewTitle
                                            ? 'none'
                                            : `translateX(${getScaledSize(!matchesTablet ? 1000 : 600, width)}px)`,
                                        transition: 'transform 0.6s ease 0.1s',
                                    }}
                                >
                                    своих людей
                                </motion.span>
                            </h2>
                        )}

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
                        <motion.p
                            className={styles.text}
                            ref={textRef}
                            style={{
                                transform: isInViewText ? 'none' : `translateY(30px)`,
                                opacity: isInViewText ? 1 : 0,
                                transition: 'transform 0.6s ease 0.2s, opacity 0.6s ease 0.1s',
                            }}
                        >
                            Сборная площадь&nbsp;&mdash; сердце общественной жизни квартала. Здесь приятно сидеть с&nbsp;друзьями
                            на&nbsp;террасе ресторана и пить лимонад в&nbsp;поп-ап баре, азартно торговаться с&nbsp;продавцом фермерских
                            деликатесов на&nbsp;сезонной ярмарке и восхищаться палитрой фестиваля цветов.
                        </motion.p>

                        <motion.div className={styles.plan} layoutScroll transition={{ delay: 0, duration: 0 }}>
                            {!matchesTablet && <SvgIcons id='plan square' />}
                            {matchesTablet && <SvgIcons id='plan square mobile' />}
                        </motion.div>
                    </div>
                </motion.div>
            </motion.section>
            <DetailsModal show={modalIsOpen} closeDetailsModal={() => closeModal()} title={'Соборная площадь'} location={'Сборная площадь'}>
                <DetailsMainContent image={image}>
                    Republic&nbsp;&mdash; для влюблённых в&nbsp;Москву, и&nbsp;чувствовать это вокруг себя каждый день&nbsp;&mdash;
                    бесценно. Это витает в&nbsp;воздухе, ощущается в&nbsp;улыбках прохожих, проявляется в&nbsp;запахах и&nbsp;вкусах.
                    Republic больше, чем место для жизни&nbsp;&mdash; это место для жизни с&nbsp;любовью.
                </DetailsMainContent>
                <div className={parentStyles.columns}>
                    <div className={parentStyles.column__2}>
                        <div className={parentStyles.exterior}>
                            <p className={parentStyles.exterior__text}>
                                Сердце общественной жизни квартала&nbsp;&mdash; Сборная площадь: здесь общаются с&nbsp;друзьями
                                и&nbsp;заводят новых, неспешно завтракают и&nbsp;устраивают вечеринки до&nbsp;утра, торгуются
                                с&nbsp;продавцами фермерских товаров и&nbsp;вместе с&nbsp;соседями любуются яркими красками фестиваля
                                цветов. Каждый человек здесь&nbsp;&mdash; важная деталь идеально работающего механизма.
                            </p>
                        </div>
                    </div>
                </div>
                {sliderPhotos.length > 1 && <DetailsSlider sliderImages={sliderPhotos} sliderWrapperClass={styles.sliderWrapper} />}
            </DetailsModal>
        </>
    );
};

export default SocietySection;
