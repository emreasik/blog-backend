const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createToken = async (user, res) => {
    // console.log(user);
    const payload = {
        user: user._id,
        email: user.email,
        userName: user.userName
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // let oldTokens = user.tokens || [];

    // if (oldTokens.length) {
    //     oldTokens = oldTokens.filter(token => {
    //         const timeDiff = (Date.now() - parseInt(token.signedAt)) / 1000;
    //         if (timeDiff < 86400) {
    //             return token;
    //         }
    //     })
    // }

    // await User.findByIdAndUpdate(user._id, { tokens: [...oldTokens, { token: token, signedAt: Date.now().toString() }] })

    return res.status(201).json({
        success: true,
        token,
        message: "Successed"
    });
}

module.exports = {
    createToken,
}