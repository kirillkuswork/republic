import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { transition1200 } from '../../../../shared/page-scroll/animation_helpers';
import styles from './HistorySection.module.scss';
import Image from 'next/image';
import introBg from '../../../../../public/images/history-page/intro-bg.jpg';
import img1 from '../../../../../public/images/history-page/history-1.jpg';
import img2 from '../../../../../public/images/history-page/history-2.jpg';
import img3 from '../../../../../public/images/history-page/history-3.jpg';
import img4 from '../../../../../public/images/history-page/history-4.jpg';
import imgMob1 from '../../../../../public/images/history-page/history-mobile-1.jpg';
import imgMob2 from '../../../../../public/images/history-page/history-mobile-2.jpg';
import imgMob3 from '../../../../../public/images/history-page/history-mobile-3.jpg';
import { isMobileOnly, isTablet, useMobileOrientation } from 'react-device-detect';
import SvgIcons from '../../../../svgs/SvgIcons';
import useMediaQuery from '../../../../../tools/hooks/useMediaQuery';
import Sticky from 'react-sticky-el';
import { createPortal } from 'react-dom';
import { useElementOnScreen } from './../../../../../tools/hooks/useElementsOnScreen';

const textMotion: Variants = {
    hidden: (x) => ({
        x: x,
        opacity: 0,
    }),
    visible: {
        x: 0,
        opacity: 1,
        transition: transition1200,
    },
};

const textMotion2: Variants = {
    hidden: (x) => ({
        x: x,
        opacity: 0,
        transition: { duration: 0.6 },
    }),
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.6 },
    },
};

const imgMotion = {
    initial: 'hidden',
    whileInView: 'visible',
    exit: { x: 250, opacity: 0, transition: { duration: 0.3 } },
    variants: {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
    },
};

const imgMotion2 = {
    initial: 'hidden',
    whileInView: 'visible',
    exit: { x: 250, opacity: 0, transition: { duration: 0.3 } },
    variants: {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
    },
};

const data = [
    {
        _id: '1',
        name: 'XV век',
        desc: 'Republic расположен между двумя историческими дорогами, известными с XIV века — Тверской и Волоцкой. Если Тверская дорога «дожила» до наших дней в виде одноименной улицы, то исконная трасса Волоцкая не сохранилась. Её примерное направление можно восстановить, проведя линию от Средней Арсенальной башни Кремля до Волоколамска. Именно в районе сегодняшнего Republic Волоцкая дорога преодолевала брод через реку Пресню и выходила на Ходынский луг, принадлежавший в те времена семье Великого князя Московского.',
    },
    {
        _id: '2',
        name: 'XVI век',
        desc: 'Ходынский луг приобрел особенное значение во второй половине XVI века, после проведения ямской реформы. Изменение организационной структуры ямской гоньбы привело к возникновению слобод на основных дорогах за границами Земляного города. Жители Тверской ямской слободы — крестьяне и посадские «ямские охотники», выбравшие гоньбу как промысел, — стали использовать луг для выпаса своих табунов.',
    },
];

const data2 = [
    {
        _id: '3',
        name: 'XVII век',
        desc: 'На протяжении XVII столетия московские жители активно осваивали Ходынский выгон и берега Пресни. Тверская ямская слобода выросла до 65 дворов. Ямщики постепенно распахивали пойменные угодья на левобережье Пресни, а на землях Новинского монастыря патриарх Иоаким распорядился вырыть четыре Пресненских пруда. В наши дни остались только два из них — Большой и Малый на территории зоопарка, — да Горбатый мост через несуществующее ныне старое русло реки Пресни.',
    },
    {
        _id: '4',
        name: 'XVIII век',
        desc: 'В 1730-х гг. активный контрабандный ввоз алкоголя в Москву вынудил купцов, собиравших пошлины с продажи вина, за свои деньги окружить московские пригороды надолбами — врытыми в землю бревнами. Спонтанно организованная, эта новая таможенная граница Москвы вскоре стала фактической: в 1742 году Сенат распорядился продублировать деревянную «границу» земляным Камер-Коллежским валом и построить на нем 18 таможенных застав. Все пресненские земли внутри вала стали городскими.',
    },
];

const data3 = [
    {
        _id: '5',
        name: 'XIX век',
        desc: 'Кроме отставных военных и мелких чиновников здесь активно селились и открывали свои мастерские кузнецы и гончары, оружейники и ткачи. Открывались фабрики: Трехгорная мануфактура, мебельная фабрика Шмитов, сургучная и лаковая фабрика Мамонтовых. На Ходынском поле Общество конной скаковой охоты открыло ипподром, а на Пресненских прудах Общество акклиматизации животных организовало Зоологический сад. Не пустовала и территория Republic: в 1880 годах здесь началось строительство железнодорожных мастерских.',
    },
    {
        _id: '6',
        name: 'XX век',
        desc: 'В ХХ веке Пресня приобрела свой характерный облик. Это не однородный район с одинаковой застройкой и культурой, а коллекция анклавов, в каждом из которых кипит своя жизнь. Если вокруг железнодорожных мастерских селился, в основном, рабочий класс, то на Патриарших (тогда — Пионерских) прудах уже веселилась статусная публика и золотая молодежь.',
    },
];

