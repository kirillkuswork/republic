import React, { useEffect, useRef, useState } from 'react';
import styles from './IssueKeySection.module.scss';
import { motion } from 'framer-motion';
import { usePageScroll } from '../../../../../shared/page-scroll/PageScroller';
import {
    forMotionDiv,
    IAnimation,
    initialAsAnimateWithTransition,
    responsive,
    reverseAnimation,
    transition1800,
    transition900,
} from '../../../../../shared/page-scroll/animation_helpers';
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
import { getBulks, getCurrentBulk } from '../../../../../../store/slices/selectors';
import _ from 'lodash';
import getQuarterBounds from '../../../../../../tools/get-quarter-bounds-date';
import Image from 'next/image';
import AnimatedIconButton from '../../../../../features/buttons/animated-icon-button/AnimatedIconButton';

type IIssueKeySectionAnimations = {
    [key in 'bg' | 'card']?: IAnimation;
};

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
//Переход к странице
const fromPrevPage: IIssueKeySectionAnimations = {
    bg: {
        initial: { y: 0 },
        animate: { y: -900 },
        transition: transition900,
        responsive: { y: 'vh900' },
    },
    card: {
        initial: { y: 0 },
        animate: { y: -220 },
        transition: transition900,
        responsive: { y: 'vh900' },
    },
};

//К след. странице
const toNextPage: IIssueKeySectionAnimations = initialAsAnimateWithTransition(fromPrevPage, transition900, {
    bg: {
        initial: { y: -900 },
        animate: { y: -900 - 900 },
    },
});

const IssueKeySection: React.FC<{}> = ({}) => {
    const pageScroll = usePageScroll();
    const [animations, setAnimations] = useState<IIssueKeySectionAnimations>({});
    const [houses, setHouses] = useState<IHouse[]>(housesInitial);
    const [houseIndex, setHouseIndex] = useState<number>(0);
    const bulks = useAppSelector(getBulks);

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

    useEffect(() => {
        pageScroll.addStage(11, {
            slideIn: (forward) => {
                if (forward) {
                    setAnimations(responsive(fromPrevPage));
                    return 900;
                } else {
                    setAnimations(reverseAnimation(responsive(toNextPage)));
                    return 900;
                }
            },
            slideOut: (forward) => {
                if (forward) {
                    setAnimations(responsive(toNextPage));
                    return 900;
                } else {
                    setAnimations(reverseAnimation(responsive(fromPrevPage)));
                    return 900;
                }
            },
        });
    }, [pageScroll]);
    return (
        <>
            <motion.div className={styles.wrapper} {...animations.bg}>
                <div className={houses[houseIndex].link ? styles.bg_image : styles.bg_image + ' ' + styles.filter}>
                    <Image src={houses[houseIndex].img} alt={''} sizes='100vw' priority fill={true} key={houses[houseIndex].title} />
                    {/*<img src={houses[houseIndex].img} alt={'reds'} />*/}
                </div>
                <motion.div className={styles.house} {...animations.card}>
                    <SimpleCard theme={'light'} className={styles.house__card}>
                        <div className={styles.house__card__container}>
                            <div className={styles.house__card__buttons}>
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
                            <div className={styles.house__card__content}>
                                <div className={styles.house__card__titles}>
                                    <h3>{houses[houseIndex].title}</h3>
                                    {houses[houseIndex].link && (
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
                                    )}
                                </div>
                                <div className={styles.house__card__desc}>{houses[houseIndex].desc}</div>
                            </div>
                            {houses[houseIndex].id && (
                                <div className={styles.house__card__presentation}>
                                    <div className={styles.house__card__presentation__text}>
                                        Выдача ключей:
                                        <br />
                                        {getQuarterBounds(houses[houseIndex].presentation)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </SimpleCard>
                </motion.div>
            </motion.div>
        </>
    );
};

export default IssueKeySection;
