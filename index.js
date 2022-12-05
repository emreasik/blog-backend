require("express-async-errors")
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
require('dotenv').config();

const router = require('./routes');
const dbConnection = require('./Database/database');
const errorHandlerMiddleware = require('./middlewares/errorHandler');

const port = process.env.PORT || 8001

const StartServer = async () => {

    const app = express();

    await dbConnection()

    app.use(cors());
    app.use(bodyParser.json());

    app.use('/api', router);

    //Catch Error
    app.use(errorHandlerMiddleware);

    app.listen(port, () => {
        console.log(`Listening to port ${port}`);
    })
}

StartServer();