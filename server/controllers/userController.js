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

methods.signinFB = function(req, res){
    console.log('masuk FB');
    Member.findOne({member_id:req.body.id},function(err, result) {
      if(result == null){
        var userInput = new Member({
          member_id:req.body.id,
          first_name:req.body.first_name,
          last_name:req.body.name
        })
        userInput.save(function(err,record){
          if(err){
            return console.log(err);
          } else {
            let token = jwt.sign(record, 'secret', {
                expiresIn: '1d'
            })
            res.send(token)
          }
        })
      }
      else {
        let token = jwt.sign(result, 'secret', {
            expiresIn: '1d'
        })
        res.send(token)
      }
    })
  }


module.exports = methods
