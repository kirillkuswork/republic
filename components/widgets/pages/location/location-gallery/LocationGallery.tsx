import React, { useRef } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './LocationGallery.module.scss';

export interface ILocationDescription {}

const LocationGallery: React.FC<ILocationDescription> = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLElement | null>(null);
    const descriptionRef = useRef<HTMLElement | null>(null);
    const textRef = useRef<HTMLElement | null>(null);

    const isTitleInView = useInView(titleRef, { once: true, amount: 0.2 });
    const isDescriptionInView = useInView(descriptionRef, { once: true, amount: 0.1 });
    const isTextInView = useInView(textRef, { once: true, amount: 0.5 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });
    const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const imageTwoParallax = useTransform(smoothYProgress, [0.48, 1], [100, 0]);
    const imageThreeParallax = useTransform(smoothYProgress, [0.69, 1], [150, 0]);
    const imageFourParallax = useTransform(smoothYProgress, [0.8, 1], [150, 0]);

    return (
        <motion.section ref={sectionRef} id='location-gallery' className={styles.gallery}>
            <div className={styles.firstBlock}>
                <div className={styles.leftContent}>
                    <div className={styles.leftContent_image}>
                        <Image src='/images/location/gallery/gallery_01.png' alt='gallery' fill sizes='100vw' />
                    </div>
                    <motion.section ref={titleRef}>
                        <motion.h3
                            className={styles.leftContent_title}
                            style={{
                                transform: isTitleInView ? 'none' : 'translateY(100px)',
                                opacity: isTitleInView ? 1 : 0,
                            }}
                        >
                            <div className={styles.placeColor}>Место</div>, которое сочетает в&nbsp;себе беспрецедентную самодостаточность
                            с&nbsp;космополитизмом жителей
                        </motion.h3>
                    </motion.section>
                </div>
                <motion.section
                    ref={descriptionRef}
                    className={styles.firstBlock_text}
                    style={{
                        transform: isDescriptionInView ? 'none' : 'translateY(100px)',
                        opacity: isDescriptionInView ? 1 : 0,
                    }}
                >
                    <p>
                        Пресня&nbsp;&mdash; это люди, катавшиеся на подножке трамвая по&nbsp;улицам, где трамвай уже не&nbsp;ходит.
                        Проводившие каждую вторую субботу в Краснопресненских банях. Уехавшие в&nbsp;юности, но&nbsp;верные именам здешних
                        улиц.
                    </p>
                    <p>
                        Это люди, покоряющие Москва-Сити, зависающие на&nbsp;Патриках, летящие на&nbsp;Белорусский, чтобы успеть
                        аэроэкспрессом в&nbsp;Шереметьево.
                    </p>
                </motion.section>
            </div>
            <div className={styles.secondBlock}>
                <motion.div className={styles.secondBlock_image} style={{ y: imageTwoParallax }}>
                    <Image src='/images/location/gallery/gallery_02.png' alt='gallery' fill sizes='100vw' />
                </motion.div>
            </div>
            <div className={styles.thirdBlock}>
                <motion.section ref={textRef}>
                    <motion.h4
                        style={{
                            transform: isTextInView ? 'none' : 'translateY(100px)',
                            opacity: isTextInView ? 1 : 0,
                        }}
                    >
                        Расположенный между двумя вылетными магистралями и&nbsp;двумя транспортными кольцами, Republic дарит своим жителям
                        полную свободу передвижений, размыкая фразу{' '}
                        <div className={styles.placeColor}>&laquo;Пресня&nbsp;&mdash;это&nbsp;мы&raquo;</div> до&nbsp;
                        <div className={styles.placeColor}>&laquo;Москва&nbsp;&mdash; это&nbsp;я!&raquo;</div>
                    </motion.h4>
                </motion.section>
                <motion.div className={styles.thirdBlock_firstImage} style={{ y: imageThreeParallax }}>
                    <Image src='/images/location/gallery/gallery_03.png' alt='gallery' fill sizes='100vw' />
                </motion.div>
                <motion.div className={styles.thirdBlock_secondImage} style={{ y: imageFourParallax }}>
                    <Image src='/images/location/gallery/gallery_04.png' alt='gallery' fill sizes='100vw' />
                </motion.div>
            </div>
        </motion.section>
    );
};

export default LocationGallery;
