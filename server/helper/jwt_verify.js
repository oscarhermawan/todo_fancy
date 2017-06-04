var express = require('express')
var jwt = require('jsonwebtoken')
var methods = {}

methods.verifyToken = function(req, res, next){
  console.log('masuk token', req.headers.token);
    jwt.verify(req.headers.token, 'secret', (err, decoded)=>{
      if(decoded){
        req.decoded = decoded
        next();
      }
      else{
        res.send(err)
      }
    })
}

module.exports = methods