const HistorySection = () => {
    const matchesLaptop = useMediaQuery('screen and (min-width: 1024px) and (max-width: 1370px) and (orientation: landscape)');
    // const scaled150 = (window.devicePixelRatio*100 > 125);

    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: matchesLaptop || window.devicePixelRatio * 100 > 125 ? 0.1 : 0.2,
    });

    const [imgRef1, isImg1] = useElementOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: matchesLaptop ? 0.2 : 0.45,
    });

    const [imgRef2, isImg2] = useElementOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
    });

    const [imgRef3, isImg3] = useElementOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0.4,
    });

    const [imgRef4, isImg4] = useElementOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    });

    const [open, setOpen] = useState<{ [key: string]: boolean | undefined }>({});
    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
        e.preventDefault();
        setOpen({
            [id]: open[id] ? undefined : true,
        });
    };

    const { isLandscape } = useMobileOrientation();

    return (
        <>
            {!isMobileOnly && isLandscape && (
                <div className={styles.history}>
                    {createPortal(
                        <AnimatePresence>
                            {isVisible && (
                                <div>
                                    <motion.div className={styles.historyLeftSticky}>
                                        <motion.h2
                                            initial={'hidden'}
                                            viewport={{ once: true }}
                                            whileInView={'visible'}
                                            exit={{ x: 250, opacity: 0, transition: { duration: 0.3 } }}
                                            transition={{ duration: 0.8 }}
                                            className={styles.historyTitle}
                                        >
                                            <motion.span custom={500} variants={textMotion2} className={styles.historyTitleFirst}>
                                                история
                                            </motion.span>
                                            <motion.span custom={1000} variants={textMotion2} className={styles.historyTitleSecond}>
                                                места
                                            </motion.span>
                                        </motion.h2>

                                        <div className={styles.historyImg}>
                                            {isImg1 && (
                                                <motion.div {...imgMotion} className={styles.historyImgAnimation}>
                                                    <Image
                                                        src={img1}
                                                        alt={'История'}
                                                        className={styles.historyImgImage}
                                                        placeholder={'blur'}
                                                    />
                                                </motion.div>
                                            )}
                                            <AnimatePresence>
                                                {!isImg1 && isImg2 && (
                                                    <motion.div {...imgMotion} className={styles.historyImgAnimation}>
                                                        <Image
                                                            src={img2}
                                                            alt={'История'}
                                                            className={styles.historyImgImage}
                                                            placeholder={'blur'}
                                                        />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                            <AnimatePresence>
                                                {!isImg2 && isImg3 && (
                                                    <motion.div {...imgMotion} className={styles.historyImgAnimation}>
                                                        <Image
                                                            src={img3}
                                                            alt={'История'}
                                                            className={styles.historyImgImage}
                                                            placeholder={'blur'}
                                                        />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                            {!isImg3 && isImg4 && (
                                                <motion.div
                                                    initial={{ y: 50, opacity: 0 }}
                                                    whileInView={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
                                                    exit={{ x: 250, opacity: 0, transition: { duration: 0.3 } }}
                                                    transition={{ duration: 0.3 }}
                                                    className={styles.historyImgAnimation}
                                                >
                                                    <Image
                                                        src={img4}
                                                        alt={'История'}
                                                        className={styles.historyImgImage}
                                                        placeholder={'blur'}
                                                    />
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>,
                        document.body,
                    )}

                    <motion.div className={styles.historyLeft}>
                        <AnimatePresence>
                            {!isVisible && (
                                <div className={styles.historyLeftIntro}>
                                    <motion.div
                                        initial={{ x: 250, opacity: 0 }}
                                        viewport={{ once: true }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        exit={{ x: 250, opacity: 0, transition: { duration: 0.3 } }}
                                        transition={{ duration: 0.3 }}
                                        className={styles.historyIntro}
                                    >
                                        <Image src={introBg} alt={'История'} className={styles.historyIntroImg} placeholder={'blur'} />
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div className={styles.historyRight} ref={containerRef}>
                        <div className={styles.story} ref={imgRef1}>
                            <h3 className={styles.storyTitle}>
                                Если бы Republic мог посмотреть вглубь времен, он увидел бы себя живущим между двумя историческими дорогами
                            </h3>
                            {data.map((item) => {
                                return (
                                    <div className={styles.storyItem} key={item._id}>
                                        <h4 className={styles.storyItemAge}>{item.name}</h4>
                                        <p className={styles.storyItemText}>{item.desc}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.story}>
                            <h3 className={styles.storyTitle} ref={imgRef2}>
                                Московские жители активно осваивали Ходынский выгон и берега Пресни
                            </h3>
                            {data2.map((item) => {
                                return (
                                    <div className={styles.storyItem} key={item._id} ref={item._id === '4' ? imgRef3 : null}>
                                        <h4 className={styles.storyItemAge}>{item.name}</h4>
                                        <p className={styles.storyItemText}>{item.desc}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.story}>
                            <h3 className={styles.storyTitle}>Пресня — крупнейший промышленно-торговый центр</h3>
                            {data3.map((item) => {
                                return (
                                    <div className={styles.storyItem} key={item._id} ref={item._id === '5' ? imgRef4 : null}>
                                        <h4 className={styles.storyItemAge}>{item.name}</h4>
                                        <p className={styles.storyItemText}>{item.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            )}

            {(isMobileOnly || isTablet) && !isLandscape && (
                <>
                    <div className={styles.historyMobile}>
                        <motion.h2
                            initial={'hidden'}
                            viewport={{ once: true }}
                            whileInView={'visible'}
                            transition={{ duration: 1.6 }}
                            className={styles.historyMobileTitle}
                        >
                            <motion.span custom={-470} variants={textMotion} className={styles.historyMobileTitleFirst}>
                                история
                            </motion.span>
                            <motion.span custom={270} variants={textMotion} className={styles.historyMobileTitleSecond}>
                                места
                            </motion.span>
                        </motion.h2>
                        <Image src={imgMob1} alt={'17 век'} className={styles.historyMobileImg1} />
                        <motion.h4 className={styles.historyMobileDescTitle}>
                            Если бы Republic мог посмотреть вглубь времен, он увидел бы себя живущим между двумя историческими дорогами
                        </motion.h4>
                        {data.map((data, i, row) => {
                            return (
                                <details className={styles.accordion_details} key={data._id} id={data._id} open={open[data._id]}>
                                    <summary className={styles.accordion_title} onClick={(e) => handleClick(e, data._id)}>
                                        <div className={styles.accordion_title_text}>{data.name}</div>
                                        <div className={styles.accordion_brn}>
                                            <div className={styles.button}>
                                                <SvgIcons id={!open[data._id] ? 'circle-stroke-open-brick' : 'circle-stroke-close-brick'} />
                                            </div>
                                        </div>
                                    </summary>
                                    <p
                                        className={styles.accordion_answer}
                                        dangerouslySetInnerHTML={{ __html: data.desc.replaceAll('&amp;nbsp;', '\u00A0') }}
                                    ></p>
                                </details>
                            );
                        })}

                        <Image src={imgMob2} alt={'18 век'} className={styles.historyMobileImg1} />
                        <motion.h4 className={styles.historyMobileDescTitle}>
                            Московские жители активно осваивали Ходынский выгон и берега Пресни
                        </motion.h4>
                        {data2.map((data, i, row) => {
                            return (
                                <details className={styles.accordion_details} key={data._id} id={data._id} open={open[data._id]}>
                                    <summary className={styles.accordion_title} onClick={(e) => handleClick(e, data._id)}>
                                        <div className={styles.accordion_title_text}>{data.name}</div>
                                        <div className={styles.accordion_brn}>
                                            <div className={styles.button}>
                                                <SvgIcons id={!open[data._id] ? 'circle-stroke-open-brick' : 'circle-stroke-close-brick'} />
                                            </div>
                                        </div>
                                    </summary>
                                    <p
                                        className={styles.accordion_answer}
                                        dangerouslySetInnerHTML={{ __html: data.desc.replaceAll('&amp;nbsp;', '\u00A0') }}
                                    ></p>
                                </details>
                            );
                        })}

                        <Image src={imgMob3} alt={'19 век'} className={styles.historyMobileImg1} />
                        <motion.h4 className={styles.historyMobileDescTitle}>Пресня — крупнейший промышленно-торговый центр</motion.h4>
                        {data3.map((data, i, row) => {
                            return (
                                <details className={styles.accordion_details} key={data._id} id={data._id} open={open[data._id]}>
                                    <summary className={styles.accordion_title} onClick={(e) => handleClick(e, data._id)}>
                                        <div className={styles.accordion_title_text}>{data.name}</div>
                                        <div className={styles.accordion_brn}>
                                            <div className={styles.button}>
                                                <SvgIcons id={!open[data._id] ? 'circle-stroke-open-brick' : 'circle-stroke-close-brick'} />
                                            </div>
                                        </div>
                                    </summary>
                                    <p
                                        className={styles.accordion_answer}
                                        dangerouslySetInnerHTML={{ __html: data.desc.replaceAll('&amp;nbsp;', '\u00A0') }}
                                    ></p>
                                </details>
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
};

export default HistorySection;
