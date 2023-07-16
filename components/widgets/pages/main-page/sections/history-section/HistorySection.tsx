import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './HistorySection.module.scss';
import { cubicBezier, motion, useAnimationControls, useScroll, useSpring, useTransform } from 'framer-motion';
import AnimatedIconButton from '../../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import _ from 'lodash';
import Image from 'next/image';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
import ROUTES from '../../../../../../constants/routes';
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
const HistorySection: React.FC<{}> = ({}) => {
    const [activeId, setActiveId] = useState(1);
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });
    const smoothY = useSpring(scrollYProgress, { damping: 15, mass: 0.27, stiffness: 55 });
    const bgScale = useTransform(smoothY, [0.1, 0.8], [1.0, 1.06]);

    return (
        <motion.section className={styles.section} ref={sectionRef}>
            <motion.div className={styles.bg_image} style={{ scale: bgScale }}>
                <Image src={'/images/main-page/history_bg.png'} alt={''} sizes='100%' priority fill={true} key={'bg'} />
            </motion.div>
            <div className={styles.content_wrapper}>
                <div className={styles.content_wrapper__title}>
                    ПРЕСНЯ: ОТ&nbsp;&nbsp;ТАМОЖЕННОЙ ГРАНИЦЫ ДО ЗАВТРАКА
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
                                    activeId === val.id ? styles.points__point + ' ' + styles.points__point__active : styles.points__point
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
        </motion.section>
    );
};

export default HistorySection;
