const User = require('../models/user');
const APIError = require("../utils/error");

const getUserWithToken = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token", token);
    console.log("ss");
    console.log(req.user);
    const user = {
        userName: req.user.userName,
        name: req.user.name,
        lastName: req.user.lastName,
        email: req.user.email
    }
    res.json(user);
};

const updateUser = async (req, res) => {
    //TODO bu kodda, duplicate'i fixle mesela res ve findIf
    const userId = req.user._id;
    console.log(userId);
    console.log(req.body);
    if (req.body.userName === req.user.userName) {
        const update = {
            name: req.body.name,
            lastName: req.user.lastName,
        };

        const user = await User.findByIdAndUpdate(userId, update, { new: true });
        console.log("u", user);
        res.status(200).json({
            success: true,
            message: "User updated",
            email: user.email,
            userName: user.userName,
            name: user.name,
            lastName: user.lastName
        });
    } else {
        const update = {
            userName: req.body.userName,
            name: req.body.name,
            lastName: req.body.lastName,
        };
        const isUserNameExist = await User.findOne({ userName: update.userName });
        console.log("is", isUserNameExist);
        if (isUserNameExist) {
            throw new APIError("Username already exist!", 403);
        } else {
            const user = await User.findByIdAndUpdate(userId, update, { new: true });
            //console.log("inside else user", user);
            res.status(200).json({
                success: true,
                message: "User updated",
                email: user.email,
                userName: user.userName,
                name: user.name,
                lastName: user.lastName
            });
        }
    }

}

module.exports = { getUserWithToken, updateUser };
