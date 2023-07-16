const returnActiveAttributes = (attributes, advantages) => {
    // let keys = Object.keys(attributes);

    let array = []

    advantages.forEach(item => {
        if(attributes[item.value]) {
            array.push(item)
        }
    })

    // console.log(array)
    //
    // let activeKeys = keys.filter(function(key) {
    //     return attributes[key];
    // });
    //
    // let activeAttributes = [];
    // activeKeys.forEach(key => {
    //     activeAttributes = [...activeAttributes, advantages.find(item => item.value === key)];
    // })

    return array.splice(0, 3);
}

export default returnActiveAttributes;