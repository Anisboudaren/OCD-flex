const router = require('express').Router()
const passport = require('passport');
const {register_new_client , loginIn}  = require("../controllers/auth");
const { send } = require('process');

router.post('/register', register_new_client);

router.post('/login', 
    passport.authenticate('local'), 
    (req, res) => {
      res.send({ message: 'Login successful', user: req.user });
    }
  );
router.get("/nigga", (req, res) => {
  console.log("did i even get to here" , req.user);
 
}
);

module.exports = router