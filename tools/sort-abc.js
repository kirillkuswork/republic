const sortAbc = (array, key, direction) => {
    if(direction === 'asc_') {
        return array.sort((a, b) => a[key].localeCompare(b[key]));
    } else {
        return array.sort((a, b) => -1 * a[key].localeCompare(b[key]));
    }
}
export default sortAbc;