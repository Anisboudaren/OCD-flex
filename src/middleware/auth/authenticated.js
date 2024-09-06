
const YouCanAccount = require("../../models/youcan-account")
const zrAccount = require("../../models/zr-account")

const  isAuth = (req , res , next) => {
    if(req.user) next()
    else res.send("please log in first !").status(401)
}
const isYoucanAuth = async (req , res , next) => {
    try {
    const youCanAccount = await YouCanAccount.findOne({ userId: req.user.id });
    if (youCanAccount && youCanAccount.token) {
      req.authToken = youCanAccount.token
      return next()
    }
    return res.status(401).send({ message: "Please add your YouCan account in the settings." });
  } catch (error) {
    
    console.error("Error checking YouCan authentication:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
}

const isZrAuth = async (req , res , next) => {
  try {
    const zr = await zrAccount.findOne({ userId: req.user.id });
    
    if (zr && zr.token) {
      req.token = zr.token
      req.key = zr.key
      return next()
    }
    return res.status(401).send({ message: "Please add your zrexpress key and token in the settings." });
  } catch (error) {
    
    console.error("Error checking ZRexpress authentication:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
}
module.exports = {isAuth , isYoucanAuth ,isZrAuth}