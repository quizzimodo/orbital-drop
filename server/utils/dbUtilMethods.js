//grabs the user model we created in dbinit
var UsersModel = require('../models/userModel.js');

var helpers = {

  addUserToDbase : function (token, username, userId, profile, callback) {

    var user = new UsersModel({
      token : token,
      username : username,
      userId : userId
    });

    user.save(function(err) {
      if (err) {
        console.log (err);
      } else {
          console.log("New user successfully added to DB")
          callback(null, profile)
        }
    });
  },

  addToBlackListDbase : function (username, blackListUser) {

  UsersModel.update({username: username}, {$push:{blackList : blackListUser}},
    function (err){
      if (err) {
        console.log("Add to blacklist failed");
        console.log (err);
      } else {
          console.log("Blacklist updated in DB");
        }
    });
},

    addToWhiteListDbase : function (username, approvedUser) {

  UsersModel.update({username: username}, {$push:{whiteList : approvedUser}},
    function (err){
      if (err) {
        console.log("Add to whitelist failed");
        console.log (err);
      } else {
          console.log("Whitelist updated in DB");
        }
    });
},

  removeFromBlackListDbase : function (username, blockedUser) {
        console.log('inside removeFromBlackListDbase')


  UsersModel.update({username: username}, {$pull:{blackList : blockedUser}},
    function (err){
      if (err) {
        console.log("Remove from blacklist failed");
        console.log (err);
      } else {
          console.log("Blacklist user removed in DB");
        }
    });
},

  removeFromWhiteListDbase : function (username, approvedUser) {

  UsersModel.update({username: username}, {$pull:{whiteList : approvedUser}},
    function (err){
      if (err) {
        console.log("Remove from whitelist failed");
        console.log (err);
      } else {
          console.log("Whitelist user removed in DB");
        }
    });
  },

  getUserfromDbase : function (token, username, userId, profile, callback) {

    var that = this;

    UsersModel.findOne({userId : userId}, function(err, user){
      if(!user){
        that.addUserToDbase(token,username,userId, profile, callback)
      } else {
        callback(null, profile)
      }

    });
  }
};

module.exports = helpers;

