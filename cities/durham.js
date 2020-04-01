const url = 'https://www.durham.ca/en/health-and-wellness/novel-coronavirus-update.aspx#Status-of-cases-in-Durham-Region';
const rp = require('request-promise');
const $ = require('cheerio');

async function getDurhamData() {
    /*get html page*/
    const html = await rp(url).catch(err => console.log(err));
    /*selector for tables*/
    const tablesSelector = '.icrt-sharedContent > .emphasis-Green';

    return new Promise((resolve, reject) => {
        if($(tablesSelector, html).length === 0) {
            reject(`The data is changed, please visit ${url}`);
        }
        const data = $(tablesSelector, html).text();
        resolve(data + `source + ${url}`);
    });
}

module.exports = getDurhamData;