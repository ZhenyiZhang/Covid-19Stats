const waterloo = require('../cities/waterloo');
const york = require('../cities/york');
const niagara = require('../cities/niagara');
const durham = require('../cities/durham');
const peel = require('../cities/peel');
const halton = require('../cities/halton');
const SID = process.env.twilioSid;
const token = process.env.twilioToken;

function testRoutes() {
    Promise.all(
        [testMsg(waterloo,'waterloo'), testMsg(york,'york'),
                testMsg(niagara, 'niagara'), testMsg(durham, 'durham'),
                testMsg(peel, 'peel'), testMsg(halton, 'halton')])
        .then(result => {
            if(SID && token) {
                const client = require('twilio')(SID,token);
                client.messages.create({
                    to: '+19059218478',
                    from: '+12015089195',
                    body: result.toString()})
                    .then(result => console.log(`Test result send by SMS: ${result}`))
                    .catch(err => console.log(err));
            }
            console.log(result);
        });
}


function testMsg(test, name) {
    return new Promise((resolve) => {
        test()
            .then(() => resolve(`${name} test passed !`))
            .catch(err => resolve(`${name} test failed: ${err} `));
    })
}

module.exports = testRoutes;