import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hook';
import { setIsTopPosition, setScrollPosition as setScrollPositionStore } from '../../store/slices/mainSlice';

const OFFSET_Y = 150;

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const updatePosition = () => {
            setScrollPosition(window.scrollY);

            if (typeof window !== 'undefined') {
                dispatch(setIsTopPosition(window.scrollY < OFFSET_Y));
                dispatch(setScrollPositionStore(window.scrollY));
            }
        };

        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return () => window.removeEventListener('scroll', updatePosition);
    }, []);

    return scrollPosition;
};

export default useScrollPosition;
