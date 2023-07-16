import { AnimationProps } from 'framer-motion';
import cloneDeep from 'lodash/cloneDeep';

export interface IAnimation {
    initial: AnimationProps['initial'];
    animate: AnimationProps['animate'];
    transition: AnimationProps['transition'];
    vh900?: 'y' | 'x' | 'xy';
}

export const transition1200 = { ease: [0.6, 0, 0.4, 1], duration: 1.2, type: 'tween' };
export const transition1800 = { ease: [0.6, 0, 0.4, 1], duration: 1.8, type: 'tween' };
export const transition2200 = { ease: [0.6, 0, 0.4, 1], duration: 2.2, type: 'tween' };

export function reverseAnimation<T extends string>(animations: { [key in T]?: IAnimation }) {
    let res: { [key in T]?: IAnimation } = {};
    for (let k in animations) {
        // @ts-ignore
        res[k] = {
            initial: animations[k]!.animate,
            animate: animations[k]!.initial,
            transition: animations[k]!.transition,
            vh900: animations[k]!.vh900,
        };
    }
    return res;
}

export function wv<T extends string>(animations: { [key in T]?: IAnimation }, type: 'all' | '1460') {
    let res = cloneDeep(animations);
    const divider =
        type === '1460'
            ? 1460
            : document.documentElement.clientWidth > 1370
            ? 1460
            : document.documentElement.clientWidth >= 1024
            ? 1200
            : document.documentElement.clientWidth >= 541
            ? 768
            : 380;
    for (let name in res) {
        for (let k in res[name]) {
            if (k === 'initial' || k === 'animate') {
                // @ts-ignore
                const aProps = res[name][k];
                if (typeof aProps === 'object' && !Array.isArray(aProps) && aProps !== null) {
                    for (let aProp in aProps) {
                        if (aProp === 'x') {
                            // @ts-ignore
                            const realDivider = 'vh' in res[name] && (res[name].vh === 'x' || res[name].vh === 'xy') ? 900 : divider;
                            // @ts-ignore
                            const multiplier =
                                // @ts-ignore
                                'vh' in res[name] && (res[name].vh === 'x' || res[name].vh === 'xy')
                                    ? window.innerHeight
                                    : document.documentElement.clientWidth;
                            // @ts-ignore
                            aProps[aProp] = (aProps[aProp] / realDivider) * multiplier;
                        } else if (aProp === 'y') {
                            // @ts-ignore
                            const realDivider = 'vh' in res[name] && (res[name].vh === 'y' || res[name].vh === 'xy') ? 900 : divider;
                            // @ts-ignore
                            const multiplier =
                                // @ts-ignore
                                'vh' in res[name] && (res[name].vh === 'y' || res[name].vh === 'xy')
                                    ? window.innerHeight
                                    : document.documentElement.clientWidth;
                            // @ts-ignore
                            aProps[aProp] = (aProps[aProp] / realDivider) * multiplier;
                        }
                    }
                }
            }
        }
    }
    return res;
}
