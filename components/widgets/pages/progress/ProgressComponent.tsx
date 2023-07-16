import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './ProgressComponent.module.scss';
import { isMobileOnly, isTablet } from 'react-device-detect';
import { useAppDispatch } from '../../../../hook';
import { fetchProgress } from '../../../../store/api/api';
import Loader from '../../../shared/loader/Loader';
import { IApiProgress } from '../../../../store/api/apiTypes';
import ProgressCard from './progress-card/ProgressCard';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import Slider from '../../slider/Slider';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import ProgressCameraModal from './progress-camera-modal/ProgressCameraModal';

interface IProgressComponent {}

const ProgressComponent: React.FC<IProgressComponent> = ({}) => {
    const dispatch = useAppDispatch();
    const [progressData, setProgressData] = useState<IApiProgress[] | null>(null);
    useEffect(() => {
        dispatch(fetchProgress())
            .unwrap()
            .then((data) => setProgressData(data));
    }, [dispatch]);

    const { scroll } = useLocomotiveScroll();
    const [cameraIsOpened, setCameraIsOpened] = useState(false);

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

    const sectionRef = useRef<HTMLDivElement>(null);
    const horizontalRef = useRef<HTMLDivElement>(null);
    gsap.registerPlugin(ScrollTrigger);
    useEffect(() => {
        if (scroll && !isMobileOnly && progressData && horizontalRef.current && sectionRef.current) {
            let wrapperEl = sectionRef.current;
            let scrollingEl = horizontalRef.current;

            let pinWrapWidth = scrollingEl.offsetWidth;
            let horizontalScrollLength = pinWrapWidth - window.innerWidth;

            //Планшетном соотношении сторон не достаточно добавляе паддинга
            if (wrapperEl.offsetHeight - window.innerHeight < 0)
                horizontalScrollLength += Math.abs(wrapperEl.offsetHeight - window.innerHeight) * 0.38;

            let trigger: gsap.core.Tween | null = null;
            let headerTrigger: gsap.core.Tween | null = null;
            setTimeout(() => {
                trigger = gsap.to(scrollingEl, {
                    x: -horizontalScrollLength,
                    scrollTrigger: {
                        trigger: wrapperEl,
                        start: (self) => {
                            return wrapperEl.offsetHeight - window.innerHeight >= 0 ? `bottom bottom` : `top top`;
                        },
                        end: `+=${horizontalScrollLength}`,
                        scroller: '[data-scroll-container]',
                        scrub: true,
                        pin: true,
                        //markers: true
                    },
                });
                headerTrigger = gsap.to('[data-header]', {
                    y: -Math.max(wrapperEl.offsetHeight - window.innerHeight, 0),
                    scrollTrigger: {
                        trigger: wrapperEl,
                        start: `top top`,
                        end: (self) => {
                            return wrapperEl.offsetHeight - window.innerHeight > 0 ? `bottom bottom` : `top top`;
                        },
                        scroller: '[data-scroll-container]',
                        scrub: true,
                    },
                });
            }, 100);

            const handleResize = (e: UIEvent) => {
                window.location.reload();
            };
            window.addEventListener('resize', handleResize);

            return () => {
                if (trigger) trigger.kill();
                if (headerTrigger) headerTrigger.kill();
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [progressData, scroll]);

    if (!progressData) return <Loader />;
    return (
        <>
            <div className={styles.container} ref={sectionRef}>
                <div className={styles.header}>
                    <h1 className={styles.h1}>
                        Ход <span>строительства</span>
                    </h1>
                </div>
                {!isMobileOnly && !isTablet && (
                    <div className={styles.stream_wrapper}>
                        <div
                            className={styles.stream_link}
                            onClick={() => setCameraIsOpened(true)}
                        >
                            <svg width='16' height='14' viewBox='0 0 16 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M13.625 2.07813H11.6007L10.6016 0.57836C10.563 0.520519 10.5107 0.473113 10.4493 0.44036C10.388 0.407607 10.3195 0.390522 10.25 0.390625H5.75C5.68047 0.390522 5.61199 0.407607 5.55065 0.44036C5.48932 0.473113 5.43703 0.520519 5.39844 0.57836L4.39859 2.07813H2.375C1.96474 2.07813 1.57129 2.2411 1.28119 2.53119C0.991099 2.82129 0.828125 3.21474 0.828125 3.625V11.5C0.828125 11.9103 0.991099 12.3037 1.28119 12.5938C1.57129 12.8839 1.96474 13.0469 2.375 13.0469H13.625C14.0353 13.0469 14.4287 12.8839 14.7188 12.5938C15.0089 12.3037 15.1719 11.9103 15.1719 11.5V3.625C15.1719 3.21474 15.0089 2.82129 14.7188 2.53119C14.4287 2.2411 14.0353 2.07813 13.625 2.07813ZM14.3281 11.5C14.3281 11.6865 14.254 11.8653 14.1222 11.9972C13.9903 12.129 13.8115 12.2031 13.625 12.2031H2.375C2.18852 12.2031 2.00968 12.129 1.87782 11.9972C1.74595 11.8653 1.67188 11.6865 1.67188 11.5V3.625C1.67188 3.43852 1.74595 3.25968 1.87782 3.12782C2.00968 2.99595 2.18852 2.92188 2.375 2.92188H4.625C4.69453 2.92198 4.76301 2.90489 4.82435 2.87214C4.88568 2.83939 4.93797 2.79198 4.97656 2.73414L5.9757 1.23438H10.0236L11.0234 2.73414C11.062 2.79198 11.1143 2.83939 11.1757 2.87214C11.237 2.90489 11.3055 2.92198 11.375 2.92188H13.625C13.8115 2.92188 13.9903 2.99595 14.1222 3.12782C14.254 3.25968 14.3281 3.43852 14.3281 3.625V11.5ZM8 4.32813C7.41593 4.32813 6.84497 4.50132 6.35933 4.82582C5.87369 5.15031 5.49518 5.61153 5.27167 6.15114C5.04815 6.69075 4.98967 7.28453 5.10362 7.85738C5.21757 8.43023 5.49882 8.95642 5.91183 9.36943C6.32483 9.78243 6.85102 10.0637 7.42387 10.1776C7.99672 10.2916 8.5905 10.2331 9.13011 10.0096C9.66973 9.78607 10.1309 9.40756 10.4554 8.92192C10.7799 8.43628 10.9531 7.86532 10.9531 7.28125C10.9531 6.49803 10.642 5.74689 10.0882 5.19308C9.53436 4.63926 8.78322 4.32813 8 4.32813ZM8 9.39062C7.58281 9.39062 7.17498 9.26691 6.82809 9.03513C6.48121 8.80335 6.21085 8.47391 6.05119 8.08847C5.89154 7.70304 5.84976 7.27891 5.93116 6.86973C6.01255 6.46055 6.21345 6.0847 6.50845 5.7897C6.80345 5.4947 7.1793 5.2938 7.58848 5.21241C7.99766 5.13102 8.42178 5.17279 8.80722 5.33244C9.19266 5.4921 9.5221 5.76246 9.75388 6.10934C9.98566 6.45623 10.1094 6.86406 10.1094 7.28125C10.1094 7.84069 9.88714 8.37722 9.49155 8.7728C9.09597 9.16839 8.55944 9.39062 8 9.39062Z'
                                    strokeWidth='0.7'
                                />
                            </svg>
                            <span>online-камера</span>
                        </div>
                    </div>
                )}
                <div className={styles.container_card}>
                    {!isMobileOnly && !isTablet ? (
                        <div className={styles.container_card_wrapper} ref={horizontalRef}>
                            {progressData
                                .slice()
                                .reverse()
                                .map((item, i, row) => {
                                    return <ProgressCard progress={item} key={i} />;
                                })}
                        </div>
                    ) : (
                        <>
                            <div className={styles.stream_wrapper}>
                                <div
                                    className={styles.stream_link_mob}
                                    onClick={() => setCameraIsOpened(true)}
                                >
                                    <svg width='16' height='14' viewBox='0 0 16 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M13.625 2.07813H11.6007L10.6016 0.57836C10.563 0.520519 10.5107 0.473113 10.4493 0.44036C10.388 0.407607 10.3195 0.390522 10.25 0.390625H5.75C5.68047 0.390522 5.61199 0.407607 5.55065 0.44036C5.48932 0.473113 5.43703 0.520519 5.39844 0.57836L4.39859 2.07813H2.375C1.96474 2.07813 1.57129 2.2411 1.28119 2.53119C0.991099 2.82129 0.828125 3.21474 0.828125 3.625V11.5C0.828125 11.9103 0.991099 12.3037 1.28119 12.5938C1.57129 12.8839 1.96474 13.0469 2.375 13.0469H13.625C14.0353 13.0469 14.4287 12.8839 14.7188 12.5938C15.0089 12.3037 15.1719 11.9103 15.1719 11.5V3.625C15.1719 3.21474 15.0089 2.82129 14.7188 2.53119C14.4287 2.2411 14.0353 2.07813 13.625 2.07813ZM14.3281 11.5C14.3281 11.6865 14.254 11.8653 14.1222 11.9972C13.9903 12.129 13.8115 12.2031 13.625 12.2031H2.375C2.18852 12.2031 2.00968 12.129 1.87782 11.9972C1.74595 11.8653 1.67188 11.6865 1.67188 11.5V3.625C1.67188 3.43852 1.74595 3.25968 1.87782 3.12782C2.00968 2.99595 2.18852 2.92188 2.375 2.92188H4.625C4.69453 2.92198 4.76301 2.90489 4.82435 2.87214C4.88568 2.83939 4.93797 2.79198 4.97656 2.73414L5.9757 1.23438H10.0236L11.0234 2.73414C11.062 2.79198 11.1143 2.83939 11.1757 2.87214C11.237 2.90489 11.3055 2.92198 11.375 2.92188H13.625C13.8115 2.92188 13.9903 2.99595 14.1222 3.12782C14.254 3.25968 14.3281 3.43852 14.3281 3.625V11.5ZM8 4.32813C7.41593 4.32813 6.84497 4.50132 6.35933 4.82582C5.87369 5.15031 5.49518 5.61153 5.27167 6.15114C5.04815 6.69075 4.98967 7.28453 5.10362 7.85738C5.21757 8.43023 5.49882 8.95642 5.91183 9.36943C6.32483 9.78243 6.85102 10.0637 7.42387 10.1776C7.99672 10.2916 8.5905 10.2331 9.13011 10.0096C9.66973 9.78607 10.1309 9.40756 10.4554 8.92192C10.7799 8.43628 10.9531 7.86532 10.9531 7.28125C10.9531 6.49803 10.642 5.74689 10.0882 5.19308C9.53436 4.63926 8.78322 4.32813 8 4.32813ZM8 9.39062C7.58281 9.39062 7.17498 9.26691 6.82809 9.03513C6.48121 8.80335 6.21085 8.47391 6.05119 8.08847C5.89154 7.70304 5.84976 7.27891 5.93116 6.86973C6.01255 6.46055 6.21345 6.0847 6.50845 5.7897C6.80345 5.4947 7.1793 5.2938 7.58848 5.21241C7.99766 5.13102 8.42178 5.17279 8.80722 5.33244C9.19266 5.4921 9.5221 5.76246 9.75388 6.10934C9.98566 6.45623 10.1094 6.86406 10.1094 7.28125C10.1094 7.84069 9.88714 8.37722 9.49155 8.7728C9.09597 9.16839 8.55944 9.39062 8 9.39062Z'
                                            strokeWidth='0.7'
                                        />
                                    </svg>
                                    <span>online-камера</span>
                                </div>
                            </div>

                            <Slider size={'content'} arrow={true} navigationColor={'dark-grey-brick'} navigationOutline={true}>
                                {progressData
                                    .slice()
                                    .reverse()
                                    .map((item, i, row) => {
                                        return <ProgressCard progress={item} key={i} />;
                                    })}
                            </Slider>
                        </>
                    )}
                </div>
            </div>
            <ProgressCameraModal
                isOpen={cameraIsOpened}
                setIsOpen={setCameraIsOpened}
                link='https://video.enforta.ru/embed/v3/?server=100-OR0hLzbaCIXv1NkmJWbg4N&camera=0&width=&height=&lang=en&ap=&noibw='
            />
        </>
    );
};

export default ProgressComponent;
