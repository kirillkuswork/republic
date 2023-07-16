import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from './RedsTwins.module.scss';
import RedsSvg from '../../../../svgs/RedsSvg/RedsSvg';
import SvgIcons from '../../../../svgs/SvgIcons';
import apiUrls from '../../../../../constants/API';
import SliderModal from '../../../slider-modal/SliderModal';
import { motion, useInView, useTransform, useSpring, useScroll } from 'framer-motion';
import getScaledSizeSecond from '../../../../../tools/getScaledSizeSecond';
import { useAppSelector } from '../../../../../hook';
import viewImg from '../../../../../public/images/houses/house-reds/reds-view.jpg';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

export interface RedsTwins {}

const BaseTemplate: React.FC<RedsTwins> = ({}) => {
    const [viewsPhotos, setViewsPhotos] = useState([]);
    const [viewsPhotosDescr, setViewsPhotosDescr] = useState([]);
    const [isButtonActive, setIsButtonActive] = useState(false);

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

    return (
        <section className={styles.container} ref={sectionRef} id='house-scheme'>
            <div className={styles.titleSection} ref={titleRef}>
                <motion.div
                    style={{
                        transform: isInViewTitle ? 'none' : `translateX(${getScaledSizeSecond(-750, width)}px)`,
                        transition: 'all 0.9s ease 0.1s',
                    }}
                >
                    REPUBLIC начинается <br />
                </motion.div>
                <div
                    className={styles.titleColor}
                    style={{
                        transform: isInViewTitle ? 'none' : `translateX(${getScaledSizeSecond(-750, width)}px)`,
                        transition: 'all 0.9s ease 0.1s',
                    }}
                >
                    с&nbsp;близнецов
                </div>
            </div>

            <div
                className={styles.textSection}
                style={{
                    transform: isInViewText ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                    opacity: isInViewText ? 1 : 0,
                    transition: 'all 0.9s ease 0.1s',
                }}
                ref={textRef}
            >
                <div>
                    <div className={styles.architect}>
                        <img src={'/images/houses/house-reds/reds-architect.png'} alt={''} />
                        <div className={styles.architectName}>
                            Стив Браун
                            <br />
                            <div className={styles.architectNameColor}>архитектор</div>
                        </div>
                    </div>
                    <div className={styles.architectText}>
                        Лондонский архитектор с&nbsp;мировым именем и&nbsp;практикой от&nbsp;Гонконга до&nbsp;Арабских Эмиратов,
                        спроектировал REDS.
                    </div>
                </div>
                <div className={styles.text}>
                    Дуэт элегантных башен в&nbsp;стилистике современной голландской архитектуры. Фасады из&nbsp;кирпича роднят REDS
                    не&nbsp;только с&nbsp;Нидерландами, но&nbsp;и&nbsp;с&nbsp;самой Пресней: корпуса выглядят прямыми потомками исторических
                    цехов, сохраненных в&nbsp;Republic.
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
                <motion.div className={styles.towers} style={width > 540 ? { y: toTopBlock1 } : {}}>
                    <div className={styles.number}>2</div>
                    <div className={styles.word}>башни</div>
                </motion.div>
                <motion.div className={styles.floors} style={width > 540 ? { y: toTopBlock2 } : {}}>
                    <div className={styles.number}>26</div>
                    <div className={styles.word}>этажей</div>
                </motion.div>
                <div className={styles.redsScheme}>
                    <RedsSvg />
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

export default BaseTemplate;
