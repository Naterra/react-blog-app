export const insertItem = (array, action) =>{
    // action={index, item}
    let newArray = array.slice(); //copy of array
    newArray.splice(action.index, 0, action.item);
    return newArray;
};

export const removeItem =(array, action) =>{
    let newArray = array.slice();
    newArray.splice(action.index, 1);
    return newArray
};

export const mergeArray =(old,updated) =>{
    var o = {};

    old.forEach(function(v) {
        o[v._id] = v;
    });

    updated.forEach(function(v) {
        o[v._id] = v;
    });

    var r = [];

    for(var p in o) {
        if(o.hasOwnProperty(p))
            r.push(o[p]);
    }

    return r;
};

// export default {
//     mergeAray, removeItem, insertItem
// }