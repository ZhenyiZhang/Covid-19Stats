const rp = require('request-promise');
const $ = require('cheerio');
const splitArray = require('../handlers/splitArray');


function tableScrape (tableSelector, titleSelector, url) {
    return new Promise (async (resolve, reject) => {
        let tables = [];
        const htmlPage = await rp;
        $(tableSelector, htmlPage).each((element, index) => {
            let table = [];
            $('td')
        });
    })
}