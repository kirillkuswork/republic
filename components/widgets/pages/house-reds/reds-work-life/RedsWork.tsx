import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar, Navigation, Pagination, Mousewheel } from 'swiper';
import IconButton from '../../../../features/buttons/icon-button/IconButton';
import RedsWorkLive from '../../../../svgs/RedsWorkLive/RedsWorkLive';
import SvgIcons from '../../../../svgs/SvgIcons';
import AsideModal from '../../../modal/aside-modal/AsideModal';
import AsideModalMobile from '../../../modal/aside-modal-mobile/AsideModalMobile';
import ImageModalCard from '../../../cards/image-modal-card/ImageModalCard';
import { useAppSelector } from '../../../../../hook';
import getScaledSizeSecond from '../../../../../tools/getScaledSizeSecond';
import { useInView } from 'framer-motion';

import styles from './RedsWork.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

import image1 from './../../../../../public/images/houses/house-reds/reds-rooms-option1-1.jpg';
import image2 from './../../../../../public/images/houses/house-reds/reds-rooms-option1-2.jpg';
import image3 from './../../../../../public/images/houses/house-reds/reds-rooms-option1-3.jpg';
import image4 from './../../../../../public/images/houses/house-reds/reds-rooms-option1-4.jpg';
import image5 from './../../../../../public/images/houses/house-reds/reds-rooms-option1-5.jpg';

import image6 from './../../../../../public/images/houses/house-reds/reds-rooms-option2-1.jpg';
import image7 from './../../../../../public/images/houses/house-reds/reds-rooms-option2-2.jpg';
import image8 from './../../../../../public/images/houses/house-reds/reds-rooms-option2-3.jpg';
import image9 from './../../../../../public/images/houses/house-reds/reds-rooms-option2-4.jpg';
import image10 from './../../../../../public/images/houses/house-reds/reds-rooms-option2-5.jpg';

SwiperCore.use([Scrollbar, Mousewheel, Pagination, Navigation]);

export interface RedsWork {}

