const db       = require('../utils/dbUtilMethods.js')

module.exports = {

	createUser : function(token, username, userId, profile, callback){
		console.log('createUser called in userController');
		db.getUserfromDbase(token, username, userId, profile, callback)
	},

	blacklist: function(req, resp){
		var username = req.body.username.username;
		var blackListUser = req.body.blacklistuser;
		//exports.userUtilMethods.unWhiteList(username, blackListUser)
		// username.blackList.push(blackListUser)
		db.addToBlackListDbase(username, blackListUser)
	},

	whitelist: function(username, approvedUser){
		exports.userUtilMethods.unBlackList(username, approvedUser)
		username.whiteList.push(blockedUser)
		db.addToWhiteListDbase(username, blockedUser)
	},

	unBlackList: function(req, resp){
		var username = req.body.username.username;
		var blackListUser = req.body.blacklistuser;
		db.removeFromBlackListDbase(username, blackListUser);
	},
	
	unWhiteList: function(username, unapprovedUser){
		for(var i = 0; i < username.whitelist.length; i++){
			if(username.whitelist[i] === unapprovedUser){
				username.whiteList.splice(i,1);
				db.removeFromWhiteListDbase(username,blockedUser);
				break;
			}
		}
	}
}
