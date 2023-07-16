import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper';
import styles from './PlatinumRoad.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import StickCard from '../../../cards/stick-card/StickCard';
import { motion, useInView, useTransform, useSpring, useScroll } from 'framer-motion';
import getScaledSizeSecond from '../../../../../tools/getScaledSizeSecond';
import { useAppSelector } from '../../../../../hook';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

export interface PlatinumRoad {}

const PlatinumRoad: React.FC<PlatinumRoad> = ({}) => {
    const text = [
        'Дорога к&nbsp;PLATINUM со&nbsp;стороны Пресненского вала проходит сквозь лобби REDS и&nbsp;каскадный водопад по&nbsp;обеим сторонам променада.',
        'Несмотря на&nbsp;то, что архитектура зданий очень разная, они находятся в&nbsp;постоянном диалоге, а&nbsp;маршруты передвижения жильцов тесно переплетены.',
        'На 17 этаже PLATINUM становится тоньше, а квартиры, выходящие на юг, получают не только остекленную лоджию, но и открытую террасу с роскошным видом на центр города.',
    ];
    const [activeIndex, setActiveIndex] = React.useState(0);
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
                <source media='(max-width:540px)' srcSet={`/images/houses/house-platinum/platinum-road-${activeIndex + 1}-mobile.jpg`} />
                <img className={styles.picture} src={`/images/houses/house-platinum/platinum-road-${activeIndex + 1}.jpg`} alt='' />
            </picture>

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
                        onSlideChange={(swiperCore) => {
                            // console.log(swiperCore);
                            const index = swiperCore.realIndex;
                            setActiveIndex(index);
                        }}
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
                        {/* <button className={`reds-lobby-gallery-arrow__prev`}>
                            <SvgIcons id={'arrow prev transparent small light hover'} />
                        </button>
                        <button className={`reds-lobby-gallery-arrow__next`}>
                            <SvgIcons id='arrow next transparent small light hover' />
                        </button> */}
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

export default PlatinumRoad;
