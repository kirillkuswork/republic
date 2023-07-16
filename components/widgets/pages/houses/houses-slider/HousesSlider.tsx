import React, { useEffect, useState } from 'react';
import styles from './HousesSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import SwiperCore, { Scrollbar, Mousewheel } from 'swiper';
// import SwiperClass from 'swiper/types/swiper-class';
import HousesCard from '../houses-card/HousesCard';
import { useAppSelector } from '../../../../../hook';
import SvgIcons from '../../../../svgs/SvgIcons';

SwiperCore.use([Scrollbar, Mousewheel]);

export interface HousesSlider {
    activeHouse: string;
    setActiveHouse: any;
    activeSlideIndex: number;
    setActiveSlideIndex: any;
}

const BaseTemplate: React.FC<HousesSlider> = ({ activeHouse, setActiveHouse, activeSlideIndex, setActiveSlideIndex }) => {
    const houses = useAppSelector((state) => state.main.sections);

    const [swiper, setSwiper] = useState<any>();
    useEffect(() => {
        let slide = houses.find((el) => el.name === activeHouse) || { name: '', architect: '', img: '' };
        let slideIndex = houses.indexOf(slide);
        if (swiper) {
            swiper.slideTo(slideIndex);
        }
        setActiveSlideIndex(slideIndex);
    }, [activeHouse]);

    useEffect(() => {
        if (activeSlideIndex < houses.length && activeSlideIndex >= 0) {
            setActiveHouse(houses[activeSlideIndex].name);
        }
        if (swiper) {
            swiper.slideTo(activeSlideIndex);
        }
    }, [activeSlideIndex]);

    return (
        <div className={styles.container}>
            <Swiper
                onSwiper={(swiper) => setSwiper(swiper)}
                className={`${styles.slider} houses-slider`}
                modules={[Navigation, Scrollbar]}
                spaceBetween={20}
                slidesPerView={'auto'}
                // scrollbar={{ draggable: true, dragSize: 24 }}
                mousewheel={{ forceToAxis: true }}
                onSlideChange={(swiperCore) => {
                    const index = swiperCore.realIndex;
                    setActiveHouse(houses[index].name);
                    setActiveSlideIndex(index);
                }}
                navigation={{
                    prevEl: '.arrow-prev-houses',
                    nextEl: '.arrow-next-houses',
                }}
                initialSlide={0}
                loop={false}
                // speed={5000}
            >
                {houses.map((el, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <HousesCard house={el} setActiveHouse={setActiveHouse} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div
                className={activeSlideIndex === houses.length - 1 ? styles.disabled : styles.nextSlide}
                onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}
            ></div>
            <div
                className={activeSlideIndex === 0 ? styles.disabled : styles.prevSlide}
                onClick={() => setActiveSlideIndex(activeSlideIndex - 1)}
            ></div>
        </div>
    );
};

export default BaseTemplate;
