import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimationProps, motion } from 'framer-motion';

import styles from './Images.module.scss';
import image_1560_1 from '../../../../../public/images/loader/1560_1_desktop.jpg';
import image_1560_1_mobile from '../../../../../public/images/loader/1560_1_mobile.jpg';
import image_1800_1 from '../../../../../public/images/loader/1800_1_desktop.jpg';
import image_1800_1_mobile from '../../../../../public/images/loader/1800_1_mobile.jpg';
import image_1800_2 from '../../../../../public/images/loader/1800_2_desktop.jpg';
import image_1800_2_mobile from '../../../../../public/images/loader/1800_2_mobile.jpg';
import image_1800_3 from '../../../../../public/images/loader/1800_3_desktop.jpg';
import image_1800_3_mobile from '../../../../../public/images/loader/1800_3_mobile.jpg';
import image_1920_1 from '../../../../../public/images/loader/1920_1_desktop.jpg';
import image_1920_1_mobile from '../../../../../public/images/loader/1920_1_mobile.jpg';
import image_1920_2 from '../../../../../public/images/loader/1920_2_desktop.jpg';
import image_1920_2_mobile from '../../../../../public/images/loader/1920_2_mobile.jpg';
import image_1980_1 from '../../../../../public/images/loader/1980_1_desktop.jpg';
import image_1980_1_mobile from '../../../../../public/images/loader/1980_1_mobile.jpg';
import image_1980_2 from '../../../../../public/images/loader/1980_2_desktop.jpg';
import image_1980_2_mobile from '../../../../../public/images/loader/1980_2_mobile.jpg';
import image_1980_3 from '../../../../../public/images/loader/1980_3_desktop.jpg';
import image_1980_3_mobile from '../../../../../public/images/loader/1980_3_mobile.jpg';
import image_2022_1 from '../../../../../public/images/loader/2022_1_desktop.jpg';
import image_2022_1_mobile from '../../../../../public/images/loader/2022_1_mobile.jpg';
import image_2022_2 from '../../../../../public/images/loader/2022_2_desktop.jpg';
import image_2022_2_mobile from '../../../../../public/images/loader/2022_2_mobile.jpg';
import image_2022_3 from '../../../../../public/images/loader/2022_3_desktop.jpg';
// import image_main from '../../../../../public/images/main-page/intro-bg.jpg';
import image_main from '../../../../../public/images/loader/intro-bg.jpg';
import image_main_mobile from '../../../../../public/images/loader/intro-bg_mobile.jpg';
import { YearType } from '../../MainLoader';
import useMediaQuery from '../../../../../tools/hooks/useMediaQuery';
import { isMobileOnly } from 'react-device-detect';

export const transition900 = { ease: [0.6, 0, 0.4, 1], duration: 0.9, type: 'tween' };
export const transition1200 = { ease: [0.6, 0, 0.4, 1], duration: 1.2, type: 'tween' };

interface IAnimation {
    initial?: AnimationProps['initial'];
    animate?: AnimationProps['animate'];
    transition?: AnimationProps['transition'];
    vh900?: 'y' | 'x' | 'xy';
}

export interface Images {
    year: YearType;
}
type IntroAnimations = {
    [key in
        | 'section'
        | 'image_1560_1_start'
        | 'image_1800_1_start'
        | 'image_1800_2_start'
        | 'image_1800_3_start'
        | 'image_1920_1_start'
        | 'image_1920_2_start'
        | 'image_1980_1_start'
        | 'image_1980_2_start'
        | 'image_1980_3_start'
        | 'image_2022_1_start'
        | 'image_2022_2_start'
        | 'image_2022_3_start']?: IAnimation;
};

const initialDesktop: IntroAnimations = {
    image_1560_1_start: {
        initial: { scale: 0.1, opacity: 0, transformOrigin: 'right' },
        transition: transition900,
    },
    image_1800_1_start: {
        initial: { scale: 0, opacity: 0, x: '-6%', y: '0%' },
        transition: transition900,
    },
    image_1800_2_start: {
        initial: { scale: 0, opacity: 0, x: '-16%', y: '-86%' },
        transition: transition900,
    },
    image_1800_3_start: {
        initial: { scale: 0, opacity: 0, x: '73%', y: '50%' },
        transition: transition900,
    },
    image_1920_1_start: {
        initial: { scale: 0, opacity: 0, x: '-52%', y: '-90%' },
        transition: transition900,
    },
    image_1920_2_start: {
        initial: { scale: 0, opacity: 0, x: '-9%', y: '-22%' },
        transition: transition900,
    },

    image_1980_1_start: {
        initial: { scale: 0, opacity: 0, x: '-7%', y: '-30%' },
        transition: transition900,
    },
    image_1980_2_start: {
        initial: { scale: 0, opacity: 0, x: '139%', y: '4%' },
        transition: transition900,
    },
    image_1980_3_start: {
        initial: { scale: 0, opacity: 0, x: '106%', y: '-23%' },
        transition: transition900,
    },

    image_2022_1_start: {
        initial: { scale: 0, opacity: 0, x: '34%', y: '-28%' },
        transition: transition900,
    },
    image_2022_2_start: {
        initial: { scale: 0, opacity: 0, x: '-85%', y: '-13%' },
        transition: transition900,
    },
    image_2022_3_start: {
        initial: { scale: 0, opacity: 0, x: '-74%', y: '55%' },
        transition: transition900,
    },
};

