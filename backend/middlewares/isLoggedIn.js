const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const owerModel = require("../models/owner-model");
const blacklistTokenModel = require("../models/blacklistToken-model");

module.exports.isloggedIn = async function (req, res, next) {
 const token = req.headers['authorization']?.split(' ')[1] || req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access.' });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized access.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log(decoded)
        const user = await userModel.findById(decoded._id);
        console.log(user);
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'Unauthorized access.' });
    }
};

module.exports.authOwer = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized access.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log(decoded._id)
        const Ower = await owerModel.findById(decoded._id);
        console.log(Ower);
        req.Ower = Ower;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Unauthorized access..' });
    }
}