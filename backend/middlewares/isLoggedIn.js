const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const owerModel = require("../models/owner-model");
const blacklistTokenModel = require("../models/blacklistToken-model");
 
module.exports.isloggedIn = async function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
 
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ 
                message: "Unauthorized - No token provided" 
            });
        }
 
        const token = authHeader.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ 
                message: 'Unauthorized access - Invalid token format' 
            });
        }
 
        // Check if token is blacklisted
        const isBlacklisted = await blacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ 
                message: 'Token has been revoked. Please login again.' 
            });
        }
 
        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log("✅ Token verified for user:", decoded._id);
 
        // Find user
        const user = await userModel.findById(decoded._id);
        
        if (!user) {
            return res.status(401).json({ 
                message: 'User not found. Please login again.' 
            });
        }
 
        // Attach user to request object
        req.user = user;
        next();
 
    } catch (err) {
        console.error("❌ Auth middleware error:", err.message);
        
        // Handle different JWT errors
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                message: 'Invalid token. Please login again.' 
            });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: 'Token expired. Please login again.' 
            });
        }
 
        return res.status(401).json({ 
            message: 'Authentication failed. Please login again.' 
        });
    }
};
 
module.exports.authOwer = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
 
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ 
                message: "Unauthorized - No token provided" 
            });
        }
 
        const token = authHeader.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ 
                message: 'Unauthorized access - Invalid token format' 
            });
        }
 
        // Check if token is blacklisted
        const isBlacklisted = await blacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ 
                message: 'Token has been revoked.' 
            });
        }
 
        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log("✅ Owner token verified for:", decoded._id);
 
        // Find owner
        const Owner = await owerModel.findById(decoded._id);
        
        if (!Owner) {
            return res.status(401).json({ 
                message: 'Owner not found.' 
            });
        }
 
        // Attach owner to request object
        req.Owner = Owner;
        next();
 
    } catch (err) {
        console.error("❌ Owner auth error:", err.message);
        
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                message: 'Invalid token.' 
            });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: 'Token expired.' 
            });
        }
 
        return res.status(401).json({ 
            message: 'Authentication failed.' 
        });
    }
};
