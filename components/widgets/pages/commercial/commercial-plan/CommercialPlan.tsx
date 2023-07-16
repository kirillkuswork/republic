import React, { useCallback, useEffect, useState } from 'react';
import styles from './CommercialPlan.module.scss';
import SVG from 'react-inlinesvg';
import Image from 'next/image';
import Compass from '../../../../shared/compass/Compass';
import { setCurrentBulk } from '../../../../../store/slices/catalog/catalogSlice';
import ROUTES from '../../../../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import { getAllFlats } from '../../../../../store/slices/selectors';
import { fetchCatalog } from '../../../../../store/api/api';
import SvgIcons from '../../../../svgs/SvgIcons';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import SwiperCore from 'swiper';
import { housesSlides } from '../../../../../constants/houses';

export interface ICommercialPlan {}

const CommercialPlan: React.FC<ICommercialPlan> = ({}) => {
    const dispatch = useAppDispatch();
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const width = useAppSelector((state) => state.main.width);
    const flats = useAppSelector(getAllFlats);
    const [activeSlide, setActiveSlide] = useState(0);
    const [swiperRef, setSwiperRef] = useState<SwiperCore>();
    const [activeHouseName, setActiveHouseName] = useState('');

    useEffect(() => {
        //Запрос каталога в случае, если в слайсе нет данных о квартирах
        if (flats.length === 0) {
            dispatch(fetchCatalog());
        }
    }, [dispatch, flats.length]);

    const labels = [
        {
            text: 'детский сад',
            id: 1,
        },
        { text: 'термы & spa', id: 2 },
        { text: 'шоппинг-аллея', id: 3 },
        { text: 'гастрономический центр', id: 4 },
    ];

    const labelElements = labels.map((item) => {
        return (
            <span className={`${styles.label} ${styles[`label_${item.id}`]}`} id={`label-${item.id}`} key={`label-${item.id}`}>
                {item.text}
            </span>
        );
    });

    const beforeSvgInjection = () => {
        const svg = document.getElementById('plan');
        if (!svg) return;
        //Получаем список элементов домов
        let housesGroup = [...Array.from(svg.children)].find((item) => item.id === 'mask');
        if (housesGroup) {
            let houses = [...Array.from(housesGroup.children)];
            if (!houses) return;
            houses.forEach((item) => {
                item.setAttribute('data-section-id', item.id);
                item.classList.add('building-scheme__build');
                if (flats.length !== 0) {
                    //Проверяем есть ли по данному houseName квартиры
                    let filteredByBulk = flats.filter((flat) => flat.houseName.toLowerCase() === item.id.toString());
                    let currentBulkId: number;
                    let anyFlat = filteredByBulk.find((flat) => flat.houseName.toLowerCase() === item.id.toString());
                    if (anyFlat) {
                        currentBulkId = anyFlat.bulk_id;
                    }

                    if (filteredByBulk.length !== 0) {
                        //Активные секции
                        item.classList.remove('building-scheme__build');
                        item.classList.add('building-scheme__build_enable');
                        // showActiveLabel(item.id);
                        // item.addEventListener('mouseenter', () => {
                        //     setShowModal(true);
                        //     dispatch(setCurrentBulk(item.id));
                        // });
                        // item.addEventListener('mouseleave', () => {
                        //     setShowModal(false);
                        // });
                        // item.addEventListener('click', () => {
                        //     router.push(`${ROUTES.visual.root}/${currentBulkId}`);
                        // });
                    }
                }
            });
        }
    };

    const removeActiveHouse = () => {
        const svg = document.getElementById('plan');
        if (!svg) return;
        const svgElements = [...Array.from(svg?.children || [])].filter((item) => item.id !== 'style' && item.id !== 'builds');
        const arr = svgElements.find((item) => item.id === 'mask');
        [...Array.from(arr?.children || [])].forEach((item) => item.classList.remove('active'));
    };

    const handleSlideChange = (idx: number) => {
        const house = housesSlides.find((slide) => slide.id === idx);
        handleClickTitle(house?.houseName || '');
    };

    const handleClickTitle = (houseName: string) => {
        removeActiveHouse();
        const house = document.getElementById(houseName);
        if (house) {
            house.classList.add('active');
            setActiveHouseName(houseName);
        }
    };

    const handlePrev = useCallback(() => {
        if (!swiperRef) return;
        swiperRef.slidePrev();
    }, [swiperRef]);

    const handleNext = useCallback(() => {
        if (!swiperRef) return;
        swiperRef.slideNext();
    }, [swiperRef]);

    return (
        <div className={styles.container}>
            <section className={`${styles.section}`}>
                <h1 className={styles.title}>выберите дом</h1>
                <div className={styles.scheme}>
                    <SVG src={'/plans/building-scheme.svg'} className={'building-scheme'} onLoad={() => beforeSvgInjection()} id={'plan'} />
                    <Image src={'/plans/building-img-light.jpg'} alt={''} className={styles.image} fill={true} />
                    <div className={styles.labels}>{labelElements}</div>
                </div>
                {width > widthTablet && (
                <div className={styles.icon}>
                    <Compass />
                </div>
                )}
                {width < widthTablet && (
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
                            loop={true}
                            initialSlide={activeSlide}
                            onSlideChange={(e) => handleSlideChange(e.activeIndex)}
                            direction={'vertical'}
                        >
                            {housesSlides.map((item) => {
                                return (
                                    <SwiperSlide
                                        className={`${styles.slide}`}
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
                )}
            </section>
        </div>
    );
};

export default CommercialPlan;
