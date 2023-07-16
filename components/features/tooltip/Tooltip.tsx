import React, { useRef, useState, useMemo, useEffect, useCallback, RefCallback } from 'react';
import styles from './Tooltip.module.scss';
import { useAppSelector } from '../../../hook';

export interface ITooltip {
    children: React.ReactNode;
    content: string;
    theme: 'base' | 'red_price_catalog' | 'warning_for_input';
    placement?: 'top' | 'bottom' | 'left' | 'right';
    behavior?: 'hover' | 'focus' | 'click';
    size?: number;
    text?: 'content_left';
}

export enum TOOLTIP_BEHAVIOR {
    CLICK = 'click',
    FOCUS = 'focus',
    HOVER = 'hover',
}

const Tooltip: React.FC<ITooltip> = ({ children, placement = 'bottom', behavior, content, theme, size, text }) => {
    const width = useAppSelector((state) => state.main.width);
    const [isClicked, setIsClicked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocus, setIsFocused] = useState(false);
    const targetRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [init, setInit] = useState(false);

    const showTooltip = useMemo(() => {
        if (behavior === TOOLTIP_BEHAVIOR.CLICK) {
            return isClicked;
        } else if (behavior === TOOLTIP_BEHAVIOR.FOCUS) {
            return isFocus;
        } else {
            return isHovered;
        }
    }, [behavior, isHovered, isFocus, isClicked]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleOutsideClick = ({ target }: MouseEvent) => {
        if (targetRef.current) {
            if (targetRef.current.contains(target as Node)) {
                return;
            }

            setIsClicked(false);
        }
    };

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        if (behavior === TOOLTIP_BEHAVIOR.CLICK) {
            if (!isClicked) {
                document.addEventListener('click', (event) => handleOutsideClick(event), false);
            } else {
                document.removeEventListener('click', (event) => handleOutsideClick(event), false);
            }

            setIsClicked(!isClicked);
        } else {
            if (targetRef.current) {
                targetRef.current.blur();
            }
        }
    };

    //Получение данных о местонахождении тултипа, чтобы скорректировать его отображение в крайних положениях
    const [dimensions, setDimensions] = useState<DOMRect | null>(null);

    const callBackRef: RefCallback<HTMLElement | null> = useCallback((node: HTMLElement | null) => {
        if (node) {
            setDimensions(node.getBoundingClientRect());
        }
    }, []);

    const [tooRight, setTooRight] = useState(false);
    const [offset, setOffset] = useState<number>(0);
    const [contentWidth, setContentWidth] = useState<number>(0);
    const [tooLeft, setTooLeft] = useState(false);

    useEffect(() => {
        //Отработка крайних положений тултипа работает только при базовой теме
        if (theme === 'base') {
            if (contentRef.current && dimensions) {
                setContentWidth(contentRef.current.clientWidth / 2);
                //Если половина ширины контентной части тултипа меньше, чем отступ от правой крайней части экрана
                //(другими словами, тултип не помещается), то применяем класс, который его сдвигает
                if ((width - dimensions?.right) / (contentRef.current.clientWidth / 2) <= 1) {
                    setTooRight(true);
                } else {
                    setTooRight(false);
                }

                // console.log('width ', width);
                // console.log('dimensions?.right ', dimensions?.right);
                // console.log('contentRef.current.clientWidth ', contentRef.current.clientWidth);

                if (dimensions?.left / (contentRef.current.clientWidth / 2) <= 1) setTooLeft(true);
            } else {
                setTooLeft(false);
            }
        }
    });

    useEffect(() => {
        if (targetRef.current !== null) {
            setOffset(targetRef.current.clientWidth / 2);
        } else {
            setOffset(0);
        }
    });

    useEffect(() => {
        setTimeout(() => {
            setInit(true);
        }, 300);
    });

    return (
        <div className={styles.box} ref={callBackRef}>
            <button
                className={styles.button}
                ref={targetRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={(event) => handleClick(event)}
            >
                {children}
            </button>

            {tooLeft && !tooRight && (
                <div
                    className={`
                    ${showTooltip ? styles.show : ''} 
                    ${styles[theme]} 
                    ${styles[placement]} 
                    ${styles.container}
                    ${styles.to_left}
                `}
                    style={{ transform: `translateX(calc(50% - ${contentWidth + offset + 10}px))`, width: init ? size : 0 }}
                >
                    <div className={`${styles.content} ${styles[theme]} ${styles.arrow} ${text ? styles[text] : ''}`} ref={contentRef}>
                        {content}
                    </div>
                </div>
            )}

            {tooRight && !tooLeft && (
                <div
                    className={`
                    ${showTooltip ? styles.show : ''} 
                    ${styles[theme]} 
                    ${styles[placement]} 
                    ${styles.container}
                    ${styles.to_right}
                `}
                    style={{ transform: `translateX(calc(-50% - ${contentWidth - offset - 10}px))`, width: init ? size : 0 }}
                >
                    <div
                        className={`
                        ${styles.content} 
                        ${styles[theme]} 
                        ${styles.arrow}
                        ${text ? styles[text] : ''}
                    `}
                        ref={contentRef}
                    >
                        {content}
                    </div>
                </div>
            )}

            {!tooRight && !tooLeft && (
                <div
                    className={`
                    ${showTooltip ? styles.show : ''} 
                    ${styles[theme]} 
                    ${styles[placement]} 
                    ${styles.container}
                `}
                    style={{ width: init ? size : 0 }}
                >
                    <div className={`${styles.content} ${styles[theme]} ${styles.arrow} ${text ? styles[text] : ''}`} ref={contentRef}>
                        {content}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
