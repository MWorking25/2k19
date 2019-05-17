const express = require('express');
const unityRouter = express.Router();
const security = require('./security/security');
const authUser = require('./security/UserAuth');
const userCtrl = require('./controllers/users.controller');

unityRouter.post('/userAuth/:token/:key',function(req,res){
    security(req,res,next);userCtrl.authenticateUser(req,res);
})


module.exports = unityRouter;