import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import apiUrls from '../../../../../constants/API';
import styles from './PlatinumLobbyInteriors.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import { useAppSelector } from '../../../../../hook';
import Slider from '../../../slider/Slider';
import SliderModal from '../../../slider-modal/SliderModal';
import RedsSalon from '../../house-reds/reds-salon/RedsSalon';
import { motion, useInView, useTransform, useSpring, useScroll } from 'framer-motion';
import EmptySection from '../../house-page/empty/EmptySection';
import getScaledSizeSecond from '../../../../../tools/getScaledSizeSecond';
import PlatinumGamezone from '../platinum-gamezone/PlatinumGamezone';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import SliderFullwidth from '../../../slider-fullwidth/SliderFullwidth';

export interface PlatinumLobbyInteriors {}

const PlatinumLobbyInteriors: React.FC<PlatinumLobbyInteriors> = ({}) => {
    const [lobbyPhotos, setLobbyPhotos] = useState([]);
    const [lobbyPhotosDay, setLobbyPhotosDay] = useState([]);
    const [lobbyPhotosNight, setLobbyPhotosNight] = useState([]);

    const [lobbyPhotosDescr, setLobbyPhotosDescr] = useState([]);
    const [lobbyPhotosDescrDay, setLobbyPhotosDescrDay] = useState([]);
    const [lobbyPhotosDescrNight, setLobbyPhotosDescrNight] = useState([]);

    const [lobbySlider, setLobbySlider] = useState([]);
    const [lobbySliderDay, setLobbySliderDay] = useState([]);
    const [lobbySliderNight, setLobbySliderNight] = useState([]);
    const [time, setTime] = useState<'day' | 'night'>('night');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [activeImg, setActiveImg] = useState(0);

    useEffect(() => {
        axios.get(apiUrls.urlSliderPlatinumLobbyDay).then((resp) => {
            const lobbyDayData = resp.data.absolutePath;
            setLobbyPhotosDay(lobbyDayData);
            setLobbyPhotosDescrDay(resp.data.descriptions);
        });
    }, []);

    useEffect(() => {
        axios.get(apiUrls.urlSliderPlatinumLobbyNight).then((resp) => {
            const lobbyNightData = resp.data.absolutePath;
            setLobbyPhotosNight(lobbyNightData);
            setLobbyPhotosDescrNight(resp.data.descriptions);
        });
    }, []);

    useEffect(() => {
        axios.get(apiUrls.urlSliderPlatinumLobbySliderDay).then((resp) => {
            const lobbyDayData = resp.data.absolutePath;
            setLobbySliderDay(lobbyDayData);
        });
    }, []);

    useEffect(() => {
        axios.get(apiUrls.urlSliderPlatinumLobbySliderNight).then((resp) => {
            const lobbyNightData = resp.data.absolutePath;
            setLobbySliderNight(lobbyNightData);
        });
    }, []);

    useEffect(() => {
        if (time === 'day') {
            setLobbyPhotos(lobbyPhotosDay);
            setLobbyPhotosDescr(lobbyPhotosDescrDay);
            setLobbySlider(lobbySliderDay);
        } else if (time === 'night') {
            setLobbyPhotos(lobbyPhotosNight);
            setLobbyPhotosDescr(lobbyPhotosDescrNight);
            setLobbySlider(lobbySliderNight);
        }
    }, [time, lobbyPhotosNight, lobbyPhotosDay]);

    const width = useAppSelector((state) => state.main.width);

    const lobbyInteriorSectionRef = React.useRef<HTMLDivElement>(null);
    const lobbyContainerRef = React.useRef<HTMLDivElement>(null);
    const lobbyInteriorText1Ref = React.useRef<HTMLDivElement>(null);
    const lobbyInteriorTitleBigRef = React.useRef<HTMLDivElement>(null);
    const lobbyInteriorTitlePhotoRef = React.useRef<HTMLDivElement>(null);

    const isInViewSection = useInView(lobbyInteriorSectionRef, { once: false });
    const isInViewText1 = useInView(lobbyInteriorText1Ref, { once: true });
    const isInViewTitleBig = useInView(lobbyInteriorTitleBigRef, { once: true });
    const isInViewTitlePhoto = useInView(lobbyInteriorTitlePhotoRef, { once: true });

    const { scrollYProgress } = useScroll({
        target: lobbyContainerRef,
        offset: ['start end', 'end end'],
    });
    const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const toTopLobbyInterior1 = useTransform(scrollYProgress, [0, 0.3], [-7, 7]);
    const toTopLobbyInterior2 = useTransform(scrollYProgress, [0.2, 0.5], [-7, 7]);
    const toTopLobbyInterior3 = useTransform(scrollYProgress, [0.2, 0.7], [-10, 10]);
    const toTopLobbyInterior4 = useTransform(scrollYProgress, [0.5, 0.9], [-15, 15]);
    const imgScale = useTransform(smoothYProgress, [0, 0.5], [1, 1.08]);
    const imgScale2 = useTransform(smoothYProgress, [0.5, 1], [1, 1.1]);
    const imgScale3 = useTransform(smoothYProgress, [0.6, 1], [1, 1.1]);

    const [isButtonActive, setIsButtonActive] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
    });

    return (
        <div ref={lobbyInteriorSectionRef}>
            <section className={styles.container} ref={lobbyContainerRef}>
                <div className={styles.firstDiv}>
                    <motion.div
                        className={`${styles.image1} ${styles.imageDiv}`}
                        onClick={() => {
                            if (width > 540) {
                                setIsOpenModal(true);
                                setActiveImg(0);
                            }
                        }}
                        style={{ y: toTopLobbyInterior1 }}
                        onMouseEnter={() => {
                            setIsButtonActive({ ...isButtonActive, 1: true });
                        }}
                        onMouseLeave={() => {
                            setIsButtonActive({ ...isButtonActive, 1: false });
                        }}
                    >
                        <motion.img src={lobbyPhotos[0]} style={{ scale: imgScale }} />
                        <AnimatedIconButton
                            type={'button'}
                            variant='round'
                            outline={false}
                            color={isButtonActive[1] ? 'brick' : 'white'}
                            direction='up'
                            isActive={isButtonActive[1]}
                            className={styles.openIcon}
                        >
                            <SvgIcons id={'plus'} />
                        </AnimatedIconButton>
                    </motion.div>
                    <div className={styles.firstDivText}>
                        <div
                            className={styles.smallTitle}
                            style={{
                                transform: isInViewText1 ? 'none' : `translateX(${getScaledSizeSecond(-350, width)}px)`,
                                opacity: isInViewText1 ? 1 : 0,
                                transition: 'all 0.9s ease 0.1s',
                            }}
                        >
                            лаунж
                            <br />
                            и&nbsp;лобби
                        </div>
                        <div
                            className={styles.firstText}
                            style={{
                                transform: isInViewText1 ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                                opacity: isInViewText1 ? 1 : 0,
                                transition: 'all 0.9s ease 0.1s',
                            }}
                            ref={lobbyInteriorText1Ref}
                        >
                            Внутреннее пространство лобби PLATINUM также поддерживает идею пластичности дома. Парящая металлическая лента
                            стойки ресепшн доходит до&nbsp;границы общей зоны лобби и&nbsp;продолжается в&nbsp;соседнем lounge пространстве,
                            перевоплощаясь в&nbsp;барную стойку.
                        </div>
                    </div>
                </div>
                <div className={styles.secondDiv}>
                    <div className={styles.bigTitle} ref={lobbyInteriorTitleBigRef}>
                        <motion.div
                            className={styles.bigTitleFirst}
                            style={{
                                transform: isInViewTitleBig ? 'none' : `translateX(${getScaledSizeSecond(950, width)}px)`,
                                transition: 'all 0.9s ease 0.1s',
                            }}
                        >
                            пластичность
                        </motion.div>
                        <motion.div
                            className={styles.bigTitleSecond}
                            style={{
                                transform: isInViewTitleBig ? 'none' : `translateX(${getScaledSizeSecond(-850, width)}px)`,
                                transition: 'all 0.9s ease 0.1s',
                            }}
                        >
                            пространства
                        </motion.div>
                    </div>
                    <div className={styles.secondDivText}>
                        <div className={styles.secondText}>
                            Раздвижные деревянные перегородки разделяют пространство lounge зоны на&nbsp;секции разной площади.
                        </div>
                        <div className={styles.secondText}>
                            Они позволяют трансформировать пространство то&nbsp;в&nbsp;уютные переговорные, то&nbsp;в&nbsp;площадку для
                            проведения мероприятий, приема гостей или детских праздников.
                        </div>
                    </div>
                    {/* <motion.div className={`${styles.image2} ${styles.imageDiv}`} style={{ y: toTopLobbyInterior2 }}>
                        <motion.img
                            src={
                                time === 'day'
                                    ? '/images/houses/house-platinum/platinum-lobby-day.jpg'
                                    : '/images/houses/house-platinum/platinum-lobby-night.jpg'
                            }
                            style={{ scale: imgScale }}
                        />
                    </motion.div> */}
                    <SliderFullwidth images={lobbySlider} imgScale={imgScale} />
                    <div className={styles.secondDivTitle}>
                        В&nbsp;отделке стен лобби использовано теплое натуральное дерево. Оно буквально обнимает зону отдыха. Небольшие
                        рамы, деревянные стеллажи и&nbsp;полки добавляют ощущение уюта.
                    </div>
                </div>
                <div className={styles.dekstopOnly}>
                    <motion.div
                        className={`${styles.image3} ${styles.imageDiv}`}
                        onClick={() => {
                            setIsOpenModal(true);
                            setActiveImg(3);
                        }}
                        style={{ y: toTopLobbyInterior3 }}
                        onMouseEnter={() => {
                            setIsButtonActive({ ...isButtonActive, 2: true });
                        }}
                        onMouseLeave={() => {
                            setIsButtonActive({ ...isButtonActive, 2: false });
                        }}
                    >
                        <motion.img src={lobbyPhotos[3]} style={{ scale: imgScale2 }} />
                        <AnimatedIconButton
                            type={'button'}
                            variant='round'
                            outline={false}
                            color={isButtonActive[2] ? 'brick' : 'white'}
                            direction='up'
                            isActive={isButtonActive[2]}
                            className={styles.openIcon}
                        >
                            <SvgIcons id={'plus'} />
                        </AnimatedIconButton>
                    </motion.div>
                    <motion.div
                        className={`${styles.image4} ${styles.imageDiv}`}
                        onClick={() => {
                            setIsOpenModal(true);
                            setActiveImg(2);
                        }}
                        onMouseEnter={() => {
                            setIsButtonActive({ ...isButtonActive, 3: true });
                        }}
                        onMouseLeave={() => {
                            setIsButtonActive({ ...isButtonActive, 3: false });
                        }}
                        style={{ y: toTopLobbyInterior4 }}
                    >
                        <motion.img src={lobbyPhotos[2]} style={{ scale: imgScale2 }} />
                        <AnimatedIconButton
                            type={'button'}
                            variant='round'
                            outline={false}
                            color={isButtonActive[3] ? 'brick' : 'white'}
                            direction='up'
                            isActive={isButtonActive[3]}
                            className={styles.openIcon}
                        >
                            <SvgIcons id={'plus'} />
                        </AnimatedIconButton>
                    </motion.div>
                    <motion.div
                        className={`${styles.image5} ${styles.imageDiv}`}
                        onClick={() => {
                            setIsOpenModal(true);
                            setActiveImg(5);
                        }}
                        onMouseEnter={() => {
                            setIsButtonActive({ ...isButtonActive, 4: true });
                        }}
                        onMouseLeave={() => {
                            setIsButtonActive({ ...isButtonActive, 4: false });
                        }}
                        style={{ y: toTopLobbyInterior4 }}
                    >
                        <motion.img src={lobbyPhotos[5]} style={{ scale: imgScale3 }} />
                        <AnimatedIconButton
                            type={'button'}
                            variant='round'
                            outline={false}
                            color={isButtonActive[4] ? 'brick' : 'white'}
                            direction='up'
                            isActive={isButtonActive[4]}
                            className={styles.openIcon}
                        >
                            <SvgIcons id={'plus'} />
                        </AnimatedIconButton>
                    </motion.div>
                    <motion.div
                        className={`${styles.image6} ${styles.imageDiv}`}
                        onClick={() => {
                            setIsOpenModal(true);
                            setActiveImg(6);
                        }}
                        onMouseEnter={() => {
                            setIsButtonActive({ ...isButtonActive, 5: true });
                        }}
                        onMouseLeave={() => {
                            setIsButtonActive({ ...isButtonActive, 5: false });
                        }}
                        style={{ y: toTopLobbyInterior4 }}
                    >
                        <motion.img src={lobbyPhotos[6]} style={{ scale: imgScale3 }} />
                        <AnimatedIconButton
                            type={'button'}
                            variant='round'
                            outline={false}
                            color={isButtonActive[5] ? 'brick' : 'white'}
                            direction='up'
                            isActive={isButtonActive[5]}
                            className={styles.openIcon}
                        >
                            <SvgIcons id={'plus'} />
                        </AnimatedIconButton>
                    </motion.div>
                    <div className={styles.dekstopText}>
                        Дерево, лаконичная мебель и&nbsp;раздвижные перегородки создают медитативный спокойный стиль лобби.
                    </div>
                </div>
                {width <= 540 && (
                    <div className={styles.containerSlider}>
                        {lobbyPhotos.length > 0 && (
                            <Slider
                                size={'default'}
                                arrow={true}
                                isLoop={true}
                                slideWidth='68.4vw'
                                slideHeight='84.2vw'
                                firstSlide={0}
                                navigationColor='dark-grey-brick'
                            >
                                {lobbyPhotos.map((url, index) => (
                                    <Image src={url} alt={''} unoptimized={true} className={styles.sliderImg} fill={true} key={index} />
                                ))}
                            </Slider>
                        )}
                    </div>
                )}
                <div className={styles.dayNightDiv}>
                    <div className={styles.dayNightBtn} onClick={() => setTime('night')}>
                        {time === 'night' ? <SvgIcons id='evening-selected' /> : <SvgIcons id='evening' />}
                    </div>
                    <div className={styles.dayNightBtn} onClick={() => setTime('day')}>
                        {time === 'day' ? <SvgIcons id='day-selected' /> : <SvgIcons id='day' />}
                    </div>
                </div>
            </section>

            {lobbyPhotos.length > 0 && (
                <SliderModal
                    isOpen={isOpenModal}
                    setIsOpen={setIsOpenModal}
                    arrow={lobbyPhotos.length > 1}
                    isLoop={lobbyPhotos.length > 1}
                    isKeyboardEnabled={true}
                    firstSlide={activeImg}
                    photos={lobbyPhotos}
                    descriptions={lobbyPhotosDescr}
                />
            )}

            <section
                className={styles.containerPhoto}
                style={isInViewSection ? { zIndex: '0', opacity: 1 } : { zIndex: '-1', opacity: 0 }}
                ref={lobbyInteriorTitlePhotoRef}
            >
                <img src={'/images/houses/house-platinum/platinum-lobby-interior.jpg'} />
                <div
                    className={styles.containerPhotoTitle}
                    style={{
                        transform: isInViewTitlePhoto ? 'none' : `translateX(${getScaledSizeSecond(750, width)}px)`,
                        opacity: isInViewTitlePhoto ? 1 : 0,
                        transition: 'all 0.9s ease 0.1s',
                    }}
                >
                    игровая зона
                </div>
            </section>

            <EmptySection />
            <PlatinumGamezone />
        </div>
    );
};

export default PlatinumLobbyInteriors;
