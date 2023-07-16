export default function getFormatDate(date: string) {
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    day[0] === '0' ? (day = day.substring(1)) : day;

    const monthNames = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
    ];

    return `${day} ${monthNames[Number(month) - 1]} ${date.slice(0, 4)}`;
}
