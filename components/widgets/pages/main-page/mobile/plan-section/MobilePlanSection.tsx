import React, { useCallback, useEffect, useRef, useState } from 'react';
import SimpleButton from '../../../../../features/buttons/simple-button/SimpleButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import ROUTES from '../../../../../../constants/routes';
import SVG from 'react-inlinesvg';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import AsideModalMobile from '../../../../modal/aside-modal-mobile/AsideModalMobile';
import { useAppSelector } from '../../../../../../hook';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MobilePlanSection.module.scss';
import { housesSlidesLoop } from '../../../../../../constants/houses';

// install Swiper modules
SwiperCore.use([Navigation]);

const builds = [
	{
		id: '0',
		img: '',
		title: '',
		text: '',
	},
	{
		id: '1',
		img: '/images/main/kindergarten.jpg',
		title: 'Детский сад',
		text: 'Целый мир в&nbsp;стенах здания 1880 года.Пространство досугового центра, рассчитанное на&nbsp;125&nbsp;мест, даёт простор для творчества и&nbsp;развития благодаря разнообразию функциональных зон, в&nbsp;которых ребёнок может раскрывать свои индивидуальные способности.',
	},
	{
		id: '2',
		img: '/images/main/terms.jpg',
		title: 'Термы &amp;&nbsp;SPA by&nbsp;Encore',
		text: 'Премиальный фитнес-клуб Encore Fitness с&nbsp;водно-термальным комплексом&nbsp;&mdash; главное wellness-пространство Republic. Бассейн, сауны, фитнес-зона и&nbsp;всё, что нужно для перезагрузки.',
    logo: '/images/main-page/logo-encore.svg',
	},
	{
		id: '3',
		img: '/images/main/shopping.jpg',
		title: 'Шоппинг-аллея',
		text: 'Своя Пятая Авеню в&nbsp;самом сердце Москвы&nbsp;&mdash; с&nbsp;бутиками локальных брендов, event-зоной и&nbsp;поп-арт-пространством. Подбирайте аутфиты, не&nbsp;покидая территорию Republic.',
	},
	{
		id: '4',
		img: '/images/main/gastrocenter.jpg',
		title: 'Гастрономический центр',
		text: 'Здесь премиальные рестораны соседствуют с&nbsp;национальной кухней, энотеки&nbsp;&mdash; со&nbsp;стритфудом, а&nbsp;гастромаркет и&nbsp;кулинарная школа ждут тех, кто готов пробовать новое.',
	},
	{
		id: '5',
		img: '/images/main/business.jpg',
		title: 'Бизнес центр',
		text: '',
	},
	{
		id: '6',
		img: '/images/main/lowBoulevard.jpg',
		title: 'Низкий бульвар',
		text: 'Идеальное место для тех, кто любит камерную атмосферу и&nbsp;неспешные прогулки. Тут хорошо устраивать свидания или пить утренний кофе в&nbsp;уютных французских кафе.',
	},
	{
		id: '7',
		img: '/images/main/highBoulevard.jpg',
		title: 'Высокий бульвар',
		text: 'Проложен по&nbsp;историческому Камер-Коллежскому валу и&nbsp;ведёт к&nbsp;гастрономическому центру: здесь встречаются с&nbsp;друзьями и&nbsp;устраивают бар-хоппинг до&nbsp;утра.',
	},
	{
		id: '8',
		img: '/images/main/cathedralSquare.jpg',
		title: 'Сборная площадь',
		text: 'Сердце общественной жизни квартала. Из&nbsp;поп-ап-бара&nbsp;&mdash; на&nbsp;сезонную ярмарку, чтобы купить фермерские деликатесы, а&nbsp;оттуда&nbsp;&mdash; любоваться палитрой фестиваля цветов.',
	},
];

const housesForSale = ['reds', 'platinum'];

