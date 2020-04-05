const url = 'https://www.regionofwaterloo.ca/en/health-and-wellness/positive-cases-in-waterloo-region.aspx';
const rp = require('request-promise');
const $ = require('cheerio');
const splitArray = require('../handlers/splitArray');


function getWaterlooData() {
    let tables = [];
    /*selector for tables*/
    const tablesSelector = '.datatable > tbody';

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
        tables.push({'source': url});
        resolve(tables);
        reject('something went wrong');
    });
}

module.exports = getWaterlooData;
