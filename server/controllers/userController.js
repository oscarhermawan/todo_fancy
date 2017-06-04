var ObjectId = require('mongodb').ObjectId
var User = require('../models/user')
var passwordHash = require('password-hash')
var jwt = require('jsonwebtoken')
const methods = {}

methods.getId = function(req, res){
  jwt.verify(req.headers.token, 'secret', function(err, decoded){
    console.log(decoded);
    if(!err){
      res.send(decoded.id)
    } else {
      console.log('masuk else');
    }
  })
}

methods.getAllUsers = function(req, res) {
  User.find(function(err, User) {
    if(err){
      console.log(err);
    } else {
      res.send(User)
    }
  })
}

//INSERT LOCAL
methods.insertUser = function(req, res){
  var userInput = new User({
    username:req.body.username, // untuk login manual
    password:passwordHash.generate(req.body.password), // untuk login manual
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    member_id:req.body.member_id, // untuk fb
  })
  userInput.save(function(err,userInput){
    if(err){
      return console.log(err);
    } else {
      res.send(userInput)
    }
  })
}

//INSERT FB
methods.fbLogin = function(req, res){
  console.log(req.body.member_id);

  //PERTAMA LOGIN, ID LANGSUNG DIBUAT
  User.findOne({member_id:req.body.member_id},function(err, result) {
    if(result == null){
      var userInput = new User({
        member_id:req.body.member_id
      })
      userInput.save(function(err,userInput){
        if(err){
          return console.log(err);
        } else {
          res.send(userInput)
        }
      })
    }

    //KALAU SUDAH PERNAH LOGIN FB
    else {
      var getUser = User.findOne({member_id : req.body.member_id})
      getUser.exec(function(err, user){
          let fb = {
            member_id:user.member_id
          }
          let token = jwt.sign(fb, 'secret')
           res.send(token)
      })
    }
  })
}


//login local
methods.signIn = function (username, password, next) {
  console.log(username, password);
  var getUser = User.findOne({username : username})
  getUser.exec(function(err, user){
    if(passwordHash.verify(password, user.password)){
      let User = {
        id:user.id,
        username:user.username,
        first_name:user.first_name,
        last_name:user.last_name
      }
      let token = jwt.sign(User, 'secret')
       next(null, {message: 'Berhasil Login', token })
    } else {
      next(null, {message: 'Password Salah'})
    }
  })
}


module.exports = methods
