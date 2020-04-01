function splitArray(array, size) {
    if(array[array.length - 1] === '') {
        array.pop();
    }
    let length = array.length;
    if (size > length) {
        throw('size cannot exceed array length ');
    }
    let table = [];
    for(let i = 0; i < length;) {
        let local = [];
        for(let j = 0; j < size; j++) {
            if(i === length) {
                table.push(Array.from(local));
                return table;
            }
            local.push(array[i]);
            i += 1;
        }
        table.push(Array.from(local));
    }
    return table;
}

module.exports = splitArray;