const url = 'https://app.powerbi.com/view?r=eyJrIjoiNDZkYzgzN2YtNGM2Yi00ZTQ0LTkzOTUtY2IwOTlhNzlmMWE2IiwidCI6IjUyZDdjOWMyLWQ1NDktNDFiNi05YjFmLTlkYTE5OGRjM2YxNiJ9';
const rp = require('request-promise');
const $ = require('cheerio');

function getDurhamData() {
    /*selector for tables*/
    const tablesSelector = '.icrt-sharedContent > .emphasis-Green';

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
        const data = $(tablesSelector, html).text();
        resolve(data + `source + ${url}`);
    });
}

module.exports = getDurhamData;