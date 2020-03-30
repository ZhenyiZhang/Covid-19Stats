const url = 'https://www.regionofwaterloo.ca/en/health-and-wellness/positive-cases-in-waterloo-region.aspx';
const getHTML = require('request-promise');
const $ = require('cheerio');

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


async function getWaterlooCases() {
    let html = await getHTML(url).catch(err => console.log(err));
    return new Promise((resolve, reject) => {
        /*get all rows in HTML format*/
        let tableString = $('tbody > tr', html).text();
        tableString = tableString.replace(/^\s*\n/gm, "");
        let tableArray = tableString.split('\n');

        resolve(splitArray(tableArray,5));
        reject('something went wrong');
    });
}

module.exports = getWaterlooCases;