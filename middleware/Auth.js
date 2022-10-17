const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;


const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (token) {
            const user = jwt.verify(token, SECRET_KEY);
            req.email = user.email;
            req.id = user._id;
        }
        else {
            return res.status(401).json({ message: "token not provided.! " })
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized User" })
    }
}

module.exports = auth;