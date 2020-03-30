const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const waterlooRoute = require('./routes/waterloo');
const PORT = 5000;

/*bodyParser and cors*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* set up routes */
app.use('/api/waterloo', waterlooRoute);

/*listen on port*/
const port = process.env.PORT || PORT;
app.listen(port, () => console.log('server started on port ' + PORT));

