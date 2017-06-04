const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');
const Strategy = require('passport-local').Strategy
const api = require('./controllers/userController')


app.use(cors())
mongoose.connect('mongodb://localhost/todos_grayfox', (err)=>{
  if(err){
    console.log(err);
  } else {
    console.log("Connect");
  }
})

var users = require('./routes/users')
var todos = require('./routes/todos')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

passport.use(new Strategy(api.signIn)) // LOGIN PASSPORT
app.use(passport.initialize())

app.use('/users', users)
app.use('/todos', todos)


app.listen(3000)
module.exports = app
