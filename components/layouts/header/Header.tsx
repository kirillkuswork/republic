import React, { useEffect, useRef, useState } from 'react';
import SimpleButton from '../../features/buttons/simple-button/SimpleButton';
import SvgIcons from '../../svgs/SvgIcons';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../../hook';
import ROUTES from './../../../constants/routes';
import styles from './Header.module.scss';
import { isMobile } from 'react-device-detect';
import { disableBodyScroll, enableBodyScroll } from '../../../tools/body-scroll-lock';
import { useRouter } from 'next/router';
import { motion, MotionProps } from 'framer-motion';
import { usePageScroll } from '../../shared/page-scroll/PageScroller';
import clsx from 'clsx';

import MenuModal from '../../widgets/modal/menu-modal/MenuModal';
import FlatsMenuModal from '../../widgets/modal/flats-menu-modal/FlatsMenuModal';
import { FavoritesModal } from '../../widgets/modal/favorites-modal/FavoritesModal';
import AnimatedIconButton from '../../features/buttons/animated-icon-button/AnimatedIconButton';
import { closeModal } from '../../../store/slices/callOrder/callOrderSlice';
import AnimatedSimpleButton from '../../features/buttons/animated-simple-button/AnimatedSimpleButton';

export interface IHeader {
    theme: 'light' | 'dark' | 'dark-light' | 'transparent';
    className?: string;
    animation?: MotionProps;
    disableScrollChanges?: boolean;
}

interface IDiv extends React.HTMLAttributes<HTMLDivElement> {
    animation?: MotionProps;
}

const Div = ({ animation, ...rest }: IDiv) => {
    if (!animation) return <div {...rest}></div>;
    //@ts-ignore
    else return <motion.div {...rest} {...animation}></motion.div>;
};

