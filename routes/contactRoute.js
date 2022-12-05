const express = require('express')
const { createMessage, getMessages } = require('../controllers/contactController');
const { checkJwt } = require('../middlewares/auth/jwtHandler');

const router = express.Router();

router.post('/contact', createMessage);
router.get('/contact/messages', checkJwt, getMessages);

module.exports = router;