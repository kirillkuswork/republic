import IntroSection from './sections/a-intro-section/IntroSection';
import Footer from '../../../layouts/footer/Footer';
import PageScroller from '../../../shared/page-scroll/PageScroller';
import SecondSection from './sections/b-second-section/SecondSection';
import styles from './PresentationMainPageComponent.module.scss';
import { useMobileOrientation, isMobileOnly } from 'react-device-detect';
import VideoSection from './sections/c-video-section/VideoSection';
import MapSection from './sections/d-map-section/MapSection';
import LifestyleSection from './sections/e-lifestyle-section/LifestyleSection';
import IssueKeySection from './sections/g-issue-key-section/IssueKeySection';
import ArtefactSection from './sections/h-artefact-section/ArtefactSection';
import HousesSection from './sections/f-houses-section/HousesSection';
import HistorySection from './sections/i-history-section/HistorySection';
import NewsSection from './sections/j-news-section/NewsSection';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import React, { useEffect, useRef, useState } from 'react';
import { fetchGeneralSettings, fetchNews } from '../../../../store/api/api';
import Loader from '../../../shared/loader/Loader';
import FlatSection from './sections/k-flat-section/FlatSection';
import {
    IAnimation,
    responsive,
    reverseAnimation,
    transition1200,
    transition500,
    transition600,
    transition900,
} from '../../../shared/page-scroll/animation_helpers';
import Header, { IHeader } from '../../../layouts/header/Header';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import MainLoader from '../../../shared/main-loader/MainLoader';
import DefaultHead from '../../../shared/head/DefaultHead';

const introHeader: { [key in 'header']?: IAnimation } = {
    header: {
        initial: { y: -70, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: transition1200,
        responsive: { y: 'vwAll' },
    },
};

const closeIntroHeader: { [key in 'header']?: IAnimation } = {
    header: {
        initial: { y: 0, opacity: 1 },
        animate: { y: -70, opacity: 0 },
        transition: transition900,
        responsive: { y: 'vwAll' },
    },
};

const openLightHeader: { [key in 'header']?: IAnimation } = {
    header: {
        initial: { y: -70, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: transition600,
        responsive: { y: 'vwAll' },
    },
};

const PresentationMainPageComponent: React.FC<{}> = ({}) => {
    const { isLandscape } = useMobileOrientation();
    const dispatch = useAppDispatch();
    const allNews = useAppSelector((state) => state.newsPage.allNews);
    const [headerTheme, setHeaderTheme] = useState<IHeader['theme']>('transparent');
    const [headerAnimation, setHeaderAnimation] = useState<{ [key: string]: IAnimation }>(responsive(introHeader));
    const headerOpen = useRef(false);
    let loaderIsWatched = sessionStorage.getItem('loaderIsWatched');
    const [loaderFinished, setLoaderFinished] = useState(loaderIsWatched ? true : false);
    const mainPromo = useAppSelector((state) => state.settings.promo);

    //Desktop header
    const onNewStage = (stage: number, forward: boolean) => {
        if (stage == 1 && !forward) {
            setHeaderTheme('transparent');
            setHeaderAnimation(reverseAnimation(responsive(closeIntroHeader)));
        } else if (stage == 2 && forward) {
            setHeaderAnimation(responsive(closeIntroHeader));
        }
        if (stage <= 2) {
            if (headerOpen.current) {
                headerOpen.current = false;
                setHeaderAnimation(reverseAnimation(responsive(openLightHeader)));
            }
        } else if (!forward && !headerOpen.current) {
            setHeaderTheme('light');
            headerOpen.current = true;
            setHeaderAnimation(responsive(openLightHeader));
        } else if (forward && headerOpen.current) {
            headerOpen.current = false;
            setHeaderAnimation(reverseAnimation(responsive(openLightHeader)));
        }
    };

    useEffect(() => {
        dispatch(fetchGeneralSettings());
        dispatch(fetchNews());
    }, [dispatch]);

    return (
        <>
            <DefaultHead />
            {loaderIsWatched && !allNews && !mainPromo && <Loader />}
            {!loaderIsWatched && (
                <AnimatePresence>
                    {(!allNews && !mainPromo) || (!loaderFinished && <MainLoader onFinish={setLoaderFinished} />)}
                </AnimatePresence>
            )}

            {!isMobileOnly && allNews && mainPromo && loaderFinished && (
                <PageScroller onNewStage={onNewStage}>
                    <Header
                        theme={headerTheme}
                        animation={headerAnimation.header}
                        className={styles.main_page_header}
                        disableScrollChanges={true}
                    />
                    <IntroSection promo={mainPromo} loaderFinished={loaderFinished} />
                    <SecondSection />
                    <VideoSection />
                    <MapSection />
                    <LifestyleSection />
                    <HousesSection />
                    <IssueKeySection />
                    <ArtefactSection />
                    <HistorySection />
                    <NewsSection news={allNews} />
                    <FlatSection />
                </PageScroller>
            )}
            {isMobileOnly && <div className={styles.landscapePlug}>Доступно только в десктопной версии</div>}
        </>
    );
};

export default PresentationMainPageComponent;
