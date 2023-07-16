import React, { useState } from 'react';
import styles from './SecondSection.module.scss';
import { AnimationProps, motion } from 'framer-motion';
import { usePageScroll } from '../../../../../shared/page-scroll/PageScroller';
import {
    IAnimation,
    initialAsAnimateWithTransition,
    responsive,
    reverseAnimation,
    transition1100,
    transition1200,
    transition1800,
    transition2200,
    transition900,
} from '../../../../../shared/page-scroll/animation_helpers';
import SvgIcons from '../../../../../svgs/SvgIcons';
import Image from 'next/image';

type SecondSectionAnimations = {
    [key in
        | 'bg'
        | 'img_lady'
        | 'img_lady_inner'
        | 'img_roof'
        | 'img_roof_inner'
        | 'text_long_years'
        | 'img_square'
        | 'img_square_inner'
        | 'img_lamp'
        | 'img_lamp_inner'
        | 'text_reimagine'
        | 'img_couple'
        | 'img_couple_inner'
        | 'img_bicycle'
        | 'imgbicycle_inner'
        | 'text_invent']?: IAnimation;
};

//Переход к странице
const fromPrevPage: SecondSectionAnimations = {
    bg: {
        initial: { x: 0 },
        animate: { x: -1460 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    img_lady: {
        initial: { x: 0 },
        animate: { x: -610 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    img_roof: {
        initial: { x: 0 },
        animate: { x: -320 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    text_long_years: {
        initial: { x: 0 },
        animate: { x: 100 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    img_square: {
        initial: { x: 0 },
        animate: { x: -340 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
};

//К среднему состоянию
const toMiddleStage: SecondSectionAnimations = initialAsAnimateWithTransition(fromPrevPage, transition900, {
    bg: {
        initial: { x: -1460 },
        animate: { x: -1460 - 820 },
    },
    img_lady: {
        initial: { x: -610 },
        animate: { x: -610 - 260 },
    },
    img_roof: {
        initial: { x: -320 },
        animate: { x: -320 - 260 },
    },
    text_long_years: {
        initial: { x: 100 },
        animate: { x: 100 - 260 },
    },
    img_square: {
        initial: { x: -340 },
        animate: { x: -340 - 260 },
    },
    img_square_inner: {
        initial: { scale: 1 },
        animate: { scale: 1.1 },
        transition: transition900,
    },
    img_lamp: {
        initial: { x: 0 },
        animate: { x: -540 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    text_reimagine: {
        initial: { x: 0 },
        animate: { x: -340 + 100 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
});

//К последнему состоянию
const toLastStage: SecondSectionAnimations = initialAsAnimateWithTransition(toMiddleStage, transition900, {
    bg: {
        initial: { x: -1460 - 820 },
        animate: { x: -1460 - 820 - 1230 },
    },
    img_lady: {
        initial: { x: -610 - 260 },
        animate: { x: -610 - 260 - 1230 },
    },
    img_roof: {
        initial: { x: -320 - 260 },
        animate: { x: -320 - 260 - 1230 },
    },
    text_long_years: {
        initial: { x: 100 - 26 },
        animate: { x: 100 - 260 - 1230 },
    },
    img_square: {
        initial: { x: -340 - 260 },
        animate: { x: -340 - 260 - 480 - 140 },
    },
    img_lamp: {
        initial: { x: -540 },
        animate: { x: -540 - 480 - 140 },
    },
    text_reimagine: {
        initial: { x: -340 + 100 },
        animate: { x: -340 + 100 - 480 - 140 },
    },
    img_couple: {
        initial: { x: 0 },
        animate: { x: -870 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    img_couple_inner: {
        initial: { scale: 1 },
        animate: { scale: 1.15 },
        transition: transition900,
    },
    img_bicycle: {
        initial: { x: 0 },
        animate: { x: -870 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    text_invent: {
        initial: { x: 0 },
        animate: { x: -870 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
});

//К след. странице
const toNextPage: SecondSectionAnimations = initialAsAnimateWithTransition(toLastStage, transition1100, {
    bg: {
        initial: { x: -1460 - 820 - 1230 },
        animate: { x: -1460 - 820 - 1230 - 928 },
    },
    img_lady: {
        initial: { x: -610 - 260 - 1230 },
        animate: { x: -610 - 260 - 1230 - 928 },
    },
    img_roof: {
        initial: { x: -320 - 260 - 1230 },
        animate: { x: -320 - 260 - 1230 - 928 },
    },
    text_long_years: {
        initial: { x: 100 - 260 - 1230 },
        animate: { x: 100 - 260 - 1230 - 928 },
    },
    img_square: {
        initial: { x: -340 - 260 - 480 - 140 },
        animate: { x: -340 - 260 - 480 - 140 - 928 },
    },
    img_lamp: {
        initial: { x: -540 - 480 - 140 },
        animate: { x: -540 - 480 - 140 - 928 },
    },
    text_reimagine: {
        initial: { x: -340 + 100 - 480 - 140 },
        animate: { x: -340 + 100 - 480 - 140 - 928 },
    },
    img_couple: {
        initial: { x: -870 },
        animate: { x: -870 - 928 },
    },
    img_bicycle: {
        initial: { x: -870 },
        animate: { x: -870 - 928 },
    },
    text_invent: {
        initial: { x: -870 },
        animate: { x: -870 - 928 },
    },
});

const SecondSection: React.FC<{}> = ({}) => {
    const [animations, setAnimations] = useState<SecondSectionAnimations>({});
    const pageScroll = usePageScroll();

    React.useEffect(() => {
        pageScroll.addStage(2, {
            slideIn: (forward) => {
                if (forward) {
                    setAnimations(responsive(fromPrevPage));
                    return 900;
                } else {
                    setAnimations(reverseAnimation(responsive(toMiddleStage)));
                    return 900;
                }
            },
            slideOut: (forward) => {
                if (forward) {
                    setAnimations(responsive(toMiddleStage));
                    return 900;
                } else {
                    setAnimations(reverseAnimation(responsive(fromPrevPage)));
                    return 900;
                }
            },
        });
        pageScroll.addStage(3, {
            slideIn: (forward) => {
                if (forward) {
                    setAnimations(responsive(toMiddleStage));
                    return 900;
                } else {
                    setAnimations(reverseAnimation(responsive(toLastStage)));
                    return 900;
                }
            },
            slideOut: (forward) => {
                if (forward) {
                    setAnimations(responsive(toLastStage));
                    return 900;
                } else {
                    setAnimations(reverseAnimation(responsive(toMiddleStage)));
                    return 900;
                }
            },
        });
        pageScroll.addStage(4, {
            slideIn: (forward) => {
                if (forward) {
                    setAnimations(responsive(toLastStage));
                    return 900;
                } else {
                    setAnimations(reverseAnimation(responsive(toNextPage)));
                    return 1100;
                }
            },
            slideOut: (forward) => {
                if (forward) {
                    setAnimations(responsive(toNextPage));
                    return 1100;
                } else {
                    setAnimations(reverseAnimation(responsive(toLastStage)));
                    return 900;
                }
            },
        });
    }, [pageScroll]);

    return (
        <motion.div className={styles.wrapper} {...animations.bg}>
            <div className={styles.wrapper__svg_text}>
                <svg width='100%' height='100%' viewBox='0 0 3408 780' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g opacity='0.4'>
                        <path
                            d='M297.291 239C297.151 205.368 285.269 173.163 261.952 149.433C238.635 125.702 207.07 112.379 174.165 112.379H99.2737V365.543H173.18C189.467 365.594 205.604 362.357 220.664 356.02C235.725 349.682 249.413 340.368 260.944 328.611C272.475 316.855 281.621 302.887 287.858 287.509C294.096 272.132 297.302 255.646 297.291 239ZM272.605 441.933L386.191 769.319H276.013L169.318 465.926H99.5011V769.319H0V10.8354H173.408C223.731 10.5299 272.665 27.6892 312.206 59.5062C351.747 91.3232 379.552 135.914 391.074 185.983C402.595 236.053 397.15 288.637 375.629 335.132C354.109 381.627 317.787 419.281 272.605 441.933Z'
                            fill='#737880'
                        />
                        <path
                            d='M836.747 10.9128H460.628V769.242H836.747V667.853H560.129V465.926H812.137V365.543H560.129V112.379H836.747V10.9128Z'
                            fill='#737880'
                        />
                        <path
                            d='M1197.57 239C1197.41 205.415 1185.63 173.256 1162.37 149.537C1139.1 125.817 1107.61 112.461 1074.75 112.379H999.553V365.543H1073.46C1089.74 365.584 1105.88 362.34 1120.93 355.999C1135.99 349.658 1149.67 340.344 1161.2 328.589C1172.73 316.834 1181.88 302.87 1188.12 287.497C1194.36 272.124 1197.57 255.644 1197.57 239ZM1074.75 465.926H999.553V769.319H900.355V10.8355H1073.76C1102.99 10.7695 1131.94 16.5877 1158.97 27.958C1185.99 39.3283 1210.56 56.0279 1231.27 77.1035C1251.99 98.1791 1268.43 123.218 1279.68 150.79C1290.92 178.363 1296.74 207.929 1296.81 237.8C1296.87 267.672 1291.18 297.264 1280.05 324.887C1268.93 352.51 1252.59 377.623 1231.97 398.792C1211.35 419.961 1186.85 436.771 1159.88 448.264C1132.9 459.756 1103.97 465.705 1074.75 465.771'
                            fill='#737880'
                        />
                        <path
                            d='M1759.9 577.608C1759.9 631.286 1739.03 682.765 1701.9 720.721C1664.76 758.676 1614.4 780 1561.88 780C1509.36 780 1458.99 758.676 1421.86 720.721C1384.72 682.765 1363.86 631.286 1363.86 577.608C1363.86 388.297 1364.84 199.992 1364.84 10.6805H1463.29V577.608C1464 603.963 1474.74 628.993 1493.23 647.376C1511.72 665.759 1536.5 676.044 1562.29 676.044C1588.09 676.044 1612.87 665.759 1631.36 647.376C1649.85 628.993 1660.59 603.963 1661.3 577.608V10.6805H1760.8C1760.8 237.684 1759.82 132.038 1759.82 577.608'
                            fill='#737880'
                        />
                        <path
                            d='M2002.14 414.689H1927.24V667.853H2001.15C2017.67 668.332 2034.11 665.429 2049.51 659.315C2064.92 653.202 2078.97 644.001 2090.84 632.254C2102.71 620.507 2112.16 606.451 2118.64 590.915C2125.11 575.378 2128.48 558.675 2128.55 541.787C2128.61 524.899 2125.37 508.168 2119.02 492.579C2112.66 476.99 2103.32 462.859 2091.54 451.016C2079.76 439.173 2065.78 429.857 2050.43 423.619C2035.08 417.38 2018.66 414.344 2002.14 414.689ZM2002.14 112.379H1927.24V314.306H2001.15C2027.5 314.307 2052.78 303.624 2071.43 284.602C2090.08 265.58 2100.59 239.772 2100.65 212.84C2100.73 199.604 2098.24 186.483 2093.32 174.239C2088.4 161.995 2081.16 150.87 2072 141.511C2062.84 132.151 2051.96 124.743 2039.98 119.716C2028 114.689 2015.16 112.142 2002.21 112.225L2002.14 112.379ZM2002.21 769.164H1828.05V10.6805H2001.45C2027.49 10.5583 2053.3 15.6847 2077.4 25.7663C2101.5 35.8478 2123.42 50.6869 2141.9 69.4344C2160.38 88.182 2175.07 110.47 2185.12 135.024C2195.16 159.578 2200.38 185.915 2200.46 212.53C2200.47 240.288 2194.82 267.744 2183.87 293.144C2172.92 318.544 2156.9 341.331 2136.85 360.048C2174.03 388.823 2201.44 428.81 2215.19 474.362C2228.95 519.914 2228.36 568.732 2213.51 613.922C2198.65 659.113 2170.29 698.395 2132.42 726.222C2094.55 754.049 2049.08 769.016 2002.44 769.01'
                            fill='#737880'
                        />
                        <path d='M2288.37 769.242V10.9128H2387.87V667.775H2547.95V769.242H2288.37Z' fill='#737880' />
                        <path
                            d='M3209.55 779.767C3183.55 779.921 3157.78 774.809 3133.72 764.726C3109.66 754.643 3087.79 739.789 3069.38 721.023C3050.97 702.256 3036.38 679.947 3026.45 655.385C3016.52 630.823 3011.45 604.494 3011.53 577.918V202.391C3011.53 148.714 3032.4 97.2347 3069.53 59.279C3106.67 21.3233 3157.03 0 3209.55 0C3262.07 0 3312.43 21.3233 3349.57 59.279C3386.71 97.2347 3407.57 148.714 3407.57 202.391H3309.13C3309.13 175.419 3298.64 149.552 3279.98 130.479C3261.32 111.407 3236.02 100.692 3209.63 100.692C3183.24 100.692 3157.93 111.407 3139.27 130.479C3120.61 149.552 3110.13 175.419 3110.13 202.391V577.918C3109.76 591.443 3112.05 604.905 3116.86 617.51C3121.67 630.114 3128.91 641.606 3138.14 651.304C3147.37 661.002 3158.4 668.711 3170.6 673.975C3182.79 679.239 3195.9 681.951 3209.13 681.951C3222.37 681.951 3235.47 679.239 3247.67 673.975C3259.86 668.711 3270.9 661.002 3280.13 651.304C3289.36 641.606 3296.6 630.114 3301.41 617.51C3306.22 604.905 3308.51 591.443 3308.14 577.918H3407.57C3407.65 604.494 3402.58 630.823 3392.65 655.385C3382.72 679.947 3368.13 702.256 3349.72 721.023C3331.31 739.789 3309.44 754.643 3285.38 764.726C3261.33 774.809 3235.55 779.921 3209.55 779.767Z'
                            fill='#737880'
                        />
                        <path
                            d='M2617.16 769.319V667.853H2635.64C2662 667.873 2687.28 657.197 2705.94 638.171C2724.6 619.144 2735.1 593.324 2735.14 566.386V137.224C2735.12 130.627 2732.54 124.308 2727.97 119.651C2723.4 114.994 2717.21 112.379 2710.76 112.379H2616.18V10.9901H2952.54V112.379H2858.95C2852.5 112.379 2846.32 114.997 2841.76 119.656C2837.2 124.315 2834.64 130.634 2834.64 137.224V566.386C2834.65 579.727 2837.23 592.936 2842.24 605.258C2847.25 617.579 2854.58 628.77 2863.82 638.193C2873.06 647.616 2884.03 655.086 2896.09 660.175C2908.16 665.264 2921.09 667.873 2934.14 667.853H2952.54V769.319H2617.16Z'
                            fill='#737880'
                        />
                    </g>
                </svg>
            </div>
            <div className={styles.content_wrapper}>
                <motion.div className={styles.content_wrapper__img_lady__wrapper} {...animations.img_lady}>
                    <motion.div className={styles.content_wrapper__img_lady}>
                        <Image
                            src='/images/main-page/img-lady.jpg'
                            alt='img'
                            className={styles.content_wrapper__img_lady__img}
                            fill
                            priority
                        />
                    </motion.div>
                </motion.div>
                <motion.div className={styles.content_wrapper__img_roof__wrapper} {...animations.img_roof}>
                    <motion.div className={styles.content_wrapper__img_roof}>
                        <Image
                            src='/images/main-page/img-roof.png'
                            alt='img'
                            className={styles.content_wrapper__img_roof__img}
                            fill
                            priority
                        />
                    </motion.div>
                </motion.div>
                <motion.div className={styles.content_wrapper__text_long_years} {...animations.text_long_years}>
                    Возвращаем людям долгие годы закрытый район города
                </motion.div>
                <motion.div className={styles.content_wrapper__text_reimagine} {...animations.text_reimagine}>
                    Переосмысляем назначение памятников промышленной архитектуры
                </motion.div>
                <motion.div className={styles.content_wrapper__img_square__wrapper} {...animations.img_square}>
                    <motion.div className={styles.content_wrapper__img_square} {...animations.img_square_inner}>
                        <Image
                            src='/images/main-page/img-square.jpg'
                            alt='img'
                            className={styles.content_wrapper__img_square__img}
                            fill
                            priority
                        />
                    </motion.div>
                </motion.div>
                <motion.div className={styles.content_wrapper__img_lamp__wrapper} {...animations.img_lamp}>
                    <motion.div className={styles.content_wrapper__img_lamp}>
                        <Image
                            src='/images/main-page/img-lamp.png'
                            alt='img'
                            className={styles.content_wrapper__img_lamp__img}
                            fill
                            priority
                        />
                    </motion.div>
                </motion.div>
                <motion.div className={styles.content_wrapper__img_couple__wrapper} {...animations.img_couple}>
                    <motion.div className={styles.content_wrapper__img_couple} {...animations.img_couple_inner}>
                        <Image
                            src='/images/main-page/img-couple.jpg'
                            alt='img'
                            className={styles.content_wrapper__img_couple__img}
                            fill
                            priority
                        />
                    </motion.div>
                </motion.div>
                <motion.div className={styles.content_wrapper__img_bicycle__wrapper} {...animations.img_bicycle}>
                    <motion.div className={styles.content_wrapper__img_bicycle}>
                        <Image
                            src='/images/main-page/img-bicycle.jpg'
                            alt='img'
                            className={styles.content_wrapper__img_bicycle__img}
                            fill
                            priority
                        />
                    </motion.div>
                </motion.div>
                <motion.div className={styles.content_wrapper__text_invent} {...animations.text_invent}>
                    Изобретаем новый опыт современной жизни
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SecondSection;
