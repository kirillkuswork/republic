import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import styles from './ArtefactSection.module.scss';
import { motion } from 'framer-motion';
import { usePageScroll } from '../../../../../shared/page-scroll/PageScroller';
import {
    forMotionDiv,
    IAnimation,
    initialAsAnimateWithTransition,
    responsive,
    reverseAnimation,
    transition1200,
    transition1600,
    transition1800,
    transition900,
} from '../../../../../shared/page-scroll/animation_helpers';
import IconButton from '../../../../../features/buttons/icon-button/IconButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import { isTablet } from 'react-device-detect';
type IArtefactSectionAnimations = {
    [key in
        | 'bg'
        | 'industrial_text'
        | 'color_red_text'
        | 'brick_text'
        | 'brick_img'
        | 'brick_button'
        | 'desc_text'
        | 'cast_iron_text'
        | 'hexagonal_text'
        | 'tile_text'
        | 'cast_iron_img'
        | 'cast_iron_button'
        | 'cast_iron_desc_text']?: IAnimation;
};

//Переход к странице
const fromPrevPage: IArtefactSectionAnimations = {
    bg: {
        initial: { y: 0 },
        animate: { y: -900 },
        transition: transition900,
        responsive: { y: 'vh900' },
    },
    industrial_text: {
        initial: { x: 0 },
        animate: { x: 928 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    color_red_text: {
        initial: { x: 0 },
        animate: { x: -518 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    brick_text: {
        initial: { x: 0 },
        animate: { x: 798 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    brick_img: {
        initial: { y: 0 },
        animate: { y: -220 },
        transition: transition900,
        responsive: { y: 'vh900' },
    },
    brick_button: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: transition900,
    },
    desc_text: {
        initial: { y: 0, opacity: 0 },
        animate: { y: -20, opacity: 1 },
        transition: transition900,
        responsive: { y: 'vh900' },
    },
};
//Первый скролл вниз
const initialToSecond: IArtefactSectionAnimations = initialAsAnimateWithTransition(fromPrevPage, transition900, {
    industrial_text: {
        initial: { x: 928 },
        animate: { x: 928 + 1460 },
    },
    color_red_text: {
        initial: { x: -518 },
        animate: { x: -518 - 1460 },
    },
    brick_text: {
        initial: { x: 798 },
        animate: { x: 798 + 1460 },
    },
    brick_img: {
        initial: { y: -220, opacity: 1 },
        animate: { y: -220 - 190, opacity: 0 },
    },
    brick_button: {
        initial: { opacity: 1 },
        animate: { opacity: 0 },
    },
    desc_text: {
        initial: { opacity: 1 },
        animate: { opacity: 0 },
    },

    cast_iron_text: {
        initial: { x: 0 },
        animate: { x: 561 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.9, type: 'tween', delay: 1.0 },
        responsive: { x: 'vw1460' },
    },
    hexagonal_text: {
        initial: { x: 0 },
        animate: { x: -728 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.9, type: 'tween', delay: 1.0 },
        responsive: { x: 'vw1460' },
    },
    tile_text: {
        initial: { x: 0 },
        animate: { x: 791 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.9, type: 'tween', delay: 1.0 },
        responsive: { x: 'vw1460' },
    },
    cast_iron_img: {
        initial: { y: 0, opacity: 0 },
        animate: { y: -320, opacity: 1 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.9, type: 'tween', delay: 1.0 },
        responsive: { y: 'vh900' },
    },
    cast_iron_button: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.9, type: 'tween', delay: 1.0 },
    },
    cast_iron_desc_text: {
        initial: { y: 0, opacity: 0 },
        animate: { y: -20, opacity: 1 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.9, type: 'tween', delay: 1.0 },
        responsive: { y: 'vh900' },
    },
});
//К след. странице
const toNextPage: IArtefactSectionAnimations = initialAsAnimateWithTransition(initialToSecond, transition900, {
    bg: {
        initial: { y: -900 },
        animate: { y: -900 - 900 },
    },
    cast_iron_img: {
        initial: { y: -320 },
        animate: { y: -320 - 105 },
    },
});
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
        initial: { opacity: 1 },
        animate: { opacity: 0.1 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.6, type: 'tween' },
    },
    button: {
        initial: { rotate: 0 },
        animate: { rotate: 45 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.6, type: 'tween' },
    },
};

const ArtefactSection: React.FC<{}> = ({}) => {
    const pageScroll = usePageScroll();
    const [animations, setAnimations] = useState<IArtefactSectionAnimations>(responsive({}));
    const [hoverAnimation, setHoverAnimations] = useState<IHoverAnimation>(responsive({}));
    const open = useRef<{ [key: string]: boolean }>({});
    const handleClick = (e: MouseEvent<HTMLElement>, id: 'brick' | 'iron') => {
        open.current = {
            ...open.current,
            [id]: !open.current[id],
        };
        setHoverAnimations(open.current[id] ? responsive(hoverArtefactAnimation) : reverseAnimation(responsive(hoverArtefactAnimation)));
    };
    useEffect(() => {
        pageScroll.addStage(12, {
            slideIn: (forward) => {
                //появление экрана
                if (forward) {
                    //крутим колесо вперед
                    setAnimations(responsive(fromPrevPage));
                    return 900;
                } //крутим колесо назад
                else return 900;
            },
            slideOut: (forward) => {
                //уход с экрана
                if (forward)
                    //крутим колесо вперед
                    return 900;
                else {
                    //крутим колесо назад
                    setAnimations(reverseAnimation(responsive(fromPrevPage)));
                    return 900;
                }
            },
        });
        pageScroll.addStage(13, {
            slideIn: (forward) => {
                if (forward) {
                    setAnimations(responsive(initialToSecond));
                    return 900 /*ждем с пред. cтадии*/ + 100 /*пауза*/ + 900 /*сама эта стадия*/;
                } else {
                    setAnimations(reverseAnimation(responsive(toNextPage)));
                    return 900;
                }
            },
            slideOut: (forward) => {
                if (forward) {
                    setAnimations(responsive(toNextPage));
                    return 900;
                } else {
                    const reversed = reverseAnimation(responsive(initialToSecond));
                    for (const r of Object.values(reversed))
                        if (r!.transition!.delay) r!.transition = transition900;
                        else r!.transition = { ease: [0.6, 0, 0.4, 1], duration: 0.9, type: 'tween', delay: 1.0 };
                    setAnimations(reversed);
                    return 900 /*ждем с эту cтадию*/ + 100 /*пауза*/ + 900 /*след. стадия*/;
                }
            },
        });
    }, [pageScroll]);

    return (
        <>
            <motion.div className={styles.wrapper} id='artefact_wrapper' {...animations.bg}>
                <motion.div className={styles.content_wrapper} {...hoverAnimation.wrapper}>
                    <div className={styles.content_wrapper__page_title}>сохраняем исторические артефакты</div>
                    <div className={styles.content_wrapper__line_start}></div>
                    <div className={styles.content_wrapper__line_end}></div>
                    <motion.div className={styles.content_wrapper__industrial} {...animations.industrial_text}>
                        промышленный
                    </motion.div>
                    <motion.div className={styles.content_wrapper__color_red} {...animations.color_red_text}>
                        красный
                    </motion.div>
                    <motion.div className={styles.content_wrapper__brick} {...animations.brick_text}>
                        кирпич
                    </motion.div>
                    <motion.div className={styles.content_wrapper__brick_img} {...animations.brick_img}></motion.div>
                    <motion.div className={styles.content_wrapper__desc} {...animations.desc_text}>
                        В XIX веке заводские корпуса строились из красного кирпича. Исторические здания Republic спроектированы в этой же
                        традиции, поэтому обеспечение сохранности старинного кирпича стало одной из важнейших задач проекта.
                    </motion.div>
                    <motion.div className={styles.content_wrapper__cast_iron} {...animations.cast_iron_text}>
                        чугунная
                    </motion.div>
                    <motion.div className={styles.content_wrapper__hexagonal} {...animations.hexagonal_text}>
                        гексагонная
                    </motion.div>
                    <motion.div className={styles.content_wrapper__tile} {...animations.tile_text}>
                        плитка
                    </motion.div>
                    <motion.div className={styles.content_wrapper__cast_iron_img} {...animations.cast_iron_img}></motion.div>
                    <motion.div className={styles.content_wrapper__cast_iron_desc} {...animations.cast_iron_desc_text}>
                        О промышленном прошлом квартала напоминает не только кирпич, но и гексагональная чугунная плитка. Эту плитку
                        обнаружили при демонтаже старого пола в здании локомотивного цеха.
                    </motion.div>
                </motion.div>
                <motion.div className={styles.content_wrapper__brick_button} {...animations.brick_button}>
                    <motion.div
                        {...hoverAnimation.button}
                        className={styles.content_wrapper__btn_img}
                        whileHover={{}}
                        onHoverStart={!isTablet ? (e) => setHoverAnimations(responsive(hoverArtefactAnimation)) : undefined}
                        onHoverEnd={!isTablet ? (e) => setHoverAnimations(reverseAnimation(responsive(hoverArtefactAnimation))) : undefined}
                        onClick={isTablet ? (e) => handleClick(e, 'brick') : undefined}
                    >
                        <IconButton link={'#'} type={'button'}>
                            <SvgIcons id={'circle-open-fill-brick'} theme={'light'} />
                        </IconButton>
                    </motion.div>
                    <motion.div className={styles.content_wrapper__brick_block} {...hoverAnimation.block}>
                        <div className={styles.content_wrapper__brick_block__title}>1873</div>
                        <div className={styles.content_wrapper__brick_block__desc}>
                            Авторы журнала «Зодчий» подсчитали, что отказ от штукатурных фасадов сокращал стоимость работ на 25%. Владельцы
                            крупных производств быстро подсчитали выгоду — и стали заказывать архитекторам строительство цехов и зданий с
                            «неприкрытыми» кирпичными стенами.
                        </div>
                    </motion.div>
                </motion.div>
                <motion.div className={styles.content_wrapper__cast_iron_button} {...animations.cast_iron_button}>
                    <motion.div
                        {...hoverAnimation.button}
                        className={styles.content_wrapper__btn_img}
                        whileHover={{}}
                        onHoverStart={!isTablet ? (e) => setHoverAnimations(responsive(hoverArtefactAnimation)) : undefined}
                        onHoverEnd={!isTablet ? (e) => setHoverAnimations(reverseAnimation(responsive(hoverArtefactAnimation))) : undefined}
                        onClick={isTablet ? (e) => handleClick(e, 'brick') : undefined}
                    >
                        <IconButton link={'#'} type={'button'}>
                            <SvgIcons id={'circle-open-fill-brick'} theme={'light'} />
                        </IconButton>
                    </motion.div>
                    <motion.div className={styles.content_wrapper__cast_iron_block} {...hoverAnimation.block}>
                        <div className={styles.content_wrapper__cast_iron_block__title}>5000</div>
                        <div className={styles.content_wrapper__cast_iron_block__desc}>
                            Пластин были вручную очищены от бетона и подвергнуты пескоструйной обработке. Спасенная от забвения, старинная
                            промышленная плитка отныне украшает пол современного дизайн-пространства Republic.
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default ArtefactSection;
