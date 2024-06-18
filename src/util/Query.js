export const groupBy = function(xs, key, sort = {}) {

    if(sort.groupSort) {
        xs = orderBy(xs, sort.groupSort)
    }
    // xs.sort((a, b))

    const grouped =  xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);

        return rv;
    }, {});

    if(sort.itemSort) {
        for(const [key, items] of Object.entries(grouped)) {
            grouped[key] = orderBy(items, sort.itemSort)
        }
    }

    return Object.entries(grouped)
};

export const  orderBy = (obj, sort) => {
    const [ field, order ] = sort
    obj.sort((a, b) => {
        const aData = field.split('.').reduce((o, p) => {
            return o[p] && o[p] ? o[p] : null
        }, a)

        const bData = field.split('.').reduce((o, p) => {
            return o[p] && o[p] ? o[p] : null
        }, b)

        if(order === 'asc') {
            return aData - bData
        }
        if(order === 'desc') {
            return bData - aData
        }
    })

    return obj
}

export default groupBy