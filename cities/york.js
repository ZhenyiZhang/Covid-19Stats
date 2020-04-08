const url = 'https://ww4.yorkmaps.ca/COVID19/PublicCaseListing/TableListingExternalData.csv';
const rp = require('request-promise');

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
        /*add source*/
        table.source = url;
        resolve(table);
        reject('Something went wrong');
    });
}

module.exports = getYorkData;
