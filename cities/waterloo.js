const url = 'https://www.regionofwaterloo.ca/en/health-and-wellness/positive-cases-in-waterloo-region.aspx';
const rp = require('request-promise');
const $ = require('cheerio');
const splitArray = require('../handlers/splitArray');


async function getWaterlooData() {
    let tables = [];
    /*selector for tables*/
    const tablesSelector = '.datatable > tbody';

    return new Promise(async(resolve, reject) => {
        /*get html page*/
        const html = await rp(url).catch(err => reject(err));

        if($(tablesSelector, html).length === 0) {
            reject(`The data is changed, please visit ${url}`);
        }
        /*get all tables in the page*/
        $(tablesSelector, html).each(
            (index, element) => {
                let tableString = $(element).text();
                /*calculate the number of columns*/
                const columns = $('tr > td',element.children[1]).length;
                /*remove blank lines*/
                tableString = tableString.replace(/^\s*\n/gm, "");
                /*convert into array*/
                let tableArray = tableString.split('\n');
                /*split into array format tables*/
                tableArray = splitArray(tableArray, columns);
                tables.push(Array.from(tableArray));
            });
        tables.push(['source', url]);
        resolve(tables);
        reject('something went wrong');
    });
}

module.exports = getWaterlooData;
