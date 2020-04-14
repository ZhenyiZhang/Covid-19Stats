const url = 'https://ww4.yorkmaps.ca/COVID19/PublicCaseListing/TableListingExternalData.csv';
const summaryURL = 'https://www.york.ca/covid19';
const rp = require('request-promise');
const $ = require('cheerio');

function getYorkData() {
    return new Promise(async (resolve, reject) => {
        /*set up response table object*/
        let table = {};
        table.title = 'York Region Covid-19 Cases';
        table.tbody = [];
        /*if the promise takes more than 5 seconds to resolve, reject immediately*/
        setTimeout(() => {
            reject('The process has been taking too long');
        }, 5000);
        /*get csv data from url*/
        let tableString = await rp(url).catch(err => {reject(err)});
        /*remove all quotes*/
        tableString = tableString.replace(/['"]+/g, '');
        /*split string into array*/
        let tableArray = tableString.split('\n');
        /*insert rows of the table*/
        tableArray.forEach( element => {
            const row = element.split(',');
            table.tbody.push(Array.from(row));
        });
        table.summary = [];
        table.summary.push(['total', table.tbody.length]);
        table.summary.push(['Female', (tableString.match(/Female/g) || []).length]);
        table.summary.push(['Male', (tableString.match(/Male/g) || []).length]);
        table.summary.push(['20s', (tableString.match(/20s/g) || []).length]);
        table.summary.push(['30s', (tableString.match(/30s/g) || []).length]);
        table.summary.push(['40s', (tableString.match(/40s/g) || []).length]);
        table.summary.push(['50s', (tableString.match(/50s/g) || []).length]);
        table.summary.push(['60s', (tableString.match(/60s/g) || []).length]);
        table.summary.push(['70s', (tableString.match(/70s/g) || []).length]);
        table.summary.push(['80s', (tableString.match(/80s/g) || []).length]);
        table.summary.push(['90s', (tableString.match(/90s/g) || []).length]);
        table.summary.push(['100s', (tableString.match(/100s/g) || []).length]);
        /*add source*/
        table.source = url;
        resolve(table);
        reject('Something went wrong');
    });
}

module.exports = getYorkData;
