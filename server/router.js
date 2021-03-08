const { Router } = require("express");
const { authenticateToken } = require("./controllers/auth.js");

const auth = require('./controllers/auth.js');
const user = require("./models/user.js");

const router = Router();

router.post('/login', auth.login )
router.post('/register', auth.register )
router.post('/token', auth.refreshToken)
router.delete("/logout", auth.logout)

router.get('/all', auth.authenticateToken, (req, res)=>{
    res.json(req.user);
});

//////////////////////////////////////////////////////////////////////////////////////////////////
//activities
//////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/activities', auth.authenticateToken, (req,res)=>{
    res.json(req.user.activities);
});
router.post('/activities', auth.authenticateToken, (req, res)=>{
    const user = req.user;
    user.activities.push(req.body);
    user.save().then( user => {
        if (!user) return res.sendStatus(404);
        console.log("dupa");
        res.sendStatus(201);
    }
    );
});
router.delete('/activities/:id', auth.authenticateToken, (req,res)=>{
    const user = req.user;
    const {id} = req.params;
    user.activities = user.activities.filter(activity => activity.id != id);
    user.save().then(user => {
        if(!user) return res.sendStatus(404);
        res.sendStatus(204);
    });

});
router.put('/activities/:id', auth.authenticateToken, (req, res)=>{
    const user = req.user;
    const {id} = req.params;
    const index = user.activities.findIndex(activity => activity.id == id);;
    user.activities.set(index, {...req.body, id: Number(id)}); 
    user.save({runValidators: false}).then(user => {
        if(!user) return res.sendStatus(404);
        res.sendStatus(204);
    }); 
});

module.exports = router;