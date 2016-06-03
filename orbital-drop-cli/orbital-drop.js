var vorpal = require('vorpal')();
var io = require('socket.io')(server);
require("jsdom").env("", function(err, window) {
  if (err) {
    console.error(err);
    return;
  }
  var $ = require("jquery")(window);
});

vorpal
  .command('login [username] [password]', 'login to orbital-drop')
  .action((args, cb) => {
    cb(AirDrop.controllers.Authentication(args.username, args.password));
  });
vorpal
  .command('send [user] <file>', 'send a file to a user')
  .action((args, cb) => )












var chat = {},
    user = {},
    AirDrop = {controllers: {}};

// instantiate socket.io
var socket = io();

AirDrop.controllers.Authentication = {
  login: (username, password) =>
    $.post('/login/cli',
      {username: username, password: password},
      (resp) => resp.data
    )
}

AirDrop.controllers.BlackList = {
  blackListUser: (username, blacklistuser) =>
    $.post('/blacklistuser',
      {
        username: username,
        blacklistuser: blacklistuser
      },
      (resp) => resp.data
    )
  ,
  unBlackListUser: (username, blacklistuser) =>
    $.post(
      '/unblacklistuser',
      {
        username: username,
        blacklistuser: blacklistuser
      },
      (resp) => resp.data
    )
};

AirDrop.controllers.Console = function () {
  var _chatRoom = [];
  var _users;
  var _client;
  $.get('/api/user_profiles', function (response) {
    var userId = response.id;
        _client = response;
        user = _client;
    var username = response.login;
    socket.emit('createUser', userId, username, response);
  });

  var blacklistUser = function (username) {
    alert(username + ' has been added to your blacklist');
    AirDrop.controllers.BlackList.blackListUser(_client, username);
  };

  var unBlacklistUser = function (username) {
    alert(username + ' has been removed from your blacklist');
    AirDrop.controllers.BlackList.unBlackListUser(_client, username);
  };

  socket.on('updateUsers', function (users) {
    _users = users;
     console.log('Here are the users', users); 

    var angularUsers = {};
    for(var key in _users){
      var user = _users[key];
      // only one file for now, integrate with rex
      var file = user.files;
      angularUsers[key] = {
        id: key,
        username: user.username,
        profile: user,
        packages: [{thumb:'apple.jpg'}]
      }
    }
    _users = angularUsers;
  });

  socket.on('refreshChat', (value) => _chatRoom = value);
  socket.on('requestTransfer', function (response) {
    var senderUserId = response.senderUserId;
    var filename = response.filename;
    
    /*** user will choose accept or reject.  
    1. A decision will be emitted
    2. Accept will cause a forced get request. Reject will send a delete 
       request for file.
    ***/
    // temporarily true, let user decide
    if (confirm('We have a special package for you... Do you want it...')) {
      window.open('/files/download');
    } else {
      $.ajax({
        url: '/files',
        type: 'DELETE',
        success: (result) => console.log(result, ' should be result of deletion')
      });
    }
  });

  return {
    blacklistUser: blacklistUser,
    unBlacklistUser: unBlacklistUser
  };
}();
