const jwt = require('jsonwebtoken');
require("dotenv").config();



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
    loginPOST(req, res){
        const {userId} = req.body;
        // console.log(req);
        const accessToken = jwt.sign({userId}, process.env.AccessTokenSecret, {expiresIn: '15s'});
        const refreshToken = jwt.sign({userId}, process.env.RefreshTokenSecret);
        res.json({accessToken, refreshToken});
    },
    registerPOST(req, res){

    },
};