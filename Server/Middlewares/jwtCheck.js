const jwt = require("jsonwebtoken");
const User = require('../Models/UserSchema');

const jwtCheck = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: "Unauthorized. Token not provided or invalid format." });
        }

        const jwtToken = token.replace("Bearer ", "");
        try {
            const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
            const userData = await User.findOne({email:isVerified.email}).select({
                password:0,
            });
            req.user = userData;
            req.token = token;
            req.userId = userData._id;
            next();
        } catch (error) {
            
        }
        
    } catch (error) {
        console.error("Error verifying JWT token:", error);
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
};

module.exports = jwtCheck;
