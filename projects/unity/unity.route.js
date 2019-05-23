const express = require('express');
const unityRouter = express.Router();
const security = require('./security/security');
const authUser = require('./security/UserAuth');
const userCtrl = require('./controllers/users.controller');
const masterCtrl = require('./controllers/masters.controller');

//bd83b23ue83b899e2383b2383n238 token   U889436 key

unityRouter.post('/userAuth/:token/:key',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    userCtrl.authenticateUser(req,res);
});

unityRouter.get('/getCountryList',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.getCountryList(req,res);
});

unityRouter.get('/getStatesList',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.getStatesList(req,res);
});

unityRouter.get('/getStatesOnCountries/:countryid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.getStatesOnCountries(req,res);
});

unityRouter.get('/getCitiesList',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.getCitiesList(req,res);
});

unityRouter.get('/getCitiesOnStates/:stateid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    masterCtrl.getCitiesOnStates(req,res);
});


module.exports = unityRouter;