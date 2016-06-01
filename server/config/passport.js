const     User = require('../controllers/userController.js')

module.exports = function(passport){

  const GitHubStrategy = require('passport-github2').Strategy;
  const configAuth     = require('./auth.js');

  passport.serializeUser(function(user, done){
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new GitHubStrategy({

    clientID        : configAuth.github.clientID,
    clientSecret    : configAuth.github.clientSecret,
    callbackURL     : configAuth.github.callbackURL

  },
  function(accessToken, refreshToken, profile, done) {
      process.nextTick(function(){
        return done(null, profile);
	// User.createUser(accessToken, profile._json.login, profile._json.id, done)
      })
    })
  )
}
