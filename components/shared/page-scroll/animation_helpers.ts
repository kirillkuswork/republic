import { AnimationProps } from 'framer-motion';
import cloneDeep from 'lodash/cloneDeep';

export type IResponsiveAnimationType = 'vw1460' | 'vwAll' | 'vh900';

export interface IAnimation {
    initial: AnimationProps['initial'];
    animate: AnimationProps['animate'];
    transition: AnimationProps['transition'];
    responsive?: {
        x?: IResponsiveAnimationType;
        y?: IResponsiveAnimationType;
    };
    toAnchor?: {
        getElement: () => HTMLElement;
        getConnectElement: () => HTMLElement;
        connect: 'elemTopScreenTop' | 'elemBottomScreenBottom' | 'fullScreenUp';
        offset?: number;
    };
}

export const transition500 = { ease: [0.6, 0, 0.4, 1], duration: 0.5, type: 'tween' };
export const transition600 = { ease: [0.6, 0, 0.4, 1], duration: 0.6, type: 'tween' };
export const transition800 = { ease: [0.6, 0, 0.4, 1], duration: 0.8, type: 'tween' };
export const transition900 = { ease: [0.6, 0, 0.4, 1], duration: 0.9, type: 'tween' };
export const transition1100 = { ease: [0.6, 0, 0.4, 1], duration: 1.1, type: 'tween' };

export const transition1200 = { ease: [0.6, 0, 0.4, 1], duration: 1.2, type: 'tween' };
export const transition1600 = { ease: [0.6, 0, 0.4, 1], duration: 1.6, type: 'tween' };
export const transition1800 = { ease: [0.6, 0, 0.4, 1], duration: 1.8, type: 'tween' };
export const transition2200 = { ease: [0.6, 0, 0.4, 1], duration: 2.2, type: 'tween' };

export function forMotionDiv(a: IAnimation | undefined): IAnimation | undefined {
    return !!a
        ? {
              initial: a.initial,
              animate: a.animate,
              transition: a.transition,
          }
        : undefined;
}

export function reverseAnimation<T extends string>(animations: { [key in T]?: IAnimation }) {
    let res: { [key in T]?: IAnimation } = {};
    for (let k in animations) {
        // @ts-ignore
        res[k] = {
            ...animations[k],
            initial: animations[k]!.animate,
            animate: animations[k]!.initial,
        };
    }
    return res;
}

export function responsive<T extends string>(animations: { [key in T]?: IAnimation }) {
    const getResponsive = (key: 'x' | 'y', a: IAnimation) => {
        if (a.responsive && key in a.responsive) {
            const r = a.responsive[key]!;
            switch (r) {
                case 'vw1460':
                    return { divider: 1460, multiplier: document.documentElement.clientWidth };
                case 'vwAll':
                    return {
                        divider:
                            document.documentElement.clientWidth > 1370
                                ? 1460
                                : document.documentElement.clientWidth >= 1024
                                ? 1200
                                : document.documentElement.clientWidth >= 541
                                ? 768
                                : 380,
                        multiplier: document.documentElement.clientWidth,
                    };
                case 'vh900':
                    return { divider: 900, multiplier: window.innerHeight };
            }
        }
        return null;
    };

    let res = cloneDeep(animations);
    for (let name in res) {
        // @ts-ignore
        if ('toAnchor' in res[name]) {
            const toAnchor = (res[name]!.toAnchor as IAnimation['toAnchor'])!;
            const boundingRect = toAnchor.getConnectElement().getBoundingClientRect();
            if (toAnchor.connect === 'elemBottomScreenBottom') {
                const r = getResponsive('y', res[name]!);
                const offset = toAnchor.offset ? (r ? (toAnchor.offset / r.divider) * r.multiplier : toAnchor.offset) : 0;
                // @ts-ignore
                res[name].initial.y = toAnchor.getElement().getBoundingClientRect().top;
                // @ts-ignore
                res[name].animate.y = res[name].initial.y + (window.innerHeight - boundingRect.bottom - offset);
            } else if (toAnchor.connect === 'elemTopScreenTop') {
                const r = getResponsive('y', res[name]!);
                const offset = toAnchor.offset ? (r ? (toAnchor.offset / r.divider) * r.multiplier : toAnchor.offset) : 0;
                // @ts-ignore
                res[name].initial.y = toAnchor.getElement().getBoundingClientRect().top;
                // @ts-ignore
                res[name].animate.y = res[name].initial.y - boundingRect.top + offset;
                break;
            } else if (toAnchor.connect === 'fullScreenUp') {
                // @ts-ignore
                res[name].initial.y = toAnchor.getElement().getBoundingClientRect().top;
                // @ts-ignore
                res[name].animate.y = res[name].initial.y - window.innerHeight;
                break;
            }
            continue;
        }
        for (let k in res[name]) {
            if (k === 'initial' || k === 'animate') {
                // @ts-ignore
                const animation: IAnimation['initial'] | IAnimation['animate'] = res[name][k];
                if (typeof animation === 'object' && !Array.isArray(animation) && animation !== null) {
                    for (let aProp in animation) {
                        if (aProp === 'x' || aProp === 'y') {
                            const r = getResponsive(aProp, res[name]!);
                            if (r) {
                                // @ts-ignore
                                animation[aProp] = (animation[aProp] / r.divider) * r.multiplier;
                            }
                        }
                    }
                }
            }
        }
    }
    return res;
}

