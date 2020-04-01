const express = require('express');
const router = express.Router();
const waterloo = require('../cities/waterloo');
const york = require('../cities/york');

router.get('/waterloo', (req, res) => {
    waterloo().then(result => {return res.json(result);})
        .catch(err => {return res.send(err)});
});

router.get('/york', (req, res) => {
    york().then(result => {return res.json(result);})
        .catch(err => {return res.send(err)});
});

module.exports = router;