const url = 'https://www.peelregion.ca/coronavirus/testing/#cases';
const rp = require('request-promise');
const $ = require('cheerio');


function getPeelData() {
    /*selector for tables*/
    const tablesSelector = 'tbody > tr';

    return new Promise(async(resolve, reject) => {
        let table = [];
        /*if the promise takes more than 5 seconds to resolve, reject immediately*/
        setTimeout(() => {
            reject('The process has been taking too long');
        }, 5000);
        /*get html page*/
        const html = await rp(url).catch(err => reject(err));
        /*check if they changed their table format */
        if($(tablesSelector, html).length === 0) {
            reject(url);
        }
        $(tablesSelector, html).each((index, element) => {
            let rowString = $(element).text();
            /*remove blank lines*/
            rowString = rowString.replace(/^\s*\n/gm, "");
            let rowArray  =rowString.split('\n');
            rowArray.pop();
            table.push(Array.from(rowArray));
        });
        table.push({'source': url});
        resolve(table);
    });
}

module.exports = getPeelData;