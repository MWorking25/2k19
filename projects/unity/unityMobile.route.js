const express = require('express');
const multer = require('multer');
var path = require('path');
var cors = require('cors');
var dump = require('./config/DBBackup');
const dir = './public/unity/uploads';


let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, dir);
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + '_' + path.extname(file.originalname));
	}
});

let upload = multer({
	storage: storage
});


const unityMobileRouter = express.Router();

const security = require('./security/security');
const authUser = require('./security/UserAuth');
const userCtrl = require('./controllers/users.controller');
const masterCtrl = require('./controllers/masters.controller');
const hotelCtrl = require('./controllers/hotel.controller');
const expCtrl = require('./controllers/experiences.controller');



unityMobileRouter.get('/getRelaventSearch/:filteredkeyword',cors(),function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);  
    hotelCtrl.getRelaventSearch(req,res);
});

unityMobileRouter.post('/getHotelsList/',cors(),function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);  
    hotelCtrl.getHotelsListOnFilters(req,res);
});

unityMobileRouter.post('/getExperiencesList/',cors(),function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);  
    expCtrl.getExperiencesList(req,res);
});




module.exports = unityMobileRouter;