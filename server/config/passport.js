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

  passport.use(new GitHubStrategy(
    process.env.CLIENT_ID ? configAuth.prod : configAuth.dev,
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function(){
        User.createUser(accessToken, profile._json.login, profile._json.id, profile, done)
        return done(null, profile);
      })
    })
  )
}