const Header: React.FC<IHeader> = ({ theme, className, animation, disableScrollChanges }) => {
    const pageScroll = usePageScroll();
    const dispatch = useAppDispatch();
    const width = useAppSelector((state) => state.main.width);
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const [client, setClient] = useState(false);
    let phone = useAppSelector((state) => state.main.contacts.phone);
    let routes = useAppSelector((state) => state.main.routes);
    let pathname = useAppSelector((state) => state.main.currentPath);
    const buttonRef = useRef<HTMLDivElement>(null);
    const buttonFlatsRef = useRef<HTMLDivElement>(null);
    const [currentRoute, setCurrentRoute] = useState('меню');
    const [topToFooter, setTopToFooter] = useState(0);

    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [isHeaderAnimated, setIsHeaderAnimated] = useState(!disableScrollChanges);

    //Отслеживание позиции скролла для создания выезжающей шторки на странице /flats/list
    const isTopPosition = useAppSelector((state) => state.main.isTopPosition);
    const scrollPosition = useAppSelector((state) => state.main.scrollPosition);

    const [prevScrollpos, setPrevScrollpos] = useState(0);

    //смена темы шапки на странице /flats/list
    const [changeTheme, setChangeTheme] = useState(false);

    //Цвет элементов шапки (зависит от темы)
    const [elementsColor, setElementsColor] = useState<'white' | 'light' | 'darker-light' | 'grey' | 'dark-grey' | 'brick' | 'brick-light'>(
        'light',
    );

    //Показать/скрыть панели бургер-меню
    const [showMenu, setShowMenu] = useState(false);
    const [showFlatsMenu, setShowFlatsMenu] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);

    //Смена цвета кнопок при открытой/закрытой панели меню
    const [menuButtonColor, setMenuButtonColor] = useState<'light' | 'dark-grey'>('light');
    const [flatsButtonColor, setFlatsButtonColor] = useState<'light' | 'dark-grey'>('light');

    const route = useRouter();
    //Закрытие панелей бургер-меню при смене роута
    useEffect(() => {
        setShowMenu(false);
        setShowFlatsMenu(false);
        setShowFavorites(false);
        setIsHeaderAnimated(true);
        dispatch(closeModal());

        setTimeout(() => {
            enableBodyScroll();
        }, 100);
    }, [route]);

    //Рендер только на стороне клиента
    useEffect(() => {
        setClient(true);
    }, []);

    //переключение тем по роутингу
    useEffect(() => {
        installTheme();
    }, [theme, route]);

    //Установка темы
    const installTheme = () => {
        setChangeTheme(false);
        if (theme === 'dark' || theme === 'transparent') {
            setElementsColor('light');
            setMenuButtonColor('light');
        } else if (theme === 'light' || theme === 'dark-light') {
            setElementsColor('dark-grey');
            setMenuButtonColor('dark-grey');
        }
    };

    //Смена темы при скролле на странице /flats/list
    useEffect(() => {
        if (route.pathname === `${ROUTES.list}`) {
            if (width < widthTablet && !showMenu) {
                if (!isTopPosition) {
                    setChangeTheme(true);
                    setElementsColor('dark-grey');
                    setMenuButtonColor('dark-grey');
                } else {
                    setChangeTheme(false);
                    setElementsColor('light');
                    setMenuButtonColor('light');
                }
            }
        }
    }, [elementsColor, pathname, isTopPosition]);

    //переключение текущего пункта меню в кнопке слева
    useEffect(() => {
        if (width > widthTablet) {
            let route = routes.find((item) => item.pathname.includes(pathname));
            route ? setCurrentRoute(route.title) : setCurrentRoute('меню');
        }
    }, [pathname, currentRoute, width]);

    //переключение цвета наложенных кнопок от открытом/закрытом меню в случае,
    // когда тема шапки и тема панели отличаются
    useEffect(() => {
        if (theme === 'dark' || theme === 'transparent') {
            if (showMenu) {
                setMenuButtonColor('dark-grey');
            } else {
                setMenuButtonColor('light');
            }

            if (showFlatsMenu) {
                setFlatsButtonColor('dark-grey');
            } else {
                setFlatsButtonColor('light');
            }
        } else {
            setMenuButtonColor('dark-grey');
            setFlatsButtonColor('dark-grey');
        }
    }, [theme, showFlatsMenu, showMenu]);

    //Блокировка скролла при открытых панелях меню
    useEffect(() => {
        if (width < widthTablet) {
            if (showMenu || showFlatsMenu) {
                disableBodyScroll();
            } else {
                enableBodyScroll();
            }
        }
        pageScroll.blockScroll(showMenu || showFlatsMenu);

        if (!(showMenu || showFlatsMenu)) {
            enableBodyScroll();
        }
    }, [showMenu, showFlatsMenu]);

    useEffect(() => {
        showFavorites ? disableBodyScroll() : enableBodyScroll();
    }, [showFavorites]);

    // Скрытие хедера при скролле вниз / Появление хедера при скролле вверх
    useEffect(() => {
        const currentScrollPos = window.pageYOffset;

		if (scrollPosition === 0) {
			setIsHeaderVisible(true);
		}

        if (typeof window !== 'undefined') {
            setPrevScrollpos(window.screenY);

            if (!disableScrollChanges && !showMenu && !isTopPosition && !isHeaderAnimated) {
                if (!(width < widthTablet && route.pathname === `${ROUTES.list}`)) {
                    if (prevScrollpos >= currentScrollPos) {
                        setIsHeaderVisible(true);
                    } else {
                        setIsHeaderVisible(false);
                    }
                }
            }

            setPrevScrollpos(currentScrollPos);
        }
    }, [scrollPosition]);

    if (isHeaderAnimated) {
        setTimeout(() => {
            setIsHeaderAnimated(false);
        }, 1500);
    }

    const closeMenuModal = () => {
        setShowMenu(false);
    };

    const closeFlatsMenu = () => {
        setShowFlatsMenu(false);
    };

    const closeFavoritesModal = () => {
        setShowFavorites(false);
    };

    const openFavoritesModal = () => {
        setShowFavorites(true);
    };

    const changeOpenMenuModal = () => {
        setShowMenu(!showMenu);
    };

    const changeOpenMenuFlatsModal = () => {
        setShowFlatsMenu(!showFlatsMenu);
    };

	const resetIndexScroll = () => {
		sessionStorage.removeItem('scrollY')
	}

    useEffect(() => {
        let footer = document.getElementById('list');
        if (footer) {
            setTopToFooter(footer.getBoundingClientRect().bottom);
        }
    }, [topToFooter]);

    const back = () => {
        route.back();
    };

    const getButtonTheme = () => {
        if (theme === 'transparent') {
            return 'white-brick';
        } else if (theme === 'dark') {
            return 'white-brick';
        }

        return 'dark-grey-brick';
    };

    return (
        <>
            <div
                className={clsx(styles.background, className, {
                    [styles.visible]: !isTopPosition && (route.pathname === `${ROUTES.list}` || theme === 'transparent'),
                    [styles.dark]: theme === 'transparent',
                    [styles.opacity]: theme !== 'transparent',
                    [styles.isShow]: isHeaderVisible && !disableScrollChanges,
                    [styles.isHidden]: !isHeaderVisible && !disableScrollChanges,
                    [styles.initialTransition]: disableScrollChanges,
                })}
            ></div>
            <Div
                className={clsx(styles.container, styles[theme], className, {
                    [styles.light]: changeTheme,
                    [styles.isShow]: isHeaderVisible && !disableScrollChanges,
                    [styles.isHidden]: !isHeaderVisible && !disableScrollChanges,
                    [styles.startAnimation]: isHeaderAnimated,
                    [styles.initialTransition]: disableScrollChanges,
                })}
                animation={animation}
            >
                {client && (
                    <div className={styles.wrapper}>
                        <div className={styles.left}>
                            {/*Невидимая кнопка для выравнивания*/}
                            <div className={styles.button__hidden}>
                                <SimpleButton text={currentRoute} type={'button'} size={'default'} color={elementsColor} outline={true}>
                                    <SvgIcons id={'arrow down dark small'} theme={elementsColor} />
                                </SimpleButton>
                            </div>
                            {!isMobile && (
                                <>
                                    {route.pathname.includes(`${ROUTES.visual.root}`) &&
                                        ((route.pathname.match(/[/]/g) || []).length === 4 ||
                                            (route.pathname.match(/[/]/g) || []).length === 3 ||
                                            (route.pathname.match(/[/]/g) || []).length === 2) && (
                                            <AnimatedSimpleButton
                                                text={'назад'}
                                                size={'mini'}
                                                theme={`${elementsColor}-outline`.replace('-grey', '')}
                                                withIcon={true}
                                                iconPosition={'left'}
                                                iconAnimation={'left'}
                                                iconPermanentColor={menuButtonColor}
                                                disableIconBg={true}
                                                onClick={() => back()}
                                            >
                                                <SvgIcons id={'arrow-back'} />
                                            </AnimatedSimpleButton>
                                        )}

                                    {!(
                                        route.pathname.includes(`${ROUTES.visual.root}`) &&
                                        ((route.pathname.match(/[/]/g) || []).length === 4 ||
                                            (route.pathname.match(/[/]/g) || []).length === 3 ||
                                            (route.pathname.match(/[/]/g) || []).length === 2)
                                    ) &&
                                        route.pathname !== ROUTES.visual.root && (
                                            <AnimatedSimpleButton
                                                text={'визуальный выбор'}
                                                size={'mini'}
                                                theme={`${elementsColor}-outline`.replace('-grey', '')}
                                                link={ROUTES.visual.root}
                                            />
                                        )}

                                    {route.pathname === ROUTES.visual.root && (
                                        <AnimatedSimpleButton
                                            text={'выбор по параметрам'}
                                            size={'mini'}
                                            theme={`${elementsColor}-outline`.replace('-grey', '')}
                                            link={ROUTES.list}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                        <div className={styles.right}>
                            {!isMobile && (
                                <a href={`tel:${phone.link}`} className={styles.tel + ' ' + styles[`tel_${elementsColor}`]}>
                                    {' '}
                                    {phone.text}{' '}
                                </a>
                            )}
                            <div className={styles.buttons}>
                                {!isMobile && (
                                    <>
                                        <AnimatedIconButton
                                            type={'link'}
                                            href={`tel:${phone.link}`}
                                            variant='round'
                                            outline={true}
                                            color={getButtonTheme()}
                                            direction='up'
                                        >
                                            <SvgIcons id={'phone'} />
                                        </AnimatedIconButton>
                                        <AnimatedIconButton
                                            type={'button'}
                                            variant='round'
                                            outline={true}
                                            color={getButtonTheme()}
                                            direction='up'
                                            onClick={openFavoritesModal}
                                        >
                                            <SvgIcons id={'heart'} />
                                        </AnimatedIconButton>
                                    </>
                                )}
                                {/*Невидимая кнопка для выравнивания*/}
                                {client && (
                                    <div className={isMobile ? '' : styles.button__hidden}>
                                        <SimpleButton
                                            text={width > widthTablet ? 'выбрать квартиру' : 'квартиры'}
                                            type={'Link'}
                                            link={ROUTES.list}
                                            size={'default'}
                                            color={elementsColor}
                                            outline={true}
                                            func={() => changeOpenMenuFlatsModal()}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Div>
            {/*СЛОЙ С ЛОГОТИПОМ*/}
            <Div
                className={clsx(styles.container, styles.pointer_events, className, {
                    [styles.isShow]: isHeaderVisible && !disableScrollChanges,
                    [styles.isHidden]: !isHeaderVisible && !disableScrollChanges,
                    [styles.startAnimation]: isHeaderAnimated,
                    [styles.initialTransition]: disableScrollChanges,
                })}
                animation={animation}
            >
                <div className={`${styles.wrapper} ${styles.wrapper__center}`}>
                    <Link className={styles.logo} href={ROUTES.root} onClick={resetIndexScroll}>
                        <SvgIcons id={'header-logo'} theme={elementsColor} />
                    </Link>
                </div>
            </Div>
            {/*СЛОЙ С КНОПКАМИ ВЫЗОВА МЕНЮ-ПАНЕЛЕЙ*/}
            <Div
                className={clsx(styles.container, styles.pointer_events, className, {
                    [styles.button__active]: showMenu,
                    [styles.isShow]: isHeaderVisible && !disableScrollChanges,
                    [styles.isHidden]: !isHeaderVisible && !disableScrollChanges,
                    [styles.startAnimation]: isHeaderAnimated,
                    [styles.initialTransition]: disableScrollChanges,
                })}
                animation={animation}
            >
                <div className={styles.wrapper}>
                    <div ref={buttonRef} className={styles.button_wrapper}>
                        <AnimatedSimpleButton
                            text={currentRoute}
                            size={'mini'}
                            theme={menuButtonColor === 'light' ? 'light-outline' : 'dark-outline'}
                            withIcon={true}
                            iconPosition={'right'}
                            iconAnimation={menuButtonColor === 'light' ? 'down' : 'up'}
                            iconPermanentColor={menuButtonColor}
                            disableIconBg={true}
                            onClick={() => changeOpenMenuModal()}
                        >
                            <SvgIcons id={'arrow down dark small'} theme={menuButtonColor} />
                        </AnimatedSimpleButton>
                    </div>
                    {client && (
                        <>
                            {!isMobile && (
                                <div ref={buttonFlatsRef} className={styles.button_wrapper}>
                                    <AnimatedSimpleButton
                                        text={width > widthTablet ? 'выбрать квартиру' : 'квартиры'}
                                        size={'mini'}
                                        theme={`${flatsButtonColor}-outline`.replace('-grey', '')}
                                        iconAnimation={menuButtonColor === 'light' ? 'down' : 'up'}
                                        iconPermanentColor={menuButtonColor}
                                        onClick={() => changeOpenMenuFlatsModal()}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Div>
            {client && (
                <>
                    <MenuModal
                        show={showMenu}
                        buttonRef={buttonRef}
                        closeMenuModal={closeMenuModal}
                        openFavoritesModal={openFavoritesModal}
                    />
                    <FlatsMenuModal show={showFlatsMenu} closeMenuModal={closeFlatsMenu} buttonRef={buttonFlatsRef} />
                    <FavoritesModal show={showFavorites} closeModal={closeFavoritesModal} />
                </>
            )}
        </>
    );
};

export default Header;
