const { Router } = require("express");

const auth = require('./controllers/auth.js');

const router = Router();

router.get('/', auth.authenticateToken ,(req, res)=>{
    res.send("siemson");
});

router.post('/login', auth.loginPOST )
router.post('/Register', auth.registerPOST )

module.exports = router;