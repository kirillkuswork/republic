import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './HousesSection.module.scss';
import { isTablet } from 'react-device-detect';
import SimpleButton from '../../../../../features/buttons/simple-button/SimpleButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import ROUTES from '../../../../../../constants/routes';
import SVG from 'react-inlinesvg';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { FreeMode, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import ImageModalCard from '../../../../cards/image-modal-card/ImageModalCard';
import AsideModal from '../../../../modal/aside-modal/AsideModal';
import { useAppSelector } from '../../../../../../hook';
import {
    IAnimation,
    initialAsAnimateWithTransition,
    responsive,
    reverseAnimation,
    transition1600,
    transition1800,
    transition900,
} from '../../../../../shared/page-scroll/animation_helpers';
import { usePageScroll } from '../../../../../shared/page-scroll/PageScroller';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';

// install Swiper modules
SwiperCore.use([FreeMode, Navigation]);
type IHousesSectionAnimations = {
    [key in 'bg' | 'life_text' | 'arch_text' | 'park_text' | 'desc_text' | 'life_button' | 'park_img' | 'scheme']?: IAnimation;
};
//Переход к странице
const fromPrevPage: IHousesSectionAnimations = {
    bg: {
        initial: { y: 0 },
        animate: { y: -900 },
        transition: transition900,
        responsive: { y: 'vh900' },
    },
    life_text: {
        initial: { x: 0 },
        animate: { x: 400 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    arch_text: {
        initial: { x: 0 },
        animate: { x: -904 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    park_text: {
        initial: { x: 0 },
        animate: { x: -436 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    desc_text: {
        initial: { y: 0, opacity: 0 },
        animate: { y: -30, opacity: 1 },
        transition: transition900,
        responsive: { y: 'vh900' },
    },
    life_button: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: transition900,
    },
    park_img: {
        initial: { scale: 1.0 },
        animate: { scale: 1.06 },
        transition: transition900,
    },
};
//Первый скролл вниз
const initialToSecond: IHousesSectionAnimations = initialAsAnimateWithTransition(fromPrevPage, transition900, {
    bg: {
        initial: { y: -900 },
        animate: { y: -900 - 900 },
    },
    park_img: {
        initial: { scale: 1.06 },
        animate: { scale: 1.12 },
    },
    scheme: {
        initial: { y: 0 },
        animate: { y: -170 },
        transition: transition900,
        responsive: { y: 'vh900' },
    },
});
//К след. странице
const toNextPage: IHousesSectionAnimations = initialAsAnimateWithTransition(initialToSecond, transition900, {
    bg: {
        initial: { y: -900 - 900 },
        animate: { y: -900 - 900 - 900 },
    },
});

const slides = [
    {
        id: 0,
        houseName: 'reds',
        text: '',
        link: `${ROUTES.houses}/reds`,
    },
    {
        id: 1,
        houseName: 'platinum',
        text: '',
        link: `${ROUTES.houses}/platinum`,
    },
    {
        id: 2,
        houseName: 'silver',
        text: 'скоро',
    },
    {
        id: 3,
        houseName: 'brown',
        text: 'скоро',
    },
    {
        id: 4,
        houseName: 'green',
        text: 'скоро',
    },
    {
        id: 5,
        houseName: 'gold',
        text: 'скоро',
    },
    {
        id: 6,
        houseName: 'whites',
        text: 'скоро',
    },
    {
        id: 7,
        houseName: 'purple',
        text: 'скоро',
    },
];

const builds = [
    {
        id: 0,
        img: '',
        title: '',
        text: '',
    },
    {
        id: 1,
        img: '/images/main/gastrocenter.png',
        title: 'Гастрономический центр',
        text: 'Здесь премиальные рестораны соседствуют с&nbsp;национальной кухней, энотеки&nbsp;&mdash; со&nbsp;стритфудом, а&nbsp;гастромаркет и&nbsp;кулинарная школа ждут тех, кто готов пробовать новое.',
    },
    {
        id: 2,
        img: '/images/main/shopping.jpg',
        title: 'Шоппинг-аллея',
        text: 'Своя Пятая Авеню в&nbsp;самом сердце Москвы&nbsp;&mdash; с&nbsp;бутиками локальных брендов, event-зоной и&nbsp;поп-арт-пространством. Подбирайте аутфиты, не&nbsp;покидая территорию Republic.',
    },
    {
        id: 3,
        img: '/images/main/terms.jpg',
        title: 'Термы &amp;&nbsp;SPA by&nbsp;Encore',
        text: 'Премиальный фитнес-клуб Encore Fitness с&nbsp;водно-термальным комплексом&nbsp;&mdash; главное wellness-пространство Republic. Бассейн, сауны, фитнес-зона и&nbsp;всё, что нужно для перезагрузки.',
    },
    {
        id: 4,
        img: '/images/main/kindergarten.jpg',
        title: 'Детский сад',
        text: 'Целый мир в&nbsp;стенах здания 1880 года.Пространство досугового центра, рассчитанное на&nbsp;125&nbsp;мест, даёт простор для творчества и&nbsp;развития благодаря разнообразию функциональных зон, в&nbsp;которых ребёнок может раскрывать свои индивидуальные способности.',
    },
    {
        id: 5,
        img: '/images/main/business.jpg',
        title: 'Бизнес центр',
        text: '',
    },
    {
        id: 6,
        img: '/images/main/highBoulevard.jpg',
        title: 'Высокий бульвар',
        text: 'Проложен по&nbsp;историческому Камер-Коллежскому валу и&nbsp;ведёт к&nbsp;гастрономическому центру: здесь встречаются с&nbsp;друзьями и&nbsp;устраивают бар-хоппинг до&nbsp;утра.',
    },
    {
        id: 7,
        img: '/images/main/lowBoulevard.jpg',
        title: 'Низкий бульвар',
        text: 'Идеальное место для тех, кто любит камерную атмосферу и&nbsp;неспешные прогулки. Тут хорошо устраивать свидания или пить утренний кофе в&nbsp;уютных французских кафе.',
    },
    {
        id: 8,
        img: '/images/main/cathedralSquare.jpg',
        title: 'Сборная площадь',
        text: 'Сердце общественной жизни квартала. Из&nbsp;поп-ап-бара&nbsp;&mdash; на&nbsp;сезонную ярмарку, чтобы купить фермерские деликатесы, а&nbsp;оттуда&nbsp;&mdash; любоваться палитрой фестиваля цветов.',
    },
];

const housesForSale = ['reds', 'platinum'];

const HousesSection: React.FC = () => {
    const pageScroll = usePageScroll();
    const [animations, setAnimations] = useState<IHousesSectionAnimations>({});
    const reversedAnchorAnimations = useRef<{ [key: string]: IHousesSectionAnimations }>({});
    const width = useAppSelector((state) => state.main.width);
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const [swiperRef, setSwiperRef] = useState<SwiperCore>();
    const [activeNumber, setActiveNumber] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [disabledHouseName, setDisabledHouseName] = useState(false);
    const [activeHouseName, setActiveHouseName] = useState<string>('');
    const [activeSlide, setActiveSlide] = useState<number | null>(null);
    const [hoverHouseName, setHoverHouseName] = useState<string>('');

    const beforeSvgInjection = () => {
        const svg = document.getElementById('plan');
        if (!svg) return;
        //Получаем список элементов домов
        let svgElements = [...Array.from(svg.children)];
        const numbers = svgElements.find((item) => item.id === 'numbers');
        const houses = svgElements.find((item) => item.id === 'mask');
        const street = svgElements.find((item) => item.id === 'street');

        if (!street) return;
        street.classList.add(styles.hidden);

        if (!houses) return;

        [...Array.from(houses.children)].forEach((item) => {
            item.setAttribute('data-section', item.id);
            const style = housesForSale.includes(item.id) ? 'building-scheme__build_enable' : 'building-scheme__build_not-sale';
            item.classList.add(style);

            item.addEventListener('mouseenter', () => {
                setHoverHouseName(item.id);
            });

            item.addEventListener('click', () => {
                setActiveHouseName(item.id);
            });
        });

        if (!numbers) return;

        [...Array.from(numbers.children)].forEach((item) => {
            item.classList.add('building-scheme__house-number');
            const id = item.id.replace('house', '');

            item.addEventListener('mouseenter', () => {
                setShowModal(true);
                setActiveNumber(+id);
                setDisabledHouseName(true);
            });

            item.addEventListener('mouseleave', () => {
                setShowModal(false);
                setDisabledHouseName(false);
            });
        });
    };

    //Переход к нужному слайду с названием дома
    useEffect(() => {
        let activeSlide = document.getElementById(`slide-${activeHouseName}`);

        if (activeSlide && swiperRef) {
            const activeSection = activeSlide.id.replace('slide-', '');
            let currentSlide = slides.find((item) => item.houseName === activeSection);

            if (currentSlide) {
                swiperRef.slideTo(currentSlide.id, 3000);
                setActiveSlide(currentSlide.id);
            }
        }
    }, [activeHouseName, swiperRef]);

    //Добавление стилей для активного элемента башни в слайдере
    useEffect(() => {
        let slide = document.getElementById(`slide-${activeHouseName}`);
        let slides = document.querySelectorAll('.swiper-slide');

        if (slides) {
            slides.forEach((item) => item.classList.remove(styles.active));
        }

        if (slide) {
            slide.classList.add(styles.active);
        }
    }, [activeSlide]);

    const handlePrev = useCallback(() => {
        if (!swiperRef) return;
        swiperRef.slidePrev();
    }, [swiperRef]);

    const handleNext = useCallback(() => {
        if (!swiperRef) return;
        swiperRef.slideNext();
    }, [swiperRef]);

    const removeActiveHouse = () => {
        const svg = document.getElementById('plan');
        if (!svg) return;
        const svgElements = [...Array.from(svg?.children || [])].filter((item) => item.id !== 'style' && item.id !== 'builds');
        const arr = svgElements.find((item) => item.id === 'mask');
        [...Array.from(arr?.children || [])].forEach((item) => item.classList.remove('active'));
    };

    const handleClickTitle = (houseName: string) => {
        removeActiveHouse();
        const house = document.getElementById(houseName);
        if (house) {
            house.classList.add('active');
            setActiveHouseName(houseName);
        }
    };

    useEffect(() => {
        if (!hoverHouseName) return;
        setHoverHouseName('');
        if (hoverHouseName === activeHouseName) return;
        removeActiveHouse();
    }, [hoverHouseName, activeHouseName]);

    useEffect(() => {
        pageScroll.addStage(9, {
            slideIn: (forward) => {
                if (forward) {
                    setAnimations(responsive(fromPrevPage));
                    return 900;
                } else return 900;
            },
            slideOut: (forward) => {
                if (forward) return 900;
                else {
                    setAnimations(reverseAnimation(responsive(fromPrevPage)));
                    return 900;
                }
            },
        });
        pageScroll.addStage(10, {
            slideIn: (forward) => {
                if (forward) {
                    setAnimations(responsive(initialToSecond));
                    return 900;
                } else {
                    setAnimations(reverseAnimation(responsive(toNextPage)));
                    return 900;
                }
            },
            slideOut: (forward) => {
                if (forward) {
                    setAnimations(responsive(toNextPage));
                    return 900;
                } else {
                    setAnimations(reverseAnimation(responsive(initialToSecond)));
                    return 900;
                }
            },
            onlyUpDown: true,
        });
    }, [pageScroll]);

    const handleSlideChange = (idx: number) => {
        if (!isTablet) return;
        const house = slides.find((slide) => slide.id === idx);
        handleClickTitle(house?.houseName || '');
    };

    return (
        <>
            <motion.div className={styles.wrapper} id='house_wrapper' {...animations.bg}>
                <div className={styles.content_wrapper}>
                    <div className={styles.content_wrapper__img}>
                        <motion.div className={styles.content_wrapper__img__inner} {...animations.park_img}></motion.div>
                    </div>
                    <motion.div className={styles.content_wrapper__life} {...animations.life_text}>
                        Жить в
                    </motion.div>
                    <motion.div className={styles.content_wrapper__architectural} {...animations.arch_text}>
                        архитектурном
                    </motion.div>
                    <motion.div className={styles.content_wrapper__park} {...animations.park_text}>
                        парке
                    </motion.div>
                    <motion.div className={styles.content_wrapper__desc} {...animations.desc_text}>
                        Каждое здание в Republic — автограф одного из лучших мировых архитекторов, а квартал целиком — это парк
                        архитектурных шедевров, к которому приложили руку лучшие мастера современности.
                        <motion.div className={styles.content_wrapper__button} {...animations.life_button}>
                            <AnimatedSimpleButton
                                text='о проекте'
                                theme='dark-outline'
                                link={ROUTES.about}
                                withIcon={true}
                                iconAnimation={'right'}
                                iconPosition={'right'}
                                size={'default'}
                            >
                                <SvgIcons id='arrow right' />
                            </AnimatedSimpleButton>
                        </motion.div>
                    </motion.div>
                </div>
                <div className={styles.houses_wrapper} id='houses_section'>
                    <h4 className={styles.title}>найдите свой дом в&nbsp;Republic</h4>
                    <div className={styles.button}>
                        <AnimatedSimpleButton
                            text='дома'
                            theme='dark-outline'
                            link={ROUTES.houses}
                            withIcon={true}
                            iconAnimation={'right'}
                            iconPosition={'right'}
                            size={'default'}
                        >
                            <SvgIcons id='arrow right' />
                        </AnimatedSimpleButton>
                    </div>
                    {(isTablet || width < widthTablet) && (
                        <div className={styles.disclaimer}>
                            <span>Можно двигать</span>
                            <SvgIcons id={'arrows-scroll'} />
                        </div>
                    )}
                    <motion.div className={styles.scheme_slider_wrapper} {...animations.scheme}>
                        <div className={styles.scheme} {...animations.scheme}>
                            <SVG
                                src={'/plans/building-scheme.svg'}
                                id={'plan'}
                                className={styles.svg}
                                onLoad={() => beforeSvgInjection()}
                            />
                            <Image src={'/plans/building-img.jpg'} alt={''} className={styles.image} fill={true} />
                        </div>
                        <Swiper
                            onSwiper={(swiper) => {
                                setSwiperRef(swiper);
                            }}
                            modules={[FreeMode]}
                            slidesPerView='auto'
                            className={styles.slider}
                            resistanceRatio={0}
                            freeMode={width > widthTablet}
                            initialSlide={activeSlide ?? 0}
                            loop={isTablet || width < widthTablet}
                            onSlideChange={(e) => handleSlideChange(e.realIndex)}
                            direction={`${isTablet || width < widthTablet ? 'vertical' : 'horizontal'}`}
                        >
                            {slides.map((item) => {
                                return (
                                    <SwiperSlide
                                        className={`${styles.slide} ${disabledHouseName ? styles.disabled : ''} ${
                                            item.id === activeSlide ? styles.active : ''
                                        }`}
                                        key={`slide-${item.houseName}`}
                                        id={`slide-${item.houseName}`}
                                        data-house-name={item.houseName}
                                        onClick={() => handleClickTitle(item.houseName)}
                                    >
                                        <div className={styles.slide__content}>
                                            {item.link && (
                                                <Link className={styles.slide__content_icon} href={item.link}>
                                                    <SvgIcons id='circle-open-brick' />
                                                </Link>
                                            )}
                                            <span className={styles.slide__content_text}>{item.text}</span>
                                            <span className={styles.slide__content_title}>{item.houseName}</span>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </motion.div>
                    {(isTablet || width < widthTablet) && (
                        <>
                            <button className={`arrow__prev ${styles.arrow} ${styles.arrow__prev}`} onClick={handlePrev}>
                                <SvgIcons id={'arrow down outline dark'} />
                            </button>
                            <button className={`arrow__next ${styles.arrow} ${styles.arrow__next}`} onClick={handleNext}>
                                <SvgIcons id={'arrow up outline dark'} />
                            </button>
                        </>
                    )}
                    <div className={styles.aside}>
                        <AsideModal
                            direction={'left'}
                            show={showModal}
                            bgColor={'light'}
                            childrenBottom1={
                                <span className={styles.modal__text} dangerouslySetInnerHTML={{ __html: builds[activeNumber].text }} />
                            }
                            childrenBottom2={<span className={styles.modal__number}>{builds[activeNumber].id}</span>}
                            childrenTop={
                                <ImageModalCard
                                    useImg
                                    src={builds[activeNumber].img}
                                    text={builds[activeNumber].title}
                                    textStyle='h4'
                                    objectFit='cover'
                                />
                            }
                        />
                        {/* Предзагрузка картинок выше */}
                        {builds.map((item) => (
                            <img src={item.img} alt={item.img} style={{ display: 'none' }} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default HousesSection;
