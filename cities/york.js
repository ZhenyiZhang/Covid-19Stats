const url = 'https://ww4.yorkmaps.ca/COVID19/PublicCaseListing/TableListingExternalData.csv';
const rp = require('request-promise');

function getYorkData() {
    return new Promise(async (resolve, reject) => {
        /*get csv data from url*/
        let tableString = await rp(url).catch(err => {reject(err)});
        /*remove all quotes*/
        tableString = tableString.replace(/['"]+/g, '');
        /*split string into array*/
        let tableArray = tableString.split('\n');

        let response = [];
        tableArray.forEach( table => {
            const row = table.split(',');
            response.push(Array.from(row));
        });
        response.push(['source', url]);
        resolve(response);
        reject('Something went wrong');
    });
}

module.exports = getYorkData;