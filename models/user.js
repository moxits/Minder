var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    type:String,
    firstName:String,
    lastName:String,
    email:String,
    location:String,
    bio: String,
    tags: Array,
    school:String,
    password:String,
  
  });

  module.exports = mongoose.model('User', userSchema);