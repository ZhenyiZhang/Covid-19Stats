const url = 'https://www.halton.ca/For-Residents/Immunizations-Preventable-Disease/Diseases-Infections/New-Coronavirus';
const rp = require('request-promise');
const $ = require('cheerio');
const splitArray = require('../handlers/splitArray');


function getHaltonData() {
    let tables = [];
    /*selector for tables*/
    const tablesSelector = '.col-md-6';

    return new Promise(async(resolve, reject) => {
        /*get html page*/
        const html = await rp(url).catch(err => reject(err));
        if($(tablesSelector, html).length === 0) {
            reject(`The data is changed, please visit ${url}`);
        }
        $(tablesSelector, html).each((index, element) => {
            let table = [];
            /*calculate column size*/
            const columns = $('tr > th', element).length;
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
            table.push(title);
            table.push(tableArray);
            tables.push(table);
        });
        tables.push(['source', url]);
        resolve(tables);
        reject('something went wrong');
    });
}

module.exports = getHaltonData;