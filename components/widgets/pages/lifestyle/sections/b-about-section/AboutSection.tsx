import React, { useRef, useState } from 'react';
import styles from './AboutSection.module.scss';
import { motion, useInView, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import image_1 from '../../../../../../public/images/lifestyle/about-1.jpg';
import image_2 from '../../../../../../public/images/lifestyle/about-2.jpg';
import image_3 from '../../../../../../public/images/lifestyle/about-3.jpg';
import image_4 from '../../../../../../public/images/lifestyle/about-4.jpg';
import getScaledSize from '../../../../../../tools/getScaledSize';
import { IHeader } from '../../../../../layouts/header/Header';
import { isTablet } from 'react-device-detect';
import { useAppSelector } from '../../../../../../hook';

interface IAboutProps {
    onChangeTheme?: (theme: IHeader['theme']) => void;
}

const AboutSection: React.FC<IAboutProps> = ({ onChangeTheme }: IAboutProps) => {
    const width = useAppSelector((state) => state.main.width);
    const [isFixed, setIsFixed] = useState(false);
    const [isTextFixed, setIsTextFixed] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const imagesRef = useRef<HTMLDivElement>(null);

    const sectionWrapperRef = useRef<HTMLDivElement>(null);
    const matchesMobile = width <= 540;
    const matchesTablet = width <= 1023;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });

    const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const isInViewText = useInView(textRef, { once: true });
    const isInViewImages = useInView(imagesRef, { once: true });

    const fadeOpacity = useTransform(smoothYProgress, [0.9, 1], [1, 0]);
    const fadeShow = useTransform(scrollYProgress, [0.1, 0.2], [getScaledSize(150, width), 0]);

    const imgScale = useTransform(smoothYProgress, [0.5, 1], [1, 1.1]);

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        if (latest >= 0.8 && !matchesMobile && !isTablet) {
            setIsTextFixed(true);
        } else {
            setIsTextFixed(false);
        }

        if (latest >= 1) {
            if (!isTablet) {
                requestAnimationFrame(fixSection);
            }
        } else {
            requestAnimationFrame(unFixSection);
        }
    });

    function fixSection() {
        if (!matchesTablet) {
            sectionWrapperRef.current?.classList.add(styles.fixed);
        }
    }

    function unFixSection() {
        sectionWrapperRef.current?.classList.remove(styles.fixed);
    }

    return (
        <motion.section className={`${styles.section} ${styles.portrait}`} ref={sectionRef} id='lifestyle_about_section'>
            <motion.div className={`${styles.sectionWrapper} ${isFixed ? styles.fixed : ''}`} ref={sectionWrapperRef}>
                <motion.p
                    className={`${styles.text} ${isTextFixed ? styles.textFixed : ''}`}
                    style={{
                        transform: isInViewText ? 'none' : `translateY(${matchesTablet ? 50 : getScaledSize(140, width)}px)`,
                        opacity: isInViewText ? 1 : 0,
                        transition: 'transform 0.6s ease',
                    }}
                    ref={textRef}
                >
                    <span className={styles.text_highlighted}>Пресня&nbsp;&mdash; это люди.</span> Этот район пропитал многих: молодых
                    и&nbsp;взрослых, москвичей и&nbsp;приезжих. Он&nbsp;укоренился в&nbsp;них своей историей и&nbsp;архитектурой, уютными
                    вечерами в&nbsp;кругу близких и&nbsp;выходящей из&nbsp;берегов общественной жизнью. И&nbsp;это для них Пресня открывает
                    Republic.
                </motion.p>

                <motion.div
                    className={styles.images}
                    style={{
                        transform: isInViewImages ? 'none' : `translateY(${getScaledSize(140, width)}px)`,
                        opacity: isInViewImages ? 1 : 0,
                        transition: 'transform 0.6s ease',
                    }}
                    ref={imagesRef}
                >
                    <motion.div className={`${styles.imagesWrapper} no-scrollbar`}>
                        <motion.div className={`${styles.imgWrapper} ${styles.imgWrapper_1}`}>
                            <motion.div className={styles.scaleWrapper} style={{ scale: imgScale }}>
                                <Image src={image_1} fill={true} className={styles.img} alt={''} sizes='(max-width: 1023px) 1200vw' />
                            </motion.div>
                        </motion.div>
                        <motion.div className={`${styles.imgWrapper} ${styles.imgWrapper_2}`}>
                            <motion.div className={styles.scaleWrapper} style={{ scale: imgScale }}>
                                <Image src={image_2} fill={true} className={styles.img} alt={''} sizes='(max-width: 1023px) 1200vw' />
                            </motion.div>
                        </motion.div>
                        <motion.div className={`${styles.imgWrapper} ${styles.imgWrapper_3}`}>
                            <motion.div className={styles.scaleWrapper} style={{ scale: imgScale }}>
                                <Image src={image_3} fill={true} className={styles.img} alt={''} sizes='(max-width: 1023px) 1200vw' />
                            </motion.div>
                        </motion.div>
                        <motion.div className={`${styles.imgWrapper} ${styles.imgWrapper_4}`}>
                            <motion.div className={styles.scaleWrapper} style={{ scale: imgScale }}>
                                <Image src={image_4} fill={true} className={styles.img} alt={''} sizes='(max-width: 1023px) 1200vw' />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
                <motion.div className={styles.fade} layout style={{ opacity: fadeOpacity, y: fadeShow }}></motion.div>
            </motion.div>
        </motion.section>
    );
};

export default AboutSection;
