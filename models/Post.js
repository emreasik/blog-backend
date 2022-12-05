const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // author: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tags: {
        type: mongoose.Schema.Types.Array,
        ref: 'Tag'
    }
})

module.exports = mongoose.model('Post', PostSchema);