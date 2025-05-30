const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {   // Added space for 'Bearer '
        return res.status(401).json({ message: 'Unauthorized verifying' });
    }

    const token = authHeader.split(' ')[1];

   jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });

        // Confirm that 'decoded' has 'UserInfo'
        if (!decoded?.UserInfo) {
            return res.status(401).json({ message: 'Invalid token structure' });
        }

        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;

        next();
    }
);

};

module.exports = verifyJWT;
