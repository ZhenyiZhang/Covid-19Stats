const url = 'https://www.regionofwaterloo.ca/en/health-and-wellness/positive-cases-in-waterloo-region.aspx';
const getHTML = require('request-promise');
const $ = require('cheerio');
const splitArray = require('../handlers/splitArray');


async function getWaterlooData() {
    /*get html page*/
    const html = await getHTML(url).catch(err => console.log(err));

    let tables = [];

    return new Promise((resolve, reject) => {
        /*get all tables in the page*/
        $('.datatable > tbody', html).each(
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
        resolve(tables);
        reject('something went wrong');
    });
}

module.exports = getWaterlooData;
