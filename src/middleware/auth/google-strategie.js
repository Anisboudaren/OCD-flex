var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/User'); 
const passport = require('passport');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function(id, done) {
    console.log("deserializing the user " , id);
    try {
      let foundUser = await User.findById(id);
      if(!foundUser) throw new Error("USER NOT FOUND IN DATABASE !")
      return done(null , foundUser)
    } catch (err) {
      console.log("error in deseralsdfasd : " ,err);
      done(err , null);
    }
  });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },

  function(accessToken, refreshToken, profile, cb) {
    console.log("do we have a user" , profile);
    return cb(error, profile);
  }
));