const RedsWork: React.FC<RedsWork> = ({}) => {
    const [activeOptionIndex, setActiveOptionIndex] = useState<number>(0);
    const [activeRoom, setActiveRoom] = useState<number>(0);
    const options = [
        { id: 1, src: '/images/houses/house-reds/reds-worklive-option1.png' },
        { id: 2, src: '/images/houses/house-reds/reds-worklive-option2.png' },
    ];
    const rooms = [
        {
            id: 1,
            number: 1,
            option: 1,
            title: 'Мастер-спальня',
            description: 'Мастер-спальня с&nbsp;ванной комнатой и&nbsp;окном увеличенного формата',
            top: '28.16%',
            left: '18.09%',
            image: image1,
        },
        {
            id: 2,
            number: 2,
            option: 1,
            title: 'гостиная</br> и кухня',
            description: 'Просторная кухня-гостиная, располагающая к&nbsp;приготовлению кулинарных шедевров',
            top: '28.67%',
            left: '51.06%',
            image: image2,
        },
        {
            id: 3,
            number: 3,
            option: 1,
            title: 'ванная комната',
            description: 'Ванная комната с&nbsp;душевой и&nbsp;стеклянными перегородками',
            top: '40.47%',
            left: '62.02%',
            image: image3,
        },
        {
            id: 4,
            number: 4,
            option: 1,
            title: 'студия',
            description: 'Просторный зал для проведения как индивидуальных тренировок, так и&nbsp;занятий в&nbsp;небольших группах',
            top: '74.2%',
            left: '17.34%',
            image: image4,
        },
        {
            id: 5,
            number: 5,
            option: 1,
            title: 'лобби',
            description: 'Приватное лобби, отделенное от&nbsp;жилой зоны',
            top: '75.04%',
            left: '48.94%',
            image: image5,
        },

        {
            id: 6,
            number: 1,
            option: 2,
            title: 'Спальня',
            description: 'Светлая спальня с&nbsp;рабочей зоной и&nbsp;окном увеличенного формата',
            top: '33.16%',
            left: '14.09%',
            image: image6,
        },
        {
            id: 7,
            number: 2,
            option: 2,
            title: 'мастер-спальня',
            description: 'Функциональная мастер-спальня c&nbsp;личной ванной и&nbsp;просторной гардеробной',
            top: '32.67%',
            left: '31.06%',
            image: image7,
        },
        {
            id: 8,
            number: 3,
            option: 2,
            title: 'ванная комната',
            description: 'Просторная ванная комната с&nbsp;окном',
            top: '41.47%',
            left: '66.02%',
            image: image8,
        },
        {
            id: 9,
            number: 4,
            option: 2,
            title: 'РАБОЧАЯ ЗОНА',
            description: 'Рабочая зона на&nbsp;первом этаже для проведения индивидуальных консультаций',
            top: '73.2%',
            left: '10.34%',
            image: image9,
        },
        {
            id: 10,
            number: 5,
            option: 2,
            title: 'гостиная</br> и кухня',
            description: 'Эргономичная кухня-гостиная с&nbsp;выделенной столовой зоной для уютных семейных вечеров',
            top: '82.04%',
            left: '36.94%',
            image: image10,
        },
    ];
    const openRoom = (num: number) => {
        setActiveRoom(num);
    };

    const width = useAppSelector((state) => state.main.width);

    const workTitleRef = React.useRef<HTMLDivElement>(null);
    const workDescrRef = React.useRef<HTMLDivElement>(null);
    const isInViewTitle = useInView(workTitleRef, { once: true });
    const isInViewDescr = useInView(workDescrRef, { once: true });

    const handleCloseModalMobile = () => {
        setActiveRoom(0);
    };

    return (
        <section className={`${styles.container} redsWorkLive`}>
            <div className={styles.textSection}>
                <div className={styles.title} ref={workTitleRef}>
                    <div
                        style={{
                            transform: isInViewTitle ? 'none' : `translateX(${getScaledSizeSecond(-550, width)}px)`,
                            transition: 'all 0.9s ease 0.1s',
                        }}
                    >
                        work&nbsp;
                    </div>
                    <div
                        className={styles.titleColor}
                        style={{
                            transform: isInViewTitle ? 'none' : `translateX(${getScaledSizeSecond(1200, width)}px)`,
                            transition: 'all 0.9s ease 0.1s',
                        }}
                    >
                        &amp;&nbsp;live
                    </div>
                </div>
                <div
                    className={styles.description}
                    style={{
                        opacity: isInViewDescr ? 1 : 0,
                        transition: 'all 0.9s ease 0.1s',
                    }}
                    ref={workDescrRef}
                >
                    Со&nbsp;стороны двора первые этажи заняты двухэтажными апартаментами в&nbsp;концепции Work&amp;Live:
                    наверху&nbsp;&mdash; жилые комнаты, внизу&nbsp;&mdash; рабочие пространства.
                </div>
            </div>
            <Swiper
                className={`${styles.slider} redsWorkLiveSlider`}
                modules={[Navigation, Scrollbar, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                    renderBullet: function (index, className) {
                        return `<div class=${className} ><span class="pagination-text">Опция</span> ${index + 1}</div>`;
                    },
                }}
                mousewheel={{ forceToAxis: true }}
                loop={false}
                initialSlide={0}
                onSlideChange={(swiperCore) => {
                    const index = swiperCore.activeIndex;
                    setActiveOptionIndex(index);
                }}
                navigation={{
                    prevEl: '#reds_work_slider_prev',
                    nextEl: '#reds_work_slider_next',
                }}
            >
                <AnimatedIconButton
                    id='reds_work_slider_prev'
                    type={'button'}
                    variant='round'
                    outline={false}
                    color={'dark-grey-brick'}
                    direction='left'
                    className={
                        activeOptionIndex === 0 ? `arrow-prev-worklive ${styles.disabled}` : `arrow-prev-worklive ${styles.arrowPrev}`
                    }
                >
                    <SvgIcons id={'arrow left'} />
                </AnimatedIconButton>

                <AnimatedIconButton
                    id='reds_work_slider_next'
                    type={'button'}
                    variant='round'
                    outline={false}
                    color={'dark-grey-brick'}
                    direction='right'
                    className={
                        activeOptionIndex === options.length - 1
                            ? `arrow-next-worklive ${styles.disabled}`
                            : `arrow-next-worklive ${styles.arrowNext}`
                    }
                >
                    <SvgIcons id={'arrow right'} />
                </AnimatedIconButton>

                {options.map((option, index) => (
                    <SwiperSlide className={styles.slide} key={index}>
                        <div className={styles.imgNumDiv}>
                            <img src={option.src} alt={''} className={styles.img} />
                            <RedsWorkLive id={activeRoom} />
                            {rooms
                                .filter((el) => el.option === option.id)
                                .map((room, index) => (
                                    <div
                                        key={index}
                                        className={styles.number}
                                        style={{
                                            top: room.top,
                                            left: room.left,
                                        }}
                                        onClick={() => openRoom(room.id)}
                                        onMouseEnter={() => {
                                            if (width > 540) openRoom(room.id);
                                        }}
                                        onMouseLeave={() => {
                                            if (width > 540) openRoom(0);
                                        }}
                                    >
                                        <IconButton type='number'>
                                            <div>{room.number}</div>
                                        </IconButton>
                                    </div>
                                ))}
                        </div>
                        <img
                            src={options[index + 1]?.src}
                            alt={''}
                            className={
                                activeOptionIndex === index
                                    ? options[index + 1]?.src
                                        ? styles.imgSmallRight
                                        : styles.disabled
                                    : styles.disabled
                            }
                        />
                        <img
                            src={options[index - 1]?.src}
                            alt={''}
                            className={
                                activeOptionIndex === index
                                    ? options[index - 1]?.src
                                        ? styles.imgSmallLeft
                                        : styles.disabled
                                    : styles.disabled
                            }
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            {width > 540 && (
                <AsideModal
                    direction={'right'}
                    show={!!activeRoom}
                    // show={true}
                    bgColor={'light'}
                    childrenBottom1={
                        <div
                            className={styles.roomDescription}
                            dangerouslySetInnerHTML={{ __html: rooms.filter((room) => room.id === activeRoom)[0]?.description || '' }}
                        />
                    }
                    childrenBottom2={
                        <div className={styles.roomNumber}>{rooms.filter((room) => room.id === activeRoom)[0]?.number || ''}</div>
                    }
                    childrenTop={
                        <ImageModalCard
                            src={rooms.filter((room) => room.id === activeRoom)[0]?.image}
                            text={rooms.filter((room) => room.id === activeRoom)[0]?.title || ''}
                            textStyle={'h4'}
                        />
                    }
                />
            )}

            {width <= 540 && (
                <AsideModalMobile
                    show={!!activeRoom}
                    close={handleCloseModalMobile}
                    bgColor={'light'}
                    title={rooms.filter((room) => room.id === activeRoom)[0]?.title || ''}
                    text={rooms.filter((room) => room.id === activeRoom)[0]?.description || ''}
                    number={rooms.filter((room) => room.id === activeRoom)[0]?.number?.toString() || ''}
                    img={rooms.filter((room) => room.id === activeRoom)[0]?.image || ''}
                    setActiveRoom={setActiveRoom}
                    activeRoom={activeRoom}
                    roomMaxNum={activeOptionIndex === 0 ? 5 : 10}
                    roomMinNum={activeOptionIndex === 0 ? 1 : 6}
                />
            )}
        </section>
    );
};

export default RedsWork;
