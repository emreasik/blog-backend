const express = require('express')
const { getPosts, getPostsByLimit, createPost, getPostById } = require('../controllers/postsController');
const { checkJwt } = require('../middlewares/auth/jwtHandler');

const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/:limit', getPostsByLimit);
router.get('/post/:id', getPostById); // UPDATE /POSTS
router.post('/post', checkJwt, createPost);

module.exports = router; 

