//Утилита, которая получает на входе массив параметров фильтрации из стейта,
// находит в нём активные параметры для фильтрации и выдаёт строку со значениями этих параметров

const getSelectedParams = (state, array)=> {
    return state[array].filter(e => e.active === true).reduce(function (array, parameter) {
        array.push(parameter.value);
        return array;
    }, []).toString() ;
}

export default getSelectedParams;