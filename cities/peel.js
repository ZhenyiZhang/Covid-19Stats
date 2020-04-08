const url = 'https://www.peelregion.ca/coronavirus/testing/#cases';
const rp = require('request-promise');
const $ = require('cheerio');


function getPeelData() {
    let table = {};
    /*selector for tables*/
    const tablesSelector = 'tbody > tr';

    return new Promise(async(resolve, reject) => {
        table.table = {};
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
        table.table = {};
        table.table.tbody = [];
        $(tablesSelector, html).each((index, element) => {
            let rowString = $(element).text();
            /*remove blank lines*/
            rowString = rowString.replace(/^\s*\n/gm, "");
            let rowArray  =rowString.split('\n');
            for (let i = 0; i < rowArray.length; i++) {
                rowArray[i] = rowArray[i].trim();
            }
            /*pop out empty element*/
            rowArray.pop();
            table.table.tbody.push(Array.from(rowArray));
        });
        table.source = url;
        resolve(table);
    });
}

module.exports = getPeelData;