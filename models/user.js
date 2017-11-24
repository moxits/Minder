var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    type: String,
    firstName: String,
    lastName: String,
    email: String,
    location: String,
    bio: String,
    tags: Array,
    school: String,
    friends: Array,
    friendRequests:Array,
    pendingRequests:Array,
    password: String,
    unread: String,
});

  module.exports = mongoose.model('User', userSchema);