const initialMobile: IntroAnimations = {
    image_1560_1_start: {
        initial: { scale: 0.1, opacity: 0, transformOrigin: 'right' },
        transition: transition900,
    },
    image_1800_1_start: {
        initial: { scale: 0, opacity: 0, x: '7%', y: '-7%' },
        transition: transition900,
    },
    image_1800_2_start: {
        initial: { scale: 0, opacity: 0, x: '7%', y: '-120%' },
        transition: transition900,
    },
    image_1800_3_start: {
        initial: { scale: 0, opacity: 0, x: '72%', y: '-34%' },
        transition: transition900,
    },
    image_1920_1_start: {
        initial: { scale: 0, opacity: 0, x: '-52%', y: '-90%' },
        transition: transition900,
    },
    image_1920_2_start: {
        initial: { scale: 0, opacity: 0, x: '-14%', y: '-24%' },
        transition: transition900,
    },

    image_1980_1_start: {
        initial: { scale: 0, opacity: 0, x: '-20%', y: '-49%' },
        transition: transition900,
    },
    image_1980_2_start: {
        initial: { scale: 0, opacity: 0, x: '139%', y: '4%' },
        transition: transition900,
    },
    image_1980_3_start: {
        initial: { scale: 0, opacity: 0, x: '106%', y: '-23%' },
        transition: transition900,
    },

    image_2022_1_start: {
        initial: { scale: 0, opacity: 0, x: '29%', y: '-48%' },
        transition: transition900,
    },
    image_2022_2_start: {
        initial: { scale: 0, opacity: 0, x: '-57%', y: '-48%' },
        transition: transition900,
    },
    image_2022_3_start: {
        initial: { scale: 0, opacity: 0, x: '-45%', y: '-3%' },
        transition: transition900,
    },
};

