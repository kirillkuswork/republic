import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import styles from './MobileArtefactSection.module.scss';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';

import IconButton from '../../../../../features/buttons/icon-button/IconButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import { IAnimation, responsive, reverseAnimation } from '../../../../../shared/page-scroll/animation_helpers';

type IHoverAnimation = {
    [key in 'wrapper' | 'block' | 'button']?: IAnimation;
};

const hoverWrapperAnimations: IHoverAnimation = {
    wrapper: {
        initial: { opacity: 1 },
        animate: { opacity: 0.1 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.8, type: 'tween' },
    },
};

const hoverBlockAnimations: IHoverAnimation = {
    block: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.8, type: 'tween' },
    },
    button: {
        initial: { rotate: 0 },
        animate: { rotate: 45 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.8, type: 'tween' },
    },
};

const MobileArtefactSection: React.FC<{}> = ({}) => {
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
    const [hoverWrapperAnimation, setHoverWrapperAnimation] = useState<IHoverAnimation>({});
    const [hoverAnimation, setHoverAnimations] = useState<{ [key in 'brick' | 'iron']?: IHoverAnimation }>({});
    const open = useRef<{ [key: string]: boolean }>({});
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const smoothY = useSpring(scrollYProgress, { damping: 15, mass: 0.27, stiffness: 55 });
    const brickY = useTransform(smoothY, [0.0, 0.2], [200, 0]);
    const ironY = useTransform(smoothY, [0.3, 0.5], [200, 0]);
    const handleClick = (e: MouseEvent<HTMLElement>, id: 'brick' | 'iron') => {
        open.current = {
            ...open.current,
            [id]: !open.current[id],
        };
        setHoverWrapperAnimation(
            Object.values(open.current).every((o) => !o)
                ? reverseAnimation(responsive(hoverWrapperAnimations))
                : responsive(hoverWrapperAnimations),
        );
        setHoverAnimations({
            ...hoverAnimation,
            [id]: open.current[id] ? responsive(hoverBlockAnimations) : reverseAnimation(responsive(hoverBlockAnimations)),
        });
    };

    return (
        <>
            <motion.section className={styles.wrapper} id='artefact_wrapper' ref={sectionRef}>
                <motion.section className={styles.content_wrapper} {...hoverWrapperAnimation.wrapper} ref={titleRef}>
                    <div className={styles.content_wrapper__page_title}>
                        сохраняем
                        <br />
                        исторические
                        <br />
                        артефакты
                    </div>
                    <motion.div className={styles.content_wrapper__brick_img} style={{ y: brickY }}></motion.div>
                    <motion.div className={styles.content_wrapper__artefact_title_brick}>промышленный красный кирпич</motion.div>
                    <motion.div className={styles.content_wrapper__desc}>
                        В XIX веке заводские корпуса строились из красного кирпича. Исторические здания Republic спроектированы в этой же
                        традиции, поэтому обеспечение сохранности старинного кирпича стало одной из важнейших задач проекта.
                    </motion.div>
                    <motion.div className={styles.content_wrapper__cast_iron_img} style={{ y: ironY }}></motion.div>
                    <motion.div className={styles.content_wrapper__artefact_title}>чугунная гексагонная плитка</motion.div>
                    <motion.div className={styles.content_wrapper__desc}>
                        О промышленном прошлом квартала напоминает не только кирпич, но и гексагональная чугунная плитка. Эту плитку
                        обнаружили при демонтаже старого пола в здании локомотивного цеха.
                    </motion.div>
                </motion.section>
                <motion.div className={styles.content_wrapper__brick_button} style={{ y: brickY }}>
                    <motion.div
                        {...hoverAnimation['brick']?.button}
                        className={styles.content_wrapper__btn_img}
                        onClick={(e) => handleClick(e, 'brick')}
                    >
                        <IconButton link={'#'} type={'button'}>
                            <SvgIcons id={'circle-open-fill-brick'} theme={'light'} />
                        </IconButton>
                    </motion.div>
                    <motion.div className={styles.content_wrapper__brick_block} {...hoverAnimation['brick']?.block}>
                        <div className={styles.content_wrapper__brick_block__title}>1873</div>
                        <div className={styles.content_wrapper__brick_block__desc}>
                            Авторы журнала «Зодчий» подсчитали, что отказ от штукатурных фасадов сокращал стоимость работ на 25%. Владельцы
                            крупных производств быстро подсчитали выгоду — и стали заказывать архитекторам строительство цехов и зданий с
                            «неприкрытыми» кирпичными стенами.
                        </div>
                    </motion.div>
                </motion.div>
                <motion.div className={styles.content_wrapper__cast_iron_button} style={{ y: ironY }}>
                    <motion.div
                        {...hoverAnimation['iron']?.button}
                        className={styles.content_wrapper__btn_img}
                        onClick={(e) => handleClick(e, 'iron')}
                    >
                        <IconButton link={'#'} type={'button'}>
                            <SvgIcons id={'circle-open-fill-brick'} theme={'light'} />
                        </IconButton>
                    </motion.div>
                    <motion.div className={styles.content_wrapper__cast_iron_block} {...hoverAnimation['iron']?.block}>
                        <div className={styles.content_wrapper__cast_iron_block__title}>5000</div>
                        <div className={styles.content_wrapper__cast_iron_block__desc}>
                            Пластин были вручную очищены от бетона и подвергнуты пескоструйной обработке. Спасенная от забвения, старинная
                            промышленная плитка отныне украшает пол современного дизайн-пространства Republic.
                        </div>
                    </motion.div>
                </motion.div>
            </motion.section>
        </>
    );
};

export default MobileArtefactSection;
