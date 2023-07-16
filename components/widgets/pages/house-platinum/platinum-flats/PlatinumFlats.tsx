import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './PlatinumFlats.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import { useAppSelector } from '../../../../../hook';
import HousePageIconList from '../../house-page/flats-icons/HousePageIconList';
import getScaledSizeSecond from '../../../../../tools/getScaledSizeSecond';
import { motion, useInView, useSpring, useTransform, useScroll } from 'framer-motion';

export interface PlatinumFlats {}

const PlatinumFlats: React.FC<PlatinumFlats> = ({}) => {
    const iconList = [
        {
            iconId: 'security system',
            text: 'Системы контроля доступа и&nbsp;безопасности',
            description: `<ul>
                  <li>Система контроля доступа на&nbsp;всех входах в&nbsp;здание, придомовую территорию и&nbsp;паркинг</li>
                  <li>Доступ по&nbsp;ключ-карте, мобильному телефону, системе распознавания лиц</li>
                  <li>Видеонаблюдение на&nbsp;придомовой территории, в лобби, паркинге, лифтовых холлах на этажах, выходах с лестничных клеток на этажи</li>
                </ul>`,
        },
        {
            iconId: 'fire protection',
            text: 'Система автоматического пожаротушения',
            description:
                '<ul><li>Дымовые датчики</li><li>Система звукового оповещения</li><li>Система автоматического пожаротушения в&nbsp;местах общего пользования</li></ul>',
        },
        {
            iconId: 'garbage sorting',
            text: 'система сортировки мусора',
            description:
                '<ul><li>Помещения для сбора и&nbsp;сортировки отходов на&nbsp;жилых этажах</li><li>Помещение для сбора, сортировки отходов на &minus;1 уровне</li></ul>',
        },
        {
            iconId: 'elevator',
            text: 'пять лифтов',
            description:
                '<ul><li>2&nbsp;грузовых</li><li>3&nbsp;пассажирских</li><li>Спуск в&nbsp;паркинг на&nbsp;лифте</li><li>Усилители сигнала сотовой связи в&nbsp;лифтах</li></ul>',
        },
        {
            iconId: 'people',
            text: 'прогрессивная управляющая компания',
            description: `<div>Система коммуникации и&nbsp;взаимодействия с&nbsp;Управляющей компанией через приложение.</div>
              <ol>
                <li>Возможность использования системы домофонии через мобильное приложение.</li>
                <li>Бесконтактный доступ в&nbsp;здание.</li>
                <li>Оформление заявок на&nbsp;гостевые пропуска.</li>
                <li>Формирование QR-кода/PIN-кода для прохода гостей на&nbsp;территорию.</li>
                <li>Интеграция с&nbsp;сервисами партнеров (заказ услуг, рестораны, магазины, клининг).</li>
                <li>Онлайн-доступ к&nbsp;видеокамерам, паркинг, придомовая территория, лифтовой холл.</li>
                <li>Возможность отслеживать потребление ресурсов через мобильное приложение (счетчики воды, электричества и&nbsp;тепла) и&nbsp;оплаты услуг ЖКХ.</li>
                <li>Связь с&nbsp;диспетчерской, подача заявок на&nbsp;разного рода неисправности общедомовых систем, уборки и&nbsp;т.д., а&nbsp;также отслеживание статуса выполнения заявок.</li>
                <li>Информирование жителей о&nbsp;проведении разного рода мероприятий и&nbsp;событий на&nbsp;территории квартала.</li>
              </ol>`,
        },
    ];

    const [isOpenModal, setIsOpenModal] = useState(false);
    const width = useAppSelector((state) => state.main.width);

    const flatsContainerRef = React.useRef<HTMLDivElement>(null);
    const flatsTitleRef = React.useRef<HTMLDivElement>(null);
    const flatsDescrRef = React.useRef<HTMLDivElement>(null);
    const flatsDescrRef1 = React.useRef<HTMLDivElement>(null);
    const flatsDescrRef2 = React.useRef<HTMLDivElement>(null);
    const isInViewTitle = useInView(flatsTitleRef, { once: true });
    const isInViewDescr = useInView(flatsDescrRef, { once: true });
    const isInViewDescr1 = useInView(flatsDescrRef1, { once: true });
    const isInViewDescr2 = useInView(flatsDescrRef2, { once: true });

    const { scrollYProgress } = useScroll({
        target: flatsContainerRef,
        offset: ['start end', 'end end'],
    });
    const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const imgScale = useTransform(smoothYProgress, [0, 1], [1, 1.1]);

    return (
        <>
            <section className={styles.container} ref={flatsContainerRef}>
                <div className={styles.leftSide}>
                    <div className={styles.title} ref={flatsTitleRef}>
                        <div
                            className={styles.title1}
                            style={{
                                transform: isInViewTitle ? 'none' : `translateX(${getScaledSizeSecond(-850, width)}px)`,
                                transition: 'all 0.9s ease 0.1s',
                            }}
                        >
                            современные
                        </div>
                        <div
                            className={styles.title2}
                            style={{
                                transform: isInViewTitle ? 'none' : `translateX(${getScaledSizeSecond(950, width)}px)`,
                                transition: 'all 0.9s ease 0.1s',
                            }}
                        >
                            квартиры
                        </div>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    {width <= 540 && (
                        <div
                            className={styles.leftText}
                            style={{
                                // transform: isInViewDescr ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                                opacity: isInViewDescr ? 1 : 0,
                                transition: 'all 0.9s ease 0.1s',
                            }}
                            ref={flatsDescrRef}
                        >
                            Здесь удобно собираться всей семьей&nbsp;&mdash; завтракать с&nbsp;детьми перед школой или готовить ужин,
                            обсуждая яркие события прошедшего дня.
                        </div>
                    )}
                    <div className={styles.imageDiv}>
                        <motion.img
                            className={styles.image}
                            src={'/images/houses/house-platinum/platinum-flat.jpg'}
                            alt=''
                            style={{ scale: imgScale }}
                        />
                    </div>
                    <div className={styles.rightDescription}>
                        <div className={styles.rightDescriptionItem1}></div>
                        <div className={styles.rightDescriptionItem2} ref={flatsDescrRef1}>
                            {width > 540 && (
                                <div
                                    className={styles.leftText}
                                    style={{
                                        // transform: isInViewDescr ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                                        opacity: isInViewDescr1 ? 1 : 0,
                                        transition: 'all 0.9s ease 0.1s',
                                    }}
                                >
                                    Здесь удобно собираться всей семьей&nbsp;&mdash; завтракать с&nbsp;детьми перед школой или готовить
                                    ужин, обсуждая яркие события прошедшего дня.
                                </div>
                            )}
                            <div
                                className={styles.rightText}
                                style={{
                                    // transform: isInViewDescr ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                                    opacity: isInViewDescr2 ? 1 : 0,
                                    transition: 'all 0.9s ease 0.1s',
                                }}
                                ref={flatsDescrRef2}
                            >
                                Во&nbsp;всех квартирах предусмотрены мастер-спальни с&nbsp;гардеробной и&nbsp;отдельным санузлом,
                                а&nbsp;также отдельные помещения для постирочной зоны. Увеличенные окна с&nbsp;низкими подоконниками,
                                а&nbsp;в&nbsp;квартирах выходящих на&nbsp;юг&nbsp;лоджии с&nbsp;распашными дверями. В&nbsp;части квартир
                                ванные с&nbsp;окном. В&nbsp;угловых лотах просторные кухни-гостиные с&nbsp;4&nbsp;окнами.
                            </div>
                        </div>
                        <div className={styles.floor}>
                            <div className={styles.heightText}>
                                Высота
                                <br />
                                типового этажа
                            </div>
                            <div className={styles.height}>
                                3.1
                                <span className={styles.heightSmall}>м</span>
                            </div>
                        </div>
                    </div>

                    <HousePageIconList iconList={iconList} />
                </div>
            </section>
        </>
    );
};

export default PlatinumFlats;
