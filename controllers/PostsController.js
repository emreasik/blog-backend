const Post = require('../models/post');
const APIError = require('../utils/error');
const updateTagWithProduct = require('../controllers/tagController');
const userDal = require('../dal/User/userDal');
const postDal = require('../dal/Post/postDal');
const tagDal = require('../dal/Tag/tagDal');

const createPost = async (req, res) => {
    const userId = req.user._id;
    var tags = req.body.tags;
    // tags.forEach(tag => {
    //     var tag = tagDal.findById(tag._id);
    //     tags.push(tag);
    // });
    console.log("tags", tags);
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user._id,
        tags: tags
    });
    await postDal.create(post);
    const result = await userDal.findById(userId);
    result.posts.push(post);
    await result.save();
    for (var i = 0; i < tags.length; i++) {
        var tag = await tagDal.findById(tags[i]);
        tag.posts.push(post);
        await tag.save();
    }
    res.json(post);
}

const getPosts = (req, res) => {
    Post.find()
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => {
            res.json(err);
        })
};

const getPostsByLimit = (req, res) => {
    Post.find().limit(req.params.limit)
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => {
            res.json(err);
        })
};

const getPostById = (req, res) => {
    Post.findById(req.params.id).then((post) => {
        // TODO BURDA AGGREGATE olacak 
        res.json(post);
    }).catch(() => {
        let message = "Item Not Found"
        return res.status(404).json({
            success: false,
            message: message,
        });
    })
};

module.exports = { createPost, getPosts, getPostsByLimit, getPostById };