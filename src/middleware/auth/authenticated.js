
const YouCanAccount = require("../../models/youcan-account")

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
module.exports = {isAuth , isYoucanAuth}