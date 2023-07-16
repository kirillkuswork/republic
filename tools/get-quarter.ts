const getQuarter = (date: string): string => {
    let quarter: string = '';

    let month = +date.slice(5, 7);

    if (month >= 1 && month <= 3) {
        quarter = 'I';
    } else if (month >= 4 && month <= 6) {
        quarter = 'II';
    } else if (month >= 7 && month <= 9) {
        quarter = 'III';
    } else if (month >= 10 && month <= 12) {
        quarter = 'IV';
    }

    return `${quarter} кв. ${date.slice(0, 4)}`;
};

export default getQuarter;
