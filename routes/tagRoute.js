const express = require('express')
const { createTag, getTags, updateTagWithProduct } = require('../controllers/tagController');

const router = express.Router();

router.get('/tags', getTags);
router.post('/tag', createTag);
router.post('/tag/update/:tagId/:postId', updateTagWithProduct);

module.exports = router;