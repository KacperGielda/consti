const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const RefreshToken = require("../models/refreshToken.js");
const User = require("../models/user");
require("dotenv").config();

const generateAccessToken = (userId)=>{
    return jwt.sign({userId}, process.env.AccessTokenSecret, {expiresIn: '15m'});
}
const generateRefreshToken = (userId, callback)=>{
    const refreshToken = jwt.sign({userId}, process.env.RefreshTokenSecret);
    RefreshToken.create({token: refreshToken}, err => callback(err, refreshToken));
}

module.exports = {
    authenticateToken(req, res, next){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.sendStatus(401);
        jwt.verify(token, process.env.AccessTokenSecret, async(err,data)=>{
            if (err) return res.sendStatus(403);
            req.user = await User.findById(data.userId).exec();
            next();
    });
    },
    async login(req, res,){
        const {login, password} = req.body;
        const user = await User.findOne({login}).exec();
        if (!user || !(await bcrypt.compare(password, user.password))) return res.sendStatus(403);
        const accessToken = generateAccessToken(user._id);
        generateRefreshToken(user._id, (err, refreshToken) => {
            if(err && !refreshToken) return res.sendStatus(403);
            return res.json({accessToken, refreshToken});
        });
        
    },
    async register(req, res){
        const userInput = req.body;
        let user;
        try{
            user = await User.create(userInput);    
        } catch(err){
            if (err) return res.json(err);
        }
            accessToken = generateAccessToken(user._id);
            generateRefreshToken(user._id, (err, refreshToken) => {
                if(err && !refreshToken) {
                    console.log(refreshToken, err);
                    return  res.sendStatus(401);
                }
                return res.json({accessToken, refreshToken});
            });
    },
    async refreshToken(req, res){
        const {refreshToken} = req.body;    
        if(!refreshToken) return res.sendStatus(401);
        if((await RefreshToken.find({token: refreshToken}).exec()).length == 0) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.RefreshTokenSecret, (err, user)=>{
            const accessToken = generateAccessToken(user.userId);
            res.json({accessToken});
        });
    },
    logout(req, res){
        const {refreshToken} = req.body;
        RefreshToken.deleteOne({token: refreshToken}, (err => {
            if (err) return res.sendStatus(404);
            else return res.sendStatus(204);
        }))

    }
};