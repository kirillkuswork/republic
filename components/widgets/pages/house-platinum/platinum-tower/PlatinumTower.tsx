import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from './PlatinumTower.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import PlatinumSvg from '../../../../svgs/PlatinumSvg/PlatinumSvg';
import apiUrls from '../../../../../constants/API';
import SliderModal from '../../../slider-modal/SliderModal';
import { motion, useInView, useTransform, useSpring, useScroll } from 'framer-motion';
import getScaledSizeSecond from '../../../../../tools/getScaledSizeSecond';
import { useAppSelector } from '../../../../../hook';
import viewImg from '../../../../../public/images/houses/house-reds/reds-view.jpg';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

export interface PlatinumTower {}

const PlatinumTower: React.FC<PlatinumTower> = ({}) => {
    const [viewsPhotos, setViewsPhotos] = useState([]);
    const [viewsPhotosDescr, setViewsPhotosDescr] = useState([]);

    useEffect(() => {
        axios.get(apiUrls.urlSliderRedsViews).then((resp) => {
            const viewsData = resp.data.absolutePath;
            setViewsPhotos(viewsData);
            setViewsPhotosDescr(resp.data.descriptions);
        });
    }, []);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const width = useAppSelector((state) => state.main.width);

    const sectionRef = React.useRef<HTMLElement | null>(null);
    const titleRef = React.useRef<HTMLDivElement>(null);
    const textRef = React.useRef<HTMLDivElement>(null);
    const schemeRef = React.useRef<HTMLDivElement>(null);
    const isInViewTitle = useInView(titleRef, { once: true });
    const isInViewText = useInView(textRef, { once: true });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });
    const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const toTopBlock1 = useTransform(smoothYProgress, [0.6, 1], [50, 0]);
    const toTopBlock2 = useTransform(smoothYProgress, [0.7, 1], [50, 0]);
    const imgScale = useTransform(smoothYProgress, [0.5, 1], [1, 1.1]);

    const [isButtonActive, setIsButtonActive] = useState(false);

    return (
        <section className={styles.container} ref={sectionRef} id='house-scheme'>
            <div className={styles.titleSection} ref={titleRef}>
                <div
                    className={styles.titleColor}
                    style={{
                        transform: isInViewTitle ? 'none' : `translateX(${getScaledSizeSecond(-750, width)}px)`,
                        transition: 'all 0.9s ease 0.1s',
                    }}
                >
                    четыре различных фасадных
                </div>
                <div
                    style={{
                        transform: isInViewTitle ? 'none' : `translateX(${getScaledSizeSecond(-750, width)}px)`,
                        transition: 'all 0.9s ease 0.1s',
                    }}
                >
                    <span className={styles.titleColor}>решения</span>&nbsp;&mdash; четыре концепции
                </div>
                <div
                    style={{
                        transform: isInViewTitle ? 'none' : `translateX(${getScaledSizeSecond(-750, width)}px)`,
                        transition: 'all 0.9s ease 0.1s',
                    }}
                >
                    светопоглощения
                </div>
            </div>

            <div className={styles.textSection}>
                <div>
                    <div
                        className={styles.architect}
                        style={{
                            transform: isInViewText ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                            opacity: isInViewText ? 1 : 0,
                            transition: 'all 0.9s ease 0.1s',
                        }}
                        ref={textRef}
                    >
                        <img src={'/images/houses/house-platinum/platinum-architects.png'} alt={''} />
                        <div className={styles.architectName}>
                            ян&nbsp;симпсон
                            <br />
                            и&nbsp;рейчел хаф
                            <br />
                            <div className={styles.architectNameColor}>архитекторы</div>
                        </div>
                    </div>
                    <div
                        className={styles.architectText}
                        style={{
                            transform: isInViewText ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                            opacity: isInViewText ? 1 : 0,
                            transition: 'all 0.9s ease 0.1s',
                        }}
                    >
                        Опыт реализации проектов в&nbsp;Туманном Альбионе дал архитекторам большую практику максимального взаимодействия
                        с&nbsp;солнечным светом, столь актуальную и&nbsp;для Москвы.
                    </div>
                </div>
                <div
                    className={styles.text}
                    style={{
                        transform: isInViewText ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                        opacity: isInViewText ? 1 : 0,
                        transition: 'all 0.9s ease 0.1s',
                    }}
                >
                    <span className={styles.titleColor}>пластичность фасадов</span> легла в&nbsp;основу архитектурного решения PLATINUM.
                    Эркеры северного фасада создают волны, которые ловят солнце на&nbsp;востоке и&nbsp;западе. Южный фасад состоит
                    из&nbsp;лоджий&nbsp;&mdash; их&nbsp;панорамное остекление позволяет собрать все солнечные лучи, такие редкие
                    в&nbsp;нашей полосе. А&nbsp;фасады на&nbsp;востоке и&nbsp;западе щедры на&nbsp;рассветы и&nbsp;закаты над тканью города.
                </div>
            </div>

            <div
                className={styles.schemeSection}
                style={{
                    transform: isInViewText ? 'none' : `translateY(${getScaledSizeSecond(250, width)}px)`,
                    opacity: isInViewText ? 1 : 0,
                    transition: 'all 0.9s ease 0.1s',
                }}
                ref={schemeRef}
            >
                <motion.div
                    className={styles.windowView}
                    style={{
                        scale: imgScale,
                    }}
                    onClick={() => setIsOpenModal(true)}
                    onMouseEnter={() => setIsButtonActive(true)}
                    onMouseLeave={() => setIsButtonActive(false)}
                >
                    <Image src={viewImg} fill={true} className={styles.img} alt={''} />
                    <div className={styles.windowViewText}>виды из&nbsp;окон</div>
                    {/* <div className={styles.windowViewIcon}>
                        <SvgIcons id='circle-open' />
                    </div> */}
                    <AnimatedIconButton
                        type={'button'}
                        variant='round'
                        outline={false}
                        color={isButtonActive ? 'brick' : 'white'}
                        direction='up'
                        isActive={isButtonActive}
                        className={styles.windowViewIcon}
                    >
                        <SvgIcons id={'plus'} />
                    </AnimatedIconButton>
                </motion.div>
                <motion.div className={styles.floors} style={width > 540 ? { y: toTopBlock1 } : {}}>
                    <div className={styles.number}>34</div>
                    <div className={styles.word}>этажа</div>
                </motion.div>
                <div className={styles.houseScheme}>
                    <PlatinumSvg />
                </div>
            </div>
            {viewsPhotos.length > 0 && (
                <SliderModal
                    isOpen={isOpenModal}
                    setIsOpen={setIsOpenModal}
                    arrow={viewsPhotos.length > 1}
                    isLoop={viewsPhotos.length > 1}
                    isKeyboardEnabled={true}
                    firstSlide={0}
                    photos={viewsPhotos}
                    descriptions={viewsPhotosDescr}
                />
            )}
        </section>
    );
};

export default PlatinumTower;
