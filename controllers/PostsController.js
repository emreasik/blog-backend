const express = require('express');
const Post = require('../models/Post');

const createPost = (req, res) => {
    //console.log(req.body);
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });
    post.save();
    res.json(post);
}

const getPost = (req, res) => {
    Post.find()
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => {
            res.json(err);
        })
};

module.exports = { createPost, getPost };