import { IApiCatalogFlat } from '../store/api/apiTypes';

//Утилита, рассчитывающая наименьшее значение в массиве объектов по ключу
const calcTheLeast = (array: IApiCatalogFlat[], key: 'floor' | 'area' | 'price' | 'currentPrice', max: string | number) => {
    let res = [...array];
    let min = max;

    for (const flat of res) {
        let parameter = key;
        if (key === 'price') {
            parameter = 'currentPrice';
        } else {
            parameter = key;
        }

        if (flat[parameter] < min) {
            min = flat[parameter];
        }
    }
    return min;
};

export default calcTheLeast;
