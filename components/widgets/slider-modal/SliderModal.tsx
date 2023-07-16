import React, { useEffect, useState } from 'react';
import styles from './SliderModal.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { isMobile } from 'react-device-detect';
import SwiperCore, { Zoom, Scrollbar, Navigation, Mousewheel, Pagination, Keyboard } from 'swiper';
import Modal from 'react-modal';
import SvgIcons from '../../svgs/SvgIcons';
import { useAppSelector } from '../../../hook';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// @ts-ignore
// import { Player, BigPlayButton, ControlBar, PlayToggle, CurrentTimeDisplay, TimeDivider } from 'video-react';
// import 'video-react/dist/video-react.css';
import AnimatedIconButton from '../../features/buttons/animated-icon-button/AnimatedIconButton';

SwiperCore.use([Scrollbar, Mousewheel, Pagination, Keyboard]);

export interface ISliderModal {
    isOpen: boolean;
    setIsOpen: any;
    arrow?: boolean;
    isLoop?: boolean;
    isKeyboardEnabled: boolean;
    firstSlide?: number;
    photos: any;
    descriptions?: any;
    multitype?: boolean;
}

const SliderModal: React.FC<ISliderModal> = ({
    isOpen,
    setIsOpen,
    arrow,
    isLoop,
    isKeyboardEnabled,
    firstSlide,
    photos,
    multitype,
    descriptions,
}) => {
    const height = useAppSelector((state) => state.main.height);
    const width = useAppSelector((state) => state.main.width);
    const [padding, setPadding] = useState('');

    useEffect(() => {
        if (height / 10 < 90) {
            setPadding('90px');
        } else if (width <= 1024) {
            setPadding('14vh');
        } else {
            setPadding('10vh');
        }
    }, [height, width]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    // --- disable body scroll while popup is open ----
    const [scrollY, setScrollY] = useState(0);
    const preventDefault = (e: any) => {
        e.preventDefault();
    };
    useEffect(() => {
        let modal = document.querySelector('.SliderModal');
        if (isOpen) {
            setScrollY(window.scrollY);
            document.documentElement.classList.add('is-locked');
            modal?.classList.add('is-open');
            // block pointer events
            modal?.addEventListener('pointermove', preventDefault);
        } else {
            document.documentElement.classList.remove('is-locked');
            modal?.classList.remove('is-open');
            modal?.removeEventListener('pointermove', preventDefault);
            // restore scroll position
            window.scrollTo(0, scrollY);
        }
    }, [isOpen]);
    // --------

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel='Photo-slider popup'
            className={`SliderModal ${styles.modal}`}
            overlayClassName={styles.overlay}
            ariaHideApp={false}
            // closeTimeoutMS={2000}
        >
            {arrow && (
                <div className={styles.arrows}>
                    <AnimatedIconButton
                        type={'button'}
                        variant={width > 540 ? 'square' : 'round'}
                        outline={width < 540}
                        color={'white'}
                        direction={width > 540 ? 'left' : 'up'}
                        className={`arrow__prev ${styles.arrow__prev} ${styles.arrow}`}
                    >
                        <SvgIcons id={`arrow ${width > 540 ? 'left' : 'up'}`} />
                    </AnimatedIconButton>
                    <AnimatedIconButton
                        type={'button'}
                        variant={width > 540 ? 'square' : 'round'}
                        outline={width < 540}
                        color={'white'}
                        direction={width > 540 ? 'right' : 'down'}
                        className={`arrow__next ${styles.arrow__next} ${styles.arrow}`}
                    >
                        <SvgIcons id={`arrow ${width > 540 ? 'right' : 'down'}`} />
                    </AnimatedIconButton>
                </div>
            )}

            <AnimatedIconButton
                type={'button'}
                variant={width < 541 ? 'round' : 'square'}
                outline={false}
                color={'white-brick'}
                direction='up'
                onClick={toggleModal}
                className={styles.close}
            >
                <SvgIcons id={'close'} />
            </AnimatedIconButton>

            <Swiper
                className={styles.slider}
                modules={[Navigation, Scrollbar, Zoom, Pagination]}
                // zoom={true}

                pagination={{
                    type: 'fraction',
                }}
                spaceBetween={0}
                slidesPerView={1}
                allowTouchMove={false}
                // scrollbar={{ draggable: false, dragSize: 24 }}
                // mousewheel={{ forceToAxis: true }}
                loop={!!isLoop}
                initialSlide={firstSlide}
                navigation={
                    arrow
                        ? {
                              prevEl: '.arrow__prev',
                              nextEl: '.arrow__next',
                          }
                        : undefined
                }
                keyboard={{
                    enabled: isKeyboardEnabled,
                }}
            >
                {!multitype &&
                    photos?.map((url: string, index: number) => (
                        <SwiperSlide key={index} tag={'li'} className={styles.slide}>
                            <React.Fragment key={index}>
                                <div className={styles.slideDiv}>
                                    <TransformWrapper doubleClick={{ disabled: true }}>
                                        {({ zoomIn, zoomOut }) => (
                                            <>
                                                <div className={isMobile ? styles.disabled : styles.tools}>
                                                    <AnimatedIconButton
                                                        type={'button'}
                                                        variant={width < 541 ? 'round' : 'square'}
                                                        outline={width > 541}
                                                        color={'white-brick'}
                                                        direction='up'
                                                        onClick={() => zoomOut()}
                                                        className={styles.tool}
                                                    >
                                                        <SvgIcons id={'minus current color'} />
                                                    </AnimatedIconButton>
                                                    <AnimatedIconButton
                                                        type={'button'}
                                                        variant={width < 541 ? 'round' : 'square'}
                                                        outline={width > 541}
                                                        color={'white-brick'}
                                                        direction='up'
                                                        onClick={() => zoomIn()}
                                                        className={styles.tool}
                                                    >
                                                        <SvgIcons id={'plus'} />
                                                    </AnimatedIconButton>
                                                </div>
                                                <TransformComponent>
                                                    <div className={styles.modalSlideDiv}>
                                                        {descriptions && (
                                                            <div
                                                                className={styles.modalSlideDescr}
                                                                style={{
                                                                    paddingTop: padding,
                                                                    paddingBottom: padding,
                                                                    height: `${height}px`,
                                                                    maxHeight: `${height}px`,
                                                                }}
                                                            >
                                                                <div className={styles.modalSlideDescrTextWrap}>
                                                                    <div className={styles.modalSlideDescrText}>
                                                                        {descriptions[index]?.title}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <img
                                                            src={url}
                                                            alt={''}
                                                            className={styles.modalSlideImg}
                                                            style={{
                                                                paddingTop: padding,
                                                                paddingBottom: padding,
                                                                height: `${height}px`,
                                                                maxHeight: `${height}px`,
                                                            }}
                                                        />
                                                    </div>
                                                </TransformComponent>
                                            </>
                                        )}
                                    </TransformWrapper>
                                </div>
                            </React.Fragment>
                        </SwiperSlide>
                    ))}
                {multitype &&
                    photos.map((item: any, i: number) => {
                        const type = item.type.split('/');
                        if (type[0] !== 'video') {
                            return (
                                <SwiperSlide key={i} tag={'li'} className={styles.slide}>
                                    <React.Fragment key={i}>
                                        <div className={styles.slideDiv}>
                                            <TransformWrapper
                                                doubleClick={{ disabled: true }}
                                                // wheel={{wheelDisabled: true}}
                                            >
                                                {({ zoomIn, zoomOut }) => (
                                                    <>
                                                        <div className={isMobile ? styles.disabled : styles.tools}>
                                                            <AnimatedIconButton
                                                                type={'button'}
                                                                variant={width < 541 ? 'round' : 'square'}
                                                                outline={width > 541}
                                                                color={'white-brick'}
                                                                direction='up'
                                                                onClick={() => zoomOut()}
                                                                className={styles.tool}
                                                            >
                                                                <SvgIcons id={'minus current color'} />
                                                            </AnimatedIconButton>

                                                            <AnimatedIconButton
                                                                type={'button'}
                                                                variant={width < 541 ? 'round' : 'square'}
                                                                outline={width > 541}
                                                                color={'white-brick'}
                                                                direction='up'
                                                                onClick={() => zoomIn()}
                                                                className={styles.tool}
                                                            >
                                                                <SvgIcons id={'plus'} />
                                                            </AnimatedIconButton>
                                                        </div>
                                                        <TransformComponent>
                                                            <div className={styles.modalSlideDiv}>
                                                                {descriptions && (
                                                                    <div
                                                                        className={styles.modalSlideDescr}
                                                                        style={{
                                                                            paddingTop: padding,
                                                                            paddingBottom: padding,
                                                                            height: `${height}px`,
                                                                            maxHeight: `${height}px`,
                                                                        }}
                                                                    >
                                                                        <div className={styles.modalSlideDescrTextWrap}>
                                                                            <div className={styles.modalSlideDescrText}>
                                                                                {' '}
                                                                                {descriptions[i]?.title}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <img
                                                                    src={item.file}
                                                                    alt={''}
                                                                    className={styles.modalSlideImg}
                                                                    style={{
                                                                        paddingTop: padding,
                                                                        paddingBottom: padding,
                                                                        height: `${height}px`,
                                                                        maxHeight: `${height}px`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </TransformComponent>
                                                    </>
                                                )}
                                            </TransformWrapper>
                                        </div>
                                    </React.Fragment>
                                </SwiperSlide>
                            );
                        } else {
                            return (
                                <SwiperSlide key={i} tag={'li'} className={styles.slide}>
                                    <React.Fragment key={i}>
                                        <div className={styles.slideDiv}>
                                            {/* <Player className={styles.modalSlideVideo}>
                                                <source src={item.file} />
                                                <BigPlayButton position='center' />
                                                <ControlBar autoHide={false} disableDefaultControls={true}>
                                                    <PlayToggle />
                                                    <CurrentTimeDisplay order={4.1} />
                                                </ControlBar>
                                            </Player> */}
                                        </div>
                                    </React.Fragment>
                                </SwiperSlide>
                            );
                        }
                    })}
            </Swiper>
        </Modal>
    );
};

export default SliderModal;
