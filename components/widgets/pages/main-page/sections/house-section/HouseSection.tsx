import React, { useCallback, useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import styles from './HouseSection.module.scss';
import { cubicBezier, motion, useAnimationControls, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import AnimatedIconButton from '../../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import reds from '../../../../../../public/images/main-page/reds_bg.jpg';
import ROUTES from '../../../../../../constants/routes';
import platinum from '../../../../../../public/images/main-page/platinum_bg.jpg';
import gold from '../../../../../../public/images/main-page/gold_bg.png';
import purple from '../../../../../../public/images/main-page/purple_bg.jpeg';
import green from '../../../../../../public/images/main-page/green_bg.png';
import brown from '../../../../../../public/images/main-page/brown_bg.jpeg';
import silver from '../../../../../../public/images/main-page/silver_bg.jpeg';
import whites from '../../../../../../public/images/main-page/whites_bg.png';
import { useAppSelector } from '../../../../../../hook';
import { getBulks } from '../../../../../../store/slices/selectors';
import SimpleCard from '../../../../cards/simple-card/SimpleCard';
import _ from 'lodash';
import Image from 'next/image';
import getQuarterBounds from '../../../../../../tools/get-quarter-bounds-date';

interface IHouse {
    title: string;
    desc: string;
    img: string;
    presentation: string;
    link?: string;
    id?: number;
}

const housesInitial: IHouse[] = [
    {
        title: 'Reds',
        desc: 'Дуэт элегантных башен в стилистике современной голландской архитектуры',
        img: reds.src,
        presentation: 'скоро',
        link: `${ROUTES.houses}/reds`,
    },
    {
        title: 'Platinum',
        desc: 'Уникальный архитектурный опыт светопоглощения',
        img: platinum.src,
        presentation: 'скоро',
        link: `${ROUTES.houses}/platinum`,
    },
    {
        title: 'Gold',
        desc: 'Скоро',
        img: gold.src,
        presentation: 'скоро',
    },
    {
        title: 'Purple',
        desc: 'Скоро',
        img: purple.src,
        presentation: 'скоро',
    },
    {
        title: 'Green',
        desc: 'Скоро',
        img: green.src,
        presentation: 'скоро',
    },
    {
        title: 'Brown',
        desc: 'Скоро',
        img: brown.src,
        presentation: 'скоро',
    },
    {
        title: 'Silver',
        desc: 'Скоро',
        img: silver.src,
        presentation: 'скоро',
    },
    {
        title: 'Whites',
        desc: 'Скоро',
        img: whites.src,
        presentation: 'скоро',
    },
];

const HouseSection: React.FC<{}> = ({}) => {
    function vwAll(x: number) {
        const viewport =
            document.documentElement.clientWidth > 1370
                ? 1460
                : document.documentElement.clientWidth >= 1024
                ? 1200
                : document.documentElement.clientWidth >= 541
                ? 768
                : 380;

        return (x / viewport) * document.documentElement.clientWidth;
    }
    const [houses, setHouses] = useState<IHouse[]>(housesInitial);
    const [houseIndex, setHouseIndex] = useState<number>(0);
    const bulks = useAppSelector(getBulks);
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLElement | null>(null);
    const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 });
    useEffect(() => {
        const newHouses = _.cloneDeep(houses);
        for (let h of newHouses) {
            const bulk = bulks.find((item) => item.houseName === h.title);
            if (bulk) {
                h.presentation = bulk.keyDate;
                h.id = bulk.id;
            }
        }
        setHouses(newHouses);
    }, [bulks]);

    return (
        <motion.section className={styles.section} ref={sectionRef}>
            <div className={houses[houseIndex].link ? styles.bg_image : styles.bg_image + ' ' + styles.filter}>
                <Image src={houses[houseIndex].img} alt={''} sizes='100%' priority fill={true} key={houses[houseIndex].title} />
            </div>
            <div className={styles.section__wrapper}>
                <motion.section className={styles.section__titles} ref={titleRef}>
                    <motion.div
                        className={styles.section__search_text}
                        style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(-520)}px)` }}
                    >
                        Найдите
                    </motion.div>
                    <div className={styles.section__house_block}>
                        <motion.div
                            className={styles.house}
                            style={{ transform: isTitleInView ? 'none' : 'translateY(300px)', opacity: isTitleInView ? '1' : '0' }}
                        >
                            <SimpleCard theme={'light'} className={styles.house__card}>
                                <div className={styles.house__container}>
                                    <div className={styles.house__buttons}>
                                        <AnimatedIconButton
                                            type={'button'}
                                            variant={'round'}
                                            outline={true}
                                            color={'white-brick'}
                                            size={'default'}
                                            direction='left'
                                            onClick={() => setHouseIndex(houseIndex - 1 < 0 ? houses.length - 1 : houseIndex - 1)}
                                        >
                                            <SvgIcons id={'arrow left'} />
                                        </AnimatedIconButton>
                                        <AnimatedIconButton
                                            type={'button'}
                                            variant={'round'}
                                            outline={true}
                                            color={'white-brick'}
                                            size={'default'}
                                            direction='right'
                                            onClick={() => setHouseIndex(houseIndex + 1 >= houses.length ? 0 : houseIndex + 1)}
                                        >
                                            <SvgIcons id={'arrow right'} />
                                        </AnimatedIconButton>
                                    </div>
                                    <div className={styles.house__content}>
                                        <div className={styles.house__titles}>
                                            <h3>{houses[houseIndex].title}</h3>
                                            {houses[houseIndex].link && (
                                                <div className={styles.house__icon}>
                                                    <AnimatedIconButton
                                                        type={'link'}
                                                        variant={'round'}
                                                        outline={false}
                                                        color={'brick'}
                                                        size={'small'}
                                                        direction='up'
                                                        href={houses[houseIndex].link}
                                                    >
                                                        <SvgIcons id={'circle-open-small-brick'} />
                                                    </AnimatedIconButton>
                                                    {!isMobile &&
                                                        <div className={styles.house__icon_text}>Смотреть</div>
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.house__desc}>{houses[houseIndex].desc}</div>
                                    </div>
                                    {houses[houseIndex].id && (
                                        <div className={styles.house__presentation}>
                                            <div className={styles.house__presentation__text}>
                                                Выдача ключей:
                                                <br />
                                                {getQuarterBounds(houses[houseIndex].presentation)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </SimpleCard>
                        </motion.div>
                        <motion.div className={styles.section__text_block}>
                            <div className={styles.section__house_title}>
                                <motion.div
                                    className={styles.section__house_text}
                                    style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(810)}px)` }}
                                >
                                    свой дом
                                </motion.div>
                                <motion.div
                                    className={styles.section__in_text}
                                    style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(90)}px)` }}
                                >
                                    в
                                </motion.div>
                            </div>
                            <motion.div
                                className={styles.section__repub_text}
                                style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(520)}px)` }}
                            >
                                republic
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>
            </div>
        </motion.section>
    );
};

export default HouseSection;
