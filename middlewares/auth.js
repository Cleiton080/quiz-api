const jwt = require("jsonwebtoken");

function auth (req, res, next) {
    const accessToken = req.headers["x-access-token"];
    const token = accessToken 
        && accessToken.startsWith("Bearer ") 
        && accessToken.replace(/Bearer /, '');

    if(!token) {
        res.status(400).json({ message: "Request was missing the 'x-access-token' parameter." });
    } else {
        jwt.verify(token, "private_key", (err, decoded) => {
            if(err) {
                res.status(401).json({ message: "Request Unauthorized!"});
            } else {
                req.auth = decoded.auth;
                next();
            }
        });
    }
}

module.exports = auth;