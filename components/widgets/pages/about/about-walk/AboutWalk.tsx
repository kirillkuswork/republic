import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Slider from '../../../slider/Slider';
import SvgIcons from '../../../../svgs/SvgIcons';
import apiURL from '../../../../../constants/API';
import { useAppSelector } from '../../../../../hook';
import styles from './AboutWalk.module.scss';

interface IAboutWalk {}

const AboutWalk: React.FC<IAboutWalk> = () => {
    const width = useAppSelector((state) => state.main.width);
    const height = useAppSelector((state) => state.main.height);
    const [images, setImages] = useState<string[]>([]);
    const [slideWidth, setSlideWidth] = useState('72.6vw');
    const [slideHeight, setSlideHeight] = useState('45.2vw');
    const sectionRef = useRef<HTMLElement | null>(null);
    const descriptionRef = useRef<HTMLElement | null>(null);
    const textRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLElement | null>(null);

    const isDescriptionRefInView = useInView(descriptionRef, { once: true, amount: 0.3 });
    const isTextRefInView = useInView(textRef, { once: true, amount: 0.2 });
    const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 });

    useEffect(() => {
        getImages();
    }, []);

    useEffect(() => {
        if (width / height > 1.8) {
            setSlideWidth('117.8vh');
            setSlideHeight('73.3vh');
        } else {
            setSlideWidth('64.4vw');
            setSlideHeight('49.3vw');
        }
    }, [width, height]);

    const getImages = async (): Promise<void> => {
        try {
            const response = await axios.get(apiURL.urlSliderStreets);
            const images = response.data?.absolutePath;
            setImages(images || []);
        } catch (err) {
            console.log('err', err);
        }
    };

    return (
        <div className={styles.walk}>
            <div className={styles.wrapper}>
                <motion.section ref={titleRef} className={styles.titleContainer}>
                    <div className={styles.titleBlock}>
                        <motion.div
                            className={`${styles.title} ${styles.text1} `}
                            style={{ transform: isTitleInView ? 'none' : 'translateX(-900px)' }}
                        >
                            Выбрать
                        </motion.div>
                        <motion.div
                            className={`${styles.title} ${styles.text3} `}
                            style={{ transform: isTitleInView ? 'none' : 'translateX(-900px)' }}
                        >
                            прогулку
                        </motion.div>
                    </div>

                    <motion.div
                        className={`${styles.title} ${styles.text2}`}
                        style={{ transform: isTitleInView ? 'none' : 'translateX(650px)' }}
                    >
                        по настроению
                    </motion.div>
                </motion.section>
                <motion.section className={styles.descriptionBlock} ref={descriptionRef}>
                    <motion.p
                        className={styles.descriptionBlock_text}
                        style={{
                            transform: isDescriptionRefInView ? 'none' : 'translateY(50px)',
                            opacity: isDescriptionRefInView ? 1 : 0,
                        }}
                    >
                        Британское бюро ландшафтной архитектуры Gillespies привнесло в&nbsp;Republic мировые тренды благоустройства.
                        Приватный парк только для жителей Republic: дворы, бульвары и&nbsp;даже арт-галерея под открытым небом.
                    </motion.p>
                    <motion.p
                        className={styles.descriptionBlock_text}
                        style={{
                            transform: isDescriptionRefInView ? 'none' : 'translateY(50px)',
                            opacity: isDescriptionRefInView ? 1 : 0,
                        }}
                    >
                        Уединенные дворы и&nbsp;шумные площади, тенистые бульвары и зелёные парки осмыслены с позиций устойчивого развития,
                        наполнены очарованием природы и&nbsp;учитывают исторический контекст района.
                    </motion.p>
                </motion.section>
                <div className={styles.slider}>
                    {images.length > 0 && (
                        <Slider
                            size='default'
                            arrow={true}
                            isLoop={true}
                            slideWidth={slideWidth}
                            slideHeight={slideHeight}
                            navigationColor='dark-grey-brick'
                            uniqueKey={'walk'}
                        >
                            {images.map((url, index) => (
                                <Image key={index} src={url} alt='walk' fill unoptimized={true} />
                            ))}
                        </Slider>
                    )}
                </div>
                <motion.section ref={textRef}>
                    <motion.h4
                        className={styles.textAboutTree}
                        style={{
                            transform: isTextRefInView ? 'none' : 'translateY(50px)',
                            opacity: isTextRefInView ? 1 : 0,
                            transition: 'all 1s',
                        }}
                    >
                        Сотни взрослых деревьев наполняют Republic атмосферой старых московских двориков и&nbsp;спасают от&nbsp;знойного
                        летнего солнца
                    </motion.h4>
                </motion.section>
                <div className={styles.aboutTrees}>
                    <div className={styles.aboutTrees_schema}>
                        <SvgIcons id='small plan light' />
                    </div>
                    <div className={styles.aboutTrees_image}>
                        <div className={styles.treeImage}>
                            <Image src='/images/about/tree.png' alt='tree' fill sizes='100vw' />
                        </div>
                    </div>
                    <div className={styles.aboutTrees_square}>
                        <p className={styles.squareText}>
                            Совокупная территория благоустройства&nbsp;&mdash; это 12 стандартных футбольных полей
                        </p>
                        <div className={styles.sixGa}>
                            <SvgIcons id='6 ga' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutWalk;
