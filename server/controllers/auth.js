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
        const {userName} = req.body;
        // console.log(req);
        const accessToken = jwt.sign(userName, process.env.AccessTokenSecret);
        res.json({accessToken});
    },
    registerPOST(req, res){

    },
};