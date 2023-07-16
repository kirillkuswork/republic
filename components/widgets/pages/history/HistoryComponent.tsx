import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './HistoryComponent.module.scss';
import HistoryIntro from './a-section-intro/HistoryIntro';
import HistorySection from './c-section-history/HistorySection';
import HistoryNow from './d-section-now/HistoryNow';
import HistoryBrick from './e-section-brick/HistoryBrick';
import HistoryTiles from './f-section-tiles/HistoryTiles';
import Footer from '../../../layouts/footer/Footer';
import HistoryGallery1 from './b-section-gallery/HistoryGallery1';
import HistoryGallery2 from './b-section-gallery/HistoryGallery2';
import HistoryGallery3 from './b-section-gallery/HistoryGallery3';
import Header from '../../../layouts/header/Header';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import useMediaQuery from '../../../../tools/hooks/useMediaQuery';
import SvgIcons from '../../../svgs/SvgIcons';
import IconButton from '../../../features/buttons/icon-button/IconButton';
import { isMobileOnly, isTablet, useMobileOrientation } from 'react-device-detect';
import AnimatedIconButton from '../../../features/buttons/animated-icon-button/AnimatedIconButton';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function useArrayRef() {
    const refs = useRef([]);
    refs.current = [];
    //@ts-ignore
    return [refs, (ref) => ref && refs.current.push(ref)];
}

const HistoryComponent = () => {
    const { isLandscape } = useMobileOrientation();

    //horizontal scroll section
    const sectionsContainer = useRef(null);
    const [sections, setSectionsRef] = useArrayRef();

    useEffect(() => {
        //при возврате через кнопку назад перезагружаем страницу
        const onBackForwardNavigation = (event: { persisted: any }) => {
            if (event.persisted) {
                window.location.reload();
            }
        };
        window.addEventListener('pageshow', onBackForwardNavigation);

        if (!isMobileOnly && isLandscape) {
            //@ts-ignore
            const totalSections = sections.current.length;
            //@ts-ignore
            gsap.to(sections.current, {
                xPercent: -100 * (totalSections - 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionsContainer.current,
                    pin: true,
                    scrub: 1,
                    //@ts-ignore
                    end: () => '+=' + sectionsContainer.current?.offsetWidth,
                },
            });
        }

        return () => {
            window.removeEventListener('pageshow', onBackForwardNavigation);
        };
    }, [isLandscape]);

    // Анимации скрытия хедера при скролле
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    function update() {
        //@ts-ignore
        if (scrollY?.current < scrollY?.prev) {
            setHidden(false);
            //@ts-ignore
        } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
            setHidden(true);
        }
    }

    useEffect(() => {
        return scrollY.onChange(() => update());
    });

    return (
        <>
            {!isMobileOnly && isLandscape && (
                <div className={styles.wrapper}>
                    {/* горизонтальный скролл */}
                    {/* @ts-ignore */}
                    <div className={styles.container} ref={sectionsContainer}>
                        <HistoryIntro />
                        {/* прозрачная обёртка над интро для стики эффекта */}
                        {/* @ts-ignore */}
                        <div ref={setSectionsRef}>
                            <div className={styles.containerSticky}>
                                <div className={styles.scrollDownBtn}>
                                    {/* <IconButton
                                        type={'button'}
                                        children={<SvgIcons id={'arrow down light'} />}
                                        func={() => window.scrollTo(0, window.innerWidth / 4)}
                                    /> */}
                                    <AnimatedIconButton
                                        type={'button'}
                                        variant='round'
                                        outline={false}
                                        color={'white'}
                                        direction='right'
                                        onClick={() => window.scrollTo(0, window.innerWidth / 4)}
                                    >
                                        <SvgIcons id={'arrow right'} />
                                    </AnimatedIconButton>
                                </div>
                            </div>
                        </div>

                        {/* @ts-ignore */}
                        <div ref={setSectionsRef}>
                            <HistoryGallery1 />
                        </div>
                        {/* @ts-ignore */}
                        <div ref={setSectionsRef}>
                            <HistoryGallery2 />
                        </div>
                        {/* @ts-ignore */}
                        <div ref={setSectionsRef}>
                            <HistoryGallery3 />
                        </div>
                        {/* @ts-ignore */}
                        <div ref={setSectionsRef}>
                            <HistorySection />
                        </div>
                    </div>

                    {/* хедер тут, чтобы не выпадало ошибки */}
                    <Header
                        animation={{
                            initial: { y: 0, opacity: 1 },
                            animate: hidden ? { y: -70, opacity: 0 } : { y: 0, opacity: 1 },
                            transition: { ease: [0.1, 0.25, 0.3, 1], duration: 0 },
                        }}
                        theme='transparent'
                    />

                    <HistoryNow />
                    <HistoryBrick />
                    <HistoryTiles />
                    <Footer />
                </div>
            )}

            {/* мобилка */}
            {(isMobileOnly || isTablet) && !isLandscape && (
                <div className={styles.wrapper}>
                    <Header
                        animation={{
                            initial: { y: 0, opacity: 1 },
                            animate: hidden ? { y: -70, opacity: 0 } : { y: 0, opacity: 1 },
                            transition: { ease: [0.1, 0.25, 0.3, 1], duration: 0 },
                        }}
                        theme='transparent'
                    />
                    <HistoryIntro />
                    <HistoryGallery1 />
                    <HistoryGallery2 />
                    <HistoryGallery3 />
                    <HistorySection />
                    <HistoryNow />
                    <div className={styles.mobileContainer}>
                        <HistoryBrick />
                        <HistoryTiles />
                    </div>

                    <Footer />
                </div>
            )}

            {isMobileOnly && isLandscape && (
                <div className={styles.landscapePlug}>Для корректной работы сайта, пожалуйста, переверните устройство</div>
            )}
        </>
    );
};

export default HistoryComponent;
