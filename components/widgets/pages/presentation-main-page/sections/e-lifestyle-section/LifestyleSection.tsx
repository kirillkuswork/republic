import React, { useEffect, useRef, useState } from 'react';
import styles from './LifestyleSection.module.scss';
import { AnimationProps, motion, useAnimationControls, useMotionValue } from 'framer-motion';
import { usePageScroll } from '../../../../../shared/page-scroll/PageScroller';
import {
    forMotionDiv,
    IAnimation,
    initialAsAnimateWithTransition,
    responsive,
    reverseAnimation,
    transition1200,
    transition1600,
    transition1800,
    transition2200,
    transition600,
    transition900,
} from '../../../../../shared/page-scroll/animation_helpers';
import SimpleButton from '../../../../../features/buttons/simple-button/SimpleButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import ROUTES from '../../../../../../constants/routes';
import Slider from '../../../../slider/Slider';
import { Slide } from 'transitions-kit';
import { isDesktop, isMobileOnly, isTablet } from 'react-device-detect';
import SimpleCard from '../../../../cards/simple-card/SimpleCard';
import { Swiper as SwiperClass } from 'swiper/types';
import Image from 'next/image';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
type IAfterMapSectionAnimations = {
    [key in
        | 'bg'
        | 'taste_text'
        | 'multi_text'
        | 'life_text'
        | 'video_party'
        | 'lifestyle_title'
        | 'lifestyle_desc'
        | 'lifestyle_button'
        | 'slider_img']?: IAnimation;
};

//Переход к странице
const fromPrevPage: IAfterMapSectionAnimations = {
    bg: {
        initial: { display: 'none' },
        animate: { display: 'block' },
        transition: { duration: 0.1, type: 'linear', delay: 0.6 }, //полсе окончания анимации пред. страницы (0.6) -> bg за 0.1 сек паузы выезжает наверх
    },
    taste_text: {
        initial: { x: 0 },
        animate: { x: 832 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.6, type: 'tween', delay: 0.8 }, //0.6 ждем с пред. страницы + 0.2 пауза до начала нашей
        responsive: { x: 'vw1460' },
    },
    multi_text: {
        initial: { x: 0 },
        animate: { x: -870 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.6, type: 'tween', delay: 0.8 }, //0.6 ждем с пред. страницы + 0.2 пауза до начала нашей
        responsive: { x: 'vw1460' },
    },
    life_text: {
        initial: { x: 0 },
        animate: { x: 426 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.6, type: 'tween', delay: 0.8 }, //0.6 ждем с пред. страницы + 0.2 пауза до начала нашей
        responsive: { x: 'vw1460' },
    },
    lifestyle_title: {
        initial: { y: 0 },
        animate: { y: -280 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.6, type: 'tween', delay: 0.8 },
        responsive: { y: 'vh900' },
    },
    lifestyle_desc: {
        initial: { y: 0 },
        animate: { y: -280 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.6, type: 'tween', delay: 0.8 },
        responsive: { y: 'vh900' },
    },
    lifestyle_button: {
        initial: { x: 0 },
        animate: { x: 190 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.6, type: 'tween', delay: 0.8 },
        responsive: { x: 'vw1460' },
    },
};

//Первый скролл вниз
// const initialToSecond: IAfterMapSectionAnimations = initialAsAnimateWithTransition(fromPrevPage, transition900, {
//     bg: {
//         toAnchor: {
//             getElement: () => document.getElementById('lifestyle_wrapper')!,
//             getConnectElement: () => document.getElementById('lifestyle_section')!,
//             connect: 'elemBottomScreenBottom',
//             offset: 44,
//         },
//         responsive: { y: 'vh900' },
//     },
//     lifestyle_title: {
//         initial: { y: 0 },
//         animate: { y: -60 },
//         transition: transition900,
//         responsive: { y: 'vh900' },
//     },
//     lifestyle_desc: {
//         initial: { y: 0 },
//         animate: { y: -60 },
//         transition: transition900,
//         responsive: { y: 'vh900' },
//     },
//     lifestyle_button: {
//         initial: { x: 0 },
//         animate: { x: 120 },
//         transition: transition900,
//         responsive: { x: 'vw1460' },
//     },
// });

