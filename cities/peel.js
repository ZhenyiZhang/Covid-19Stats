const url = 'https://www.peelregion.ca/coronavirus/testing/#cases';
const rp = require('request-promise');
const $ = require('cheerio');


function getPeelData() {
    /*selector for tables*/
    const tablesSelector = 'tbody > tr';

    return new Promise(async(resolve, reject) => {
        /*get html page*/
        const html = await rp(url).catch(err => reject(err));

        let table = [];
        if($(tablesSelector, html).length === 0) {
            reject(`The data is changed, please visit ${url}`);
        }
        $(tablesSelector, html).each((index, element) => {
            let rowString = $(element).text();
            /*remove blank lines*/
            rowString = rowString.replace(/^\s*\n/gm, "");
            let rowArray  =rowString.split('\n');
            rowArray.pop();
            table.push(Array.from(rowArray));
        });
        table.push(['source', url]);
        resolve(table);
    });
}

module.exports = getPeelData;