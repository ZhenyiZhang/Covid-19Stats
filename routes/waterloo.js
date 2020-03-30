const express = require('express');
const router = express.Router();
const waterloo = require('../cities/waterloo');

router.get('/', (req, res) => {
    console.log('get');
    waterloo().then(result => {return res.json(result);})
        .catch(err => {return res.send(err)});
});

module.exports = router;