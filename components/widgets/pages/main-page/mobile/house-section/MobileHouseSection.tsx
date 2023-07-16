import React, { useEffect, useRef, useState } from 'react';
import styles from './MobileHouseSection.module.scss';
import { motion, useInView } from 'framer-motion';

import reds from '../../../../../../public/images/main-page/reds_bg.jpg';
import platinum from '../../../../../../public/images/main-page/platinum_bg.jpg';
import brown from '../../../../../../public/images/main-page/brown_bg.jpeg';
import gold from '../../../../../../public/images/main-page/gold_bg.png';
import green from '../../../../../../public/images/main-page/green_bg.png';
import purple from '../../../../../../public/images/main-page/purple_bg.jpeg';
import silver from '../../../../../../public/images/main-page/silver_bg.jpeg';
import whites from '../../../../../../public/images/main-page/whites_bg.png';
import SimpleCard from '../../../../cards/simple-card/SimpleCard';
import IconButton from '../../../../../features/buttons/icon-button/IconButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import ROUTES from '../../../../../../constants/routes';
import { useAppSelector } from '../../../../../../hook';
import { getBulks } from '../../../../../../store/slices/selectors';
import cloneDeep from 'lodash/cloneDeep';
import getQuarterBounds from '../../../../../../tools/get-quarter-bounds-date';
import Image from 'next/image';

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

const MobileHouseSection: React.FC<{}> = ({}) => {
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
    const isTitleInView = useInView(sectionRef, { once: true, amount: 0.4 });
    const isCardInView = useInView(sectionRef, { once: true, amount: 0.6 });
    useEffect(() => {
        const newHouses = cloneDeep(houses);
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
        <>
            <motion.div className={styles.wrapper}>
                <div className={styles.bg_image + ' ' + styles.filter}>
                    <Image src={houses[houseIndex].img} alt={''} sizes='100vw' priority fill={true} key={houses[houseIndex].title} />
                </div>
                <motion.section className={styles.wrapper__content} ref={sectionRef}>
                    <motion.div className={styles.header}>
                        <motion.div
                            className={styles.header__search_text}
                            style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(-210)}px)` }}
                        >
                            Найдите
                        </motion.div>
                        <div className={styles.header__house_title}>
                            <motion.div
                                className={styles.header__house_text}
                                style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(320)}px)` }}
                            >
                                свой дом
                            </motion.div>
                            <motion.div
                                className={styles.header__in_text}
                                style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(60)}px)` }}
                            >
                                в
                            </motion.div>
                        </div>
                        <motion.div
                            className={styles.header__republic_text}
                            style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(210)}px)` }}
                        >
                            Republic
                        </motion.div>
                    </motion.div>
                    <motion.div className={styles.house} style={{ opacity: isCardInView ? '1' : '0' }}>
                        <SimpleCard theme={'light'} className={styles.house__card}>
                            <div className={styles.house__card__container}>
                                <div className={styles.house__card__content}>
                                    <div className={styles.house__card__titles}>
                                        <h3>{houses[houseIndex].title}</h3>
                                        {houses[houseIndex].link && (
                                            <IconButton link={houses[houseIndex].link} type={'Link'}>
                                                <SvgIcons id={'circle-open-small-brick'} />
                                            </IconButton>
                                        )}
                                    </div>
                                    <div className={styles.house__card__desc}>{houses[houseIndex].desc}</div>
                                    <div className={styles.house__card__presentation}>
                                        {houses[houseIndex].id && (
                                            <div className={styles.house__card__presentation__text}>
                                                Выдача ключей:
                                                <br />
                                                {getQuarterBounds(houses[houseIndex].presentation)}
                                            </div>
                                        )}
                                        <div className={styles.house__card__buttons}>
                                            <IconButton
                                                link={'#'}
                                                type={'button'}
                                                func={() => setHouseIndex(houseIndex - 1 < 0 ? houses.length - 1 : houseIndex - 1)}
                                            >
                                                <SvgIcons id={'arrow down outline medium'} theme={'light'} />
                                            </IconButton>
                                            <IconButton
                                                link={'#'}
                                                type={'button'}
                                                func={() => setHouseIndex(houseIndex + 1 >= houses.length ? 0 : houseIndex + 1)}
                                            >
                                                <SvgIcons id={'arrow up outline medium'} theme={'light'} />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SimpleCard>
                    </motion.div>
                </motion.section>
            </motion.div>
        </>
    );
};

export default MobileHouseSection;
