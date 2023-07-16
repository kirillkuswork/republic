export default function getQuarterBounds(date: string) {
    const quarters: { [key: string]: string } = {
        1: 'I кв.',
        2: 'II кв.',
        3: 'III кв.',
        4: 'IV кв.',
    };
    let curIsoDate = new Date(date);
    const quarter = Math.ceil(curIsoDate.getMonth() / 3);
    return `${quarters[quarter.toString()]}${curIsoDate.getFullYear()}`;
}
