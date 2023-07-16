//Утилита, переключающая значение параметра "rooms" c "studio" в 0 и наоборот (требуется для сортировки)

const changeStudioValue = (flat, from, to) => {
    if (flat.rooms === from) {
        return {
            ...flat,
            rooms: to,
        }
    } else {
        return flat;
    }
}

export default changeStudioValue;