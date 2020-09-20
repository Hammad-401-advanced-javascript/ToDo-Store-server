'use strict';

require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();

// require middleware

const timeStam = require('../middleware/timestamp');
const logReq = require('../middleware/logger');
const notFound = require('../middleware/404');
const errorHandler = require('../middleware/500');
const todo = require('../routes/todo');
const user = require('../routes/router');
const product = require('../routes/product');

app.use(express.json());
app.use(cors());

// use Middleware
app.use(timeStam.requestTime, logReq);
app.use(todo);
app.use(user);
app.use(product);


// Error Functions
app.use('*', notFound);
app.use(errorHandler);


module.exports = {
    server: app,
    start: () => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Listen on PORT ${PORT}`)
        })
    }
}

