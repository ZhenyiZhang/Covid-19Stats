const url = 'https://www.niagarahealth.on.ca/site/covid19casereporting';
const rp = require('request-promise');
const $ = require('cheerio');
const splitArray = require('../handlers/splitArray');


function getNiagaraData() {
    let tables = {};
    tables.tables = [];
    /*selector for tables*/
    const tablesSelector = 'table > tbody';
    return new Promise(async(resolve, reject) => {
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
            let tableArray = [];
            /*calculate the number of columns*/
            const columns = $('tr > td',element.children[1]).length;
            $('tr > td',element).each((index, row) =>  {
                tableArray.push($(row).text());
            });
            /*split into array format tables*/
            tableArray = splitArray(tableArray, columns);
            let table = {};
            table.tbody = tableArray;
            tables.tables.push(table);
        });
        tables.source = url;
        resolve(tables);
        reject('something went wrong');
    });
}

module.exports = getNiagaraData;