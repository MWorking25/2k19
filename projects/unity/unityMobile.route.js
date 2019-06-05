const express = require('express');
const multer = require('multer');
var path = require('path');
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



unityMobileRouter.get('/getRelaventSearch/:filteredkeyword',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    hotelCtrl.getRelaventSearch(req,res);
});



module.exports = unityMobileRouter;