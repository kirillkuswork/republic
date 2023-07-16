import { motion, Variants } from 'framer-motion';
import React from 'react';
import { transition1800 } from '../../../../shared/page-scroll/animation_helpers';
import styles from './HistoryGallery.module.scss';
import Image from 'next/image';
import moscowImg2 from '../../../../../public/images/history-page/gallery-2.jpg';

const textMotion: Variants = {
    hidden: (x) => ({
        x: x,
        opacity: 0,
    }),
    visible: {
        x: 0,
        opacity: 1,
        transition: transition1800,
    },
};

const animationText = {
    initial: 'hidden',
    whileInView: 'visible',
    // viewport={{ once: true }}
    transition: { duration: 1.8 },
    variants: {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -150 },
    },
};

const HistoryGallery = () => {
    return (
        <motion.section data-scroll-section className={styles.gallery} layout>
            <div className={styles.galleryWrapper}>
                {/* first block Moscow */}
                <div className={styles.moscow}>
                    <motion.h3 {...animationText} className={styles.moscowTitle}>
                        Москва подобна плавильному котлу. Культуры и традиции, события и моды растворяются в ней, а на дне оседает чистое
                        золото
                    </motion.h3>
                    <div className={styles.moscowRight}>
                        <div className={styles.moscowDesc}>
                            <motion.p {...animationText} className={styles.moscowDescText}>
                                Старые улочки и небоскребы Сити, пруды и парки, многовековая история и ваши детские воспоминания. Остается
                                всё, из чего состоит Пресня — квинтэссенция Москвы и «место силы» для будущих жителей Republic.
                            </motion.p>
                            <div className={styles.moscowDescImgWrapper}>
                                <motion.div
                                    className={styles.moscowDescImg}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.6 }}
                                />
                            </div>
                        </div>
                        <Image
                            src={moscowImg2}
                            alt={'Здание в Москве'}
                            className={styles.moscowImg}
                            placeholder={'blur'}
                            // sizes='(max-width: 1023px) 100vw, 70vw'
                        />
                    </div>
                </div>

                {/* second block song */}
                <div className={styles.song}>
                    <div className={styles.songDesc}>
                        <motion.h2 className={styles.songDescTitle}>
                            <span className={styles.songDescTitleFirst}>песня</span>
                            <span className={styles.songDescTitleSecond}>о пресне</span>
                        </motion.h2>
                        <motion.p className={styles.songDescText}>
                            Альтернативная этимологическая версия связывает имя Пресни с Приездной слободой — районом, где иногородние гости
                            и иностранцы дожидались визы московского князя на въезд в город. Новгородцы и смоляне, немцы и свейский
                            («шведский») люд останавливались в Приездне и подробно отчитывались о целях приезда в Москву. Лишь после этого
                            они получали разрешение или отказ: «без приговора князя великого не ступали нежданные по землям города
                            русского», — писал русский фольклорист М. Макаров. Со временем слово «Приездня» упростилось до «Пресня».
                        </motion.p>
                    </div>
                    <div className={styles.songImgWrapper}>
                        <motion.div
                            className={styles.songImg}
                            initial={{ scale: 1 }}
                            whileInView={{ scale: 1.1 }}
                            transition={{ duration: 1.6 }}
                        />
                    </div>
                </div>

                {/* third block presna */}
                <div className={styles.presna}>
                    <p className={styles.presnaDesc}>
                        Своим именем Пресня обязана маленькой речке. Берущая исток в Горелом болоте (район нынешних Бутырок), река Пресня с
                        давних времен славилась чистой и студеной водой: недаром общий праиндоевропейский корень -preisk- роднит славянское
                        слово «пресный» с английским «fresh». Впрочем, испить эталонной воды из Пресни уже не получится: с 1908 года она
                        бежит по подземному коллектору, пролегающему под Скаковой улицей, Московским зоопарком и Белым домом. Сегодня
                        увидеть Пресню можно, только записавшись на экскурсию к диггерам.
                    </p>
                    <div className={styles.presnaRight}>
                        <h3 className={styles.presnaTitle}>
                            со временем <br /> слово &laquo;Приездня&raquo; упростилось <br /> до &laquo;Пресня&raquo;
                        </h3>
                        <div className={styles.presnaImgWrapper}>
                            <motion.div
                                className={styles.presnaImg}
                                initial={{ opacity: 0, scale: 1.1 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.6 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default HistoryGallery;
