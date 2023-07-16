const sortNumber = function (array, prop, direction) {
    prop = prop.split('.');
    let sortOrder;
    if(direction === 'asc_') {
        sortOrder = 1;
    } else {
        sortOrder = -1;
    }

    return array.sort(function(a, b) {
        let x = a,y = b;

        for (let i = 0; i < prop.length; i++) {
            x = x[prop[i]];
            y = y[prop[i]];
        }
        return sortOrder * ((+x < +y) ? -1 : ((+x > +y) ? 1 : 0));
    });
};

export default sortNumber;