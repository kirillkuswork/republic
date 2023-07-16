import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './RedsFlats.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import RedsWhitebox from '../reds-whitebox/RedsWhitebox';
import { useAppSelector } from '../../../../../hook';
import HousePageIconList from '../../house-page/flats-icons/HousePageIconList';
import getScaledSizeSecond from '../../../../../tools/getScaledSizeSecond';
import { motion, useInView, useSpring, useTransform, useScroll } from 'framer-motion';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

export interface RedsFlats {}

const BaseTemplate: React.FC<RedsFlats> = ({}) => {
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
            text: 'Четыре лифта в&nbsp;каждой секции',
            description:
                '<ul><li>2&nbsp;грузовых</li><li>2&nbsp;пассажирских</li><li>Спуск в&nbsp;паркинг на&nbsp;лифте</li><li>Усилители сигнала сотовой связи в&nbsp;лифтах</li><li>Дизайнерская отделка лифтовых кабин</li></ul>',
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
    const isInViewDescr2 = useInView(flatsDescrRef1, { once: true });

    const { scrollYProgress } = useScroll({
        target: flatsContainerRef,
        offset: ['start end', 'end end'],
    });
    const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const imgScale = useTransform(smoothYProgress, [0, 1], [1, 1.1]);

    const [isButtonActive, setIsButtonActive] = useState(false);

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
                    <div
                        className={styles.leftText}
                        style={{
                            // transform: isInViewDescr ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                            opacity: isInViewDescr ? 1 : 0,
                            transition: 'all 0.9s ease 0.1s',
                        }}
                        ref={flatsDescrRef}
                    >
                        Увеличенные окна и&nbsp;балконы с&nbsp;распашными дверями превращают REDS в&nbsp;настоящий дом солнца.
                        А&nbsp;в&nbsp;кухнях-гостиных удобно собираться всей семьей.
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.imageDiv}>
                        <motion.img
                            className={styles.image}
                            src={'/images/houses/house-reds/reds-flat.jpg'}
                            alt=''
                            style={{ scale: imgScale }}
                        />
                    </div>
                    <div className={styles.rightDescription}>
                        <div
                            className={styles.rightDescriptionItem1}
                            style={{
                                transform: isInViewDescr1 ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                                opacity: isInViewDescr1 ? 1 : 0,
                                transition: 'all 0.9s ease 0.1s',
                            }}
                            ref={flatsDescrRef1}
                        >
                            <div className={styles.whiteBoxText}>
                                Квартиры в&nbsp;REDS сдаются в&nbsp;white box или черновой отделке. В&nbsp;зависимости от&nbsp;выбранного
                                варианта инженерная комплектация отличается, но&nbsp;базовые инженерные параметры одинаковы для всех.
                            </div>
                            <div className={styles.whiteBoxText}>
                                В&nbsp;большинстве квартир предусмотрены мастер-спальни с&nbsp;гардеробной и&nbsp;отдельным санузлом,
                                в&nbsp;том числе&nbsp;&mdash; ванные со&nbsp;стеклянной стеной.
                            </div>
                            <div
                                className={styles.whiteBoxBtn}
                                onClick={() => setIsOpenModal(true)}
                                onMouseEnter={() => setIsButtonActive(true)}
                                onMouseLeave={() => setIsButtonActive(false)}
                            >
                                <div>White box</div>
                                {/* <SvgIcons id='circle-open' /> */}
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
                            </div>
                        </div>
                        <div
                            className={styles.rightDescriptionItem2}
                            style={{
                                transform: isInViewDescr2 ? 'none' : `translateY(${getScaledSizeSecond(150, width)}px)`,
                                opacity: isInViewDescr2 ? 1 : 0,
                                transition: 'all 0.9s ease 0.1s',
                            }}
                            ref={flatsDescrRef2}
                        >
                            <div className={styles.penthouse}>
                                <div className={styles.heightText}>
                                    Высота
                                    <br />
                                    пентхауса
                                </div>
                                <div className={styles.height}>
                                    5.1
                                    <span className={styles.heightSmall}>м</span>
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
                    </div>

                    <HousePageIconList iconList={iconList} />
                </div>
            </section>

            <RedsWhitebox isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
        </>
    );
};

export default BaseTemplate;
