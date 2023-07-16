import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper';
import styles from './RedsLobbyGallery.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import StickCard from '../../../cards/stick-card/StickCard';
import { motion, useInView, useTransform, useSpring, useScroll } from 'framer-motion';
import getScaledSizeSecond from '../../../../../tools/getScaledSizeSecond';
import { useAppSelector } from '../../../../../hook';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

export interface RedsLobbyGallery {}

const BaseTemplate: React.FC<RedsLobbyGallery> = ({}) => {
    const text = [
        'Близнецов объединяет функциональная галерея-лобби.',
        'Её&nbsp;часть, обращенная к&nbsp;Пресненскому валу, отдана ресторанам и&nbsp;кафе, банку и&nbsp;мини-маркету. Из&nbsp;лобби на&nbsp;лифте можно подняться на&nbsp;открытую террасу',
        'Здесь жители дома потеряют счет времени, погрузившись в&nbsp;новый бестселлер в&nbsp;комфортном шезлонге.',
        'Или смогут поучаствовать в&nbsp;рабочей видеоконференции, наслаждаясь кофе на&nbsp;свежем воздухе.',
    ];
    const width = useAppSelector((state) => state.main.width);
    const lobbyTitleRef = React.useRef<HTMLDivElement>(null);
    const isInViewTitle = useInView(lobbyTitleRef, { once: true });

    const lobbySectionRef = React.useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: lobbySectionRef,
        offset: ['start end', 'end end'],
    });
    const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const toTopLobby = useTransform(smoothYProgress, [0, 0.9], [200, 0]);

    return (
        <section className={styles.container} ref={lobbySectionRef}>
            <picture>
                <source media='(max-width:540px)' srcSet={'/images/houses/house-reds/reds-lobby-mobile.jpg'} />
                <img className={styles.picture} src={'/images/houses/house-reds/reds-lobby.jpg'} alt='' />
            </picture>
            <div className={styles.title} ref={lobbyTitleRef}>
                <motion.div
                    style={{
                        transform: isInViewTitle ? 'none' : `translateX(${getScaledSizeSecond(-450, width)}px)`,
                        transition: 'all 0.9s ease 0.1s',
                    }}
                >
                    галерея
                </motion.div>
                {/* <br /> */}
                <motion.div
                    className={styles.titleRight}
                    style={{
                        transform: isInViewTitle ? 'none' : `translateX(${getScaledSizeSecond(1200, width)}px)`,
                        transition: 'all 0.9s ease 0.1s',
                    }}
                >
                    лобби
                </motion.div>
            </div>

            <motion.div className={styles.stickCard} style={{ y: toTopLobby }}>
                <StickCard>
                    <Swiper
                        className={`${styles.slider} houses-slider`}
                        modules={[Navigation, Scrollbar]}
                        spaceBetween={0}
                        slidesPerView={1}
                        // scrollbar={{ draggable: true, dragSize: 24 }}
                        mousewheel={{ forceToAxis: true }}
                        navigation={{
                            prevEl: '.reds-lobby-gallery-arrow__prev',
                            nextEl: '.reds-lobby-gallery-arrow__next',
                        }}
                        loop={true}
                    >
                        {text.map((el, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className={styles.slide}
                                    dangerouslySetInnerHTML={{
                                        __html: el,
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className={styles.arrows}>
                        <AnimatedIconButton
                            type={'button'}
                            variant='round'
                            outline={true}
                            color={'transparent-white'}
                            direction='left'
                            className={'reds-lobby-gallery-arrow__prev'}
                        >
                            <SvgIcons id={'arrow left'} />
                        </AnimatedIconButton>
                        <AnimatedIconButton
                            type={'button'}
                            variant='round'
                            outline={true}
                            color={'transparent-white'}
                            direction='right'
                            className={'reds-lobby-gallery-arrow__next'}
                        >
                            <SvgIcons id={'arrow right'} />
                        </AnimatedIconButton>
                    </div>
                </StickCard>
            </motion.div>
        </section>
    );
};

export default BaseTemplate;
