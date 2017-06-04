var ObjectId = require('mongodb').ObjectId
var Todo = require('../models/todo')
var jwt = require('jsonwebtoken')
const methods = {}

methods.getAllTodos = function(req, res) {
  Todo.find(function(err, results) {
    if(err){
      res.send(err);
    } else {
      res.send(results)
    }
  })
}

methods.getAllTodosFromId = function(req, res) {
  Todo.find({member_id:req.decoded.id},function(err, Todo) {
    if(err){
      console.log(err);
    } else {
      console.log(Todo);
      res.send(Todo)
    }
  })
}

methods.insertTodo = function(req, res){
  var todoInput = new Todo({
    member_id:req.decoded.id,
    memo:req.body.memo,
    description:req.body.description,
    is_complete:false
  })
  todoInput.save(function(err,todoInput){
    if(err){
      res.send(err)
    } else {
      res.send(todoInput)
    }
  })
}

methods.updateTodo = function (req,res) {
  Todo.findById(req.params.id, function(err, result){
    if(!err){
      let update = {
        member_id:result.member_id,
        memo:req.body.memo || result.memo,
        description:req.body.description || result.description,
        is_complete:req.body.is_complete || result.is_complete
      }

      Todo.findByIdAndUpdate(req.params.id, update, {new:true}, function(err, result){
        if(!err){
          res.send(result)
        } else {
          res.send(err)
        }
      })
    } else {
      res.send(err)
    }
  })
}

methods.deleteTodo = function(req,res) {
  Todo.findByIdAndRemove(req.params.id, function(err, result){
    if(!err){
      res.send(result)
    } else {
      res.send(err)
    }
  })
}

methods.searchTodo = function(req,res){
  Todo.find({member_id:req.decoded.id, memo: new RegExp(req.params.search, 'i')}, function(err, results){
     if (err) {
       res.send(err)
     }
     else {
        res.send(results);
     }
  });
}

module.exports = methods
