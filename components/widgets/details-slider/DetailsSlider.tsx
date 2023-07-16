import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper';
import getScaledSize from '../../../tools/getScaledSize';
import SvgIcons from '../../svgs/SvgIcons';
import styles from './DetailsSlider.module.scss';
import Image from 'next/image';
import AnimatedIconButton from '../../features/buttons/animated-icon-button/AnimatedIconButton';
import { useAppSelector } from '../../../hook';

export interface IDetailsSlider {
    sliderWrapperClass?: string;
    sliderClass?: string;
    sliderImages: Array<string>;
}

const DetailsSlider: React.FC<IDetailsSlider> = ({ sliderImages, sliderWrapperClass, sliderClass }) => {
    const width = useAppSelector((state) => state.main.width);
    const matchesMobile = width <= 540;

    return (
        <div className={`${sliderWrapperClass ? sliderWrapperClass : ''}`}>
            <div className={styles.navigation}>
                <AnimatedIconButton
                    type={'button'}
                    variant='round'
                    outline={true}
                    color={'dark-grey-brick'}
                    direction='left'
                    className={styles.navigation__prev}
                >
                    <SvgIcons id={'arrow left'} />
                </AnimatedIconButton>
                <AnimatedIconButton
                    type={'button'}
                    variant='round'
                    outline={true}
                    color={'dark-grey-brick'}
                    direction='right'
                    className={styles.navigation__next}
                >
                    <SvgIcons id={'arrow right'} />
                </AnimatedIconButton>
            </div>
            <Swiper
                className={`${styles.slider} ${sliderClass ? styles[sliderClass] : ''}`}
                modules={[Navigation, Scrollbar]}
                spaceBetween={getScaledSize(matchesMobile ? 10 : 20, width)}
                slidesPerView={'auto'}
                loop={true}
                controller={{
                    inverse: false,
                    by: 'container',
                }}
                navigation={{
                    prevEl: matchesMobile ? `.${styles.navigation__prev}` : `.${styles.navigation__next}`,
                    nextEl: matchesMobile ? `.${styles.navigation__next}` : `.${styles.navigation__prev}`,
                }}
            >
                {sliderImages.map((slide, index) => (
                    <SwiperSlide className={styles.slide} key={index}>
                        <Image
                            src={slide}
                            fill={true}
                            alt={`изображения слайдера ${index}`}
                            className={styles.img}
                            priority={true}
                            unoptimized={true}
                            sizes='(max-width: 1023px) 100vw, 70vw'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default DetailsSlider;
