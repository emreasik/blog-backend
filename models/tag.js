const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    tagName: { type: String, required: true, trim: true, unique: true },
    posts: [
        {
            type: mongoose.Schema.Types.Array,
            ref: 'Post'
        }
    ]
})

module.exports = mongoose.model('Tag', TagSchema);
