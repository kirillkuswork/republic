import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import SvgIcons from '../../../../svgs/SvgIcons';
import styles from './LocationPlaces.module.scss';

export interface ILocationPlaces {}

const LocationPlaces: React.FC<ILocationPlaces> = () => {
    const [activeTab, setActiveTab] = useState<'step' | 'car'>('step');
    const fixedBarRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLElement | null>(null);
    const container1 = useRef<HTMLElement | null>(null);
    const container2 = useRef<HTMLElement | null>(null);
    const container3 = useRef<HTMLElement | null>(null);
    const container4 = useRef<HTMLElement | null>(null);

    const isFixedBarInView = useInView(fixedBarRef, { once: true, amount: 0.9 });
    const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 });
    const isContainer1InView = useInView(container1, { once: true, amount: 0.85 });
    const isContainer2InView = useInView(container2, { once: true, amount: 0.6 });
    const isContainer3InView = useInView(container3, { once: true, amount: 0.45 });
    const isContainer4InView = useInView(container4, { once: true, amount: 0.6 });

    const handleChangeActiveTab = (value: 'step' | 'car'): void => {
        const element = document.querySelector('#location-places');
        element && element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveTab(value);
    };

    return (
        <div className={styles.places} id='location-places'>
            <div className={styles.wrapper}>
                <motion.section ref={titleRef} className={styles.title}>
                    <motion.h1
                        className={`${styles.text} ${styles.text1}`}
                        style={{ transform: isTitleInView ? 'none' : 'translateX(600px)' }}
                    >
                        Знаковые
                    </motion.h1>
                    <motion.h1
                        className={`${styles.text} ${styles.text2}`}
                        style={{ transform: isTitleInView ? 'none' : 'translateX(-1000px)' }}
                    >
                        Локации
                    </motion.h1>
                    <motion.h1
                        className={`${styles.text} ${styles.text3}`}
                        style={{ transform: isTitleInView ? 'none' : 'translateX(600px)' }}
                    >
                        Рядом
                    </motion.h1>
                </motion.section>
                <motion.section ref={container1} className={styles.container1}>
                    <div className={styles.block}>
                        <div className={styles.block_image}>
                            {activeTab === 'step' ? (
                                <Image src='/images/location/places/white_square.png' alt='white square' fill sizes='100vw' />
                            ) : (
                                <Image src='/images/location/places/moscow_city.png' alt='moscow city' fill sizes='100vw' />
                            )}
                            <motion.div
                                className={styles.block_title}
                                style={{
                                    transform: isContainer1InView ? 'none' : 'translateY(80px)',
                                    opacity: isContainer1InView ? 1 : 0,
                                }}
                            >
                                {activeTab === 'step' ? (
                                    <div className={styles.block_title_step}>
                                        <h3>Белая</h3>
                                        <h3>Площадь</h3>
                                    </div>
                                ) : (
                                    <h3>Москва-Сити</h3>
                                )}
                            </motion.div>
                        </div>
                        <div
                            className={styles.block_text}
                            style={{
                                transform: isContainer1InView ? 'none' : 'translateY(80px)',
                                opacity: isContainer1InView ? 1 : 0,
                            }}
                        >
                            {activeTab === 'step' ? (
                                <p>
                                    Рестораны, кофейни и&nbsp;фитнес-центры на&nbsp;Белой площади вымуштрованы сотрудниками компаний
                                    с&nbsp;мировым именем.
                                </p>
                            ) : (
                                <p>
                                    Без прошлого нет будущего, и&nbsp;небоскрёбы Москва-сити, выросшие на&nbsp;месте бывшей каменоломни
                                    на&nbsp;Пресненской набережной,&nbsp;&mdash; яркое тому подтверждение. Резидентам Republic понадобится
                                    всего 10&nbsp;минут езды, чтобы побывать в&nbsp;царстве хай-тека, модерна и&nbsp;неоконструктивизма
                                    и&nbsp;почувствовать, как бьётся пульс города.
                                </p>
                            )}
                            <div className={styles.journey_time}>
                                <div className={styles.journey_time_icon}>
                                    <SvgIcons id={activeTab === 'step' ? 'step circle outline' : 'car circle outline'} />
                                </div>
                                <p className={styles.journey_time_text}>{activeTab === 'step' ? '12 мин' : '11 мин'}</p>
                            </div>
                        </div>
                    </div>
                </motion.section>
                <motion.section ref={container2} className={styles.container2}>
                    <div className={styles.block2}>
                        <div className={styles.container2_image}>
                            {activeTab === 'step' ? (
                                <Image src='/images/location/places/food_mall_depot.png' alt='food mall depot' fill sizes='100vw' />
                            ) : (
                                <Image src='/images/location/places/kremlin.jpg' alt='kremlin' fill sizes='100vw' />
                            )}
                            <motion.div
                                className={styles.block2_title}
                                style={{
                                    transform: isContainer2InView ? 'none' : 'translateY(80px)',
                                    opacity: isContainer2InView ? 1 : 0,
                                }}
                            >
                                {activeTab === 'step' ? (
                                    <>
                                        <h3>Фудмолл</h3>
                                        <h3>Депо</h3>
                                    </>
                                ) : (
                                    <h3 className={styles.kremlin}>Кремль</h3>
                                )}
                            </motion.div>
                        </div>
                        <motion.div
                            className={styles.block2_text}
                            style={{
                                transform: isContainer2InView ? 'none' : 'translateY(80px)',
                                opacity: isContainer2InView ? 1 : 0,
                            }}
                        >
                            {activeTab === 'step' ? (
                                <p>
                                    Обосновавшийся в&nbsp;бывших мастерских Миусского трамвайного парка, фудмолл разделяет подход Republic
                                    к&nbsp;переосмыслению исторической архитектуры. Сегодня здесь кипит не&nbsp;производственная,
                                    а&nbsp;гастрономическая жизнь.
                                </p>
                            ) : (
                                <p>
                                    Пока другие рассматривают открытки с&nbsp;видами Красной площади, с&nbsp;Пресни можно доехать туда всего
                                    за&nbsp;15&nbsp;минут. Чувствовать себя одновременно хозяином и&nbsp;туристом, рассматривать места,
                                    которые дышат историей, в&nbsp;каждый раз как в&nbsp;первый, и&nbsp;привыкать, что это&nbsp;&mdash;
                                    реальность, в&nbsp;которую можно вернуться бесконечное количество раз.
                                </p>
                            )}
                            <div className={styles.journey_time}>
                                <div className={styles.journey_time_icon}>
                                    <SvgIcons id={activeTab === 'step' ? 'step circle outline' : 'car circle outline'} />
                                </div>
                                <p className={styles.journey_time_text}>{activeTab === 'step' ? '16 мин' : '16 мин'}</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>
                <motion.section ref={container3} className={styles.container3}>
                    <div className={styles.block2}>
                        <div className={`${styles.container3_image} ${activeTab === 'car' ? styles.container3_sheremetyevo : ''}`}>
                            {activeTab === 'step' ? (
                                <Image src='/images/location/places/moscow_zoo.png' alt='moscow zoo' fill sizes='100vw' />
                            ) : (
                                <Image src='/images/location/places/sheremetyevo.jpg' alt='sheremetyevo' fill sizes='100vw' />
                            )}
                            <motion.div
                                className={styles.block2_title}
                                style={{
                                    transform: isContainer3InView ? 'none' : 'translateY(80px)',
                                    opacity: isContainer3InView ? 1 : 0,
                                }}
                            >
                                {activeTab === 'step' ? (
                                    <>
                                        <h3>Московский</h3>
                                        <h3>Зоопарк</h3>
                                    </>
                                ) : (
                                    <h3>Шереметьево</h3>
                                )}
                            </motion.div>
                        </div>
                        <motion.div
                            className={styles.block2_text}
                            style={{
                                transform: isContainer3InView ? 'none' : 'translateY(80px)',
                                opacity: isContainer3InView ? 1 : 0,
                            }}
                        >
                            {activeTab === 'step' ? (
                                <p>
                                    Один из&nbsp;старейших зоосадов мира, Московский зоопарк с&nbsp;1864 года остается любимым местом
                                    семейных прогулок. Фанаты жизни на&nbsp;Пресне ценят в&nbsp;нем не&nbsp;только умиротворенную атмосферу
                                    и&nbsp;внушительную коллекцию животных, но&nbsp;и&nbsp;бережное отношение к&nbsp;истории: Большой
                                    и&nbsp;Малый пруды зоопарка остаются единственным свидетельством существования реки Пресни, которая
                                    на&nbsp;всем остальном течении заключена в&nbsp;подземные коллекторы.
                                </p>
                            ) : (
                                <p>
                                    Даже самую уютную обстановку иногда хочется сменить. Всего полчаса на&nbsp;машине до&nbsp;Шереметьево,
                                    а&nbsp;оттуда&nbsp;&mdash; в&nbsp;дальние страны, навстречу приключениям. А&nbsp;если работа
                                    не&nbsp;ждёт&nbsp;&mdash; в&nbsp;командировку, не&nbsp;теряя ни&nbsp;секунды драгоценного времени.
                                </p>
                            )}
                            <div className={styles.journey_time}>
                                <div className={styles.journey_time_icon}>
                                    <SvgIcons id={activeTab === 'step' ? 'step circle outline' : 'car circle outline'} />
                                </div>
                                <p className={styles.journey_time_text}>{activeTab === 'step' ? '16 мин' : '30 мин'}</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {activeTab === 'step' && (
                    <motion.section ref={container4} className={styles.container4}>
                        <div className={styles.block}>
                            <div className={styles.block_image}>
                                <Image src='/images/location/places/patriarchal.png' alt='patriarchal' fill sizes='100vw' />
                                <motion.div
                                    className={styles.block_title}
                                    style={{
                                        transform: isContainer4InView ? 'none' : 'translateY(80px)',
                                        opacity: isContainer4InView ? 1 : 0,
                                    }}
                                >
                                    <h3>Патриаршие</h3>
                                </motion.div>
                            </div>
                            <motion.div
                                className={styles.block_text}
                                style={{
                                    transform: isContainer4InView ? 'none' : 'translateY(80px)',
                                    opacity: isContainer4InView ? 1 : 0,
                                }}
                            >
                                <p>
                                    Миф Патриарших начали создавать литераторы: в&nbsp;&laquo;Анне Карениной&raquo; Левин ищет
                                    на&nbsp;здешнем катке свою возлюбленную Кити, в&nbsp;&laquo;Мастере и&nbsp;Маргарите&raquo; Патрики
                                    становятся мизансценой-открытием и&nbsp;местом гибели Берлиоза. Сегодня Патриаршие&nbsp;&mdash; точка
                                    притяжения московского бомонда, золотой молодежи и&nbsp;тех, кто хочет ими казаться.
                                </p>
                                <div className={styles.journey_time}>
                                    <div className={styles.journey_time_icon}>
                                        <SvgIcons id={activeTab === 'step' ? 'step circle outline' : 'car circle outline'} />
                                    </div>
                                    <p className={styles.journey_time_text}>{activeTab === 'step' ? '18 мин' : '12 мин'}</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.section>
                )}
            </div>
            <motion.section ref={fixedBarRef} className={styles.fixedBar} style={{ opacity: isFixedBarInView ? 1 : 0 }}>
                <button
                    className={`
                        ${styles.button}
                        ${styles.button_step}
                        ${activeTab === 'step' ? styles.selected : styles.outline}`}
                    onClick={() => handleChangeActiveTab('step')}
                >
                    <SvgIcons id='step outline' />
                    <span>Пешком</span>
                </button>
                <button
                    className={`
                        ${styles.button}
                        ${styles.button_car}
                        ${activeTab === 'car' ? styles.selected : styles.outline}`}
                    onClick={() => handleChangeActiveTab('car')}
                >
                    <SvgIcons id='car outline' />
                    <span>На машине</span>
                </button>
            </motion.section>
        </div>
    );
};

export default LocationPlaces;
