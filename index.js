const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const postsRouter = require('./routes/PostsRoute');
const dbConnection = require('./services/Database');

const StartServer = async () => {

    const app = express();

    await dbConnection()

    const port = 8000;

    app.use(bodyParser.json());

    app.use('/posts', postsRouter);

    app.listen(port, () => {
        console.log(`Listening to port ${port}`);
    })
}

StartServer();