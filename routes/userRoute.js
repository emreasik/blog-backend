const express = require('express')
const { getUserWithToken, updateUser } = require('../controllers/userController');
const { checkJwt } = require('../middlewares/auth/jwtHandler');

const router = express.Router();

router.get('/user', checkJwt, getUserWithToken);
router.post('/user/update', checkJwt, updateUser);

module.exports = router;