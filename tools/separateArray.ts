import { advantagesType } from '../models';

export const separateArray = (arr: advantagesType[], amount: number) => {
    let count = 0;

    const result: { visible: advantagesType[]; unvisible: advantagesType[] } = {
        visible: [],
        unvisible: [],
    };

    const resultPush = (elem: advantagesType) => {
        result.visible.push(elem);
        count++;
    };

    arr.forEach((elem, i) => {
        if (count < amount) {
            resultPush(elem);
        } else {
            result.unvisible.push(elem);
        }
    });

    return result;
};
