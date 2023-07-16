import { useAppDispatch, useAppSelector } from './hook';
import React, { useEffect } from 'react';
import { fetchSliderRedsFirst, flatCheck } from './store/api/api';
import { useRouter } from 'next/router';
import { changeCurrentPath, setWidth, setHeight, handleNewUser } from './store/slices/mainSlice';
import { IApiCatalogFlat } from './store/api/apiTypes';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import dynamic from 'next/dynamic';
import CallOrderModal from './components/widgets/modal/call-order-modal/CallOrderModal';
import useScrollPosition from './tools/hooks/useScrollPosition';
import CookieModal from './components/widgets/modal/cookie-modal/CookieModal';
import { getCookie } from './tools/get-cookie';
import { AnimatePresence } from 'framer-motion';
const RotateDevice = dynamic(() => import('./components/shared/rotate-device/RotateDevice'), { ssr: false });

interface IWrapper {
    children: React.ReactNode;
}

// function getCookie(cname: string) {
// 	let name = cname + '=';
// 	let decodedCookie = decodeURIComponent(document.cookie);
// 	let ca = decodedCookie.split(';');
// 	for (let i = 0; i < ca.length; i++) {
// 		let c = ca[i];
// 		while (c.charAt(0) == ' ') {
// 			c = c.substring(1);
// 		}
// 		if (c.indexOf(name) == 0) {
// 			return c.substring(name.length, c.length);
// 		}
// 	}
// 	return '';
// }

const Wrapper: React.FC<IWrapper> = ({ children }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const width = useAppSelector((state) => state.main.width);
	const isANewUser = useAppSelector((state) => state.main.isANewUser);
    const scrollPosition = useScrollPosition();

    useEffect(() => {
        //Сохранение текущего имени роута без динамических составляющих
        dispatch(changeCurrentPath(router.pathname));
    }, [router.pathname]);

    // const { scroll } = useLocomotiveScroll();

    // useEffect(() => {
    //     if (scroll) {
    //         scroll.scrollTo(0, 0);
    //     } else {
    //         window.scrollTo(0, 0);
    //     }
    // }, [router.pathname]);

    useEffect(() => {
        dispatch(setWidth(window.innerWidth));
        dispatch(setHeight(window.innerHeight));
        document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
        document.documentElement.style.setProperty('height', `${window.innerHeight}px`);
    });

    useEffect(() => {
        dispatch(fetchSliderRedsFirst());
    }, []);

    const detectSizes = () => {
        dispatch(setWidth(window.innerWidth));
        dispatch(setHeight(window.innerHeight));
        document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
        document.documentElement.style.setProperty('height', `${window.innerHeight}px`);
    };

    useEffect(() => {
        const savedFavorites: string | null = localStorage.getItem('favoriteList');

        if (savedFavorites !== null) {
            const savedFlats: IApiCatalogFlat[] = JSON.parse(savedFavorites);
            if (savedFlats.length !== 0) {
                let flatsIdsList = savedFlats.map((item) => item.id).join('|');
                dispatch(flatCheck(flatsIdsList));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        window.addEventListener('resize', detectSizes);
        return () => {
            window.removeEventListener('resize', detectSizes);
        };
    });

	useEffect(() => {
		if (!getCookie('republic_user')) return;
		else {
			dispatch(handleNewUser(true));
		}
	}, [isANewUser]);

    return (
        <>
            {children} {width < 950 && <RotateDevice />}
            <CallOrderModal />
            <AnimatePresence>{!isANewUser && <CookieModal />}</AnimatePresence>
        </>
    );
};

export default Wrapper;
