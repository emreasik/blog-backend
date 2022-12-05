const bcrypt = require('bcrypt');
const { createToken } = require('../utils/auth');
const User = require("../models/user");
const APIError = require("../utils/error");

const saltRounds = 10;

const login = async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    const userInfo = await User.findOne({ email });
    console.log(userInfo);
    if (!userInfo) {
        throw new APIError("Email or password is incorrect", 401);
    }

    const isCompared = await bcrypt.compare(password, userInfo.password);
    console.log(isCompared);
    if (!isCompared) {
        throw new APIError("Email or password is incorrect", 401);
    }

    createToken(userInfo, res);
}

const register = async (req, res) => {
    const { email, userName } = req.body;

    const isUserEmailExist = await User.findOne({ email });
    const isUserNameExist = await User.findOne({ userName });

    if (isUserEmailExist) {
        throw new APIError("Email already used!", 401);
    }

    if (isUserNameExist) {
        throw new APIError("Username already used!", 401);
    }

    req.body.password = await bcrypt.hash(`${req.body.password}`, saltRounds);

    try {
        const userSave = new User(req.body);
        await userSave.save();
        res.status(201).json({
            success: true,
            message: "Account created",
        });
    } catch (error) {
        throw new APIError("Account can't created!", 500);
    }
}

const logout = async (req, res) => {
    if (req.header && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authorization failed!'
            });
        }
        const tokens = req.user.tokens;
        const newTokens = await tokens.filter(t => t.token !== token);
        await User.findByIdAndUpdate(req.user._id, { tokens: [] })
        res.json({
            success: true,
            message: 'Logout successfully!'
        });
    }
}

module.exports = { login, register, logout }