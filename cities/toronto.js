const url = 'https://www.toronto.ca/home/covid-19/media-room/covid-19-status-of-cases-in-toronto/';
const rp = require('request-promise');
const $ = require('cheerio');
const splitArray = require('../handlers/splitArray');

//todo: add header
function getTorontoData() {
    let resTable = {};
    resTable.tbody = [];
    /*selector for tables*/
    const tablesSelector = '.cot-table';
    const columnSelector = 'tbody > tr';
    const headerSelector = 'thead > tr';

    return new Promise(async (resolve, reject) => {
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
        /*scrape table*/
        const table = await $(tablesSelector, html);

        /*push header into the table*/
        let header = await $(headerSelector, html).text();
        let headerString = header.replace(/^\s*\n/gm, "");
        let headerArray  = headerString.split('\n');
        headerArray.pop();
        headerArray = [...headerArray];
        resTable.tbody.push(headerArray);

        $(columnSelector, table).each((index, element) => {
            let rowString = $(element).text();
            /*remove blank lines*/
            rowString = rowString.replace(/^\s*\n/gm, "");
            let rowArray  =rowString.split('\n');
            rowArray = [...rowArray];
            /*pop out last empty string*/
            rowArray.pop();
            resTable.tbody.push(rowArray);
        });
        resTable.source = url;
        resolve(resTable);
    })
}

module.exports = getTorontoData;