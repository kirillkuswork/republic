//Проверка квартиры на участие в акции c красной ценой

const checkRedPrice = (benefits) => {

    let promo = {price: '', name: '',};

    if (benefits.length > 0) {
        benefits.every(value => {
            if (value.id === 116458) {
                promo.price = value.benefitPrice;
                promo.name = value.name;
            }
            return value;
        });
    }

    return promo;
}

export default checkRedPrice;