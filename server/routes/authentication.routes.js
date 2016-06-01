const authController = require('../controllers/authController.js')
const       passport = require('passport');
const        session = require('express-session');
require('../config/passport.js')(passport);

module.exports = function(app, express) {
  app.use(session({secret: 'mySecretKeyofDoooooooomLOLOLOL'}))
  app.use(passport.initialize());
  app.use(passport.session());

  const helpers = authController(passport)

  app.get('/', helpers.serveLogin);

  app.get('/login', helpers.serveLogin)

  app.get('/login/github', passport.authenticate('github', { scope: [ 'user:email'] }));

  app.get('/login/github/callback', passport.authenticate('github', {failureRedirect: 'login' }),
  	function(req, res) {
  		res.redirect('/air-drop/');
  	});

  // app.get('/auth/github', helpers.githubRedirect);

  // app.get('/auth/github/callback', helpers.githubReturn);

}