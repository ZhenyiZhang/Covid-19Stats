const url = 'https://ww4.yorkmaps.ca/COVID19/PublicCaseListing/TableListingExternalData.csv';
const rp = require('request-promise');

async function getYorkData() {
    /*get csv data from url*/
    let tableString = await rp(url);
    return new Promise((resolve, reject) => {
        /*remove all quotes*/
        tableString = tableString.replace(/['"]+/g, '');
        /*split string into array*/
        let tableArray = tableString.split('\n');

        let response = [];
        tableArray.forEach( table => {
            const row = table.split(',');
            response.push(Array.from(row));
        });
        resolve(response);
        reject('Something went wrong');
    });
}

module.exports = getYorkData;
