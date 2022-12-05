const Tag = require('../models/tag');

const createTag = (req, res) => {
    console.log(req.body);
    const tag = new Tag({
        tagName: req.body.tagName,
    });
    tag.save();
    res.json(tag);
};

const updateTagWithProduct = async (req, res) => {
    console.log(req.params);
    const tag = await Tag.findById(req.params.tagId);
    tag.posts.push(req.params.postId);
    await tag.save();
    res.json(tag);
};



const getTags = (req, res) => {
    Tag.find()
        .then((tags) => {
            res.json(tags);
        })
        .catch((err) => {
            res.json(err);
        })
};

module.exports = { createTag, updateTagWithProduct, getTags };
