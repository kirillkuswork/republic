const getSectionNumber = (houseId) => {
    switch (houseId) {
        default:
        case 8995 || 9390:
            return 1;
        case 8996:
            return 2;
    }
}

export default getSectionNumber;