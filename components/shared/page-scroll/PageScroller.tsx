import React, { createContext, ReactNode, useContext, useEffect, useMemo, useRef } from 'react';
import { bool } from 'yup';

export interface IPageScrollerStage {
    slideIn: (forward: boolean) => number;
    slideOut: (forward: boolean) => number;
    onlyUpDown?: boolean;
}
export interface IPageScrollerContext {
    addStage: (index: number, stage: IPageScrollerStage) => void;
    blockScroll: (block: boolean) => void;
    scroll: (forward: boolean, upDownDirection: boolean) => void;
}

const PageScrollContext = createContext<IPageScrollerContext>({
    addStage: () => {},
    blockScroll: () => {},
    scroll: () => {},
});

export function usePageScroll(): IPageScrollerContext {
    return useContext(PageScrollContext);
}

export default function PageScroller({
    children,
    onNewStage,
}: {
    children: ReactNode | undefined;
    onNewStage?: (stage: number, forward: boolean) => void;
}) {
    const stage = React.useRef<number>(0);
    const stages = React.useRef<IPageScrollerStage[]>([]);
    const scrollBlocked = React.useRef<boolean>(false);

    //Так как используются нативные листнеры, хранить пропсы для них нужно в ref
    const onNewStageRef = useRef<typeof onNewStage>(onNewStage);
    useEffect(() => {
        onNewStageRef.current = onNewStage;
    }, [onNewStage]);

    const scrollTh = React.useRef<number>(new Date().getTime());
    const scrollDelay = React.useRef<number>(200);
    const touchStart = React.useRef<{ x: number; y: number } | null>(null);

    const onScroll = React.useRef<IPageScrollerContext['scroll']>((forward: boolean, upDownDirection: boolean) => {
        if (scrollBlocked.current) return;

        const prevStage = stages.current[stage.current];
        let nextStage: IPageScrollerStage | undefined = undefined;

        if (prevStage && prevStage.onlyUpDown && !upDownDirection) return;

        const curTime = new Date().getTime();
        if (curTime - scrollTh.current < scrollDelay.current) return;
        scrollTh.current = curTime;

        if (forward && stage.current + 1 < stages.current.length) {
            stage.current += 1;
            nextStage = stages.current[stage.current];
            console.log('new stage', stage.current, 'forward', forward);
        } else if (!forward && stage.current - 1 >= 0) {
            stage.current -= 1;
            nextStage = stages.current[stage.current];
            console.log('new stage', stage.current, 'forward', forward);
        }

        let delay = 200;
        if (prevStage) delay = Math.max(delay, prevStage.slideOut(forward));
        if (nextStage) delay = Math.max(delay, nextStage.slideIn(forward));
        if (onNewStageRef.current) onNewStageRef.current(stage.current, forward);
        scrollDelay.current = delay;
    });

    const context = React.useRef<IPageScrollerContext>({
        addStage: (index, stage) => {
            stages.current[index] = stage;
        },
        blockScroll: (block) => {
            scrollBlocked.current = block;
        },
        scroll: (forward, upDownDirection) => {
            onScroll.current(forward, upDownDirection);
        },
    });

    useEffect(() => {
        //Обработка скролл-эвента
        const [wheelEvent, wheelOpt] = getScrollEvent();
        const preventScroll = (e: Event) => {
            if (scrollBlocked.current) return;
            e.preventDefault();
            onScroll.current((e as WheelEvent).deltaY > 0, true);
        };

        //Обработка точ-скролл эвента
        const handleTouchStart = (e: TouchEvent) => {
            if (scrollBlocked.current) return;
            touchStart.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };
        };
        const handleTouchMove = (e: TouchEvent) => {
            if (scrollBlocked.current) return;
            if (!touchStart.current) return;
            const direction = getScrollDirection(touchStart.current.x, touchStart.current.y, e.touches[0].clientX, e.touches[0].clientY);
            touchStart.current = null;
            console.log(direction);
            onScroll.current(direction == 'down' || direction == 'right', direction == 'down' || direction == 'up');
        };

        //Скролл на декстопной версии кнопками
        //left: 37, up: 38, right: 39, down: 40,
        //spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        const keys: { [p: number]: number } = { 37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1 };
        const preventScrollKeys = (e: KeyboardEvent) => {
            if (scrollBlocked.current) return;
            if (keys[e.keyCode]) {
                e.preventDefault();
                onScroll.current(e.keyCode === 40 || e.keyCode === 34 || e.keyCode === 32 || e.keyCode === 35 || e.keyCode == 39, true);
                return false;
            }
        };

        //Перезагрузка страницы при resize
        const handleResize = (e: UIEvent) => {
            window.location.reload();
        };

        window.addEventListener(wheelEvent, preventScroll, wheelOpt);
        window.addEventListener('touchstart', handleTouchStart, wheelOpt);
        window.addEventListener('touchmove', handleTouchMove, wheelOpt);
        window.addEventListener('keydown', preventScrollKeys, wheelOpt);
        window.addEventListener('resize', handleResize);
        document.body.style.setProperty('overflow', 'hidden');

        return () => {
            window.removeEventListener(wheelEvent, preventScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('keydown', preventScrollKeys);
            window.removeEventListener('resize', handleResize);
            document.body.style.removeProperty('overflow');
        };
    }, []);

    return <PageScrollContext.Provider value={context.current}>{children}</PageScrollContext.Provider>;
}

function getScrollDirection(xStart: number, yStart: number, xEnd: number, yEnd: number): 'right' | 'left' | 'up' | 'down' {
    const xDiff = xStart - xEnd;
    const yDiff = yStart - yEnd;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        return xDiff > 0 ? 'right' : 'left';
    } else {
        return yDiff > 0 ? 'down' : 'up';
    }
}

function getScrollEvent(): [string, boolean | { passive: boolean }] {
    let supportsPassive = false;
    try {
        // @ts-ignore
        window.addEventListener(
            'test',
            null,
            Object.defineProperty({}, 'passive', {
                get: function () {
                    supportsPassive = true;
                },
            }),
        );
    } catch (e) {}
    const wheelOpt = supportsPassive ? { passive: false } : false;
    const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    return [wheelEvent, wheelOpt];
}
