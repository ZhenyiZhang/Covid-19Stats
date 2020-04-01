const express = require('express');
const router = express.Router();
const waterloo = require('../cities/waterloo');
const york = require('../cities/york');
const niagara = require('../cities/niagara');

router.get('/:city', (req, res) => {
    const city = req.params.city;
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

    }

});

module.exports = router;