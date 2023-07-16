import React, { useEffect, useRef, useState } from 'react';
import styles from './HistorySection.module.scss';
import { motion } from 'framer-motion';
import { isDesktop } from 'react-device-detect';
import { usePageScroll } from '../../../../../shared/page-scroll/PageScroller';
import {
    forMotionDiv,
    IAnimation,
    initialAsAnimateWithTransition,
    responsive,
    reverseAnimation,
    transition1200,
    transition1600,
    transition1800,
    transition900,
} from '../../../../../shared/page-scroll/animation_helpers';
import IconButton from '../../../../../features/buttons/icon-button/IconButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import ROUTES from '../../../../../../constants/routes';
import SimpleButton from '../../../../../features/buttons/simple-button/SimpleButton';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
type IArtefactSectionAnimations = {
    [key in 'bg' | 'bg_img']?: IAnimation;
};

const points = [
    {
        id: 1,
        year: 'XVIII',
        text: 'В&nbsp;1730-х гг. активный контрабандный ввоз алкоголя в&nbsp;Москву вынудил купцов, собиравших пошлины с&nbsp;продажи вина, за&nbsp;свои деньги окружить московские пригороды надолбами&nbsp;— врытыми в&nbsp;землю бревнами. Спонтанно организованная, эта новая таможенная граница Москвы вскоре стала фактической.',
    },
    {
        id: 2,
        year: 'XIX',
        text: 'С&nbsp;конца XVIII века Пресня&nbsp;— один из&nbsp;крупнейших промышленно-торговых центров Москвы. Кроме отставных военных и&nbsp;мелких чиновников здесь активно селились и&nbsp;открывали свои мастерские кузнецы и&nbsp;гончары, оружейники и&nbsp;ткачи. Открывались фабрики: Трехгорная мануфактура, мебельная фабрика Шмитов, сургучная и&nbsp;лаковая фабрика Мамонтовых.',
    },
    {
        id: 3,
        year: 'XX',
        text: 'В&nbsp;ХХ&nbsp;веке Пресня приобрела свой характерный облик. Это не&nbsp;однородный район с&nbsp;одинаковой застройкой и&nbsp;культурой, а&nbsp;коллекция анклавов, в&nbsp;каждом из&nbsp;которых кипит своя жизнь. Если вокруг железнодорожных мастерских селился, в&nbsp;основном, рабочий класс, то&nbsp;на&nbsp;Патриарших (тогда&nbsp;— Пионерских) прудах уже веселилась статусная публика и&nbsp;золотая молодежь.',
    },
    {
        id: 4,
        year: 'XXI',
        text: 'В&nbsp;новое время Пресня устремилась ввысь. Небоскребы Сити стали местом работы и&nbsp;жизни финансовой и&nbsp;бизнес-элиты. Переосмысление индустриальных памятников&nbsp;— от&nbsp;Трехгорной мануфактуры до&nbsp;электромашиностроительного завода&nbsp;— привело к&nbsp;возникновению культовых проектов, где история переплелась с&nbsp;современностью, подарив Москве новое качество жизни. Republic&nbsp;— самый новый из&nbsp;них.',
    },
];
//Переход к странице
const fromPrevPage: IArtefactSectionAnimations = {
    bg: {
        initial: { y: 0 },
        animate: { y: -900 },
        transition: transition900,
        responsive: { y: 'vh900' },
    },
    bg_img: {
        initial: { scale: 1.0 },
        animate: { scale: 1.06 },
        transition: transition900,
    },
};
//К след. странице
const toNextPage: IArtefactSectionAnimations = initialAsAnimateWithTransition(fromPrevPage, transition900, {
    bg: {
        initial: { y: -900 },
        animate: { y: -900 - 900 },
    },
    bg_img: {
        initial: { scale: 1.06 },
        animate: { scale: 1.0 },
    },
});

const HistorySection: React.FC<{}> = ({}) => {
    const pageScroll = usePageScroll();
    const [animations, setAnimations] = useState<IArtefactSectionAnimations>({});
    const [activeId, setActiveId] = useState(1);
    useEffect(() => {
        pageScroll.addStage(14, {
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
            <motion.div className={styles.wrapper} id='history_wrapper' {...animations.bg}>
                <motion.div className={styles.wrapper__bg} {...animations.bg_img}></motion.div>
                <div className={styles.content_wrapper}>
                    <div className={styles.content_wrapper__title}>
                        ПРЕСНЯ: ОТ ТАМОЖЕННОЙ ГРАНИЦЫ ДО ЗАВТРАКА
                        <br />В ПАРОВОЗНОМ ЦЕХЕ
                    </div>
                    <div className={styles.content_wrapper__history_button}>
                        <AnimatedSimpleButton
                            text='история места'
                            theme='light-outline'
                            link={ROUTES.history}
                            withIcon={true}
                            iconAnimation={'right'}
                            iconPosition={'right'}
                            size={'default'}
                        >
                            <SvgIcons id='arrow right' />
                        </AnimatedSimpleButton>
                    </div>
                    <div className={styles.points}>
                        <div className={styles.points__wrapper}>
                            {points.map((val, index) => (
                                <div
                                    key={index}
                                    className={
                                        activeId === val.id
                                            ? styles.points__point + ' ' + styles.points__point__active
                                            : styles.points__point
                                    }
                                    onClick={() => setActiveId(val.id)}
                                >
                                    <div className={styles.points__point__year}>{val.year}</div>
                                    <div className={styles.points__point__text}>
                                        <p dangerouslySetInnerHTML={{ __html: val.text }}></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default HistorySection;
