import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from './HousePageParking.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import SliderModal from '../../../slider-modal/SliderModal';
import { useAppSelector } from '../../../../../hook';
import getScaledSizeSecond from '../../../../../tools/getScaledSizeSecond';
import { motion, useInView, useSpring, useTransform, useScroll } from 'framer-motion';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

export interface HousePageParking {
    parkingData: {
        title: string;
        imgBig: string;
        imgSmall: string;
        text: string;
        parkingNumber: string;
        apiUrl: string;
    };
}

const BaseTemplate: React.FC<HousePageParking> = ({ parkingData }) => {
    const [parkingPhotos, setParkingPhotos] = useState([]);
    const [modalPhotoDescr, setModalPhotoDescr] = useState([]);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const width = useAppSelector((state) => state.main.width);

    useEffect(() => {
        axios.get(parkingData.apiUrl).then((resp) => {
            const parkingData = resp.data.absolutePath;
            setParkingPhotos(parkingData);
            setModalPhotoDescr(resp.data.descriptions);
        });
    }, []);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const parkingContainerRef = React.useRef<HTMLDivElement>(null);
    const parkingTextRef = React.useRef<HTMLDivElement>(null);
    const parkingImgRef = React.useRef<HTMLDivElement>(null);
    const isInViewContainer = useInView(parkingContainerRef, { once: true });
    const isInViewText = useInView(parkingTextRef, { once: true });
    const isInViewImg = useInView(parkingImgRef, { once: true });

    const { scrollYProgress } = useScroll({
        target: parkingContainerRef,
        offset: ['start end', 'end end'],
    });
    const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const imgScale = useTransform(smoothYProgress, [0, 1], [1, 1.1]);

    return (
        <section className={`${styles.container} redsParking`} ref={parkingContainerRef}>
            <motion.div
                className={styles.title}
                dangerouslySetInnerHTML={{
                    __html: parkingData.title,
                }}
                style={{
                    transform: isInViewContainer ? 'none' : `translateX(${getScaledSizeSecond(-1050, width)}px)`,
                    opacity: isInViewContainer ? 1 : 0,
                    transition: 'all 0.9s ease 0.5s',
                }}
            />
            <div className={styles.parkingDiv} ref={parkingTextRef}>
                <div
                    className={styles.imgBigDiv}
                    style={{
                        // transform: isInViewImg ? 'none' : `translateY(${getScaledSizeSecond(-150, width)}px)`,
                        opacity: isInViewImg ? 1 : 0,
                        transition: 'all 1s ease 0.5s',
                    }}
                    ref={parkingImgRef}
                >
                    <motion.img src={parkingData.imgBig} alt={''} className={styles.imgBig} style={{ scale: imgScale }} />
                </div>
                <div
                    className={styles.storeDiv}
                    onClick={() => {
                        if (width > 540) setIsOpenModal(true);
                    }}
                    style={{
                        // transform: isInViewImg ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                        opacity: isInViewImg ? 1 : 0,
                        transition: 'all 1s ease 0.5s',
                    }}
                    onMouseEnter={() => {
                        setIsButtonActive(true);
                    }}
                    onMouseLeave={() => {
                        setIsButtonActive(false);
                    }}
                >
                    <motion.img src={parkingData.imgSmall} alt={''} className={styles.imgSmall} style={{ scale: imgScale }} />
                    <AnimatedIconButton
                        type={'button'}
                        variant='round'
                        outline={false}
                        color={isButtonActive ? 'brick' : 'white'}
                        direction='up'
                        isActive={isButtonActive}
                        className={styles.svgIcon}
                    >
                        <SvgIcons id={'plus'} />
                    </AnimatedIconButton>
                </div>
                <div
                    className={styles.storeText}
                    dangerouslySetInnerHTML={{
                        __html: parkingData.text,
                    }}
                    style={{
                        transform: isInViewText ? 'none' : `translateX(${getScaledSizeSecond(550, width)}px)`,
                        opacity: isInViewText ? 1 : 0,
                        transition: 'all 0.9s ease 0.5s',
                    }}
                />

                <div
                    className={styles.parkingSpacesDiv}
                    style={{
                        // transform: isInViewImg ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                        opacity: isInViewImg ? 1 : 0,
                        transition: 'all 1s ease 0.5s',
                    }}
                >
                    <div className={styles.parkingSpacesText}>
                        парковочных
                        <br />
                        места
                    </div>
                    <div className={styles.parkingSpacesNumber}>{parkingData.parkingNumber}</div>
                </div>
            </div>

            {parkingPhotos.length > 0 && (
                <SliderModal
                    isOpen={isOpenModal}
                    setIsOpen={setIsOpenModal}
                    arrow={parkingPhotos.length > 1}
                    isLoop={parkingPhotos.length > 1}
                    isKeyboardEnabled={true}
                    firstSlide={0}
                    photos={parkingPhotos}
                    descriptions={modalPhotoDescr}
                />
            )}
        </section>
    );
};

export default BaseTemplate;
