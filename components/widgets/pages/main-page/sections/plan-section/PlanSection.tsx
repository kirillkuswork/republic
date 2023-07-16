import React, { useEffect, useRef, useState } from 'react';
import styles from './PlanSection.module.scss';
import { IAnimation, transition1200 } from '../../../../../shared/page-scroll/animation_helpers';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import ROUTES from '../../../../../../constants/routes';
import SVG from 'react-inlinesvg';
import Image from 'next/image';
import SwiperCore, { FreeMode } from 'swiper';
import { isTablet, isMobile } from 'react-device-detect';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Link from 'next/link';
import { useAppSelector } from '../../../../../../hook';
import AsideModal from '../../../../modal/aside-modal/AsideModal';
import ImageModalCard from '../../../../cards/image-modal-card/ImageModalCard';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import AnimatedIconButton from '../../../../../features/buttons/animated-icon-button/AnimatedIconButton';

type PlanAnimations = {
    [key in 'plan']?: IAnimation;
};

const initial: PlanAnimations = {
    plan: {
        initial: { y: 0 },
        animate: { y: 200 },
        transition: transition1200,
    },
};
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
		img: '/images/main/kindergarten.jpg',
		title: 'Детский сад',
		text: 'Целый мир в&nbsp;стенах здания 1880 года.Пространство досугового центра, рассчитанное на&nbsp;125&nbsp;мест, даёт простор для творчества и&nbsp;развития благодаря разнообразию функциональных зон, в&nbsp;которых ребёнок может раскрывать свои индивидуальные способности.',
    },
    {
        id: 2,
		img: '/images/main/terms.jpg',
		title: 'Термы &amp;&nbsp;SPA by&nbsp;Encore',
		text: 'Премиальный фитнес-клуб Encore Fitness с&nbsp;водно-термальным комплексом&nbsp;&mdash; главное wellness-пространство Republic. Бассейн, сауны, фитнес-зона и&nbsp;всё, что нужно для перезагрузки.',
    logo: '/images/main-page/logo-encore.svg',
	},
	{
		id: 3,
        img: '/images/main/shopping.jpg',
        title: 'Шоппинг-аллея',
        text: 'Своя Пятая Авеню в&nbsp;самом сердце Москвы&nbsp;&mdash; с&nbsp;бутиками локальных брендов, event-зоной и&nbsp;поп-арт-пространством. Подбирайте аутфиты, не&nbsp;покидая территорию Republic.',
    },
    {
        id: 4,
		img: '/images/main/gastrocenter.jpg',
		title: 'Гастрономический центр',
		text: 'Здесь премиальные рестораны соседствуют с&nbsp;национальной кухней, энотеки&nbsp;&mdash; со&nbsp;стритфудом, а&nbsp;гастромаркет и&nbsp;кулинарная школа ждут тех, кто готов пробовать новое.',
    },
    {
        id: 5,
		img: '/images/main/business.jpg',
        title: 'Бизнес центр',
        text: '',
    },
    {
        id: 6,
		img: '/images/main/lowBoulevard.jpg',
		title: 'Низкий бульвар',
		text: 'Идеальное место для тех, кто любит камерную атмосферу и&nbsp;неспешные прогулки. Тут хорошо устраивать свидания или пить утренний кофе в&nbsp;уютных французских кафе.',
	},
	{
		id: 7,
        img: '/images/main/highBoulevard.jpg',
        title: 'Высокий бульвар',
        text: 'Проложен по&nbsp;историческому Камер-Коллежскому валу и&nbsp;ведёт к&nbsp;гастрономическому центру: здесь встречаются с&nbsp;друзьями и&nbsp;устраивают бар-хоппинг до&nbsp;утра.',
    },
    {
        id: 8,
        img: '/images/main/cathedralSquare.jpg',
        title: 'Сборная площадь',
        text: 'Сердце общественной жизни квартала. Из&nbsp;поп-ап-бара&nbsp;&mdash; на&nbsp;сезонную ярмарку, чтобы купить фермерские деликатесы, а&nbsp;оттуда&nbsp;&mdash; любоваться палитрой фестиваля цветов.',
    },
];

const housesForSale = ['reds', 'platinum'];

