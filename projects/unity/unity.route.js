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

const unityRouter = express.Router();
const security = require('./security/security');
const authUser = require('./security/UserAuth');
const userCtrl = require('./controllers/users.controller');
const masterCtrl = require('./controllers/masters.controller');
const hotelCtrl = require('./controllers/hotel.controller');
const cabsCtrl = require('./controllers/cabs.controller');
const expCtrl = require('./controllers/experiences.controller');

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
    authUser(req,res);masterCtrl.getCitiesOnStates(req,res);
});

unityRouter.get('/getAreasOnCity/:cityid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.getAreasOnCity(req,res);
});

unityRouter.get('/getAreaslist/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.getAreaslist(req,res);
});

unityRouter.post('/saveAreadetails/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.saveAreadetails(req,res);
});

unityRouter.post('/DeleteAreadetails/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.DeleteAreadetails(req,res);
});

unityRouter.post('/saveUserDetails/',upload.any(),function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.saveUserDetails(req,res);
});

unityRouter.post('/SaveUserDetailsWIthoutPic/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.SaveUserDetailsWIthoutPic(req,res);
});

unityRouter.get('/getUsersList/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.getUsersList(req,res);
});

unityRouter.get('/getAmintiesListList/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.getAmintiesListList(req,res);
});

unityRouter.post('/DeleteUsersDetails/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.DeleteUsersDetails(req,res);
});

unityRouter.post('/SaveHotelDetails/',upload.any(),function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);hotelCtrl.SaveHotelDetails(req,res);
});

unityRouter.post('/SaveHotelRoomDetails/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);hotelCtrl.SaveHotelRoomDetails(req,res);
});

unityRouter.post('/SavehotelAminities/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);hotelCtrl.SavehotelAminities(req,res);
});

unityRouter.get('/HotelsList/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);hotelCtrl.HotelsList(req,res);
});

unityRouter.get('/getHotelDetails/:hotelid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);hotelCtrl.getHotelDetails(req,res);
});

unityRouter.post('/DeleteHotelDetails/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);hotelCtrl.DeleteHotelDetails(req,res);
});

unityRouter.get('/deleteRoomDetails/:roomid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);hotelCtrl.deleteRoomDetails(req,res);
});

unityRouter.get('/getAmintiesDetails/:aminityid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.getAmintiesDetails(req,res);
});

unityRouter.post('/SaveAminityDetails/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.SaveAminityDetails(req,res);
});

unityRouter.post('/DeleteAminityDetails/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);masterCtrl.DeleteAminityDetails(req,res);
});
unityRouter.get('/getVehicalsListList/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.getVehicalsListList(req,res);
});

unityRouter.get('/deleteVehicalDocDetails/:docid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.deleteVehicalDocDetails(req,res);
});

unityRouter.get('/getVehicalDetails/:vehicalid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.getVehicalDetails(req,res);
});

unityRouter.post('/saveVehicalDetails/',upload.any(),function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.saveVehicalDetails(req,res);
});
unityRouter.post('/uploadVehicalDocs/',upload.any(),function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.uploadVehicalDocs(req,res);
});

unityRouter.post('/uploadvehicalImages/',upload.any(),function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.uploadvehicalImages(req,res);
});

unityRouter.get('/CruzsList/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);expCtrl.getCruzList(req,res);
});

unityRouter.post('/SaveCruzDetails/',upload.any(),function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);expCtrl.SaveCruzDetails(req,res);
});

unityRouter.post('/uploadCruzImages/',upload.any(),function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);expCtrl.uploadCruzImages(req,res);
});

unityRouter.get('/deleteCruzServiceDetails/:serviceid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);expCtrl.deleteCruzServiceDetails(req,res);
});

unityRouter.get('/getCruzDetails/:cruzid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);expCtrl.getCruzDetails(req,res);
});

unityRouter.get('/deleteCruzTimeSlotsDetails/:timeslotid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);expCtrl.deleteCruzTimeSlotsDetails(req,res);
});

unityRouter.get('/RemoveGalleryImage/:imgid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);expCtrl.RemoveGalleryImage(req,res);
});

unityRouter.post('/SaveCruzServicesDetails/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);expCtrl.SaveCruzServicesDetails(req,res);
});

unityRouter.post('/SaveCruzTimeSlotsDetails/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);expCtrl.SaveCruzTimeSlotsDetails(req,res);
});

unityRouter.post('/DeleteCruzDetails/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);expCtrl.DeleteCruzDetails(req,res);
});

unityRouter.post('/SaveCruzAminities/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);expCtrl.SaveCruzAminities(req,res);
});

unityRouter.get('/RemoveHotelGalleryImage/:imgid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);hotelCtrl.RemoveHotelGalleryImage(req,res);
});

unityRouter.post('/uploadHotelImages/',upload.any(),function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);hotelCtrl.uploadHotelImages(req,res);
});

unityRouter.get('/RemovevahicalGalleryImage/:imgid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.RemovevahicalGalleryImage(req,res);
});

unityRouter.post('/uploadvahicalImages/',upload.any(),function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.uploadvahicalImages(req,res);
});

unityRouter.get('/getcabsList/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.getcabsList(req,res);
});

unityRouter.get('/deletecabDocDetails/:docid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.deletecabDocDetails(req,res);
});

unityRouter.get('/getcabDetails/:cabid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.getcabDetails(req,res);
});

unityRouter.post('/savecabDetails/',upload.any(),function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.savecabDetails(req,res);
});
unityRouter.post('/uploadcabDocs/',upload.any(),function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.uploadcabDocs(req,res);
});

unityRouter.get('/RemoveCabGalleryImage/:imgid',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.RemoveCabGalleryImage(req,res);
});

unityRouter.post('/uploadcabImages/',upload.any(),function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.uploadcabImages(req,res);
});

unityRouter.post('/deleteCabDetails/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    authUser(req,res);cabsCtrl.deleteCabDetails(req,res);
});

unityRouter.get('/checkTokenValidation/',function(req,res){
    // security(req,res);userCtrl.authenticateUser(req,res);
    userCtrl.checkTokenValidation(req,res);
});



module.exports = unityRouter;