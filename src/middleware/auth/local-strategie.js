const User = require('../../models/User'); 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  console.log("atleast is taht happening? ");
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  console.log("deserializing the user " , id);
  try {  
    let foundUser = await User.findById(id);
    console.log("check this : " , foundUser);
    if(!foundUser) throw new Error("USER NOT FOUND IN DATABASE !")
    return done(null , foundUser)
  } catch (err) {
    console.log("error in deseralsdfasd : " ,err);
    done(err , null);
  }
});

passport.use(new LocalStrategy(
  async function(username, password, done) {
    // authenticate user
    try {
      let user = await User.findOne({ username: username })
      if (!user) { return done(null, false); }
      if (!user.comparePassword(password)) { return done(null, false); }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));