const Images: React.FC<Images> = ({ year }) => {
    const matchesMobile = useMediaQuery('(max-width: 1090px) and (orientation: portrait)');
    const [animations, setAnimations] = useState<IntroAnimations>(matchesMobile ? initialMobile : initialDesktop);
    const [finalImage, setFinalImage] = useState(false);

    useEffect(() => {
        if (year === 1560) {
            setAnimations({
                ...animations,
                image_1560_1_start: {
                    initial: { scale: 0.1, opacity: 0, transformOrigin: 'right' },
                    animate: { scale: 1, opacity: 1 },
                    transition: transition900,
                },
                image_1800_1_start: {
                    animate: matchesMobile ? { scale: 0.5, opacity: 0.2 } : { scale: 0.2, opacity: 0.2 },
                    transition: transition900,
                },
                image_1800_2_start: {
                    animate: matchesMobile ? { scale: 0.5, opacity: 0.2 } : { scale: 0.2, opacity: 0.3 },
                    transition: transition900,
                },
                image_1800_3_start: {
                    animate: matchesMobile ? { scale: 0.5, opacity: 0.2 } : { scale: 0.2, opacity: 0.3 },
                    transition: transition900,
                },
            });
        } else if (year === 1800) {
            setAnimations({
                ...animations,
                image_1560_1_start: {
                    initial: { scale: 1, opacity: 1, x: 0 },
                    animate: { scale: 1.8, opacity: 0, x: '-100%' },
                    transition: transition900,
                },
                image_1800_1_start: {
                    animate: { scale: 1, opacity: 1, x: 0, y: 0 },
                    transition: transition900,
                },
                image_1800_2_start: {
                    animate: { scale: 1, opacity: 1, x: 0, y: 0 },
                    transition: transition900,
                },
                image_1800_3_start: {
                    animate: { scale: 1, opacity: 1, x: 0, y: 0, zIndex: matchesMobile ? 0 : '101' },
                    transition: transition900,
                },

                image_1920_1_start: {
                    animate: matchesMobile ? { scale: 0.4, opacity: 0.3 } : { scale: 0.2, opacity: 0.3, x: '-52%', y: '-90%' },
                    transition: transition900,
                },
                image_1920_2_start: {
                    animate: matchesMobile ? { scale: 0.5, opacity: 0.3 } : { scale: 0.2, opacity: 0.3 },
                    transition: transition900,
                },
            });
        } else if (year === 1920) {
            setAnimations({
                ...animations,
                image_1800_1_start: {
                    animate: { scale: 1.8, opacity: 0, x: '100%' },
                    transition: transition900,
                },
                image_1800_2_start: {
                    animate: { scale: 2.8, opacity: 0, x: '-10%', y: '100%' },
                    transition: transition900,
                },
                image_1800_3_start: {
                    animate: { scale: 2.8, opacity: 0, x: '-150%' },
                    transition: transition900,
                },
                image_1920_1_start: {
                    animate: { scale: 1, opacity: 1, x: 0, y: 0, zIndex: '101' },
                    transition: transition900,
                },
                image_1920_2_start: {
                    animate: { scale: 1, opacity: 1, x: 0, y: 0 },
                    transition: transition900,
                },

                image_1980_1_start: {
                    animate: { scale: 0.5, opacity: 0.2 },
                    transition: transition900,
                },
                image_1980_2_start: {
                    animate: { scale: 0.3, opacity: 0.3, x: '139%', y: '4%' },
                    transition: transition900,
                },
                image_1980_3_start: {
                    animate: { scale: 0.4, opacity: 0.3, x: '106%', y: '-23%' },
                    transition: transition900,
                },
            });
        } else if (year === 1980) {
            setAnimations({
                ...animations,
                image_1920_1_start: {
                    animate: { scale: 2.8, opacity: 0, x: '10%', y: '100%', zIndex: '101' },
                    transition: transition900,
                },
                image_1920_2_start: {
                    animate: { scale: 2.8, opacity: 0, x: '-20%', y: '100%' },
                    transition: transition900,
                },
                image_1980_1_start: {
                    animate: { scale: 1, opacity: 1, x: 0, y: 0, zIndex: matchesMobile ? 0 : '101' },
                    transition: transition900,
                },
                image_1980_2_start: {
                    animate: { scale: 1, opacity: 1, x: 0, y: 0, zIndex: '101' },
                    transition: transition900,
                },
                image_1980_3_start: {
                    animate: { scale: 1, opacity: matchesMobile ? 0.5 : 1, x: 0, y: 0 },
                    transition: transition900,
                },

                image_2022_1_start: {
                    animate: matchesMobile ? { scale: 0.6, opacity: 0.3 } : { scale: 0.4, opacity: 0.3, x: '34%', y: '-28%' },
                    transition: transition900,
                },
                image_2022_2_start: {
                    animate: matchesMobile ? { scale: 0.6, opacity: 0.3 } : { scale: 0.4, opacity: 0.3, x: '-85%', y: '-13%' },
                    transition: transition900,
                },
                image_2022_3_start: {
                    animate: matchesMobile ? { scale: 0.6, opacity: 0.3 } : { scale: 0.35, opacity: 0.3, x: '-74%', y: '55%' },
                    transition: transition900,
                },
            });
        } else if (year === 2023) {
            setAnimations({
                ...animations,
                image_1980_1_start: {
                    animate: { scale: 2.8, opacity: 0, x: '100%', y: '100%', zIndex: '101' },
                    transition: transition900,
                },
                image_1980_2_start: {
                    animate: { scale: 2.8, opacity: 0, x: '-200%', zIndex: '101' },
                    transition: transition900,
                },
                image_1980_3_start: {
                    animate: { scale: 1.5, opacity: 0, x: '-100%', y: '200%' },
                    transition: transition900,
                },

                image_2022_1_start: {
                    animate: { scale: 1, opacity: 1, x: 0, y: 0, zIndex: '101' },
                    transition: transition900,
                },
                image_2022_2_start: {
                    animate: matchesMobile ? { scale: 1, opacity: 1, x: 0, y: '30%' } : { scale: 1, opacity: 1, x: 0, y: 0 },
                    transition: transition900,
                },
                image_2022_3_start: {
                    animate: matchesMobile ? { scale: 1, opacity: 0.5, x: 0, y: '70%' } : { scale: 1, opacity: 0.5, x: 0, y: 0 },
                    transition: transition900,
                },
            });
        } else if (year === 9784) {
            setAnimations({
                ...animations,
                image_2022_1_start: {
                    animate: matchesMobile ? {} : { scale: 2.8, opacity: 0, x: '-100%', y: '100%', zIndex: '101' },
                    transition: transition900,
                },
                image_2022_2_start: {
                    animate: matchesMobile ? {} : { scale: 2.8, opacity: 0, x: '100%', y: '100%', zIndex: '101' },
                    transition: transition900,
                },
                image_2022_3_start: {
                    animate: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: '102',
                        width: '100vw',
                        height: matchesMobile ? '120vh' : 'calc(100vh + 18.4931506849vw)',
                        transform: 'none',
                        opacity: 1,
                    },
                    transition: transition900,
                },
            });

            setTimeout(() => {
                setFinalImage(true);
            }, 200);
        }
    }, [year]);

    return (
        <div className={styles.images}>
            <motion.div className={`${styles.image} ${styles.image_1560} ${styles.image_1560_1}`} {...animations.image_1560_1_start}>
				<Image src={isMobileOnly ? image_1560_1_mobile : image_1560_1} fill={true} alt={''} className={styles.img} sizes='(max-width: 1023px) 1200vw' priority />
            </motion.div>

            <motion.div className={`${styles.image} ${styles.image_1800} ${styles.image_1800_1}`} {...animations.image_1800_1_start}>
				<Image src={isMobileOnly ? image_1800_1_mobile : image_1800_1} fill={true} alt={''} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
            </motion.div>
            <motion.div className={`${styles.image} ${styles.image_1800} ${styles.image_1800_2}`} {...animations.image_1800_2_start}>
				<Image src={isMobileOnly ? image_1800_2_mobile : image_1800_2} fill={true} alt={''} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
            </motion.div>
            <motion.div className={`${styles.image} ${styles.image_1800} ${styles.image_1800_3}`} {...animations.image_1800_3_start}>
				<Image src={isMobileOnly ? image_1800_3_mobile : image_1800_3} fill={true} alt={''} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
            </motion.div>

            <motion.div className={`${styles.image} ${styles.image_1920} ${styles.image_1920_1}`} {...animations.image_1920_1_start}>
				<Image src={isMobileOnly ? image_1920_1_mobile : image_1920_1} fill={true} alt={''} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
            </motion.div>
            <motion.div className={`${styles.image} ${styles.image_1920} ${styles.image_1920_2}`} {...animations.image_1920_2_start}>
				<Image src={isMobileOnly ? image_1920_2_mobile : image_1920_2} fill={true} alt={''} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
            </motion.div>

            <motion.div className={`${styles.image} ${styles.image_1980} ${styles.image_1980_1}`} {...animations.image_1980_1_start}>
				<Image src={isMobileOnly ? image_1980_1_mobile : image_1980_1} fill={true} alt={''} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
            </motion.div>
            <motion.div className={`${styles.image} ${styles.image_1980} ${styles.image_1980_2}`} {...animations.image_1980_2_start}>
				<Image src={isMobileOnly ? image_1980_2_mobile : image_1980_2} fill={true} alt={''} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
            </motion.div>
            <motion.div className={`${styles.image} ${styles.image_1980} ${styles.image_1980_3}`} {...animations.image_1980_3_start}>
				<Image src={isMobileOnly ? image_1980_3_mobile : image_1980_3} fill={true} alt={''} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
            </motion.div>

            <motion.div className={`${styles.image} ${styles.image_2022} ${styles.image_2022_1}`} {...animations.image_2022_1_start}>
				<Image src={isMobileOnly ? image_2022_1_mobile : image_2022_1} fill={true} alt={''} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
            </motion.div>
            <motion.div className={`${styles.image} ${styles.image_2022} ${styles.image_2022_2}`} {...animations.image_2022_2_start}>
				<Image src={isMobileOnly ? image_2022_2_mobile : image_2022_2} fill={true} alt={''} className={styles.img} sizes='(max-width: 1023px) 1200vw' />
            </motion.div>
            <motion.div className={`${styles.image} ${styles.image_2022} ${styles.image_2022_3}`} {...animations.image_2022_3_start}>
                <Image
					src={isMobileOnly ? image_main_mobile : image_main}
                    fill={true}
                    alt={''}
                    className={finalImage ? 'loaderFinalImage' : ''}
                    sizes='(max-width: 1023px) 1200vw, (max-width: 580px) 256vw'
                />
                <div className={`${styles.image__mask}`}></div>
            </motion.div>
        </div>
    );
};

export default Images;
