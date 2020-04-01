const express = require('express');
const router = express.Router();
const waterloo = require('../cities/waterloo');
const york = require('../cities/york');
const niagara = require('../cities/niagara');
const durham = require('../cities/durham');
const peel = require('../cities/peel');
const halton = require('../cities/halton');

router.get('/:city', (req, res) => {
    switch(req.params.city) {
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