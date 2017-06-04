var express = require('express')
var api = require('../controllers/userController')
var passport = require('passport')
var router = express.Router();

router.get('/', api.getAllUsers)
router.post('/', api.insertUser)
router.get('/getid', api.getId)

// local
router.post('/signin', passport.authenticate('local', {session:false}), function(req,res){
  var user = req.user
  res.send(user)
})

//login  with fb
router.post('/fblogin', api.fbLogin)


module.exports = router
