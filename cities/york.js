const url = 'https://ww4.yorkmaps.ca/COVID19/PublicCaseListing/TableListingExternalData.csv';
const rp = require('request-promise');

function getYorkData() {
    return new Promise(async (resolve, reject) => {
        /*Set up response msg*/
        let response = {};
        response.title = 'York Region Covid-19 Cases';
        response.tbody = [];
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
        tableArray.forEach( table => {
            const row = table.split(',');
            response.tbody.push(Array.from(row));
        });
        response.source = url;
        resolve(response);
        reject('Something went wrong');
    });
}

module.exports = getYorkData;
