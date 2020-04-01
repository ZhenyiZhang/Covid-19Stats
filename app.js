const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cityRoutes = require('./routes/cities');
const PORT = 5000;

/*bodyParser and cors*/
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* set up routes */
app.use('/api', cityRoutes);

/*listen on port*/
const port = process.env.PORT || PORT;
app.listen(port, () => console.log('server started on port ' + PORT));

