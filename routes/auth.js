const router = require('express').Router();

router.post('/authenticate',(req,res)=> {
    res.send('auth');
})

module.exports = router;