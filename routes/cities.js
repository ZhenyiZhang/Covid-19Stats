const express = require('express');
const router = express.Router();
const waterloo = require('../cities/waterloo');
const york = require('../cities/york');
const niagara = require('../cities/niagara');
const durham = require('../cities/durham');
const peel = require('../cities/peel');
const halton = require('../cities/halton');
const cities = require('../data/municipalities');

router.get('/:city', (req, res) => {
    let city = req.params.city.toLowerCase();
    let flag = false;

    /*Check if city is municipality name*/
    if(!cities.hasOwnProperty(city)) {
        /*search city/town/municipality*/
        for(let key in cities) {
            if(cities.hasOwnProperty(key)) {
                cities[key].forEach(element => {
                    const fullName = element.toLowerCase();
                    if(fullName.includes(city)) {
                        city = key;
                        flag = true;
                    }
                });
            }
        }
    }

    /*cannot find any matches*/
    if(!flag) res.status(200).send('The area is not included');

    switch(city) {
        case 'waterloo':
            waterloo().then(result => {return res.json(result);})
                .catch(err => {return res.status(400).send(err)});
            break;
        case 'york':
            york().then(result => {return res.json(result);})
                .catch(err => {return res.status(400).send(err)});
            break;
        case 'niagara':
            niagara().then(result => {return res.json(result);})
                .catch(err => {return res.status(400).send(err)});
            break;
        case 'durham':
            durham().then(result => {return res.json(result);})
                .catch(err => {return res.status(400).send(err)});
            break;
        case 'peel':
            peel().then(result => {return res.json(result);})
                .catch(err => {return res.status(400).send(err)});
            break;
        case 'halton':
            halton().then(result => {return res.json(result);})
                .catch(err => {return res.status(400).send(err)});
            break;

    }
});

module.exports = router;