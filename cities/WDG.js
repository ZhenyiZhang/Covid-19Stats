const url = 'https://app.powerbi.com/view?r=eyJrIjoiZjZhMjM5ZTAtMmVhNS00ODEwLWE1ZjUtMTJkNzVkMGZkODhmIiwidCI6IjA5Mjg0MzdlLTFhZTItNGJhNy1hZmQxLTY5NDhmY2I5MWM0OCJ9';

function getWDGdata() {
    return new Promise((resolve, reject) => {
        reject(url);
    });
}

module.exports = getWDGdata;