const PlanSection: React.FC<{}> = ({}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });
    const smoothY = useSpring(scrollYProgress, { damping: 15, mass: 0.27, stiffness: 55 });
    const planY = useTransform(smoothY, [0.0, 0.8], [200, 0]);
    const width = useAppSelector((state) => state.main.width);
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const [activeNumber, setActiveNumber] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [hoverHouseName, setHoverHouseName] = useState<string>('');
    const [activeHouseName, setActiveHouseName] = useState<string>('');
    const [disabledHouseName, setDisabledHouseName] = useState(false);
    const [swiperRef, setSwiperRef] = useState<SwiperCore>();
    const [activeSlide, setActiveSlide] = useState<number | null>(null);

    const removeActiveHouse = () => {
        const svg = document.getElementById('plan');
        if (!svg) return;
        const svgElements = [...Array.from(svg?.children || [])].filter((item) => item.id !== 'style' && item.id !== 'builds');
        const arr = svgElements.find((item) => item.id === 'mask');
        [...Array.from(arr?.children || [])].forEach((item) => item.classList.remove('active'));
    };
    const beforeSvgInjection = () => {
        const svg = document.getElementById('plan');
        if (!svg) return;
        //Получаем список элементов домов
        let svgElements = [...Array.from(svg.children)];
        const numbers = svgElements.find((item) => item.id === 'numbers');
        const houses = svgElements.find((item) => item.id === 'mask');

        if (!houses) return;

        [...Array.from(houses.children)].forEach((item) => {
            item.setAttribute('data-section', item.id);
            const style = housesForSale.includes(item.id) ? 'building-scheme__build_enable' : 'building-scheme__build_not-sale';
            item.classList.add(style);

            // item.addEventListener('mouseenter', () => {
            //     setHoverHouseName(item.id);
            // });

            item.addEventListener(!isTablet ? 'click' : 'mouseenter', () => {
				removeActiveHouse();
				const house = document.getElementById(item.id);
				house?.classList.add('active');
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

    const handleClickTitle = (houseName: string) => {
        removeActiveHouse();
        const house = document.getElementById(houseName);
        if (house) {
            house.classList.add('active');
            setActiveHouseName(houseName);
        }
    };
    const handleSlideChange = (idx: number) => {
        if (!isTablet) return;
		// const house = slides.find((slide) => slide.id === idx);
		// handleClickTitle(house?.houseName || '');
    };
    useEffect(() => {
        if (!hoverHouseName) return;
        setHoverHouseName('');
        if (hoverHouseName === activeHouseName) return;
        removeActiveHouse();
    }, [hoverHouseName, activeHouseName]);

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

    return (
        <motion.section className={styles.section} ref={sectionRef}>
            <div className={styles.section__titles}>
                <div className={styles.section__title}>
                    жить в архитектурном
                    <br />
                    парке
                </div>
                <div className={styles.section__button}>
                    <AnimatedSimpleButton
                        text={'о проекте'}
                        link={ROUTES.about}
                        theme='dark-outline'
                        withIcon
                        iconAnimation={'right'}
                        iconPosition={'right'}
                        size={'default'}
                    >
                        <SvgIcons id='arrow right' />
                    </AnimatedSimpleButton>
                </div>
                {width <= widthTablet && (
                    <div className={styles.section__disclaimer}>
                        <span>Можно двигать</span>
                        <SvgIcons id={'arrows-scroll'} />
                    </div>
                )}
            </div>
            <motion.div className={styles.plan} {...initial.plan} style={{ y: planY }}>
                <SVG src={'/images/main-page/mask_plan.svg'} id={'plan'} className={styles.svg} onLoad={() => beforeSvgInjection()} />
				<Image src={'/images/main-page/plan_2.png'} alt={''} className={styles.plan__image} fill={true} />
            </motion.div>
            <div className={styles.slider_container}>
                <Swiper
                    onSwiper={(swiper) => {
                        setSwiperRef(swiper);
                    }}
                    navigation={{
                        prevEl: '.arrow__prev',
                        nextEl: '.arrow__next',
                    }}
                    modules={[FreeMode]}
                    slidesPerView='auto'
                    className={styles.slider}
                    resistanceRatio={0}
                    freeMode={width > widthTablet}
                    initialSlide={activeSlide ?? 0}
					loop={!isTablet}
                    onSlideChange={(e) => handleSlideChange(e.realIndex)}
					direction={width > widthTablet ? 'vertical' : 'horizontal'}
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
                                      <div className={styles.slide__content_icon}>
                                        <AnimatedIconButton
                                            type={'Link'}
                                            variant='round'
                                            outline={false}
                                            color={'brick'}
                                            direction='up'
                                            href={item.link}
                                        >
                                            <SvgIcons id={'plus'} />
                                        </AnimatedIconButton>
                                        {!isMobile &&
                                            <div className={styles.slide__content_icon_text}>Смотреть</div>
                                        }
                                      </div>
                                    )}
                                    <span className={styles.slide__content_text}>{item.text}</span>
                                    <span className={styles.slide__content_title}>{item.houseName}</span>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
				{/* {width < widthTablet && (
                    <>
                        <button className={`arrow__prev ${styles.arrow} ${styles.arrow__prev}`}>
                            <SvgIcons id={'arrow down outline dark'} />
                        </button>
                        <button className={`arrow__next ${styles.arrow} ${styles.arrow__next}`}>
                            <SvgIcons id={'arrow up outline dark'} />
                        </button>
                    </>
                )} */}
            </div>
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
                            isMain={true}
                            logo={builds[activeNumber].logo}
                        />
                    }
                />
                {/* Предзагрузка картинок выше */}
                {builds.map((item) => (
                    <img src={item.img} alt={item.img} style={{ display: 'none' }} />
                ))}
            </div>
        </motion.section>
    );
};

export default PlanSection;
