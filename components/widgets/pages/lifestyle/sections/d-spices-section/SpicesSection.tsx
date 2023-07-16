import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './SpicesSection.module.scss';
import parentStyles from '../../LifestyleComponent.module.scss';

import SvgIcons from '../../../../../svgs/SvgIcons';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

import image from '../../../../../../public/images/lifestyle/spices-desktop.jpg';
import imageMobile from '../../../../../../public/images/lifestyle/spices-mobile.jpg';
import getScaledSize from '../../../../../../tools/getScaledSize';
import { IHeader } from '../../../../../layouts/header/Header';
import DetailsSlider from '../../../../details-slider/DetailsSlider';
import DetailsMainContent from '../../components/DetailsMainContent/DetailsMainContent';

import axios from 'axios';
import apiUrls from '../../../../../../constants/API';
import { useAppSelector } from '../../../../../../hook';
import DetailsModal from '../../../../modal/details-modal/DetailsModal';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
interface ISpicesProps {
    onChangeTheme?: (theme: IHeader['theme']) => void;
}

const SpicesSection: React.FC<ISpicesProps> = ({ onChangeTheme }) => {
    const width = useAppSelector((state) => state.main.width);
    const sectionRef = useRef<HTMLElement>(null);
    const sectionWrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const titleRefDesktop = useRef<HTMLHeadingElement>(null);
    const titleRefMobile = useRef<HTMLHeadingElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    const [sliderPhotos, setSliderPhotos] = useState([]);

    const matchesTablet = width <= 1023;

    const isInView = useInView(sectionRef);
    const isInViewTitle = useInView(sectionRef, { margin: '100px 100px 0px 0px', once: true });
    const isInViewVideo = useInView(videoRef);
    const isInViewMedia = useInView(mediaRef, { once: true });
    const isInViewBtn = useInView(btnRef, { once: true });
    const isInViewText = useInView(textRef, { once: true });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });

    const { scrollYProgress: scrollYProgressBack } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const [modalIsOpen, setIsOpen] = useState(false);

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

    const backImgHeight = useTransform(scrollYProgressBack, [0.6, 1], ['100%', '50%']);

    const fade = useTransform(scrollYProgressBack, [0.7, 1], [1, 0]);

    function fixSection() {
        sectionRef.current?.classList.add(styles.fixed);
    }

    function unFixSection() {
        sectionRef.current?.classList.remove(styles.fixed);
    }

    useEffect(() => {
        if (isInViewVideo) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    }, [isInViewVideo]);

    useEffect(() => {
        axios.get(apiUrls.urlSliderSpices).then((resp) => {
            const sliderData = resp.data.absolutePath;
            setSliderPhotos(sliderData || []);
        });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            videoRef.current?.play();
        }, 200);
    }, [width]);

    return (
        <>
            <motion.section className={`${styles.section} ${styles.portrait}`} ref={sectionRef}>
                <motion.div className={styles.sectionWrapper} ref={sectionWrapperRef}>
                    {matchesTablet && (
                        <h2 className={styles.title} ref={titleRefMobile}>
                            <span className={styles.title__wrapper}>
                                <motion.span
                                    className={styles.title__highlighted}
                                    style={{
                                        transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(1000, width)}px)`,
                                        transition: 'transform 0.6s ease 0.1s',
                                    }}
                                >
                                    Покупать
                                </motion.span>
                                <motion.span
                                    className={styles.title__1}
                                    style={{
                                        transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(1200, width)}px)`,
                                        transition: 'transform 0.6s ease 0.1s',
                                    }}
                                >
                                    редкие
                                </motion.span>
                            </span>
                            <motion.span
                                className={styles.title__2}
                                style={{
                                    transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(1000, width)}px)`,
                                    transition: 'transform 0.6s ease 0.1s',
                                }}
                            >
                                специи
                            </motion.span>
                        </h2>
                    )}
                    <div className={styles.mediaWrapper} ref={mediaRef}>
                        <motion.div
                            className={styles.imgWrapper}
                            style={{
                                transform: isInViewMedia ? 'none' : `translateY(${getScaledSize(100, width)}px)`,
                                opacity: isInViewMedia ? 1 : 0,
                                transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                            }}
                        >
                            {!matchesTablet ? (
                                <Image src={image} fill={true} alt={'специи'} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
                            ) : (
                                <Image
                                    src={imageMobile}
                                    fill={true}
                                    alt={'специи'}
                                    className={styles.img}
                                    sizes='(max-width: 1023px) 1200vw'
                                />
                            )}

                            {!matchesTablet && (
                                <>
                                    <motion.div
                                        className={styles.imgWrapper__hiderRight}
                                        layout
                                        style={{
                                            transform: isInViewMedia ? 'translateX(100%)' : `none`,
                                            transition: 'transform 0.6s ease 0.1s',
                                        }}
                                    ></motion.div>
                                    <motion.div
                                        className={styles.imgWrapper__hiderBottom}
                                        layout
                                        style={{ y: !modalIsOpen ? backImgHeight : '-100%' }}
                                    ></motion.div>
                                </>
                            )}
                        </motion.div>
                        {matchesTablet && (
                            <motion.div
                                className={styles.videoWrapper}
                                style={{
                                    transform: isInViewMedia ? 'none' : `translateY(200px)`,
                                    opacity: isInViewMedia ? 1 : 0,
                                    transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                                }}
                            >
                                <video playsInline muted loop ref={videoRef}>
                                    <source src='/videos/lifestyle_spices.webp' type='video/webp' />
                                    <source src='/videos/lifestyle_spices.mp4' type='video/mp4' />
                                </video>
                            </motion.div>
                        )}
                    </div>
                    <div className={styles.content}>
                        {!matchesTablet && (
                            <h2 className={styles.title} ref={titleRefDesktop}>
                                <span className={styles.title__wrapper}>
                                    <motion.span
                                        className={styles.title__highlighted}
                                        style={{
                                            transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(1000, width)}px)`,
                                            transition: 'transform 0.6s ease 0.1s',
                                        }}
                                    >
                                        Покупать
                                    </motion.span>
                                    <motion.span
                                        className={styles.title__1}
                                        style={{
                                            transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(1200, width)}px)`,
                                            transition: 'transform 0.6s ease 0.1s',
                                        }}
                                    >
                                        редкие
                                    </motion.span>
                                </span>
                                <motion.span
                                    className={styles.title__2}
                                    style={{
                                        transform: isInViewTitle ? 'none' : `translateX(${getScaledSize(1000, width)}px)`,
                                        transition: 'transform 0.6s ease 0.1s',
                                    }}
                                >
                                    специи
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
                        {!matchesTablet && (
                            <motion.div
                                className={styles.videoWrapper}
                                style={{
                                    opacity: isInViewBtn ? 1 : 0,
                                    transform: isInViewBtn ? 'none' : `translateX(${getScaledSize(-100, width)}px)`,
                                    transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                                }}
                            >
                                <video muted loop ref={videoRef}>
                                    <source src='/videos/lifestyle_spices.webp' type='video/webp' />
                                    <source src='/videos/lifestyle_spices.mp4' type='video/mp4' />
                                </video>
                            </motion.div>
                        )}

                        <motion.p
                            className={styles.text}
                            layout
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
                            transition={{ delay: 0, duration: 0 }}
                        >
                            Republic привносит новые вкусы в&nbsp;меню столицы. В&nbsp;паровозном цехе появится фудмаркет с&nbsp;модными
                            стритфуд-концепциями, кулинарная школа и&nbsp;гастрономический рынок, где можно купить любые ингредиенты
                            и&nbsp;посуду для смелых экспериментов на&nbsp;вашей собственной кухне.
                        </motion.p>
                        <motion.div
                            className={styles.plan}
                            layoutScroll
                            style={{ opacity: matchesTablet ? 1 : fade }}
                            transition={{ delay: 0, duration: 0 }}
                        >
                            {!matchesTablet && <SvgIcons id='plan locomotive' />}
                            {matchesTablet && <SvgIcons id='plan locomotive mobile' />}
                        </motion.div>
                    </div>
                </motion.div>
            </motion.section>
            <DetailsModal show={modalIsOpen} closeDetailsModal={() => closeModal()} title={'Шоппинг-аллея'} location={'паровозный цех'}>
                <DetailsMainContent image={image}>
                    Редкие вкусы, новые ощущения, всё для настоящего гастрономического удовольствия&nbsp;&mdash; от&nbsp;премиальных
                    ресторанов до&nbsp;аутентичного восточного базара&nbsp;&mdash; в&nbsp;двух шагах от&nbsp;дома.
                </DetailsMainContent>
                <div className={parentStyles.columns}>
                    <div className={parentStyles.column__2}>
                        <div className={parentStyles.exterior}>
                            <p className={parentStyles.exterior__text}>
                                Гастрономический центр появится на&nbsp;месте бывшего паровозного цеха, и&nbsp;это не&nbsp;случайность: там,
                                где раньше собирали механизмы, теперь создают вкусы. Историческое здание выходит прямо на&nbsp;Сборную
                                площадь&nbsp;&mdash; сердце общественной жизни квартала. Тут всегда оживлённо, по-хорошему шумно
                                и&nbsp;атмосферно в&nbsp;любое время года.
                            </p>
                        </div>
                        <div className={parentStyles.interior}>
                            <p className={parentStyles.interior__text}>
                                Колорит в&nbsp;гастрономическом центре почти такой&nbsp;же, как на&nbsp;улицах Марракеша или Ханоя, где
                                прямо из&nbsp;железных бочек продают анис, корицу и&nbsp;мускатный орех. Здесь можно купить любимые специи
                                и&nbsp;продукты, и&nbsp;превратить их&nbsp;в&nbsp;кулинарные шедевры.
                            </p>
                        </div>
                    </div>
                </div>
                {sliderPhotos.length > 1 && <DetailsSlider sliderImages={sliderPhotos} sliderWrapperClass={styles.sliderWrapper} />}
            </DetailsModal>
        </>
    );
};

export default SpicesSection;
