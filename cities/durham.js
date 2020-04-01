const url = 'https://www.durham.ca/en/health-and-wellness/novel-coronavirus-update.aspx#Status-of-cases-in-Durham-Region';
const rp = require('request-promise');
const $ = require('cheerio');

function getDurhamData() {
    /*selector for tables*/
    const tablesSelector = '.icrt-sharedContent > .emphasis-Green';

    return new Promise(async(resolve, reject) => {
        /*get html page*/
        const html = await rp(url).catch(err => reject(err));

        if($(tablesSelector, html).length === 0) {
            reject(`The data is changed, please visit ${url}`);
        }
        const data = $(tablesSelector, html).text();
        resolve(data + `source + ${url}`);
    });
}

module.exports = getDurhamData;