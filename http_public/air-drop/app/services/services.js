angular.module('AirDrop.services', [])

.factory('BlackList', function($http) {
	var blackListUser = function (username, blacklistuser) {
	console.log('params inside factory', username, blacklistuser);	
    return $http({
      method: 'POST',
      url: '/blacklistuser',
      data: {
      	username: username,
      	blacklistuser: blacklistuser
      }
    })
    .then(function (resp) {
      console.log('This is server response inside factory', resp);	
      return resp.data;
    });
  };

  var unBlackListUser = function (username, blacklistuser) {
    return $http({
      method: 'POST',
      url: '/unblacklistuser',
      data: {
        username: username,
        blacklistuser: blacklistuser
      }
    })
    .then(function (resp) {
      return resp.data;
    });
  };






	return {
		blackListUser: blackListUser,
    unBlackListUser: unBlackListUser
  };
})