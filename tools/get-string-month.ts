export function getMonth(fullDate: string, shortNotation: boolean) {
    const date = new Date(fullDate);
    const months = shortNotation
        ? ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
        : ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

    return [months[date.getMonth()], ' ‘' + date.getFullYear().toString().slice(2)];
}
