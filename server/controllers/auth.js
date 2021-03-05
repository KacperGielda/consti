const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
const RefreshToken = require("../models/refreshToken.js");
require("dotenv").config();

const generateAccessToken = (userId)=>{
    return jwt.sign({userId}, process.env.AccessTokenSecret, {expiresIn: '25s'});
}

module.exports = {
    authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.AccessTokenSecret, (err,user)=>{
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
    },
    login(req, res){
        const {userId} = req.body;
        // console.log(req);
        // const accessToken = jwt.sign({userId}, process.env.AccessTokenSecret, {expiresIn: '15s'});
        const accessToken = generateAccessToken(userId);
        const refreshToken = jwt.sign({userId}, process.env.RefreshTokenSecret);
        RefreshToken.create({token: refreshToken}, (err)=>{
            if(err && !refreshToken) return res.sendStatus(401);
            return res.json({accessToken, refreshToken});
            
        })
    },
    register(req, res){

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