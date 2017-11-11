var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    text: String,
    from: String,
    to: String, 
    time: Date,
});

module.exports = mongoose.model('Message',messageSchema);