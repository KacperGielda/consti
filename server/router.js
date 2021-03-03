const { Router } = require("express");

const router = Router();

router.get('/', (req, res)=>{
    res.send("siemson");
});

const auth = require('./controllers/auth.js');
router.post('/login', auth.loginPOST )
router.post('/Register', auth.registerPOST )

module.exports = router;