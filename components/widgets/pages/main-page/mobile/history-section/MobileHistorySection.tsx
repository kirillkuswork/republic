import React, { useEffect, useRef, useState } from 'react';
import styles from './MobileHistorySection.module.scss';
import { motion } from 'framer-motion';
import { isDesktop } from 'react-device-detect';
import IconButton from '../../../../../features/buttons/icon-button/IconButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import ROUTES from '../../../../../../constants/routes';
import SimpleButton from '../../../../../features/buttons/simple-button/SimpleButton';
import SimpleCard from '../../../../cards/simple-card/SimpleCard';
import { getDateString, getMonthString } from '../../../../../../tools/get-date-string';
import Slider from '../../../../slider/Slider';

const points = [
    {
        id: 1,
        year: 'XVIII век',
        text: 'В&nbsp;1730-х гг. активный контрабандный ввоз алкоголя в&nbsp;Москву вынудил купцов, собиравших пошлины с&nbsp;продажи вина, за&nbsp;свои деньги окружить московские пригороды надолбами&nbsp;— врытыми в&nbsp;землю бревнами. Спонтанно организованная, эта новая таможенная граница Москвы вскоре стала фактической.',
    },
    {
        id: 2,
        year: 'XIX век',
        text: 'С&nbsp;конца XVIII века Пресня&nbsp;— один из&nbsp;крупнейших промышленно-торговых центров Москвы. Кроме отставных военных и&nbsp;мелких чиновников здесь активно селились и&nbsp;открывали свои мастерские кузнецы и&nbsp;гончары, оружейники и&nbsp;ткачи. Открывались фабрики: Трехгорная мануфактура, мебельная фабрика Шмитов, сургучная и&nbsp;лаковая фабрика Мамонтовых.',
    },
    {
        id: 3,
        year: 'XX век',
        text: 'В&nbsp;ХХ&nbsp;веке Пресня приобрела свой характерный облик. Это не&nbsp;однородный район с&nbsp;одинаковой застройкой и&nbsp;культурой, а&nbsp;коллекция анклавов, в&nbsp;каждом из&nbsp;которых кипит своя жизнь. Если вокруг железнодорожных мастерских селился, в&nbsp;основном, рабочий класс, то&nbsp;на&nbsp;Патриарших (тогда&nbsp;— Пионерских) прудах уже веселилась статусная публика и&nbsp;золотая молодежь.',
    },
    {
        id: 4,
        year: 'XXI век',
        text: 'В&nbsp;новое время Пресня устремилась ввысь. Небоскребы Сити стали местом работы и&nbsp;жизни финансовой и&nbsp;бизнес-элиты. Переосмысление индустриальных памятников&nbsp;— от&nbsp;Трехгорной мануфактуры до&nbsp;электромашиностроительного завода&nbsp;— привело к&nbsp;возникновению культовых проектов, где история переплелась с&nbsp;современностью, подарив Москве новое качество жизни. Republic&nbsp;— самый новый из&nbsp;них.',
    },
];

const MobileHistorySection: React.FC<{}> = ({}) => {
    return (
        <>
            <motion.div className={styles.wrapper} id='history_wrapper'>
                <div className={styles.content_wrapper}>
                    <div className={styles.content_wrapper__title}>
                        ПРЕСНЯ: ОТ ТАМОЖЕННОЙ ГРАНИЦЫ ДО ЗАВТРАКА
                        <br />В ПАРОВОЗНОМ ЦЕХЕ
                    </div>
                    <div className={styles.content_wrapper__history_button}>
                        <SimpleButton
                            text='история места'
                            type='Link'
                            link={ROUTES.history}
                            outline={true}
                            color={'light'}
                            size={'medium'}
                            children={<SvgIcons id={'arrow next light small'} />}
                        />
                    </div>
                </div>
                <div className={styles.points}>
                    <Slider size={'content'} uniqueKey={'history-section'}>
                        {points.map((val, index) => {
                            return (
                                <SimpleCard theme={'outline-dark-grey'} className={styles.points__card} key={index}>
                                    <div className={styles.points__card__wrapper}>
                                        <div className={styles.points__card__title}>{val.year}</div>
                                        <div className={styles.points__card__desc} dangerouslySetInnerHTML={{ __html: val.text }}></div>
                                    </div>
                                </SimpleCard>
                            );
                        })}
                    </Slider>
                </div>
            </motion.div>
        </>
    );
};

export default MobileHistorySection;
