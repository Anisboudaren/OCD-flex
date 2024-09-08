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
  {
    usernameField: 'identifier', // Allow login with either email or username
    passwordField: 'password',
  },
  async function(identifier, password, done) {
    try {
      // Check if the identifier is an email or username
      let user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }]
      });

      // If no user is found
      if (!user) {
        return done(null, false, { message: 'Incorrect email or username.' });
      }
      console.log((await user.isAccountLocked()))
      // Check if the account is locked
      if (await user.isAccountLocked()) {
        return done(null, false, { message: 'too many tries , Please try again after 5 min' });
      }

      // Check if password is correct
      const isPassword = await user.comparePassword(password);
      if (!isPassword) {
        // Increment failed login attempts
        await user.incLoginAttempts();
        return done(null, false, { message: 'Incorrect password.' });
      }

      // Reset failed login attempts on successful login
      await user.resetLoginAttempts();

      // Authentication successful
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));