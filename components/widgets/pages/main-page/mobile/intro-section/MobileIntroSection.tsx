import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import styles from './MobileIntroSection.module.scss';
import IconButton from '../../../../../features/buttons/icon-button/IconButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import SimpleCard from '../../../../cards/simple-card/SimpleCard';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import ROUTES from '../../../../../../constants/routes';
import { IAnimation, responsive, transition1200 } from '../../../../../shared/page-scroll/animation_helpers';
import { IApiGeneralSettings } from '../../../../../../store/api/apiTypes';
import Image from 'next/image';
import useScrollPosition from '../../../../../../tools/hooks/useScrollPosition';

function vw380(x: number) {
    return (x / 380.0) * document.documentElement.clientWidth;
}
function vh660(y: number) {
    return (y / 660.0) * document.documentElement.clientHeight;
}

type IntroAnimations = {
    [key in 'section' | 'presnya_text' | 'grand_text' | 'reopen_text' | 'footer']?: IAnimation;
};
interface IIntroSection {
    promo: IApiGeneralSettings;
    loaderFinished: boolean;
}
//Открытие страницы
const initial: IntroAnimations = {
    // presnya_text: {
    //     initial: { x: -470 },
    //     animate: { x: 0 },
    //     transition: transition1200,
    //     responsive: { x: 'vwAll' },
    // },
    // grand_text: {
    //     initial: { x: 390 },
    //     animate: { x: 0 },
    //     transition: transition1200,
    //     responsive: { x: 'vwAll' },
    // },
    // reopen_text: {
    //     initial: { x: -1280 },
    //     animate: { x: 0 },
    //     transition: transition1200,
    //     responsive: { x: 'vwAll' },
    // },
    footer: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: transition1200,
    },
};

const MobileIntroSection: React.FC<IIntroSection> = ({ promo, loaderFinished }) => {
    const { scrollY } = useScroll();
    //const smoothY = useSpring(scrollY, { stiffness: 120, damping: 20, restDelta: 0.001, duration: 0.05 });
    const presnyaX = useTransform(scrollY, [0, vh660(100)], [0, vw380(185)]);
    const grandX = useTransform(scrollY, [0, vh660(100)], [0, vw380(-215)]);
    const reopeningX = useTransform(scrollY, [0, vh660(100)], [0, vw380(115)]);
    const allTitlesY = useTransform(scrollY, [0, vh660(100)], [0, vh660(100)]);
    const footerOpacity = useTransform(scrollY, [0, vh660(132)], [1, 0]);
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

    const [animations, setAnimations] = useState<IntroAnimations>(responsive({}));
    React.useEffect(() => {
        if (loaderFinished) setAnimations(responsive(initial));
    }, [loaderFinished]);

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
			// setTimeout(() => {
			// 	// window.scrollTo(0, +scrollYStrorage);
			// 	window.scrollTo({top: +scrollYStrorage, behavior: 'smooth'});
			// }, 300)
			const scrollSpeed = +scrollYStrorage < 3000 ? 100 : +scrollYStrorage / 50;

			const smoothScroll = (h: number) => {
				let i = h || 0;
				if (i < +scrollYStrorage) {
			setTimeout(() => {
						window.scrollTo(0, i);
						smoothScroll(i + scrollSpeed);
					}, 10);
				}
			}

			smoothScroll(0);
		}
	}, [])

    //const initialAnim = responsive(initial);
    //
    return (
        <div className={styles.wrapper}>
            <Image src='/images/main-page/intro-bg.jpg' className={styles.wrapper__img} fill alt='main_img' sizes='100vw' priority />
            <div className={styles.section__mask}>
                <Image
                    src='/images/main-page/intro-mask.png'
                    className={styles.wrapper__img}
                    fill
                    alt='main_img_mask'
                    sizes='100vw'
                    priority
                />
            </div>
            <div className={styles.titles}>
                <motion.div className={styles.titles__main} style={{ x: presnyaX, y: allTitlesY }} {...animations.footer}>
                    Пресня
                </motion.div>
                <motion.div className={styles.titles__grand} style={{ x: grandX, y: allTitlesY }} {...animations.footer}>
                    Grand
                </motion.div>
                <motion.div className={styles.titles__open} style={{ x: reopeningX, y: allTitlesY }} {...animations.footer}>
                    Reopening
                </motion.div>
            </div>

            <motion.div className={styles.footer} style={{ opacity: footerOpacity }} {...animations.footer}>
                <div className={styles.footer__button}>
                    <IconButton link={'#'} type={'button'} func={() => window.scrollTo({ top: vh660(132), behavior: 'smooth' })}>
                        <SvgIcons id={'arrow down dark in a circle medium'} />
                    </IconButton>
                </div>
                <div className={styles.footer__card_block}>
                    <SimpleCard theme='brick' className={styles.card}>
                        <div className={styles.card__content}>
                            <div className={styles.card__title}>
                                <h5 className={styles.h5}>{conditions[condBtnIndex].text}</h5>
                            </div>
                            <div className={styles.card__icon}>
                                <IconButton link={conditions[condBtnIndex].link} type={'Link'}>
                                    <SvgIcons id={'arrow up outline medium'} theme={'light'} />
                                </IconButton>
                            </div>
                        </div>
                    </SimpleCard>
                </div>
            </motion.div>
        </div>
    );
};

export default MobileIntroSection;
