const Contact = require('../models/contact');
const APIError = require("../utils/error");

const createMessage = (req, res) => {
    console.log(req.body);
    const msg = new Contact({
        nameSurname: req.body.nameSurname,
        email: req.body.email,
        message: req.body.message
    });
    msg.save();
    res.json(msg);
};

const getMessages = (req, res) => {
    const email = req.user.email;
    //console.log("res",userId);
    if (email === "emre2_e2000@hotmail.com") {
        Contact.find()
            .then((msgs) => {
                console.log(msgs);
                res.json(msgs);
            })
            .catch((err) => {
                res.json(err);
            })
    } else {
        throw new APIError("Authorization Failed", 401);
    }

};

module.exports = { createMessage, getMessages };
