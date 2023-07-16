import React, { useEffect, useState } from 'react';
import styles from './IntroSection.module.scss';
import { motion, useScroll, useSpring, useTransform, cubicBezier, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import AnimatedIconButton from '../../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import { IAnimation, transition1200 } from '../../../../../shared/page-scroll/animation_helpers';
import { useAppSelector } from '../../../../../../hook';
import SimpleCard from '../../../../cards/simple-card/SimpleCard';
import { IApiGeneralSettings } from '../../../../../../store/api/apiTypes';
import { value } from 'dom7';
import useScrollPosition from '../../../../../../tools/hooks/useScrollPosition';

interface IIntroSection {
    promo: IApiGeneralSettings;
}
type IntroAnimations = {
    [key in 'main_text' | 'grand_text' | 'reopen_text' | 'button' | 'card']?: IAnimation;
};

const initial: IntroAnimations = {
    main_text: {
        initial: { x: -470 },
        animate: { x: 0 },
        transition: transition1200,
    },
    grand_text: {
        initial: { x: 390 },
        animate: { x: 0 },
        transition: transition1200,
    },
    reopen_text: {
        initial: { x: -1280 },
        animate: { x: 0 },
        transition: transition1200,
    },
    button: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: transition1200,
    },
    card: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: transition1200,
    },
};

const IntroSection: React.FC<IIntroSection> = ({ promo }) => {
    const width = useAppSelector((state) => state.main.width);
    function vw1460(x: number) {
        return (x / 1460.0) * width;
    }
    const vh35 = window.innerHeight * 0.35;
	const vh50 = window.innerHeight * 0.613;
    const { scrollY } = useScroll();
    const smoothY = useSpring(scrollY, { damping: 15, mass: 0.27, stiffness: 55 });
    const allTitlesY = useTransform(smoothY, [0, vh35], [0, vh35]);
    const grandX = useTransform(smoothY, [0, vh35], [0, vw1460(-450)]);
    const reopeningX = useTransform(smoothY, [0, vh35], [0, vw1460(170)]);
    const introFooterOpacity = useTransform(smoothY, [0, vh50], [1, 0]);
	const introFooterY = useTransform(smoothY, [0, vh50], [0, vh50]);
    const conditions = promo.settings
        .map((item, index) => {
            if (item.name === 'Text')
                return {
                    text: item.value,
                    link: promo.settings.length > index + 1 && promo.settings[index + 1].name === 'Link' && promo.settings[index + 1].value,
                };
            else return null;
        })
        .filter((item) => item !== null) as { text: string; link: string }[];
    const [condBtnIndex, setCondBtnIndex] = useState(0);
    // меняем акционную кнопку по таймауту
    useEffect(() => {
        const interval = setInterval(() => {
            setCondBtnIndex((prevIndex) => {
                return prevIndex + 1 < conditions.length ? prevIndex + 1 : 0;
            });
        }, 4000);

        return () => clearInterval(interval);
    });

	//обработка скролла
	const scroll = useScrollPosition();
	const scrollYStrorage = sessionStorage.getItem('scrollY');
	const [scrollPosY, setScrollPosY] = useState(scrollYStrorage || 0);
	const beforeUnloadListener = () => {
		sessionStorage.setItem('scrollY', scrollPosY.toString())
	};

	useEffect(() => {
		if (scroll) {
			setScrollPosY(scroll)
			sessionStorage.setItem('scrollY', scroll.toString())
		}
	}, [scroll])

	useEffect(() => {
		window.addEventListener("onbeforeunload", beforeUnloadListener);
		if (scrollYStrorage) {
			setTimeout(() => {
				window.scrollTo(0, +scrollYStrorage);
			}, 310)
		}
	}, [])


    return (
        <div className={styles.section}>
            <div className={styles.section__wrapper}>
                <Image src='/images/main-page/intro-bg.jpg' className={styles.section__bg} fill alt='main_img' sizes='100vw' priority />
            </div>
            <div className={styles.section__wrapper_mask}>
                <Image
                    src='/images/main-page/intro-mask.png'
                    className={styles.section__mask}
                    fill
                    alt='main_img_mask'
                    sizes='100vw'
                    priority
                />
            </div>
            <div className={styles.titles}>
                <motion.div className={styles.titles__main} {...initial.main_text} style={{ y: allTitlesY }}>
                    Пресня
                </motion.div>
                <div className={styles.titles__text}>
                    <motion.div className={styles.titles__grand} {...initial.grand_text} style={{ x: grandX, y: allTitlesY }}>
                        Grand
                    </motion.div>
                    <motion.div className={styles.titles__open} {...initial.reopen_text} style={{ x: reopeningX, y: allTitlesY }}>
                        Reopening
                    </motion.div>
                </div>
            </div>
            <div className={styles.footer}>
                <motion.div className={styles.footer__button} {...initial.button} style={{ opacity: introFooterOpacity, y: introFooterY }}>
                    <AnimatedIconButton
                        type={'button'}
                        variant={'round'}
                        outline={false}
                        color={'dark-grey-brick'}
                        size={'default'}
                        direction='down'
						onClick={() => window.scrollTo(0, vh50)}
                    >
                        <SvgIcons id={'arrow down'} />
                    </AnimatedIconButton>
                </motion.div>
                <motion.div className={styles.footer__card_block} {...initial.card} style={{ y: introFooterY }}>
                    <SimpleCard theme='brick' className={styles.card}>
                        <div className={styles.card__content}>
                            <div className={styles.card__title}>
                                <h5 className={styles.h5}>{conditions[condBtnIndex].text}</h5>
                            </div>
                            <div className={styles.card__icon}>
                                <AnimatedIconButton
                                    type={'Link'}
                                    variant={'round'}
                                    outline={true}
                                    color={'transparent-white'}
                                    size={'default'}
                                    direction='right'
                                    href={conditions[condBtnIndex].link}
                                >
                                    <SvgIcons id={'arrow right'} />
                                </AnimatedIconButton>
                            </div>
                        </div>
                    </SimpleCard>
                </motion.div>
            </div>
        </div>
    );
};

export default IntroSection;
