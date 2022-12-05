const jwt = require("jsonwebtoken");
const APIError = require("../../utils/error");
const User = require("../../models/user");

const checkJwt = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decodedToken.user);
        if (!user) {
            return res.json({ success: false, message: 'Unauthorized access!' });
        }
        req.user = user;
        //console.log(user);
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError")
            throw new APIError("Token date is expired", 401);
        else if (error.name === "JsonWebTokenError")
            throw new APIError("Unvalid Token", 401);
        else
            throw new APIError("Unauthorized Access", 401);
    }
}

module.exports = { checkJwt }
