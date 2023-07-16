import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import apiUrls from '../../../../../constants/API';
import styles from './RedsLobbyInteriors.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import { useAppSelector } from '../../../../../hook';
import Slider from '../../../slider/Slider';
import SliderModal from '../../../slider-modal/SliderModal';
import RedsSalon from '../reds-salon/RedsSalon';
import { motion, useInView, useTransform, useSpring, useScroll } from 'framer-motion';
import EmptySection from '../../house-page/empty/EmptySection';
import getScaledSizeSecond from '../../../../../tools/getScaledSizeSecond';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

export interface RedsLobbyInteriors {}

const BaseTemplate: React.FC<RedsLobbyInteriors> = ({}) => {
    const [lobbyPhotos, setLobbyPhotos] = useState([]);
    const [lobbyPhotosDescr, setLobbyPhotosDescr] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [activeImg, setActiveImg] = useState(0);
    const [isButtonActive, setIsButtonActive] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
    });

    useEffect(() => {
        axios.get(apiUrls.urlSliderRedsLobby).then((resp) => {
            const lobbyData = resp.data.absolutePath;
            setLobbyPhotos(lobbyData);
            setLobbyPhotosDescr(resp.data.descriptions);
        });
    }, []);

    const width = useAppSelector((state) => state.main.width);

    const lobbyInteriorSectionRef = React.useRef<HTMLDivElement>(null);
    const lobbyContainerRef = React.useRef<HTMLDivElement>(null);
    const lobbyInteriorTitleRef = React.useRef<HTMLDivElement>(null);
    const lobbyInteriorText1Ref = React.useRef<HTMLDivElement>(null);
    const lobbyInteriorText2Ref = React.useRef<HTMLDivElement>(null);
    const lobbyInteriorTitleBigRef = React.useRef<HTMLDivElement>(null);
    // const lobbyInteriorSecondRef = React.useRef<HTMLDivElement>(null);

    const isInViewSection = useInView(lobbyInteriorSectionRef, { once: false });
    const isInViewTitle = useInView(lobbyInteriorTitleRef, { once: true });
    const isInViewText1 = useInView(lobbyInteriorText1Ref, { once: true });
    const isInViewText2 = useInView(lobbyInteriorText1Ref, { once: true });
    const isInViewTitleBig = useInView(lobbyInteriorTitleBigRef, { once: true });
    // const isInViewTitleSecond = useInView(lobbyInteriorSecondRef, { once: true });

    const { scrollYProgress } = useScroll({
        target: lobbyContainerRef,
        offset: ['start end', 'end end'],
    });
    const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const toTopLobbyInterior1 = useTransform(scrollYProgress, [0, 0.3], [-7, 7]);
    const toTopLobbyInterior2 = useTransform(scrollYProgress, [0.2, 0.5], [-7, 7]);
    const toTopLobbyInterior3 = useTransform(scrollYProgress, [0.2, 0.7], [-10, 10]);
    const toTopLobbyInterior4 = useTransform(scrollYProgress, [0.5, 0.9], [-15, 15]);
    const imgScale = useTransform(smoothYProgress, [0, 1], [1, 1.08]);
    const imgScale2 = useTransform(smoothYProgress, [0, 1], [1, 1.2]);

    // console.log(isInViewTitleBig);

    return (
        <div ref={lobbyInteriorSectionRef}>
            <section className={styles.container} ref={lobbyContainerRef}>
                <div
                    className={styles.smallTitle}
                    ref={lobbyInteriorTitleRef}
                    style={{
                        transform: isInViewTitle ? 'none' : `translateX(${getScaledSizeSecond(-350, width)}px)`,
                        transition: 'all 0.9s ease 0.1s',
                    }}
                >
                    воздушные интерьеры лобби
                </div>
                <div className={styles.text}>
                    <div
                        className={styles.firstText}
                        style={{
                            transform: isInViewText1 ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                            opacity: isInViewText1 ? 1 : 0,
                            transition: 'all 0.9s ease 0.1s',
                        }}
                        ref={lobbyInteriorText1Ref}
                    >
                        В&nbsp;REDS дизайнеры бюро ArtBabayants создали лаконичное лобби, подчиненное идее воздушного простора. Она здесь
                        во&nbsp;всем&nbsp;&mdash; в&nbsp;двусветном панорамном остеклении, в&nbsp;парящих световых полотнах,
                        в&nbsp;головокружительной высоте колонн из&nbsp;полированной стали.
                    </div>
                    <motion.div
                        className={styles.secondText}
                        style={{
                            transform: isInViewText2 ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                            opacity: isInViewText2 ? 1 : 0,
                            transition: 'all 0.9s ease 0.1s',
                        }}
                        ref={lobbyInteriorText2Ref}
                    >
                        Этот простор удивительным образом соразмерен человеку: в&nbsp;уютных пространствах антресолей ждут удобные диваны,
                        а&nbsp;терраса на&nbsp;крыше соблазняет прохладительными напитками в&nbsp;баре.
                    </motion.div>
                </div>

                {/* {width > 540 && ( */}
                <div className={styles.dekstopOnly}>
                    <motion.div
                        className={`${styles.image1} ${styles.imageDiv}`}
                        onClick={() => {
                            setIsOpenModal(true);
                            setActiveImg(0);
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
                    <motion.div
                        className={`${styles.image2} ${styles.imageDiv}`}
                        onClick={() => {
                            setIsOpenModal(true);
                            setActiveImg(1);
                        }}
                        style={{ y: toTopLobbyInterior2 }}
                        onMouseEnter={() => {
                            setIsButtonActive({ ...isButtonActive, 2: true });
                        }}
                        onMouseLeave={() => {
                            setIsButtonActive({ ...isButtonActive, 2: false });
                        }}
                    >
                        <motion.img src={lobbyPhotos[1]} style={{ scale: imgScale }} />
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
                        className={`${styles.image3} ${styles.imageDiv}`}
                        onClick={() => {
                            setIsOpenModal(true);
                            setActiveImg(3);
                        }}
                        style={{ y: toTopLobbyInterior3 }}
                        onMouseEnter={() => {
                            setIsButtonActive({ ...isButtonActive, 3: true });
                        }}
                        onMouseLeave={() => {
                            setIsButtonActive({ ...isButtonActive, 3: false });
                        }}
                    >
                        <motion.img src={lobbyPhotos[3]} style={{ scale: imgScale }} />
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
                        className={`${styles.image4} ${styles.imageDiv}`}
                        onClick={() => {
                            setIsOpenModal(true);
                            setActiveImg(2);
                        }}
                        style={{ y: toTopLobbyInterior4 }}
                        onMouseEnter={() => {
                            setIsButtonActive({ ...isButtonActive, 4: true });
                        }}
                        onMouseLeave={() => {
                            setIsButtonActive({ ...isButtonActive, 4: false });
                        }}
                    >
                        <motion.img src={lobbyPhotos[2]} style={{ scale: imgScale2 }} />
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
                        className={`${styles.image5} ${styles.imageDiv}`}
                        onClick={() => {
                            setIsOpenModal(true);
                            setActiveImg(6);
                        }}
                        style={{ y: toTopLobbyInterior4 }}
                        onMouseEnter={() => {
                            setIsButtonActive({ ...isButtonActive, 5: true });
                        }}
                        onMouseLeave={() => {
                            setIsButtonActive({ ...isButtonActive, 5: false });
                        }}
                    >
                        <motion.img src={lobbyPhotos[6]} style={{ scale: imgScale2 }} />
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

                    <div className={styles.bigTitle} ref={lobbyInteriorTitleBigRef}>
                        <motion.div
                            className={styles.bigTitleFirst}
                            style={{
                                transform: isInViewTitleBig ? 'none' : `translateX(${getScaledSizeSecond(950, width)}px)`,
                                transition: 'all 0.9s ease 0.1s',
                            }}
                        >
                            безграничность
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
                </div>
                {/* )} */}
            </section>
            {width <= 540 && (
                <section className={styles.containerSlider}>
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
                </section>
            )}

            <section className={styles.containerPhoto} style={isInViewSection ? { zIndex: '0', opacity: 1 } : { zIndex: '-1', opacity: 0 }}>
                <img src={'/images/houses/house-reds/reds-lobby-interior.jpg'} />
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
            <EmptySection />
            <RedsSalon />
        </div>
    );
};

export default BaseTemplate;