const MobilePlanSection: React.FC<{}> = ({ }) => {
	const width = useAppSelector((state) => state.main.width);
	const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
	const [swiperRef, setSwiperRef] = useState<SwiperCore>();
	const [showModal, setShowModal] = useState(false);
	const [activeNumber, setActiveNumber] = useState(1);
	const [disabledHouseName, setDisabledHouseName] = useState(false);
	const [activeHouseName, setActiveHouseName] = useState('');
	const [activeSlide, setActiveSlide] = useState(0);

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

			item.addEventListener('mouseenter', () => {
				removeActiveHouse();
				setActiveHouseName(item.id);
			});
		});

		if (!numbers) return;

		[...Array.from(numbers.children)].forEach((item) => {
			item.classList.add('building-scheme__house-number');
			const id = item.id.replace('house', '');

			item.addEventListener('click', () => {
				setShowModal(true);
				setActiveNumber(+id);
			});
		});
	};

	//Переход к нужному слайду с названием дома
	useEffect(() => {
		let activeSlide = document.getElementById(`slide-${activeHouseName}`);

		if (activeSlide && swiperRef) {
			const activeSection = activeSlide.id.replace('slide-', '');
			let currentSlide = housesSlidesLoop.find((item) => item.houseName === activeSection);

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
		if (swiperRef.activeIndex === 1) {
			swiperRef.slideTo(housesSlidesLoop.length)
		} else swiperRef.slidePrev();
    }, [swiperRef]);

    const handleNext = useCallback(() => {
        if (!swiperRef) return;
		if (swiperRef.activeIndex === housesSlidesLoop.length) {
			swiperRef.slideTo(1)
		} else swiperRef.slideNext();
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

    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const smoothY = useSpring(scrollYProgress, { damping: 15, mass: 0.27, stiffness: 55 });
    const planY = useTransform(smoothY, [0.0, 0.5], [200, 0]);

    const handleCloseModalMobile = () => {
        setShowModal(false);
        setActiveNumber(0);
    };

    const handleSlideChange = (idx: number) => {
        const house = housesSlidesLoop.find((slide) => slide.id === idx);
        handleClickTitle(house?.houseName || '');
    };

    return (
        <>
            <motion.section className={`${styles.wrapper} ${showModal ? styles.hideScroll : ''}`} id='house_wrapper' ref={sectionRef}>
                <div className={styles.houses_wrapper} id='houses_section'>
                    <div className={styles.houses_wrapper__block}>
                        <div className={styles.houses_wrapper__titles}>
                            <h4 className={styles.title}>
                                Жить в <br />
                                архитектурном парке
                            </h4>
                            {width < widthTablet && (
                                <div className={styles.disclaimer}>
                                    <span>Можно двигать</span>
                                    <SvgIcons id={'arrows-scroll'} />
                                </div>
                            )}
                            <div className={styles.button}>
                                <SimpleButton
                                    text='о проекте'
                                    type='Link'
                                    link={ROUTES.about}
                                    outline={true}
                                    color={'dark-grey'}
                                    size={'medium'}
                                    children={<SvgIcons id={'arrow next dark small'} />}
                                />
                            </div>
                        </div>
                    </div>
                    <motion.div className={styles.scheme_slider_wrapper} style={{ y: planY }}>
                        <div className={styles.scheme}>
							<Image src={'/images/main-page/plan_2.png'} alt={''} className={styles.image} fill={true} sizes={'100vw'} />
                            <SVG src={'/images/main-page/mask_plan.svg'} id={'plan'} onLoad={() => beforeSvgInjection()} />
                        </div>
                    </motion.div>
                    <div className={styles.slider_wrapper}>
                        <button className={`arrow__prev ${styles.arrow} ${styles.arrow__prev}`} onClick={handlePrev}>
                            <SvgIcons id={'arrow down outline dark'} />
                        </button>
                        <Swiper
                            onSwiper={(swiper) => {
                                setSwiperRef(swiper);
                            }}
                            className={styles.slider}
                            resistanceRatio={0}
							// freeMode={width > widthTablet}
                            loop={true}
                            initialSlide={activeSlide}
							// onSlideChange={(e) => handleSlideChange(e.realIndex)}
							onSlideChange={(e) => handleSlideChange(e.activeIndex)}
                            direction={'vertical'}
                        >
                            {housesSlidesLoop.map((item) => {
                                return (
                                    <SwiperSlide
                                        className={`${styles.slide} ${disabledHouseName ? styles.disabled : ''}`}
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
                                            <span className={styles.slide__content_title}>{item.houseName}</span>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        <button className={`arrow__next ${styles.arrow} ${styles.arrow__next}`} onClick={handleNext}>
                            <SvgIcons id={'arrow up outline dark'} />
                        </button>
                    </div>
                    <AsideModalMobile
                        show={showModal}
                        close={handleCloseModalMobile}
                        bgColor='light'
                        title={builds[activeNumber].title || ''}
                        text={builds[activeNumber].text || ''}
                        number={builds[activeNumber].id || ''}
                        img={builds[activeNumber].img || ''}
                        setActiveRoom={setActiveNumber}
                        activeRoom={activeNumber}
                        roomMaxNum={8}
                        roomMinNum={1}
                        logo={builds[activeNumber].logo}
                    />
                </div>
            </motion.section>
        </>
    );
};

export default MobilePlanSection;
