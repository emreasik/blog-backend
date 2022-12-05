const express = require('express')
const router = express.Router();

const authRoute = require('./authRoute');
const postRoute = require('./postsRoute');
const contactRoute = require('./contactRoute');
const tagRoute = require('./tagRoute');
const userRoute = require('./userRoute');

router.use(authRoute, postRoute, contactRoute, tagRoute, userRoute);

module.exports = router