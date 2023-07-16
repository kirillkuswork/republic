import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './RestaurantsSection.module.scss';
import parentStyles from '../../LifestyleComponent.module.scss';
import SvgIcons from '../../../../../svgs/SvgIcons';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import image from '../../../../../../public/images/lifestyle/restaurants-desktop.jpg';
import imageVideo from '../../../../../../public/images/lifestyle/restaurants-video.jpg';
import getScaledSize from '../../../../../../tools/getScaledSize';

import DetailsSlider from '../../../../details-slider/DetailsSlider';
import DetailsMainContent from '../../components/DetailsMainContent/DetailsMainContent';

import axios from 'axios';
import apiUrls from '../../../../../../constants/API';
import { useAppSelector } from '../../../../../../hook';
import DetailsModal from '../../../../modal/details-modal/DetailsModal';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';

const RestaurantsSection: React.FC<{}> = ({}) => {
    const width = useAppSelector((state) => state.main.width);

    const sectionRef = useRef<HTMLElement>(null);
    const sectionWrapperRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [sliderPhotos, setSliderPhotos] = useState([]);

    const matchesDesktop = width >= 1024;
    const matchesTablet = width <= 1023;

    const isInViewTitle = useInView(sectionRef, { margin: '100px 100px 0px 0px', once: true });
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

    const backImgHeight = useTransform(scrollYProgressBack, [0.7, 1], ['100%', '70%']);

    const fade = useTransform(scrollYProgressBack, [0.7, 1], [1, 0]);
    const fadeText = useTransform(scrollYProgressBack, [0.7, 1], [1, 0]);

    function fixSection() {
        sectionRef.current?.classList.add(styles.fixed);
    }

    function unFixSection() {
        sectionRef.current?.classList.remove(styles.fixed);
    }

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
        axios.get(apiUrls.urlSliderRestaurant).then((resp) => {
            const sliderData = resp.data.absolutePath;
            setSliderPhotos(sliderData || []);
        });
    }, []);

    return (
        <>
            <motion.section className={`${styles.section} ${styles.portrait}`} ref={sectionRef}>
                <motion.div className={styles.sectionWrapper} ref={sectionWrapperRef}>
                    {matchesTablet ? (
                        <h2 className={styles.title} ref={titleRef}>
                            <motion.span
                                className={styles.title__highlighted}
                                style={{
                                    transform: isInViewTitle
                                        ? 'none'
                                        : `translateX(${getScaledSize(!matchesTablet ? -400 : 400, width)}px)`,
                                    transition: 'transform 0.6s ease 0.1s',
                                }}
                            >
                                Обедать
                            </motion.span>
                            <motion.span
                                className={styles.title__1}
                                style={{
                                    transform: isInViewTitle
                                        ? 'none'
                                        : `translateX(${getScaledSize(!matchesTablet ? -750 : 750, width)}px)`,
                                    transition: 'transform 0.6s ease 0.1s',
                                }}
                            >
                                в&nbsp;кулинарной
                            </motion.span>
                            <motion.span
                                className={styles.title__2}
                                style={{
                                    transform: isInViewTitle
                                        ? 'none'
                                        : `translateX(${getScaledSize(!matchesTablet ? -400 : 550, width)}px)`,
                                    transition: 'transform 0.6s ease 0.1s',
                                }}
                            >
                                Мекке
                            </motion.span>
                        </h2>
                    ) : (
                        <div className={styles.titleWrapper}>
                            <h2 className={styles.title} ref={titleRef}>
                                <motion.span
                                    className={styles.title__highlighted}
                                    style={{
                                        transform: isInViewTitle
                                            ? 'none'
                                            : `translateX(${getScaledSize(!matchesTablet ? -400 : 400, width)}px)`,
                                        transition: 'transform 0.6s ease 0.1s',
                                    }}
                                >
                                    Обедать
                                </motion.span>
                                <motion.span
                                    className={styles.title__1}
                                    style={{
                                        transform: isInViewTitle
                                            ? 'none'
                                            : `translateX(${getScaledSize(!matchesTablet ? -750 : 750, width)}px)`,
                                        transition: 'transform 0.6s ease 0.1s',
                                    }}
                                >
                                    в&nbsp;кулинарной
                                </motion.span>
                                <motion.span
                                    className={styles.title__2}
                                    style={{
                                        transform: isInViewTitle
                                            ? 'none'
                                            : `translateX(${getScaledSize(!matchesTablet ? -400 : 550, width)}px)`,
                                        transition: 'transform 0.6s ease 0.1s',
                                    }}
                                >
                                    Мекке
                                </motion.span>
                            </h2>
                            <motion.div
                                className={styles.btnWrapper}
                                ref={btnRef}
                                style={{
                                    opacity: isInViewTitle ? 1 : 0,
                                    transition: 'opacity 0.6s ease 0.5s',
                                }}
                            >
                                <AnimatedSimpleButton text='Узнать больше' theme='light-outline' onClick={openModal} withIcon>
                                    <SvgIcons id='arrow right' />
                                </AnimatedSimpleButton>
                            </motion.div>
                        </div>
                    )}

                    <motion.div
                        className={styles.mediaWrapper}
                        ref={mediaRef}
                        style={{
                            transform: isInViewMedia ? 'none' : `translateY(${getScaledSize(200, width)}px)`,
                            opacity: isInViewMedia ? 1 : 0,
                            transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                        }}
                    >
                        <motion.div
                            className={styles.imgWrapper}
                            style={
                                matchesTablet
                                    ? {
                                          transform: isInViewMedia ? 'none' : `translateY(${getScaledSize(100, width)}px)`,
                                          opacity: isInViewMedia ? 1 : 0,
                                          transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                                      }
                                    : { y: 0, opacity: 1 }
                            }
                        >
                            <Image src={image} fill={true} alt={'морепродукты'} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
                            {!matchesTablet && (
                                <motion.div className={styles.imgWrapper__hider} layout style={{ y: backImgHeight }}></motion.div>
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
                                <Image
                                    src={imageVideo}
                                    fill={true}
                                    alt={'креветки'}
                                    className={styles.img}
                                    sizes='(max-width: 1023px) 1200vw'
                                />
                            </motion.div>
                        )}
                    </motion.div>
                    {matchesTablet ? (
                        <motion.div
                            className={styles.btnWrapper}
                            ref={btnRef}
                            style={{
                                opacity: isInViewTitle ? 1 : 0,
                                transition: 'opacity 0.6s ease 0.5s',
                            }}
                        >
                            <AnimatedSimpleButton text='Узнать больше' theme='light-outline' onClick={openModal} withIcon>
                                <SvgIcons id='arrow right' />
                            </AnimatedSimpleButton>
                        </motion.div>
                    ) : null}

                    <motion.p
                        className={styles.text}
                        ref={textRef}
                        layout
                        style={
                            matchesTablet
                                ? {
                                      transform: textRef ? 'none' : `translateY(30px)`,
                                      opacity: textRef ? 1 : 0,
                                      transition: 'transform 0.6s ease 0.2s, opacity 0.6s ease 0.1s',
                                  }
                                : { opacity: fadeText }
                        }
                        transition={{ delay: 0, duration: 0 }}
                    >
                        В&nbsp;здании сборного цеха откроются премиальные рестораны от&nbsp;главных шефов страны, аутентичные национальные
                        ресторанчики, энотеки и&nbsp;бары, магазины кулинарных книг на&nbsp;всех языках.
                    </motion.p>
                    {matchesDesktop && (
                        <motion.div
                            className={`${styles.videoWrapper} ${styles.videoWrapper_desktop}`}
                            style={{
                                transform: isInViewMedia ? 'none' : `translateY(${getScaledSize(200, width)}px)`,
                                opacity: isInViewMedia ? 1 : 0,
                                transition: 'transform 0.6s ease, opacity 0.6s ease 0.1s',
                            }}
                        >
                            <Image
                                src={imageVideo}
                                fill={true}
                                alt={'креветки'}
                                className={styles.img}
                                sizes='(max-width: 1023px) 1200vw'
                            />
                        </motion.div>
                    )}
                    <motion.div
                        className={styles.plan}
                        layoutScroll
                        style={{ opacity: matchesTablet ? 1 : fade }}
                        transition={{ delay: 0, duration: 0 }}
                    >
                        {!matchesTablet && <SvgIcons id='plan department' />}
                        {matchesTablet && <SvgIcons id='plan department mobile' />}
                    </motion.div>
                </motion.div>
            </motion.section>
            <DetailsModal
                show={modalIsOpen}
                closeDetailsModal={() => closeModal()}
                title={'Гастрономический центр'}
                location={'Гастроцентр'}
            >
                <DetailsMainContent image={image}>
                    В&nbsp;историческом здании сборного цеха&nbsp;&mdash; другая, современная, реальность: премиальные рестораны, где
                    готовят лучшие шефы, модные стритфуд-концепции и&nbsp;другие пространства, в&nbsp;которых можно ярко почувствовать, как
                    живёт и&nbsp;дышит гастрономический мир столицы.
                </DetailsMainContent>
                <div className={parentStyles.columns}>
                    <div className={parentStyles.column__2}>
                        <div className={parentStyles.exterior}>
                            <p className={parentStyles.exterior__text}>
                                Историческое здание, в&nbsp;котором находится гастрономическая Мекка Republic, смотрит прямо
                                на&nbsp;прогулочную зону Сборной площади.
                            </p>
                        </div>
                        <div className={parentStyles.interior}>
                            <p className={parentStyles.interior__text}>
                                Пообедать в&nbsp;роскошном ресторане, а&nbsp;потом сделать фотографии на&nbsp;фоне стен бывшей мастерской
                                или взять кофе навынос, чтобы выпить его с&nbsp;видом на&nbsp;любимый город&nbsp;&mdash; резиденты Republic
                                сами решают, какой вкус будет у&nbsp;нового дня.
                            </p>
                        </div>
                    </div>
                </div>
                {sliderPhotos.length > 1 && <DetailsSlider sliderImages={sliderPhotos} sliderWrapperClass={styles.sliderWrapper} />}
            </DetailsModal>
        </>
    );
};

export default RestaurantsSection;
