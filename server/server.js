/**
 * Created by Salman on 12/18/2017.
 */
require('./config/config');

const path = require('path');
const publicPath = path.join(__dirname, '../public');

const express = require('express');
const bodyParser = require('body-parser');

var app = express();
const port = process.env.PORT;

app.use(express.static(publicPath));

app.listen(port, ()=>{
    console.log(`App is started on port ${port}`);
});

module.exports = {app};