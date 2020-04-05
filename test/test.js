const waterloo = require('../cities/waterloo');
const york = require('../cities/york');
const niagara = require('../cities/niagara');
const durham = require('../cities/durham');
const peel = require('../cities/peel');
const halton = require('../cities/halton');
require('../.env');
const client = require('twilio')(process.env.twilioSid,process.env.twilioToken);

async function test(msgIndicator) {
    Promise.all([testMsg(waterloo,'waterloo'), testMsg(york,'york'),
        testMsg(niagara, 'niagara'), testMsg(durham, 'durham'), testMsg(peel, 'peel'), testMsg(halton, 'halton')])
        .then(result => {
            if(msgIndicator) {
                client.messages.create({
                    to: '+19059218478',
                    from: '+12015089195',
                    body: result.toString()
                }).then(result => console.log(`Test result send by SMS: ${result}`))
                    .catch(err => console.log(err));
            } else {console.log(result)}
        });
}



function testMsg(test, name) {
    return new Promise((resolve) => {
        test()
            .then(() => resolve(`${name} test passed !`))
            .catch(err => resolve(`${name} test failed: ${err} `));
    })
}

module.exports = test;