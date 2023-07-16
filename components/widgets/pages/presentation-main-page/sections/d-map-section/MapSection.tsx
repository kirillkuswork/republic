import React, { useEffect, useRef, useState } from 'react';
import styles from './MapSection.module.scss';
import { motion, useAnimationControls, useMotionValue } from 'framer-motion';
import { usePageScroll } from '../../../../../shared/page-scroll/PageScroller';
import {
    IAnimation,
    responsive,
    reverseAnimation,
    transition1200,
    transition1800,
    transition2200,
    transition600,
    transition900,
} from '../../../../../shared/page-scroll/animation_helpers';
import SimpleButton from '../../../../../features/buttons/simple-button/SimpleButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import ROUTES from '../../../../../../constants/routes';
import panoramaLight from '../../../../../../public/images/main-page/panorama-light.jpg';
import panoramaDark from '../../../../../../public/images/main-page/panorama-dark.jpg';
import AnimatedIconButton from '../../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';

type IMapSectionAnimations = {
    [key in 'bg' | 'get_text' | 'from_text' | 'presnya_text' | 'main_text' | 'desc_text' | 'button_location' | 'menu']?: IAnimation;
};

//Переход к странице
const fromPrevPage: IMapSectionAnimations = {
    bg: {
        initial: { x: 0 },
        animate: { x: -980 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    get_text: {
        initial: { x: 0, opacity: 0 },
        animate: { x: -82, opacity: 1 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    from_text: {
        initial: { x: 0 },
        animate: { x: -282 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    presnya_text: {
        initial: { x: 0, opacity: 0 },
        animate: { x: 394, opacity: 1 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    main_text: {
        initial: { x: 0 },
        animate: { x: -980 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    desc_text: {
        initial: { y: 0, opacity: 0 },
        animate: { y: -25, opacity: 1 },
        transition: transition900,
        responsive: { y: 'vh900' },
    },
    button_location: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: transition900,
    },
    menu: {
        initial: { x: 0 },
        animate: { x: -140 },
        transition: { ease: [0.6, 0, 0.4, 1], duration: 0.9, type: 'tween', delay: 1.1 },
        responsive: { x: 'vw1460' },
    },
};

//К след. странице
const toNextPage: IMapSectionAnimations = {
    bg: {
        initial: { x: -980 },
        animate: { x: -1460 },
        transition: transition600,
        responsive: { x: 'vw1460' },
    },
    get_text: {
        initial: { x: -82, opacity: 1 },
        animate: { x: -82 - 482, opacity: 1 },
        transition: transition600,
        responsive: { x: 'vw1460' },
    },
    from_text: {
        initial: { x: -282 },
        animate: { x: -282 + 480 + 312 },
        transition: transition600,
        responsive: { x: 'vw1460' },
    },
    presnya_text: {
        initial: { x: 394, opacity: 1 },
        animate: { x: 394 + 480 + 571, opacity: 1 },
        transition: transition600,
        responsive: { x: 'vw1460' },
    },
    main_text: {
        initial: { x: -980 },
        animate: { x: -980 - 482 },
        transition: transition600,
        responsive: { x: 'vw1460' },
    },
    desc_text: {
        initial: { y: -25, x: 0, opacity: 1 },
        animate: { y: -25 - 66, x: 480, opacity: 0 },
        transition: transition600,
        responsive: { x: 'vw1460', y: 'vh900' },
    },
    button_location: {
        initial: { x: 0, opacity: 1 },
        animate: { x: -200, opacity: 0 },
        transition: transition600,
        responsive: { x: 'vw1460' },
    },
    menu: {
        initial: { x: -140 },
        animate: { x: 0 },
        transition: transition600,
        responsive: { x: 'vw1460' },
    },
};

type IMapModalAnimations = {
    [key in 'map' | 'panorama' | 'full_text' | 'freedom_text' | 'locomotiv_text']?: IAnimation;
};

const openMap: IMapModalAnimations = {
    map: {
        initial: { x: 0, opacity: 0 },
        animate: { x: -1460, opacity: 1 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    panorama: {
        initial: { x: 0 },
        animate: { x: -1460 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    full_text: {
        initial: { x: 0 },
        animate: { x: 425 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    freedom_text: {
        initial: { x: 0 },
        animate: { x: 1080 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    locomotiv_text: {
        initial: { x: 0 },
        animate: { x: 563 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
};

const openPanorama: IMapModalAnimations = {
    map: {
        initial: { x: 0, opacity: 0 },
        animate: { x: -1460, opacity: 1 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    panorama: {
        initial: { x: 0, opacity: 1 },
        animate: { x: -1460, opacity: 1 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    full_text: {
        initial: { x: 0 },
        animate: { x: 425 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    freedom_text: {
        initial: { x: 0 },
        animate: { x: 1080 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    locomotiv_text: {
        initial: { x: 0 },
        animate: { x: 563 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
};

const mapToPanorama: IMapModalAnimations = {
    map: {
        initial: { x: -1460, opacity: 1 },
        animate: { x: -1460, opacity: 1 },
        transition: transition600,
        responsive: { x: 'vw1460' },
    },
    panorama: {
        initial: { x: -1460, opacity: 0 },
        animate: { x: -1460, opacity: 1 },
        transition: transition600,
        responsive: { x: 'vw1460' },
    },
    full_text: {
        initial: { x: 425 },
        animate: { x: 425 },
        transition: transition600,
        responsive: { x: 'vw1460' },
    },
    freedom_text: {
        initial: { x: 1080 },
        animate: { x: 1080 },
        transition: transition600,
        responsive: { x: 'vw1460' },
    },
    locomotiv_text: {
        initial: { x: 563 },
        animate: { x: 563 },
        transition: transition600,
        responsive: { x: 'vw1460' },
    },
};

const MapSection: React.FC<{}> = ({}) => {
    const pageScroll = usePageScroll();
    const [showScrollableIndicator, setShowScrollableIndicator] = useState<boolean>(true);
    const [animations, setAnimations] = useState<IMapSectionAnimations>({});
    const [modalAnimations, setModalAnimations] = useState<IMapModalAnimations>({});
    const [currentModal, setCurrentModal] = useState<{ prev: 'map' | 'panorama' | null; cur: 'map' | 'panorama' | null }>({
        prev: null,
        cur: null,
    });
    const [darkTheme, setDarkTheme] = useState(true);
    let isPressed = false;

    const onMouseDown = () => {
        isPressed = true;
    };

    const onMouseMove = () => {
        if (!isPressed) return;
        if (!showScrollableIndicator) return;
        setShowScrollableIndicator(false);
    };

    const onMouseUp = () => {
        setShowScrollableIndicator(true);
        isPressed = false;
    };
    useEffect(() => {
        pageScroll.addStage(6, {
            slideIn: (forward) => {
                if (forward) {
                    setAnimations(responsive(fromPrevPage));
                    return 2000;
                } else {
                    const fromNextPage = reverseAnimation(responsive(toNextPage));
                    for (let a of Object.values(fromNextPage))
                        a.transition = { ease: [0.6, 0, 0.4, 1], duration: 1.2, type: 'tween', delay: 0.7 }; //0.6 ждем анимаций следующей страницы + 0.1 пауза
                    setAnimations(fromNextPage);
                    return 600 + 100 + 600;
                }
            },
            slideOut: (forward) => {
                if (forward) {
                    setAnimations(responsive(toNextPage));
                    return 600;
                } else {
                    setAnimations(
                        reverseAnimation(
                            responsive({
                                ...fromPrevPage,
                                menu: {
                                    ...fromPrevPage.menu!,
                                    transition: { ease: [0.6, 0, 0.4, 1], duration: 0.35, type: 'tween' },
                                },
                            }),
                        ),
                    );
                    return 900;
                }
            },
        });
    }, [pageScroll]);

    const mapOpacity = useMotionValue(0);
    const panoramaOpacity = useMotionValue(0);
    const displayPanorama = useMotionValue('none');
    const panoramaTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (currentModal.prev === null && currentModal.cur === 'map') {
            console.log('open map');
            mapOpacity.jump(0);
            panoramaOpacity.jump(0);
            setModalAnimations(responsive(openMap));
            pageScroll.blockScroll(true);
        } else if (currentModal.prev === 'map' && currentModal.cur === null) {
            console.log('close map');
            mapOpacity.jump(1);
            panoramaOpacity.jump(0);
            setModalAnimations(reverseAnimation(responsive(openMap)));
            pageScroll.blockScroll(false);
        } else if (currentModal.prev === null && currentModal.cur === 'panorama') {
            console.log('open panorama');
            if (panoramaTimeout.current) clearTimeout(panoramaTimeout.current);
            displayPanorama.jump('block');
            mapOpacity.jump(0);
            panoramaOpacity.jump(1);
            setModalAnimations(responsive(openPanorama));
            pageScroll.blockScroll(true);
        } else if (currentModal.prev === 'panorama' && currentModal.cur === null) {
            console.log('close panorama');
            if (panoramaTimeout.current) clearTimeout(panoramaTimeout.current);
            mapOpacity.jump(1);
            panoramaOpacity.jump(1);
            setModalAnimations(reverseAnimation(responsive(openPanorama)));
            panoramaTimeout.current = setTimeout(() => displayPanorama.jump('none'), 900);
            pageScroll.blockScroll(false);
        } else if (currentModal.prev === 'map' && currentModal.cur === 'panorama') {
            console.log('map to panorama');
            if (panoramaTimeout.current) clearTimeout(panoramaTimeout.current);
            displayPanorama.jump('block');
            mapOpacity.jump(1);
            panoramaOpacity.jump(0);
            setModalAnimations(responsive(mapToPanorama));
        } else if (currentModal.prev === 'panorama' && currentModal.cur === 'map') {
            console.log('panorama to map');
            if (panoramaTimeout.current) clearTimeout(panoramaTimeout.current);
            mapOpacity.jump(1);
            panoramaOpacity.jump(1);
            setModalAnimations(reverseAnimation(responsive(mapToPanorama)));
            panoramaTimeout.current = setTimeout(() => displayPanorama.jump('none'), 500);
        }
    }, [currentModal]);

    const refPanoramaWrapper = useRef(null);
    const controls = useAnimationControls();
    return (
        <>
            <motion.div className={styles.wrapper} {...animations.bg}>
                <div className={styles.top_content_wrapper}>
                    <motion.div className={styles.top_content_wrapper__get_text} {...animations.get_text}>
                        взять
                    </motion.div>
                    <motion.div className={styles.top_content_wrapper__button} {...animations.button_location}>
                        <AnimatedSimpleButton
                            text='Расположение'
                            theme='dark-outline'
                            link={ROUTES.location}
                            withIcon={true}
                            iconAnimation={'right'}
                            iconPosition={'right'}
                            size={'default'}
                        >
                            <SvgIcons id='arrow right' />
                        </AnimatedSimpleButton>
                    </motion.div>
                    <motion.div className={styles.top_content_wrapper__from_text} {...animations.from_text}>
                        от
                    </motion.div>
                    <motion.div className={styles.top_content_wrapper__presnya_text} {...animations.presnya_text}>
                        пресни
                    </motion.div>
                    <motion.div className={styles.top_content_wrapper__main_text} {...animations.main_text}>
                        главное
                    </motion.div>
                </div>
                <motion.div className={styles.wrapper__desc_text} {...animations.desc_text}>
                    Объединяя современную архитектуру с&nbsp;историей города, Republic становится новым центром притяжения Пресни.
                    Кварталом, который сочетает собственную самодостаточность с&nbsp;космополитизмом жителей, атмосферу отдыха —
                    с&nbsp;трудоголизмом окрестных бизнес-центров, московские корни — с&nbsp;аэроэкспрессом в&nbsp;Шереметьево.
                </motion.div>
            </motion.div>
            <motion.div className={styles.menu_wrapper} {...animations.menu}>
                <button
                    className={styles.menu_card}
                    onClick={() => setCurrentModal((prevState) => ({ prev: prevState.cur, cur: prevState.cur === 'map' ? null : 'map' }))}
                >
                    <span className={styles.menu_card__svg}>
                        {currentModal.cur === 'map' ? (
                            <AnimatedIconButton
                                type={'button'}
                                variant={'round'}
                                outline={false}
                                color={'brick'}
                                size={'default'}
                                direction='up'
                            >
                                <SvgIcons id={'circle-close-fill-brick'} />
                            </AnimatedIconButton>
                        ) : (
                            <SvgIcons id={'compass dark'} />
                        )}

                        {/*<SvgIcons id={currentModal.cur === 'map' ? 'circle-close-fill-brick' : 'compass dark'} />*/}
                    </span>
                    {currentModal.cur === 'map' ? (
                        <div className={styles.menu_card__link_close}>закрыть</div>
                    ) : (
                        <div className={styles.menu_card__link}>карта</div>
                    )}
                </button>
                <button
                    className={styles.menu_card}
                    onClick={() =>
                        setCurrentModal((prevState) => ({ prev: prevState.cur, cur: prevState.cur === 'panorama' ? null : 'panorama' }))
                    }
                >
                    <span className={styles.menu_card__svg}>
                        {currentModal.cur === 'panorama' ? (
                            <AnimatedIconButton
                                type={'button'}
                                variant={'round'}
                                outline={false}
                                color={'brick'}
                                size={'default'}
                                direction='up'
                            >
                                <SvgIcons id={'circle-close-fill-brick'} />
                            </AnimatedIconButton>
                        ) : (
                            <SvgIcons id={'visual panorama dark'} />
                        )}
                        {/*<SvgIcons id={currentModal.cur === 'panorama' ? 'circle-close-fill-brick' : 'visual panorama dark'} />*/}
                    </span>
                    {currentModal.cur === 'panorama' ? (
                        <div className={styles.menu_card__link_close}>закрыть</div>
                    ) : (
                        <div className={styles.menu_card__link}>виды</div>
                    )}
                </button>
            </motion.div>

            <motion.div className={styles.map} style={{ opacity: mapOpacity }} {...modalAnimations.map}>
                <div className={styles.map__wrapper}>
                    <motion.div className={styles.map__wrapper__full_text} {...modalAnimations.full_text}>
                        полная
                    </motion.div>
                    <motion.div className={styles.map__wrapper__freedom_text} {...modalAnimations.freedom_text}>
                        свобода
                    </motion.div>
                    <motion.div className={styles.map__wrapper__locomotiv_text} {...modalAnimations.locomotiv_text}>
                        передвижений
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                className={styles.panorama}
                style={{ opacity: panoramaOpacity, display: displayPanorama }}
                {...modalAnimations.panorama}
            >
                <div className={styles.panorama__wrapper} ref={refPanoramaWrapper}>
                    <motion.img
                        drag='x'
                        dragElastic={0}
                        dragConstraints={refPanoramaWrapper}
                        dragTransition={{ bounceStiffness: 400, bounceDamping: 60 }}
                        className={styles.panorama__wrapper__img}
                        src={darkTheme ? panoramaDark.src : panoramaLight.src}
                        alt='Панорама Пресня Republic'
                        initial={false}
                        animate={controls}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onTouchStart={onMouseDown}
                        onTouchMove={onMouseMove}
                        onTouchEnd={onMouseUp}
                    />
                    <div
                        className={`${styles.scrollableIndicator} ${
                            showScrollableIndicator ? styles.scrollableIndicator_show : styles.scrollableIndicator_hide
                        }`}
                    >
                        <div className={styles.mobile}>
                            <SvgIcons id='arrows panorama' />
                        </div>
                    </div>
                    <div className={styles.panorama__wrapper__buttons_wrapper}>
                        <button className={styles.panorama__wrapper__button} onClick={() => setDarkTheme(false)}>
                            {darkTheme && (
                                <svg width='100%' height='100%' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <rect
                                        x='-0.5'
                                        y='-0.5'
                                        width='29'
                                        height='29'
                                        rx='14.5'
                                        transform='matrix(0 -1 -1 0 29 29)'
                                        stroke='#F9F5F3'
                                    />
                                    <path
                                        d='M8.16602 15.418H9.33268'
                                        stroke='#F9F5F3'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M10.0449 10.8802L10.8698 11.7051'
                                        stroke='#F9F5F3'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M14.582 9.0013V10.168'
                                        stroke='#F9F5F3'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M19.1198 10.8802L18.2949 11.7051'
                                        stroke='#F9F5F3'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M20.9987 15.418H19.832'
                                        stroke='#F9F5F3'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M19.1198 19.9551L18.2949 19.1302'
                                        stroke='#F9F5F3'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M14.582 21.834V20.6673'
                                        stroke='#F9F5F3'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M10.0449 19.9551L10.8698 19.1302'
                                        stroke='#F9F5F3'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M17.4993 15.4173C17.4993 13.8065 16.1935 12.5007 14.5827 12.5007C12.9719 12.5007 11.666 13.8065 11.666 15.4173C11.666 17.0281 12.9719 18.334 14.5827 18.334C16.1935 18.334 17.4993 17.0281 17.4993 15.4173Z'
                                        stroke='#F9F5F3'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            )}
                            {!darkTheme && (
                                <svg width='100%' height='100%' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <rect
                                        x='-0.5'
                                        y='-0.5'
                                        width='29'
                                        height='29'
                                        rx='14.5'
                                        transform='matrix(0 -1 -1 0 29 29)'
                                        fill='#F9F5F3'
                                        stroke='#F9F5F3'
                                    />
                                    <path
                                        d='M8.16602 15.418H9.33268'
                                        stroke='#393D46'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M10.0449 10.8802L10.8698 11.7051'
                                        stroke='#393D46'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M14.582 9.0013V10.168'
                                        stroke='#393D46'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M19.1198 10.8802L18.2949 11.7051'
                                        stroke='#393D46'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M20.9987 15.418H19.832'
                                        stroke='#393D46'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M19.1198 19.9551L18.2949 19.1302'
                                        stroke='#393D46'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M14.582 21.834V20.6673'
                                        stroke='#393D46'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M10.0449 19.9551L10.8698 19.1302'
                                        stroke='#393D46'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M17.4993 15.4173C17.4993 13.8065 16.1935 12.5007 14.5827 12.5007C12.9719 12.5007 11.666 13.8065 11.666 15.4173C11.666 17.0281 12.9719 18.334 14.5827 18.334C16.1935 18.334 17.4993 17.0281 17.4993 15.4173Z'
                                        stroke='#393D46'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            )}
                        </button>
                        <button className={styles.panorama__wrapper__button} onClick={() => setDarkTheme(true)}>
                            {darkTheme && (
                                <svg width='100%' height='100%' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <rect width='30' height='30' rx='15' transform='matrix(0 -1 -1 0 30 30)' fill='#F9F5F3' />
                                    <path
                                        d='M9.90757 16.4659C9.38944 16.4659 8.87267 16.4131 8.36523 16.3084C8.63057 17.3483 9.15248 18.305 9.88322 19.091C10.6139 19.877 11.5302 20.4672 12.548 20.8075C13.5658 21.1478 14.6527 21.2274 15.7092 21.039C16.7658 20.8506 17.7582 20.4002 18.5956 19.729C19.433 19.0578 20.0888 18.1874 20.5028 17.1972C20.9167 16.2071 21.0758 15.1289 20.9653 14.0614C20.8548 12.9939 20.4783 11.9712 19.8703 11.0868C19.2623 10.2024 18.4422 9.48468 17.4851 8.99925C17.4544 10.9892 16.6428 12.8873 15.2252 14.2842C13.8076 15.681 11.8977 16.4646 9.90757 16.4659V16.4659Z'
                                        stroke='#393D46'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='bevel'
                                    />
                                </svg>
                            )}
                            {!darkTheme && (
                                <svg width='100%' height='100%' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <rect
                                        x='-0.5'
                                        y='-0.5'
                                        width='29'
                                        height='29'
                                        rx='14.5'
                                        transform='matrix(0 -1 -1 0 29 29)'
                                        stroke='#F9F5F3'
                                    />
                                    <path
                                        d='M9.90757 16.4659C9.38944 16.4659 8.87267 16.4131 8.36523 16.3084C8.63057 17.3483 9.15248 18.305 9.88322 19.091C10.6139 19.877 11.5302 20.4672 12.548 20.8075C13.5658 21.1478 14.6527 21.2274 15.7092 21.039C16.7658 20.8506 17.7582 20.4002 18.5956 19.729C19.433 19.0578 20.0888 18.1874 20.5028 17.1972C20.9167 16.2071 21.0758 15.1289 20.9653 14.0614C20.8548 12.9939 20.4783 11.9712 19.8703 11.0868C19.2623 10.2024 18.4422 9.48468 17.4851 8.99925C17.4544 10.9892 16.6428 12.8873 15.2252 14.2842C13.8076 15.681 11.8977 16.4646 9.90757 16.4659V16.4659Z'
                                        stroke='#F9F5F3'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='bevel'
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default MapSection;
