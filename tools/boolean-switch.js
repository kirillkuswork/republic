const booleanSwitch = (state, array, key, value)=> {
    let element = state[array].find(e => e.value === value);

    switch (element[key]) {
        case true:
            element[key] = false;
            break;
        default:
            element[key] = true;
            break;
    }
    return element;
}

export default booleanSwitch;