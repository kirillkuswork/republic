//Утилита, которая проверяет равенство параметров и вовзращает объект с нужным статусом checked

const checkParameterAndToggleStatus = (param1, param2, item, param3 = null) => {
    if (param1 === param2 || param1 === param3) {
        return {
            ...item,
            checked: true,
        }
    } else {
        return {
            ...item,
            checked: false,
        }
    }
}

export default checkParameterAndToggleStatus;