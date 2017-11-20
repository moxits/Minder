var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var router = express.Router();
var userModel = require('../models/User');
var messageModel = require('../models/Message');
var socketio = require('../socketio');



router.post('/',function(req,res){
  var newUser = new userModel(req.body);
  newUser.save(function(err,user){
    if (err){
      console.error(err);
      return res.send('ERROR');
    }
    res.json(user);
  });
});
router.get("/login",function(req,res){
  res.render('login');
});
router.get("/profile",function(req,res){
  res.render("profile");
});
router.post('/loginUser', function(req, res, next) {
  userModel.findOne( { email: req.body.email }, function(err, user){
    //Check if user exists
    if(user){
      //Check if password matches
      if(req.body.password === user.password){
        req.session.user=user;
        res.send(true);
      }
      else{
        res.send(false);
      }
    }
    else{
      res.send(false);
    }
  } );
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  userModel.find(function (err, users) {
    if (err) return console.error(err);
    res.send(users);
  })
});

router.patch('/',function(req,res){
  userModel.findOne({email:req.body.email},function(err,user){
    if (err) return console.error(err);
    user.bio = req.body.bio;
    user.tags = req.body.tags;
    user.school= req.body.school;
    user.password = req.body.password;
    user.save(function (err, updatedUser) {
      if (err) return handleError(err);
      res.send(updatedUser);
  })
  })
});

router.use(function(req, res, next) {
  if (req.session && req.session.user) {
    userModel.findOne({ email: req.session.user.email }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; 
        req.session.user = user;  
        res.locals.user = user;
      }
      next();
    });
  } else {
    res.redirect('/');
  }
});
function require_login(req, res, next) {
  if (!req.user) {
    res.send('no user found');
  } else {
    next();
  }
};
router.get('/profile-page', require_login, function(req, res) {
  var user=req.user;
  var friendslist = [];
  var friendrequests=[]; 
  var pending = [];
  userModel.find({_id:{$in:user.friendRequests}},function(err,foundfriends){
    if (err) return console.error(err);
    friendrequests = foundfriends;
  }).then(function(){
    userModel.find({_id:{$in:user.pendingRequests}},function(err,foundfriends){
      if (err) return console.error(err);
      pending = foundfriends;
      })
    })
    .then(function(){
      userModel.find({_id:{$in:user.friends}},function(err,foundfriends){
        if (err) return console.error(err);
        friendslist = foundfriends;
        res.render('profile-page',{user:user,friends:friendslist,friendRequests:friendrequests,pendingRequests:pending});
      })
    })
});
//CHAT FUNCTIONS
router.get('/messages',require_login,function(req,res){
  var friendslist = []; 
  userModel.find({_id:{$in:req.user.friends}},function(err,foundfriends){
    if (err) return console.error(err);
    friendslist = foundfriends;
    res.render('messages',{friends:friendslist,user:req.user});
  })
});

router.post('/loadmessage/',require_login,function(req,res){
  var user = req.user;
  var userlist = [user._id,req.body.id];
  var identifier = [user._id.toString(),req.body.id];
  identifier.sort();
  if (socketio.sockets()[req.user._id]) {
    socketio.sockets()[req.user._id].join(identifier.toString());
  }
  messageModel.find({from:{$in:userlist},to:{$in:userlist}},function(err,foundmsgs){
    if (err) return console.error(err);
    res.send(foundmsgs);
  })
});

router.post('/sendmessage',require_login,function(req,res){
  var newMsg = new messageModel(req.body);
  newMsg.from = req.user._id;
    var identifier = [req.user._id.toString(),newMsg.to.toString()];
    identifier.sort();
    newMsg.save(function(err,msg){
      if (err){
        console.error(err);
        return res.send('ERROR');
      }
      socketio.instance().to(identifier.toString()).emit('chat message', msg);
      socketio.sockets()[newMsg.to].emit('notifications', {
        type: 'new_message',
        data: {
          from: req.user.firstName + ' ' + req.user.lastName,
          text: newMsg.text
        }
    })
  })
    res.end();
});
router.post('/addFriend/:userId',require_login,function(req,res){
  var user = req.user;
  var id = user._id;
  userModel.update({'_id':req.params.userId},{$push:{"friendRequests":mongoose.Types.ObjectId(user._id)}},function(err,user){
    if (err) return console.error(err);
   });
   userModel.update({'_id':user._id},{$push:{"pendingRequests":mongoose.Types.ObjectId(req.params.userId)}},function(err,user){
    if (err) return console.error(err);
   });
   socketio.sockets()[req.params.userId].emit('notifications', { 
     type: 'new_request',
     data:{
       from: user.firstName + ' ' + user.lastName
     }
    })
   res.send(user);
});
router.post('/acceptRequest/:userId',require_login,function(req,res){
  var user = req.user;
  userModel.update({'_id':user._id},{$pull:{"friendRequests":mongoose.Types.ObjectId(req.params.userId)},$push:{"friends":mongoose.Types.ObjectId(req.params.userId)}},function(err,user){
    if (err) return console.error(err);
   });
   userModel.update({'_id':req.params.userId},{$push:{"friends":mongoose.Types.ObjectId(user._id)},
  $pull:{"pendingRequests":user._id}},function(err,user){
    if (err) return console.error(err);
   });
   res.end();
});
router.delete('/deleteRequest/:userId',require_login,function(req,res){
  var user = req.user;
  userModel.update({'_id':user._id},{$pull:{"pendingRequests":mongoose.Types.ObjectId(req.params.userId)}},function(err,user){
    if (err) return console.error(err);
  })
  userModel.update({'_id':req.params.userId},{$pull:{"friendRequests":mongoose.Types.ObjectId(user._id)}},function(err,user){
    if (err) return console.error(err);
  })
  res.end();
});
router.delete('/denyRequest/:userId',require_login,function(req,res){
  var user = req.user;
  userModel.update({'_id':req.params.userId},{$pull:{"pendingRequests":mongoose.Types.ObjectId(user._id)}},function(err,user){
    if (err) return console.error(err);
  })
  userModel.update({'_id':user._id},{$pull:{"friendRequests":mongoose.Types.ObjectId(req.params.userId)}},function(err,user){
    if (err) return console.error(err);
  })
  res.end();
});
router.get('/navigation',require_login,function(req,res){
  user = req.user;
  var not_friends =[];
  var local_users = [];
  var tag_matches = [];
  userModel.find({_id:{$nin:user.pendingRequests.concat(user._id,user.friendRequests)}},function (err, users){
    if (err) return console.error(err);
    not_friends = users;
  }).then(function(){
    for (var x=0;x<not_friends.length;x++){
      var difference = (parseInt(user.location) - parseInt(not_friends[x].location));
      if ((difference <= 5) && (difference >=-5 )){
        local_users.push(not_friends[x]);
      } 
    }
    userModel.find({_id:{$nin:user.pendingRequests.concat(user._id,user.friendRequests)},tags:{$in:user.tags}},function(err,matchedusers){
      for (var y = 0;y<matchedusers.length;y++){
        if (!(matchedusers[y] in not_friends)){
          tag_matches.push(matchedusers[y]);
        }
      }
    })
  }).then(function(){
      res.render("navigation",{allusers:not_friends,localusers:local_users,tagmatches:tag_matches});
    })
});
router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});


module.exports = router;
