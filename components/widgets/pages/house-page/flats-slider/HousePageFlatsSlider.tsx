import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from './HousePageFlatsSlider.module.scss';
import Slider from '../../../slider/Slider';
import apiUrls from '../../../../../constants/API';
import { useAppSelector } from '../../../../../hook';

export interface HousePageFlatsSlider {
    url: string;
}

const FlatsSlider: React.FC<HousePageFlatsSlider> = ({ url }) => {
    const [flatPhotos, setFlatPhotos] = useState([]);
    useEffect(() => {
        axios.get(url).then((resp) => {
            const flatData = resp.data.absolutePath;
            setFlatPhotos(flatData);
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
            setSlideHeight('57.89vw');
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
            setSlideHeight('57.89vw');
        } else {
            setSlideWidth('72.6vw');
            setSlideHeight('45.2vw');
        }
    }, []);

    return (
        <section className={styles.sliderSection}>
            <div className={styles.slider}>
                {flatPhotos.length > 0 && (
                    <Slider
                        size={'default'}
                        arrow={true}
                        isLoop={true}
                        slideWidth={slideWidth}
                        slideHeight={slideHeight}
                        uniqueKey={'houseFlats'}
                        navigationColor='white'
                    >
                        {flatPhotos.map((url, index) => (
                            <Image src={url} alt={''} unoptimized={true} className={styles.img} fill={true} key={index} />
                        ))}
                    </Slider>
                )}
            </div>
        </section>
    );
};

export default FlatsSlider;
