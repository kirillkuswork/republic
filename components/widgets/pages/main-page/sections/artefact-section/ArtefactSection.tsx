import React, { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import styles from './ArtefactSection.module.scss';
import { cubicBezier, motion, useAnimation, useAnimationControls, useScroll, useSpring, useTransform } from 'framer-motion';
import SvgIcons from '../../../../../svgs/SvgIcons';
import Image from 'next/image';
import { isTablet } from 'react-device-detect';
import { IAnimation, responsive, reverseAnimation, transition1200 } from '../../../../../shared/page-scroll/animation_helpers';
import IconButton from '../../../../../features/buttons/icon-button/IconButton';

type IntroAnimations = {
    [key in 'hexagonal_text' | 'iron_text' | 'tile_text' | 'iron_img' | 'desc_iron']?: IAnimation;
};

const initial: IntroAnimations = {
    hexagonal_text: {
        initial: { x: 0 },
        animate: { x: 730 },
        transition: transition1200,
    },
    iron_text: {
        initial: { x: 0 },
        animate: { x: -560 },
        transition: transition1200,
    },
    tile_text: {
        initial: { x: 0 },
        animate: { x: -790 },
        transition: transition1200,
    },
    iron_img: {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 0, y: 900 },
        transition: transition1200,
    },
    desc_iron: {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 0, y: 200 },
        transition: transition1200,
    },
};
type IHoverAnimation = {
    [key in 'block' | 'wrapper' | 'button']?: IAnimation;
};
const hoverArtefactAnimation: IHoverAnimation = {
    block: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.6, type: 'tween' },
    },
    wrapper: {
        initial: { opacity: 0 },
        animate: { opacity: 0.9 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.6, type: 'tween' },
    },
};
const ArtefactSection: React.FC<{}> = ({}) => {
    function vwAll(x: number) {
        const viewport =
            document.documentElement.clientWidth > 1370
                ? 1460
                : document.documentElement.clientWidth >= 1024
                ? 1200
                : document.documentElement.clientWidth >= 541
                ? 768
                : 380;

        return (x / viewport) * document.documentElement.clientWidth;
    }
    const sectionRef = useRef<HTMLElement>(null);
    const sectionLastRef = useRef<HTMLElement>(null);
    const firstSectionRef = useRef<HTMLElement>(null);
    const [hoverAnimation, setHoverAnimations] = useState<IHoverAnimation>(responsive({}));

    React.useEffect(() => {
        const onResize = () => {
            document.documentElement.style.setProperty('--custom_top', `${window.innerWidth / window.innerHeight - 2 > 0 ? 150 : 0}px`);
            document.documentElement.style.setProperty('--desc_top', `${window.innerHeight < vwAll(900) ? '100vh' : '100%'}`);
        };
        onResize();
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    });

    const open = useRef<{ [key: string]: boolean }>({});
    const handleClick = (e: MouseEvent<HTMLElement>, id: 'brick' | 'iron') => {
        open.current = {
            ...open.current,
            [id]: !open.current[id],
        };
        setHoverAnimations(open.current[id] ? responsive(hoverArtefactAnimation) : reverseAnimation(responsive(hoverArtefactAnimation)));
    };

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const stickY = useTransform(scrollYProgress, (value) => {
        if (value <= 0 || value >= 1) return 'absolute';
        return 'fixed';
    });
    const { scrollYProgress: lastSectionYProgress } = useScroll({
        target: sectionLastRef,
        offset: ['start start', 'end start'],
    });
    const lastSectionY = useTransform(lastSectionYProgress, (value) => {
        const res = !sectionLastRef.current ? 0 : value * sectionLastRef.current.offsetHeight;
        return -res;
    });

    const { scrollYProgress: scrollYProgressContainer } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const smoothY = useSpring(scrollYProgressContainer, { damping: 15, mass: 0.27, stiffness: 55 });
    const industrialTextX = useTransform(smoothY, [0.16, 0.27, 0.38, 0.5], [vwAll(-940), 0, 0, vwAll(1450)]);
    const redTextX = useTransform(smoothY, [0.16, 0.27, 0.38, 0.5], [vwAll(530), 0, 0, vwAll(-1460)]);
    const brickTextX = useTransform(smoothY, [0.16, 0.27, 0.38, 0.5], [vwAll(-790), 0, 0, vwAll(1100)]);

    const opacityBrick = useTransform(smoothY, [0.16, 0.27, 0.38, 0.5], [0, 1, 1, 0]);
    const brickImgY = useTransform(smoothY, [0.16, 0.27, 0.38, 0.5], [300, 0, 0, -300]);
    const descY = useTransform(smoothY, [0.16, 0.27, 0.38, 0.5], [200, 0, 0, -200]);

    const ironTextX = useTransform(smoothY, [0.52, 0.72], [vwAll(-560), 0]);
    const hexagonalTextX = useTransform(smoothY, [0.52, 0.72], [vwAll(730), 0]);
    const tileTextX = useTransform(smoothY, [0.52, 0.72], [vwAll(-790), 0]);
    const IronImgY = useTransform(smoothY, [0.52, 0.72], [900, 0]);
    const IrondescY = useTransform(smoothY, [0.52, 0.72], [200, 0]);
    const opacityIron = useTransform(smoothY, [0.52, 0.72], [0, 1]);
    return (
        <>
            <motion.section className={styles.section} ref={sectionRef}>
                <motion.section className={styles.section__wrapper_container} ref={firstSectionRef}>
                    <motion.div className={styles.section__wrapper} style={{ position: stickY, top: lastSectionY }}>
                        <motion.div className={styles.section__mask} {...hoverAnimation.wrapper}></motion.div>
                        <motion.div className={styles.section__title}>сохраняем исторические артефакты</motion.div>
                        <motion.div className={styles.section__line_top}></motion.div>
                        <motion.div className={styles.section__line_bottom}></motion.div>
                        <motion.div className={styles.section__desc} style={{ opacity: opacityBrick, y: descY }}>
                            В XIX веке заводские корпуса строились из красного кирпича. Исторические здания Republic спроектированы в этой
                            же традиции, поэтому обеспечение сохранности старинного кирпича стало одной из важнейших задач проекта.
                        </motion.div>
                        <motion.div className={styles.section__industrial_text} style={{ x: industrialTextX }}>
                            промышленный
                        </motion.div>
                        <motion.div className={styles.section__red_text} style={{ x: redTextX }}>
                            красный
                        </motion.div>
                        <motion.div className={styles.section__brick_text} style={{ x: brickTextX }}>
                            кирпич
                        </motion.div>
                        <motion.div className={styles.section__brick_img} style={{ opacity: opacityBrick, y: brickImgY }}>
                            <Image
                                src='/images/main-page/brick.png'
                                className={styles.section__brick_img__bg}
                                fill
                                alt={'brick'}
                                sizes='100%'
                                priority
                            />
                            <motion.div className={styles.section__brick_img__button}>
                                <motion.div
                                    className={styles.section__brick_img__button_icon}
                                    whileHover={{}}
                                    onHoverStart={!isTablet ? (e) => setHoverAnimations(responsive(hoverArtefactAnimation)) : undefined}
                                    onHoverEnd={
                                        !isTablet
                                            ? (e) => setHoverAnimations(reverseAnimation(responsive(hoverArtefactAnimation)))
                                            : undefined
                                    }
                                    onClick={isTablet ? (e) => handleClick(e, 'brick') : undefined}
                                >
                                    <IconButton link={'#'} type={'button'}>
                                        <SvgIcons id={'circle-open-fill-brick'} theme={'light'} />
                                    </IconButton>
                                </motion.div>
                                <motion.div className={styles.section__brick_img__brick_block} {...hoverAnimation.block}>
                                    <div className={styles.section__brick_img__brick_block__title}>1873</div>
                                    <div className={styles.section__brick_img__brick_block__desc}>
                                        Авторы журнала «Зодчий» подсчитали, что отказ от штукатурных фасадов сокращал стоимость работ на
                                        25%. Владельцы крупных производств быстро подсчитали выгоду — и стали заказывать архитекторам
                                        строительство цехов и зданий с «неприкрытыми» кирпичными стенами.
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                        <motion.div className={styles.section__desc} {...initial.desc_iron} style={{ opacity: opacityIron, y: IrondescY }}>
                            О промышленном прошлом квартала напоминает не только кирпич, но и гексагональная чугунная плитка. Эту плитку
                            обнаружили при демонтаже старого пола в здании локомотивного цеха.
                        </motion.div>
                        <motion.div className={styles.section__industrial_text} {...initial.iron_text} style={{ x: ironTextX }}>
                            чугунная
                        </motion.div>
                        <motion.div className={styles.section__red_text} {...initial.hexagonal_text} style={{ x: hexagonalTextX }}>
                            гексагонная
                        </motion.div>
                        <motion.div className={styles.section__brick_text} {...initial.tile_text} style={{ x: tileTextX }}>
                            плитка
                        </motion.div>
                        <motion.div
                            className={styles.section__iron_img}
                            {...initial.iron_img}
                            style={{ opacity: opacityIron, y: IronImgY }}
                        >
                            <Image
                                src='/images/main-page/cast_iron.png'
                                className={styles.section__iron_img__bg}
                                fill
                                alt={'brick'}
                                sizes='100%'
                                priority
                            />
                            <motion.div className={styles.section__iron_img__button}>
                                <motion.div
                                    className={styles.section__iron_img__button_icon}
                                    whileHover={{}}
                                    onHoverStart={!isTablet ? (e) => setHoverAnimations(responsive(hoverArtefactAnimation)) : undefined}
                                    onHoverEnd={
                                        !isTablet
                                            ? (e) => setHoverAnimations(reverseAnimation(responsive(hoverArtefactAnimation)))
                                            : undefined
                                    }
                                    onClick={isTablet ? (e) => handleClick(e, 'iron') : undefined}
                                >
                                    <IconButton link={'#'} type={'button'}>
                                        <SvgIcons id={'circle-open-fill-brick'} theme={'light'} />
                                    </IconButton>
                                </motion.div>
                                <motion.div className={styles.section__iron_img__brick_block} {...hoverAnimation.block}>
                                    <div className={styles.section__iron_img__brick_block__title}>5000</div>
                                    <div className={styles.section__iron_img__brick_block__desc}>
                                        Пластин были вручную очищены от бетона и подвергнуты пескоструйной обработке. Спасенная от забвения,
                                        старинная промышленная плитка отныне украшает пол современного дизайн-пространства Republic.
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.section>
                <div className={styles.section__second}></div>
                <div className={styles.section__second}></div>
                <div className={styles.section__second}></div>
                <motion.section ref={sectionLastRef} className={styles.section__second}></motion.section>
            </motion.section>
        </>
    );
};

export default ArtefactSection;
