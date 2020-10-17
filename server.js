const express = require('express');

const app = express();


const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;

// parse incoming string data
app.use(express.urlencoded({ extended: true }));

// parse incoming json data
app.use(express.json());

// use the created api endpoints from apiRoutes folder
app.use('/api', apiRoutes);

app.use('/', htmlRoutes);

// access the public folder for use in our server
// access css/html styling for the homepage
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});