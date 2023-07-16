import React, { useEffect, useRef, useState } from 'react';
import IntroSection from './sections/intro-section/IntroSection';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { fetchGallery, fetchGeneralSettings, fetchNews } from '../../../../store/api/api';
import Loader from '../../../shared/loader/Loader';
import styles from './MainPageComponent.module.scss';
import PlanSection from './sections/plan-section/PlanSection';
import LocationSection from './sections/location-section/LocationSection';
import PanoramaSection from './sections/panorama-section/PanoramaSection';
import LifestyleSection from './sections/lifestyle-section/LifestyleSection';
import { IApiGallery } from '../../../../store/api/apiTypes';
import HouseSection from './sections/house-section/HouseSection';
import Header, { IHeader } from '../../../layouts/header/Header';
import HistorySection from './sections/history-section/HistorySection';
import ArtefactSection from './sections/artefact-section/ArtefactSection';
import NewsSection from './sections/news-section/NewsSection';
import FlatSection from './sections/flat-section/FlatSection';
import Footer from '../../../layouts/footer/Footer';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import MainLoader from '../../../shared/main-loader/MainLoader';
import { isDesktop, isMobileOnly, useMobileOrientation } from 'react-device-detect';
import MobileIntroSection from './mobile/intro-section/MobileIntroSection';
import MobilePlanSection from './mobile/plan-section/MobilePlanSection';
import MobileLocationSection from './mobile/location-section/MobileLocationSection';
import MobileLifestyleSection from './mobile/lifestyle-section/MobileLifestyleSection';

import MobileHouseSection from './mobile/house-section/MobileHouseSection';
import MobileArtefactSection from './mobile/artefact-section/MobileArtefactSection';
import MobileHistorySection from './mobile/history-section/MobileHistorySection';
import MobileNewsSection from './mobile/news-section/MobileNewsSection';
import MobileFlatSection from './mobile/flat-section/MobileFlatSection';
import { IAnimation, responsive, reverseAnimation, transition1200, transition500 } from '../../../shared/page-scroll/animation_helpers';
import MobilePanoramaSection from './mobile/panorama-section/MobilePanoramaSection';
import useScrollPosition from '../../../../tools/hooks/useScrollPosition';

export interface IMainPageComponent {}
const introHeader: { [key in 'header']?: IAnimation } = {
    header: {
        initial: { y: -70, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: transition1200,
        responsive: { y: 'vwAll' },
    },
};

const mobileIntroHeader: { [key in 'header']?: IAnimation } = {
    header: {
        initial: { y: -70, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: transition500,
        responsive: { y: 'vwAll' },
    },
};
const mobileHeaderStill: { [key in 'header']?: IAnimation } = {
    header: {
        initial: { y: 0, opacity: 1 },
        animate: { y: 0, opacity: 1 },
        transition: transition500,
        responsive: { y: 'vwAll' },
    },
};
const MainPageComponent: React.FC<IMainPageComponent> = () => {
    const dispatch = useAppDispatch();
    const { isLandscape } = useMobileOrientation();
    const allNews = useAppSelector((state) => state.newsPage.allNews);
    const mainPromo = useAppSelector((state) => state.settings.promo);
    const [gallery, setGallery] = useState<IApiGallery[]>();
    const [headerTheme, setHeaderTheme] = useState<IHeader['theme']>('transparent');
    const [headerAnimation, setHeaderAnimation] = useState<{ [key: string]: IAnimation }>(responsive(reverseAnimation(introHeader)));
    let loaderIsWatched = sessionStorage.getItem('loaderIsWatched');
    const [loaderFinished, setLoaderFinished] = useState(!!loaderIsWatched);

    React.useEffect(() => {
        if (loaderFinished) setHeaderAnimation(responsive(introHeader));
    }, [loaderFinished]);

    //Mobile header
    const { scrollY } = useScroll();
    const prevScroll = useRef<number>(0);
    const mobileHeaderOpen = useRef(true);
    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (Math.abs(latest - prevScroll.current) < 10) return;
        const forward = latest - prevScroll.current > 0;
        prevScroll.current = latest;

        if (forward && latest > (100 / 660.0) * document.documentElement.clientHeight && mobileHeaderOpen.current) {
            mobileHeaderOpen.current = false;
            setHeaderAnimation(reverseAnimation(responsive(mobileIntroHeader)));
        } else if (!forward && !mobileHeaderOpen.current) {
            mobileHeaderOpen.current = true;
            if (latest > (100 / 660.0) * document.documentElement.clientHeight && headerTheme !== 'light') setHeaderTheme('light');
            setHeaderAnimation(responsive(mobileIntroHeader));
        }

        if (mobileHeaderOpen.current && latest <= (100 / 660.0) * document.documentElement.clientHeight && headerTheme !== 'transparent') {
            setHeaderAnimation(responsive(mobileHeaderStill));
            setHeaderTheme('transparent');
        }
    });
    useEffect(() => {
        dispatch(fetchGeneralSettings());
        dispatch(fetchNews());
        dispatch(fetchGallery())
            .unwrap()
            .then((data) => setGallery(data));
        if (isDesktop) {
            const onResize = () => window.location.reload();
            window.addEventListener('resize', onResize);
            return () => {
                window.removeEventListener('resize', onResize);
            };
        }
    }, [dispatch]);

    return (
        <>
            {loaderIsWatched && !allNews && !mainPromo && !gallery && <Loader />}
            {!loaderIsWatched && (
                <AnimatePresence>
                    {(!allNews && !mainPromo && !gallery) || (!loaderFinished && <MainLoader onFinish={setLoaderFinished} />)}
                </AnimatePresence>
            )}
            {!isMobileOnly && allNews && mainPromo && gallery && loaderFinished && (
                <div className={styles.container}>
                    <Header theme={'transparent'} />
                    <IntroSection promo={mainPromo} />
                    <PlanSection />
                    <LocationSection />
                    <PanoramaSection />
                    <LifestyleSection gallery={gallery} />
                    <HouseSection />
                    <HistorySection />
                    <ArtefactSection />
                    <NewsSection news={allNews} />
                    <FlatSection />
                    <Footer />
                </div>
            )}
            {isMobileOnly && !isLandscape && allNews && mainPromo && gallery && loaderFinished && (
                <div className={styles.mob_div}>
                    <Header
                        theme={headerTheme}
                        animation={headerAnimation.header}
                        className={styles.main_page_header}
                        disableScrollChanges={true}
                    />
                    <MobileIntroSection promo={mainPromo} loaderFinished={loaderFinished} />
                    <MobilePlanSection />
                    <MobileLocationSection />
                    <MobilePanoramaSection />
                    <MobileLifestyleSection gallery={gallery} />
                    <MobileHouseSection />
                    <MobileHistorySection />
                    <MobileArtefactSection />
                    <MobileNewsSection news={allNews} />
                    <MobileFlatSection />
                    <Footer />
                </div>
            )}
            {isMobileOnly && isLandscape && (
                <div className={styles.landscapePlug}>Для корректной работы сайта, пожалуйста, переверните устройство</div>
            )}
        </>
    );
};

export default MainPageComponent;
