const { Router } = require("express");

const auth = require('./controllers/auth.js');

const router = Router();

router.get('/', auth.authenticateToken ,(req, res)=>{
    res.send("siemson");
});

router.post('/login', auth.login )
router.post('/Register', auth.register )
router.post('/token', auth.refreshToken)
router.delete("/logout", auth.logout)

module.exports = router;