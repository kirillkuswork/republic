export function getDateString(isoDate: string) {
    let curIsoDate = new Date(isoDate);
    curIsoDate.setHours(curIsoDate.getHours() + 3);
    return `${('0' + new Date(curIsoDate).getUTCDate()).slice(-2)}`;
}
export function getMonthString(isoDate: string) {
    let curIsoDate = new Date(isoDate);
    curIsoDate.setHours(curIsoDate.getHours() + 3);
    return `${'.' + ('0' + (new Date(curIsoDate).getMonth() + 1)).slice(-2)}`;
}
