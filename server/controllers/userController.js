const db       = require('../utils/dbUtilMethods.js')

module.exports = {

	createUser : function(token, username, userId, profile, callback){
		console.log('createUser called in userController');
		db.getUserfromDbase(token, username, userId, profile, callback)
	},

	blacklist: function(req, resp){
		console.log('req.body in blacklist is : ', req.body.username);
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

	unBlackList: function(username, unblockedUser){
		for(var i = 0; i < username.blacklist.length; i++){
			if(username.blacklist[i] === unblockedUser){
				username.blacklist.splice(i,1);
				db.removeFromBlackListDbase(username, blockedUser);
				break;
			}
		}
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
