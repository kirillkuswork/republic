const formatLongPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(
        parseInt(price)
    );
}

export default formatLongPrice;