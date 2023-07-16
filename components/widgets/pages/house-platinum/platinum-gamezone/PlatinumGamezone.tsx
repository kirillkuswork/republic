import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import apiUrls from '../../../../../constants/API';
import styles from './PlatinumGamezone.module.scss';
import Slider from '../../../slider/Slider';
import { useAppSelector } from '../../../../../hook';
import { motion, useInView } from 'framer-motion';
import getScaledSizeSecond from '../../../../../tools/getScaledSizeSecond';

export interface PlatinumGamezone {}

const PlatinumGamezone: React.FC<PlatinumGamezone> = ({}) => {
    const [salonPhotos, setSalonPhotos] = useState([]);
    const [salonPhotoDescriptions, setSalonPhotoDescriptions] = useState<[{ description?: string }]>([{}]);
    useEffect(() => {
        axios.get(apiUrls.urlSliderPlatinumGameZone).then((resp) => {
            const salonData = resp.data.absolutePath;
            setSalonPhotos(salonData || []);
            setSalonPhotoDescriptions(resp.data.descriptions || [{}]);
        });
    }, []);

    const width = useAppSelector((state) => state.main.width);
    const height = useAppSelector((state) => state.main.height);

    // for slider sizes - different sizes for extra wide screens
    const [slideWidth, setSlideWidth] = useState('72.6vw');
    const [slideHeight, setSlideHeight] = useState('45.2vw');
    useEffect(() => {
        if (width / height > 1.8) {
            setSlideWidth('117.8vh');
            setSlideHeight('73.3vh');
        } else if (width <= 540) {
            setSlideWidth('89.47vw');
            setSlideHeight('68.42vw');
        } else {
            setSlideWidth('72.6vw');
            setSlideHeight('45.2vw');
        }
    }, [width, height]);
    useEffect(() => {
        if (width / height > 1.8) {
            setSlideWidth('117.8vh');
            setSlideHeight('73.3vh');
        } else if (width <= 540) {
            setSlideWidth('89.47vw');
            setSlideHeight('68.42vw');
        } else {
            setSlideWidth('72.6vw');
            setSlideHeight('45.2vw');
        }
    }, []);

    const salonTitleRef = React.useRef<HTMLDivElement>(null);
    const salonDescrRef = React.useRef<HTMLDivElement>(null);
    const salonTextRef = React.useRef<HTMLDivElement>(null);
    const isInViewTitle = useInView(salonTitleRef, { once: true });
    const isInViewDescr = useInView(salonDescrRef, { once: true });
    const isInViewText = useInView(salonTextRef, { once: true });

    return (
        <section className={styles.container}>
            <div className={styles.textDiv}>
                <div className={styles.textSmall}></div>
                <div className={styles.textBig} ref={salonTitleRef}>
                    <div
                        className={styles.textBigText}
                        style={{
                            transform: isInViewText ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                            opacity: isInViewText ? 1 : 0,
                            transition: 'all 0.9s ease 0.1s',
                        }}
                        ref={salonTextRef}
                    >
                        Пластичность и&nbsp;проницаемость фасада находит воплощение в&nbsp;детской игровой зоне, которая берет начало
                        в&nbsp;приватном парке и&nbsp;продолжается в&nbsp;лобби башни PLATINUM. Таким образом пространство улицы
                        функционально и&nbsp;эстетически размывает границы между домом и&nbsp;прилегающей территорией.
                    </div>
                    <div
                        className={styles.description}
                        style={{
                            transform: isInViewDescr ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                            opacity: isInViewDescr ? 1 : 0,
                            transition: 'all 0.9s ease 0.1s',
                        }}
                        ref={salonDescrRef}
                    >
                        проходить
                        <br />
                        сквозь
                    </div>
                </div>
            </div>
            {salonPhotos.length > 0 && (
                <div className={styles.slider}>
                    <Slider
                        size={'default'}
                        arrow={true}
                        isLoop={true}
                        slideWidth={slideWidth}
                        slideHeight={slideHeight}
                        navigationColor='dark-grey-brick'
                        firstSlide={salonPhotos.length - 1}
                        uniqueKey={'platinumGamezone'}
                    >
                        {salonPhotos.map((url, index) => (
                            <React.Fragment key={index}>
                                <Image src={url} alt={''} className={styles.img} fill={true} unoptimized={true} />
                                {salonPhotoDescriptions[index]?.description && (
                                    <div className={styles.imgTitle}>{salonPhotoDescriptions[index].description}</div>
                                )}
                            </React.Fragment>
                        ))}
                    </Slider>
                </div>
            )}
        </section>
    );
};

export default PlatinumGamezone;
