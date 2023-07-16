import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import styles from './IntroSection.module.scss';
import IconButton from '../../../../../features/buttons/icon-button/IconButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import SimpleCard from '../../../../../widgets/cards/simple-card/SimpleCard';
import { AnimationProps, motion } from 'framer-motion';
import { usePageScroll } from '../../../../../shared/page-scroll/PageScroller';
import Header from '../../../../../layouts/header/Header';
import {
    IAnimation,
    initialAsAnimateWithTransition,
    responsive,
    reverseAnimation,
    transition1200,
    transition1800,
    transition600,
    transition900,
} from '../../../../../shared/page-scroll/animation_helpers';
import ROUTES from '../../../../../../constants/routes';
import { IApiGeneralSettings } from '../../../../../../store/api/apiTypes';
import Image from 'next/image';
import AnimatedIconButton from '../../../../../features/buttons/animated-icon-button/AnimatedIconButton';

type IntroAnimations = {
    [key in 'section' | 'main_text' | 'grand_text' | 'reopen_text' | 'button' | 'card']?: IAnimation;
};
interface IIntroSection {
    promo: IApiGeneralSettings;
    loaderFinished: boolean;
}
//Открытие страницы
const initial: IntroAnimations = {
    main_text: {
        initial: { x: 0 },
        animate: { x: 470 },
        transition: transition1200,
        responsive: { x: 'vw1460' },
    },
    grand_text: {
        initial: { x: 0 },
        animate: { x: -390 },
        transition: transition1200,
        responsive: { x: 'vw1460' },
    },
    reopen_text: {
        initial: { x: 0 },
        animate: { x: -1280 },
        transition: transition1200,
        responsive: { x: 'vw1460' },
    },
    button: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: transition1200,
    },
    card: {
        initial: { opacity: 0 /*y: 80*/ },
        animate: { opacity: 1 /*y: 0*/ },
        transition: transition1200,
        //responsive: { y: 'vw1460' },
    },
};

//Первый скролл вниз
const initialToSecond: IntroAnimations = initialAsAnimateWithTransition(initial, transition600, {
    section: {
        initial: { y: 0 },
        animate: { y: -200 },
        transition: transition600,
        responsive: { y: 'vw1460' },
    },
    grand_text: {
        initial: { x: -390 },
        animate: { x: -390 - 475 },
    },
    reopen_text: {
        initial: { x: -1280 },
        animate: { x: -1280 + 181 },
    },
    button: {
        initial: { opacity: 1 },
        animate: { opacity: 0 },
    },
    card: {
        initial: { opacity: 1 },
        animate: { opacity: 0 },
    },
});

//К след странице
const toNextPage: IntroAnimations = initialAsAnimateWithTransition(initialToSecond, transition900, {
    section: {
        initial: { x: 0 },
        animate: { x: -1190 },
        responsive: { x: 'vw1460' },
    },
    main_text: {
        initial: { x: 470 },
        animate: { x: 470 - 1086 },
    },
    grand_text: {
        initial: { x: -390 - 475 },
        animate: { x: -390 - 475 - 1120 },
    },
    reopen_text: {
        initial: { x: -1280 + 181 },
        animate: { x: -1280 + 181 - 1120 },
    },
});
console.log(toNextPage);

const IntroSection: React.FC<IIntroSection> = ({ promo, loaderFinished }) => {
    const [animations, setAnimations] = useState<IntroAnimations>(responsive({}));
    const pageScroll = usePageScroll();

    React.useEffect(() => {
        if (loaderFinished) setAnimations(responsive(initial));
    }, [loaderFinished]);

    React.useEffect(() => {
        const onResize = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        onResize();
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

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

    React.useEffect(() => {
        pageScroll.addStage(1, {
            slideIn: (forward) => {
                if (forward) {
                    setAnimations(responsive(initialToSecond));
                    return 600;
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
                    setAnimations(reverseAnimation(responsive(initialToSecond)));
                    return 600;
                }
            },
        });
    }, [pageScroll]);

    // @ts-ignore
    return (
        <div className={styles.wrapper}>
            <motion.div className={styles.section} {...animations.section}>
                <Image src='/images/main-page/intro-bg.jpg' className={styles.section__img} fill alt='main_img' sizes='100vw' priority />
            </motion.div>
            <motion.div className={styles.section__mask} {...animations.section}>
                <Image
                    src='/images/main-page/intro-mask.png'
                    className={styles.section__mask__img}
                    fill
                    alt='main_img_mask'
                    sizes='100vw'
                    priority
                />
            </motion.div>

            <div className={styles.titles}>
                <motion.div className={styles.titles__main} {...animations.main_text}>
                    Пресня
                </motion.div>
                <motion.div className={styles.titles__grand} {...animations.grand_text}>
                    Grand
                </motion.div>
                <motion.div className={styles.titles__open} {...animations.reopen_text}>
                    Reopening
                </motion.div>
            </div>

            <div className={styles.footer}>
                <motion.div className={styles.footer__button} {...animations.button}>
                    <AnimatedIconButton
                        type={'button'}
                        variant={'round'}
                        outline={false}
                        color={'dark-grey-brick'}
                        size={'default'}
                        direction='down'
                        onClick={() => pageScroll.scroll(true, true)}
                    >
                        <SvgIcons id={'arrow down'} />
                    </AnimatedIconButton>
                </motion.div>
                <motion.div className={styles.footer__card_block} {...animations.card}>
                    <SimpleCard theme='brick' className={styles.card}>
                        <div className={styles.card__content}>
                            <div className={styles.card__title}>
                                <h5 className={styles.h5}>{conditions[condBtnIndex].text}</h5>
                            </div>
                            <div className={styles.card__icon}>
                                <AnimatedIconButton
                                    type={'link'}
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
