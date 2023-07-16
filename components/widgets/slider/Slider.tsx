import styles from './Slider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore, { Scrollbar, Navigation, Mousewheel } from 'swiper';
import SvgIcons from '../../svgs/SvgIcons';
import { useAppSelector } from '../../../hook';
import { Swiper as SwiperClass } from 'swiper/types';
import AnimatedIconButton from '../../features/buttons/animated-icon-button/AnimatedIconButton';

SwiperCore.use([Scrollbar, Mousewheel]);

export interface ISlider {
    size: 'default' | 'content';
    arrow?: boolean;
    positionArrows?: 'arrows_right' | 'arrows_left' | 'arrows_edge' | 'arrows_center';
    arrowsVariant?: 'square' | 'round';
    isLoop?: boolean;
    slideWidth?: string;
    slideHeight?: string;
    minSlideHeight?: string;
    firstSlide?: number;
    uniqueKey?: string;
    navigationColor?: 'white' | 'dark-grey-brick' | 'white-brick' | 'brick';
    navigationOutline?: boolean;
    onSwiper?: (swiper: SwiperClass) => void;
    children?: React.ReactNode[];
    centerSlide?: boolean;
    onSlideChange?: (index: number) => void;
    simulateTouch?: boolean;
    allowTouchMove?: boolean;
    slidesPerView?: number;
}

const Slider: React.FC<ISlider> = ({
    size,
    arrow,
    navigationColor = 'white',
    navigationOutline = true,
    positionArrows,
    arrowsVariant,
    isLoop,
    slideWidth,
    slideHeight,
    minSlideHeight,
    firstSlide,
    uniqueKey,
    onSwiper,
    children,
    centerSlide,
    onSlideChange,
    simulateTouch,
    allowTouchMove,
    slidesPerView,
}) => {
    //  uniqueKey - передаем если используем более одного слайдера на странице во избежания некорректного поведения кнопок навигации

    const width = useAppSelector((state) => state.main.width);
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);

    //  Создание слайдов
    let sliderElements = [];
    if (children)
        for (let index = 0; index < children.length; index++) {
            sliderElements.push(
                <SwiperSlide
                    key={index}
                    tag={'li'}
                    className={`${styles.slide}`}
                    style={{ width: slideWidth, height: slideHeight, minHeight: minSlideHeight }}
                >
                    {children[index]}
                </SwiperSlide>,
            );
        }

    if (children)
        return (
            <div className={`${styles.container} ${positionArrows ? styles[positionArrows] : ''}`}>
                {arrow && (
                    <div className={styles.arrows} data-id='slider_arrows'>
                        <AnimatedIconButton
                            type={'button'}
                            variant={arrowsVariant || (width > widthTablet ? 'square' : 'round')}
                            outline={navigationOutline}
                            color={navigationColor}
                            direction='left'
                            className={
                                uniqueKey
                                    ? `arrow__prev-${uniqueKey} ${styles.arrow} ${styles.arrow__prev}`
                                    : `arrow__prev ${styles.arrow} ${styles.arrow__prev}`
                            }
                        >
                            <SvgIcons id={'arrow left'} />
                        </AnimatedIconButton>
                        <AnimatedIconButton
                            type={'button'}
                            variant={arrowsVariant || (width > widthTablet ? 'square' : 'round')}
                            outline={navigationOutline}
                            color={navigationColor}
                            direction='right'
                            className={
                                uniqueKey
                                    ? `arrow__next-${uniqueKey} ${styles.arrow} ${styles.arrow__next}`
                                    : `arrow__next ${styles.arrow} ${styles.arrow__next}`
                            }
                        >
                            <SvgIcons id={'arrow right'} />
                        </AnimatedIconButton>
                    </div>
                )}
                <Swiper
                    onSwiper={onSwiper}
                    className={`${styles.slider} ${styles[size]}`}
                    modules={[Navigation, Scrollbar]}
                    spaceBetween={width > widthTablet ? 20 : 10}
                    slidesPerView={slidesPerView ? slidesPerView : 'auto'}
                    // scrollbar={{ draggable: true, dragSize: 24 }}
                    mousewheel={{ forceToAxis: true }}
                    loop={!!isLoop}
                    initialSlide={firstSlide}
                    centeredSlides={centerSlide != undefined ? centerSlide : false}
                    onSlideChange={(swiper) => {
                        onSlideChange && onSlideChange(swiper.realIndex);
                    }}
                    simulateTouch={simulateTouch != undefined ? simulateTouch : true}
                    allowTouchMove={allowTouchMove != undefined ? allowTouchMove : true}
                    navigation={
                        arrow
                            ? {
                                  prevEl: uniqueKey ? `.arrow__prev-${uniqueKey}` : '.arrow__prev',
                                  nextEl: uniqueKey ? `.arrow__next-${uniqueKey}` : '.arrow__next',
                              }
                            : undefined
                    }
                >
                    {sliderElements}
                </Swiper>
            </div>
        );
    return <div></div>;
};

export default Slider;
