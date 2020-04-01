const url = 'https://www.niagarahealth.on.ca/site/covid19casereporting';
const rp = require('request-promise');
const $ = require('cheerio');
const splitArray = require('../handlers/splitArray');


async function getNiagaraData() {
    /*get html page*/
    const html = await rp(url).catch(err => console.log(err));
    let tables = [];
    /*selector for tables*/
    const tablesSelector = 'table > tbody';

    return new Promise((resolve, reject) => {
        if($(tablesSelector, html).length === 0) {
            reject(`The data is changed, please visit ${url}`);
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
            tables.push(Array.from(tableArray));
        });
        tables.push(['source', url]);
        resolve(tables);
        reject('something went wrong');
    });
}

module.exports = getNiagaraData;