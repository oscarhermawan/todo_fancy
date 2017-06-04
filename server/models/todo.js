const mongoose = require('mongoose');
var Schema = mongoose.Schema

var todoSchema = new Schema({
  member_id:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  memo:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  is_complete:Boolean,
  createdAt:{
    type:Date,
    default:Date.now
  },
  updatedAt:{
    type:Date,
    default:Date.now
  },
  warnAt:{
    type:Date
  }
})

var Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
