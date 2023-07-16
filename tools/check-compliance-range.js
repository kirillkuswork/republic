//Утилита, возвращающая объект, если его параметр соответствует указанному диапазону
const checkComplianceRange = (object, parameter, range) => {
    return object[parameter] >= range[0] && object[parameter] <= range[1];
};

export default checkComplianceRange;
