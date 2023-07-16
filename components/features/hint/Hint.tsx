import React, { useEffect, useRef, useState } from 'react';
import styles from './Hint.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { useRouter } from 'next/router';
import { setHintIsShow } from '../../../store/slices/components/componentsSlice';

export interface IHint {
    orientation: 'left' | 'right';
    children: React.ReactElement;
}

const Hint: React.FC<IHint> = ({ children, orientation }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const hintRef = useRef<HTMLDivElement>(null);
    const hintContainer = useAppSelector((state) => state.components.hintContainer);
    const scrollPosition = useAppSelector((state) => state.main.scrollPosition);
    const hintElement = useAppSelector((state) => state.components.hintElement);
    const [hintElementRect, setHintElementRect] = useState<DOMRect | null>(null);
    const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
    const show = useAppSelector((state) => state.components.hintIsShow);
    //Положение стрелки по оси Y
    const [positionArrow, setPositionArrow] = useState<'start' | 'end' | 'middle'>('start');
    //Положение стрелки по оси Х
    const [orientationArrow, setOrientationArrow] = useState<'left' | 'right'>('left');
    //Перемещения для модального окна с информацией о квартирах на этаже
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState('0');
    const [topDelta, setTopDelta] = useState(0);

    //Обработка крайних положений (слишком сверху/слишком снизу/слишком слева и справа) относительно контейнера hintContainer
    const [tooTop, setTooTop] = useState(false);
    const [tooBottom, setTooBottom] = useState(false);
    const [tooLeft, setTooLeft] = useState(false);

    useEffect(() => {
        if (hintElement !== null) {
            setHintElementRect(hintElement?.getBoundingClientRect());
        }
    }, [hintElement, scrollPosition]);

    useEffect(() => {
        if (hintContainer !== null) {
            setContainerRect(hintContainer?.getBoundingClientRect());
        }
    }, [hintContainer, setContainerRect]);

    //Перемещение модального окна по оси Х
    useEffect(() => {
        if (hintElementRect && hintRef.current) {
            if (orientation === 'right') {
                setTranslateX(hintElementRect?.right + 20);
                setOrientationArrow('left');
            } else {
                setTranslateX(hintElementRect?.left - (hintRef?.current.clientWidth + 20));
                setOrientationArrow('right');
            }

            if (orientation === 'left' && tooLeft) {
                setTranslateX(hintElementRect?.right + 20);
                setOrientationArrow('left');
            }
        }
    });

    useEffect(() => {
        if (hintElementRect && hintRef.current && containerRect) {
            setTooTop(hintElementRect?.top - containerRect.top - scrollPosition < 50);
            setTooBottom(containerRect.bottom - hintElementRect?.bottom - hintElementRect?.height - scrollPosition < 100);

            if ((tooTop && tooBottom) || (!tooTop && !tooBottom)) {
                setTranslateY(`calc(-50%)`);
                setPositionArrow('middle');
                setTopDelta(hintElementRect?.height / 2);
            }

            if (tooTop && !tooBottom) {
                setTranslateY(`0%`);
                setPositionArrow('start');
                setTopDelta(0);
            }

            if (tooBottom && !tooTop) {
                setTranslateY(`calc(0px - 100%)`);
                setPositionArrow('end');
                setTopDelta(hintElementRect?.height);
            }

            setTooLeft(hintElementRect?.left - hintRef.current.clientWidth < 100);
        }
    });

    return (
        <div
            className={`${styles.info}
            ${styles[positionArrow]}
            ${styles[orientationArrow]}
            ${show ? styles.show : styles.hide}
            `}
            style={{
                top: `${hintElementRect ? hintElementRect.top + topDelta + scrollPosition : 0}px`,
                left: `${translateX}px`,
                transform: `translateY(${translateY})`,
            }}
            ref={hintRef}
        >
            <div ref={contentRef}>{children}</div>
        </div>
    );
};

export default Hint;
