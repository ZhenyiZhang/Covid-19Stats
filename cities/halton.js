const url = 'https://www.halton.ca/For-Residents/Immunizations-Preventable-Disease/Diseases-Infections/New-Coronavirus';
const rp = require('request-promise');
const $ = require('cheerio');
const splitArray = require('../handlers/splitArray');


function getHaltonData() {
    let tables = {};
    tables.tables = [];
    /*selector for tables*/
    const tablesSelector = 'div > .table-responsive';
    const columnSelector = 'th > span';

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
            let table = {};
            /*calculate column size*/
            const columns = $(columnSelector, element).length;
            /*extract the title*/
            const title = $('h3', element).text();
            /*get the whole table in string type*/
            let tableString = $(element).text();
            /*remove title(it is not a part of the format of table)*/
            tableString = tableString.replace(title, '');
            /*remove blank lines*/
            tableString = tableString.replace(/^\s*\n/gm, "");
            /*convert string to array*/
            let tableArray = tableString.split('\n');
            /*remove unnecessary white space*/
            tableArray = tableArray.map(x => {return x.trim()});
            /*re-format the array into table*/
            tableArray = splitArray(tableArray, columns);
            /*put back the title*/
            table.title = title;
            table.tbody = tableArray;
            tables.tables.push(table);
        });
        tables.source = url;
        resolve(tables);
        reject('something went wrong');
    });
}

module.exports = getHaltonData;