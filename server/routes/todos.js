var express = require('express')
var api = require('../controllers/todoController')
var jwt = require('../helper/jwt_verify')
var router = express.Router();

router.get('/', api.getAllTodos)

router.get('/getTodosById', jwt.verifyToken,  api.getAllTodosFromId)
router.post('/', jwt.verifyToken, api.insertTodo)
router.delete('/:id', jwt.verifyToken, api.deleteTodo)
router.get('/search/:search', jwt.verifyToken, api.searchTodo)
router.put('/:id', api.updateTodo)




module.exports = router
