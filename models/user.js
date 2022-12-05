const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: { type: String, required: true, trim: true },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    // tokens: [
    //     {
    //         type: Object
    //     }
    // ],
    posts: [
        {
            type: mongoose.Schema.Types.Array,
            ref: 'Post'
        }
    ]
})

// function validateUser(user) {
//     const schema = {
//         email: Joi.string().min(5).max(255).required().email(),
//         password: Joi.string().min(5).max(255).required()
//     };
//     return Joi.validate(user, schema);
// }

// module.exports = { validateUser };
module.exports = mongoose.model('User', UserSchema);