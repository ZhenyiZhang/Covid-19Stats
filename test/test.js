const waterloo = require('../cities/waterloo');
const york = require('../cities/york');
const niagara = require('../cities/niagara');
const durham = require('../cities/durham');
const peel = require('../cities/peel');
const halton = require('../cities/halton');

function test() {
    waterloo().then(() => console.log('Waterloo OK'))
        .catch(err => console.log('Waterloo Error: ' + err));
    york().then(() => console.log('York OK'))
        .catch(err => console.log('York Error: ' + err));
    niagara().then(() => console.log('Niagara OK'))
        .catch(err => console.log('Niagara Error: ' + err));
    durham().then(() => console.log('Durham OK'))
        .catch(err => console.log('Durham Error: ' + err));
    peel().then(() => console.log('Peel OK'))
        .catch(err => console.log('Peel Error: ' + err));
    halton().then(() => console.log('Halton OK'))
        .catch(err => console.log('Halton Error: ' + err));
}

module.exports = test;