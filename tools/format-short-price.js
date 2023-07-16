//Десятичное написание цены с запятой вместо точки и двумя знаками после запятой

const formatShortPrice = (price) => {
    return Intl.NumberFormat("ru").format(price.toFixed(1)).replace(',', '.');
}

export default formatShortPrice;