//Второй скролл вниз
const secondToThird: IAfterMapSectionAnimations = initialAsAnimateWithTransition(fromPrevPage, transition900, {
    bg: {
        toAnchor: {
            getElement: () => document.getElementById('lifestyle_wrapper')!,
            getConnectElement: () => document.getElementById('lifestyle_slider')!,
            connect: 'elemBottomScreenBottom',
            offset: 44,
        },
    },
    slider_img: {
        initial: { scale: 1.0 },
        animate: { scale: 1.06 },
        transition: transition900,
    },
});
//К след. странице
const toNextPage: IAfterMapSectionAnimations = initialAsAnimateWithTransition(secondToThird, transition900, {
    bg: {
        toAnchor: {
            getElement: () => document.getElementById('lifestyle_wrapper')!,
            getConnectElement: () => document.getElementById('lifestyle_wrapper')!,
            connect: 'fullScreenUp',
        },
    },
    slider_img: {
        initial: { scale: 1.06 },
        animate: { scale: 1.15 },
        transition: transition900,
    },
});

const LifestyleSection: React.FC<{}> = ({}) => {
    const pageScroll = usePageScroll();
    const [animations, setAnimations] = useState<IAfterMapSectionAnimations>({});
    const reversedAnchorAnimations = useRef<{ [key: string]: IAfterMapSectionAnimations }>({});
    const swiper = useRef<SwiperClass | null>(null);

    useEffect(() => {
        pageScroll.addStage(7, {
            slideIn: (forward) => {
                if (forward) {
                    setAnimations(responsive(fromPrevPage));
                    return 600 /*ждем с пред. страницы*/ + 200 /*пауза*/ + 600 /*сама эта стадия*/;
                } else return 900;
            },
            slideOut: (forward) => {
                if (forward) return 900;
                else {
                    const toPrevPage = reverseAnimation(responsive(fromPrevPage));
                    for (let a of Object.values(toPrevPage)) a.transition = transition600; //В обратку без пауз
                    toPrevPage.bg! = {
                        ...toPrevPage.bg!,
                        transition: { duration: 0.05, type: 'linear', delay: 0.6 }, //бг уезжает вниз после заврешения анимаций этой траницы
                    };
                    setAnimations(toPrevPage);
                    return 650;
                }
            },
        });
        // pageScroll.addStage(8, {
        //     slideIn: (forward) => {
        //         if (forward) {
        //             const ra = responsive(initialToSecond);
        //             setAnimations(ra);
        //             reversedAnchorAnimations.current = {
        //                 ...reversedAnchorAnimations.current,
        //                 initialToSecond: reverseAnimation(ra),
        //             };
        //             return 900;
        //         } else return 900;
        //     },
        //     slideOut: (forward) => {
        //         if (forward) return 900;
        //         else {
        //             setAnimations(reversedAnchorAnimations.current.initialToSecond);
        //             return 900;
        //         }
        //     },
        // });
        pageScroll.addStage(8, {
            slideIn: (forward) => {
                if (forward) {
                    const ra = responsive(secondToThird);
                    setAnimations(ra);
                    reversedAnchorAnimations.current = {
                        ...reversedAnchorAnimations.current,
                        secondToThird: reverseAnimation(ra),
                    };
                    if (swiper.current) swiper.current.slideToLoop(1, 900);
                    return 900;
                } else {
                    setAnimations(reversedAnchorAnimations.current.toNextPage);
                    return 900;
                }
            },
            slideOut: (forward) => {
                if (forward) {
                    const ra = responsive(toNextPage);
                    setAnimations(ra);
                    reversedAnchorAnimations.current = {
                        ...reversedAnchorAnimations.current,
                        toNextPage: reverseAnimation(ra),
                    };
                    return 900;
                } else {
                    setAnimations(reversedAnchorAnimations.current.secondToThird);
                    if (swiper.current) swiper.current.slideToLoop(0, 900);
                    return 900;
                }
            },
            onlyUpDown: true,
        });
    }, [pageScroll]);

    return (
        <>
            <motion.div id='lifestyle_wrapper' className={styles.wrapper} {...forMotionDiv(animations.bg)}>
                <div className={styles.top_content_wrapper}>
                    <motion.div className={styles.top_content_wrapper__taste_text} {...animations.taste_text}>
                        распробовать
                    </motion.div>

                    <motion.div className={styles.top_content_wrapper__multi_text} {...animations.multi_text}>
                        многообразие
                    </motion.div>
                    <motion.div className={styles.top_content_wrapper__life_text} {...animations.life_text}>
                        жизни
                    </motion.div>
                    <motion.div className={styles.top_content_wrapper__life_text} {...animations.life_text}>
                        жизни
                    </motion.div>
                    <div className={styles.lifestyle}>
                        <motion.div className={styles.lifestyle__button} {...animations.lifestyle_button}>
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
                        <motion.div className={styles.lifestyle__title} {...animations.lifestyle_title}>
                            Republic — это не дом и не квартал, а часть городской ткани, включающая в себя, помимо домов, историю, дух места
                            и сообщество
                        </motion.div>
                        <motion.div className={styles.lifestyle__desc} {...animations.lifestyle_desc}>
                            Republic удивляет контрастами и создает новый опыт жизни: здесь плавают в бассейне под сводами ремонтных
                            мастерских и покупают редкие специи в паровозном цехе, украшают стены прошлого искусством будущего и учат
                            малышей в прогрессивном детсаде.
                        </motion.div>
                    </div>
                </div>
                <div id='lifestyle_slider' className={styles.slider}>
                    <Slider
                        size={'content'}
                        arrow={true}
                        positionArrows={isDesktop ? 'arrows_edge' : undefined}
                        navigationColor={isDesktop ? 'white-brick' : 'dark-grey-brick'}
                        navigationOutline={true}
                        isLoop={true}
                        onSwiper={(s) => {
                            swiper.current = s;
                            if (s) s.wrapperEl.style.transitionTimingFunction = 'cubic-bezier(0.6, 0, 0.4, 1)';
                        }}
                    >
                        <SimpleCard theme='light' className={styles.slider__card}>
                            <motion.div className={styles.slider__card__child_img} {...animations.slider_img}></motion.div>
                            <div className={styles.card_titles}>
                                <div className={styles.card_title}>Детский сад</div>
                                <div className={styles.card_desc}>
                                    для развития
                                    <br /> юных жителей
                                </div>
                            </div>
                        </SimpleCard>
                        <SimpleCard theme='light' className={styles.slider__card}>
                            <motion.div className={styles.slider__card__park_img} {...animations.slider_img}></motion.div>
                            <div className={styles.card_titles}>
                                <div className={styles.card_title}>уединенный парк</div>
                                <div className={styles.card_desc}>
                                    прогулки <br />
                                    на любой вкус
                                </div>
                            </div>
                        </SimpleCard>
                        <SimpleCard theme='light' className={styles.slider__card}>
                            <motion.div className={styles.slider__card__yoga_img} {...animations.slider_img}></motion.div>
                            <div className={styles.card_titles}>
                                <div className={styles.card_title}>йога и спорт</div>
                                <div className={styles.card_desc}>
                                    держать <br /> себя в тонусе
                                </div>
                            </div>
                        </SimpleCard>
                        <SimpleCard theme='light' className={styles.slider__card}>
                            <motion.div className={styles.slider__card__spa_img} {...animations.slider_img}></motion.div>
                            <div className={styles.card_titles}>
                                <div className={styles.card_title}>spa комплекс</div>
                                <div className={styles.card_desc}>
                                    расслабиться
                                    <br /> после трудного дня
                                </div>
                            </div>
                        </SimpleCard>
                    </Slider>
                </div>
            </motion.div>
        </>
    );
};

export default LifestyleSection;
