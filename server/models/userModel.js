const mongoose        = require('mongoose');
const dbURI           = 'mongodb://heroku_pfld10lp:t7h0ven0ag3o7p0bhegk90lpp7@ds021343.mlab.com:21343/heroku_pfld10lp';
const db              = mongoose.connection;
const Schema          = mongoose.Schema;
const dbUtilMethods   = require ('../utils/dbUtilMethods');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.Promise = global.Promise;

mongoose.connect(dbURI);

db.on('error', console.error.bind(console, 'DB connection error:'));

db.once('open', function(){
  // Users.save();  
  console.log("Database successfully connected");
});

  const Users = new Schema({
    token : String,
    username : String,
    userId : { type : Number, required : true, unique : true},
    notifications: [],
    blackList : [],
    whiteList : [],
    directMessages : [],
    nodeList : [],
    chatMessages : [],
    status : Boolean
  });

Users.plugin(uniqueValidator);

module.exports = mongoose.model('Users', Users);
