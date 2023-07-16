// Утилита, которая на вход получает массив параметров, и у каждого сбрасывает значение active до false

const resetSortingParameter = (array) => {
    return array.map(item => {
        return {
            name: item.name,
            value: item.value,
            active: false,
            disabled: item.disabled,
        }
    });
}

export default resetSortingParameter;