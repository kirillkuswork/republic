const changeEnding = (word, digit) => {
    let strDigit = String(digit);
    let unit = parseInt(strDigit[strDigit.length - 1]);

    let options = {
        flat: ["квартира", "квартиры", "квартир"],
        window: ["окно", "окна", "окон"],
        bedroom: ["спальня", "спальни", "спален"],
        penthouse: ["пентхаус", "пентхауса", "пентхаусов"],
        offer: ["предложение", "предложения", "предложений"],
        apartment: ["апартамент", "апартамента", "апартаментов"],
        meter: ["метр", "метра", "метров"],
        program: ["программа", "программы", "программ"],
        floors: ['этаж', 'этажа', 'этажей'],
        sections: ['секция', 'секции', 'секций']
    };

    if (options[word]) {
        if (digit < 20 && digit > 9) return options[word][2];
        if (unit === 1) return options[word][0];
        if (unit && unit < 5) return options[word][1];
        return options[word][2];
    }

    return "";
}

export default changeEnding;