/**
 * Полностью копирует переданные анимации, заменяет все initial значениями из animate.
 * После перезаписывает все transition на переданную в newTransition.
 * Если передана additionalData, на последнем этапе добавляет все данные оттуда к уже имеющимся
 * Полезно на страницах с несколькими стадиями, когда нужно тащить за собой все позиции из предыдущих стадий
 * и добавлять что-то новое
 * @param animations копируемые анимации
 * @param newTransition новое поле transition, которое применится ко всем анимациям
 * @param additionalData доп данные которые добавятся ко всем полям анимаций
 */
export function initialAsAnimateWithTransition<T extends string>(
    animations: { [key in T]?: IAnimation },
    newTransition: IAnimation['transition'],
    additionalData?: { [key in T]?: Partial<IAnimation> },
) {
    let res: { [key in T]?: IAnimation } = cloneDeep(animations);
    for (let k in animations) {
        // @ts-ignore
        res[k].initial = cloneDeep(res[k].animate);
        // @ts-ignore
        res[k].transition = newTransition;
        if (additionalData && k in additionalData) {
            // @ts-ignore
            if ('initial' in additionalData[k])
                // @ts-ignore
                res[k].initial = {
                    // @ts-ignore
                    ...res[k].initial,
                    // @ts-ignore
                    ...additionalData[k].initial,
                };
            // @ts-ignore
            if ('animate' in additionalData[k])
                // @ts-ignore
                res[k].animate = {
                    // @ts-ignore
                    ...res[k].animate,
                    // @ts-ignore
                    ...additionalData[k].animate,
                };
            // @ts-ignore
            if ('transition' in additionalData[k])
                // @ts-ignore
                res[k].transition = additionalData[k].transition;
            // @ts-ignore
            if ('responsive' in additionalData[k])
                // @ts-ignore
                // @ts-ignore
                res[k].responsive = {
                    // @ts-ignore
                    ...res[k].responsive,
                    // @ts-ignore
                    ...additionalData[k].responsive,
                };
            // @ts-ignore
            if ('toAnchor' in additionalData[k])
                // @ts-ignore
                // @ts-ignore
                res[k].toAnchor = {
                    // @ts-ignore
                    ...res[k].toAnchor,
                    // @ts-ignore
                    ...additionalData[k].toAnchor,
                };
            delete additionalData[k];
        }
    }
    //Новые ключи в additionalData
    if (additionalData) {
        res = {
            ...res,
            ...additionalData,
        };
    }
    return res;
}
