const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    nameSurname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Contact', ContactSchema);