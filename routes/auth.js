const router = require("express").Router();
const jwt = require('jsonwebtoken');

router.post("/login", (req, res) => {
  if(!req.body.username || !req.body.password)
  res.status(400).json({success:false,error:"username or password field is empty"})
  if(req.body.username !== process.env.ADMIN || req.body.password !== process.env.PASSWORD)
  res.status(400).json({success:false,error:"username or password is incorrect"})

  const token = jwt.sign({username : process.env.ADMIN},process.env.TOKEN_SECRET,{expiresIn:'2h'});
  res.header('auth-token',token).status(200).json({success:true,token:token})
});

module.exports = router;
 