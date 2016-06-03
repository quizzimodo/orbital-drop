const clientController = require('../controllers/clientController.js')
const   userController = require('../controllers/userController.js')
const   ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
const             path = require('path');
const bodyParser = require('body-parser');

module.exports = function(app,express){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : false}));
	app.get('/air-drop/' , ensureLoggedIn('/login'), clientController.serveClient );
	app.get('/api/user_profiles', clientController.sendJSON);
	app.get('/logout', clientController.logout);
	app.post('/blacklistuser', userController.blacklist);
	app.post('/unblacklistuser', userController.unBlackList);
	//app.get('*', clientController.handleAll)

}
