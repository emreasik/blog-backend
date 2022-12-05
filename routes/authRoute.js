const express = require('express')
const { login, register, logout } = require('../controllers/authController');
const { checkJwt } = require('../middlewares/auth/jwtHandler');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', checkJwt, logout);

module.exports = router;