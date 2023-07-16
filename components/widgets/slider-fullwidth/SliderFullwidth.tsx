import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Zoom, Scrollbar, Navigation, Mousewheel, Pagination, Keyboard } from 'swiper';
import { motion, useInView, useTransform, useSpring, useScroll } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './SliderFullwidth.module.scss';
import Image from 'next/image';

export interface ISliderFullwidth {
    images: any;
    imgScale?: any;
}

const SliderFullwidth: React.FC<ISliderFullwidth> = ({ images, imgScale }) => {
    console.log('mages.length', images.length);
    return (
        <>
            <Swiper
                className={`${styles.slider} sliderFullWidth`}
                modules={[Navigation, Scrollbar, Zoom, Pagination]}
                pagination={{
                    clickable: true,
                }}
                spaceBetween={0}
                slidesPerView={1}
                allowTouchMove={true}
                mousewheel={{ forceToAxis: true }}
                loop={images.length > 1 ? true : false}
                initialSlide={0}
            >
                {images.map((image: string, index: number) => (
                    <SwiperSlide className={styles.slide} key={index}>
                        <motion.img
                            className={styles.img}
                            src={image}
                            alt=''
                            // fill={true} unoptimized={true}
                            style={{ scale: imgScale }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default SliderFullwidth;
