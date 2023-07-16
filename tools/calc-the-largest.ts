import { IApiCatalogFlat } from '../store/api/apiTypes';

//Утилита, рассчитывающая наибольшее значение в массиве объектов по ключу
const calcTheLargest = (array: IApiCatalogFlat[], key: 'floor' | 'area' | 'price' | 'currentPrice') => {
    let res = [...array];
    let max: string | number = 0;

    for (const flat of res) {
        let parameter = key;
        if (key === 'price') {
            parameter = 'currentPrice';
        } else {
            parameter = key;
        }

        if (flat[parameter] > max) {
            max = flat[parameter];
        }
    }

    return max;
};

export default calcTheLargest;
