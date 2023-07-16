import React, { useEffect, useRef, useState } from 'react';
import styles from './FlatSection.module.scss';
import { motion } from 'framer-motion';
import { usePageScroll } from '../../../../../shared/page-scroll/PageScroller';
import {
    IAnimation,
    initialAsAnimateWithTransition,
    responsive,
    reverseAnimation,
    transition1200,
    transition900,
} from '../../../../../shared/page-scroll/animation_helpers';
import IconButton from '../../../../../features/buttons/icon-button/IconButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import ROUTES from '../../../../../../constants/routes';
import Footer from '../../../../../layouts/footer/Footer';
import AnimatedIconButton from '../../../../../features/buttons/animated-icon-button/AnimatedIconButton';

type IArtefactSectionAnimations = {
    [key in 'bg' | 'footer']?: IAnimation;
};

//Переход к странице
const fromPrevPage: IArtefactSectionAnimations = {
    bg: {
        initial: { y: 0, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: transition900,
    },
    footer: {
        initial: { y: 0 },
        animate: { y: 0 },
        transition: transition900,
    },
};

const toFooter: IArtefactSectionAnimations = initialAsAnimateWithTransition(fromPrevPage, transition900, {
    bg: {
        initial: { y: 0 },
        animate: { y: 0 },
    },
    footer: {
        initial: { y: 0, opacity: 1 },
        animate: { y: 0, opacity: 1 },
    },
});

const animationImgSlide = {
    img: {
        initial: { scale: 1.0 },
        animate: { scale: 1.06 },
        transition: transition1200,
    },
};
const animationImgHover = {
    img: {
        initial: { scale: 1.06 },
        animate: { scale: 1.18 },
        transition: transition1200,
    },
};

const FlatSection: React.FC<{}> = ({}) => {
    const pageScroll = usePageScroll();
    const [animations, setAnimations] = useState<IArtefactSectionAnimations>({});
    const [animationImg, setAnimationImg] = useState<{ [key: string]: IAnimation }>({});
    useEffect(() => {
        pageScroll.addStage(16, {
            slideIn: (forward) => {
                if (forward) {
                    setAnimations(responsive(fromPrevPage));
                    setAnimationImg(animationImgSlide);
                    return 900;
                } else {
                    return 900;
                }
            },
            slideOut: (forward) => {
                if (forward) {
                    return 900;
                } else {
                    setAnimations(reverseAnimation(responsive(fromPrevPage)));
                    setAnimationImg(reverseAnimation(animationImgSlide));
                    //После полного ухода из кадра сбрасываем анимации, т.к. футер fromPrevPage начинает воспроизводиться при появлении/исчезании хэдера
                    setTimeout(() => {
                        setAnimations({});
                    }, 900);
                    return 900;
                }
            },
        });
        pageScroll.addStage(17, {
            slideIn: (forward) => {
                if (forward) {
                    setAnimations(responsive(toFooter));
                    return 900;
                } else return 0;
            },
            slideOut: (forward) => {
                if (forward) {
                    return 0;
                } else {
                    setAnimations(reverseAnimation(responsive(toFooter)));
                    return 900;
                }
            },
        });
    }, [pageScroll]);

    const onFooterLoaded = () => {
        const footerEl = document.getElementsByTagName('footer')[0];

        document.documentElement.style.setProperty('--main_page_footer_bottom', `-${footerEl.offsetHeight}px`);

        const footerPreslide = Math.min(window.innerHeight * 0.2, footerEl.offsetHeight * 0.2);
        const footerEnd = Math.min(window.innerHeight, footerEl.offsetHeight);

        fromPrevPage.bg!.animate = { y: -window.innerHeight, opacity: 1 };
        fromPrevPage.footer!.animate = { y: -footerPreslide };

        toFooter.bg!.initial = { y: -window.innerHeight };
        toFooter.bg!.animate = { y: -window.innerHeight - footerEnd + 5 };
        toFooter.footer!.initial = { y: -footerPreslide, opacity: 1 };
        toFooter.footer!.animate = { y: -footerEnd, opacity: 1 };
    };

    return (
        <>
            <motion.div className={styles.wrapper} id='flat_wrapper' {...animations.bg}>
                <div className={styles.content_wrapper}>
                    <motion.div className={styles.bg_img} {...animationImg.img}></motion.div>
                    <div className={styles.contain}>
                        <div className={styles.text}>
                            выбрать свою
                            <br />
                            квартиру
                        </div>
                        <div
                            className={styles.button}
                            onMouseOver={() => setAnimationImg(animationImgHover)}
                            onMouseLeave={() => setAnimationImg(reverseAnimation(animationImgHover))}
                        >
                            <AnimatedIconButton
                                type={'link'}
                                variant={'square'}
                                outline={false}
                                color={'dark-grey-brick'}
                                direction='right'
                                href={`${ROUTES.list}`}
                                className={styles.animated_button}
                            >
                                <SvgIcons id={'arrow right'} />
                            </AnimatedIconButton>
                        </div>
                    </div>
                </div>
            </motion.div>
            <Footer
                className={styles.main_page_footer}
                animation={animations.footer}
                onAllDataLoaded={onFooterLoaded}
                customScrollToTopFunc={() => window.location.reload()}
            />
        </>
    );
};

export default FlatSection;
