const logger = require('../config/logger'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    express = require('express'),
    connection = require('../config/connection'),
    crypto = require('crypto'),
    env= require('../config/env/env'),
    app = express();
var sendMail = require('./mail.controller');

var encryptionKey = process.env.ENC_TOKEN;
encrypt = function (text) {

    if (text === null || typeof text === 'undefined') {
        return text;
    };
    var cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
};

var fileUrl = env.devfilesUrl;

exports.getVehicalsListList = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            if (req.Loggedinuser.role === 'Superadmin') {
                var sql = "SELECT `id`,`company`,`model`,`passingno`,`cpacity`,`color`,`price`,`discounted_price` FROM `vehical` ORDER BY id ASC";
            } else {
                var sql = "SELECT `id`,`company`,`model`,`passingno`,`cpacity`,`color`,`price`,`discounted_price` FROM `vehical` WHERE `createdby` = " + req.decoded.id + "ORDER BY id ASC";
            }
            con.query(sql, function (err, result) {
                if (err) {
                    logger.writeLogs({
                        path: "master.controller/getVehicalsListList",
                        line: "",
                        message: err
                    }, 'error');


                    res.send({
                        status: 0,
                        type: "error",
                        title: "Oops!",
                        message: "Something went worng, Please try again letter"
                    });
                    con.release();
                } else {
                    res.json(result);
                    con.release();
                }
            });
        });
    } else {

        res.send({
            success: false,
            type: "error",
            title: "Oops!",
            message: 'Invalid token.',
        });

    }
};


exports.saveVehicalDetails = function(req,res)
{
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            if (req.files && req.body.vehicalDetails) {
                var vehicalDetails = JSON.parse(req.body.vehicalDetails);
                     vehicalDetails.coverpic = req.files[0].filename;
            } else {
                var vehicalDetails = req.body;
            }

            
            vehicalDetails.createdby = req.decoded.id;

            if(vehicalDetails.id > 0)
            {
               var sql  = 'UPDATE `vehical` SET ? WHERE id = ?';
               var fieldobject = [vehicalDetails,vehicalDetails.id];
            }
            else
            {
                var sql = 'INSERT INTO `vehical` SET ?';
                var fieldobject = vehicalDetails;
            }

            con.query(sql,fieldobject,function(err,result){
                if(err)
                {
                    logger.writeLogs({
                        path: "cabCtrl.controller/saveVehicalDetails",
                        line: "",
                        message: err
                    }, 'error');


                    res.send({
                        status: 0,
                        type: "error",
                        title: "Oops!",
                        message: "Something went worng, Please try again letter"
                    });
                    con.release();
                }
                else
                {
                    
                    res.send({
                        status: 1,
                        type: "success",
                        title: "Done!",
                        message: "Vehical details saved successfully",
                        vehicalid:result.insertId
                    });
                    con.release();
                }
            });

        });
    }
    else {

        res.send({
            success: false,
            type: "error",
            title: "Oops!",
            message: 'Invalid token.',
        });

    }
};

exports.uploadVehicalDocs = function(req,res)
   {
         if(req.decoded.success == true) {
            connection.acquire(function (err, con) {
                if (req.files && req.body.vehicalDocDetails) {
                    var vehicalDocDetails = JSON.parse(req.body.vehicalDocDetails);
                    vehicalDocDetails.docimg = req.files[0].filename;
                } else {
                    var vehicalDocDetails = req.body;
                }
                delete vehicalDocDetails.docfilename
    
                vehicalDocDetails.createdby = req.decoded.id;
    
                if(vehicalDocDetails.id > 0)
                {
                   var sql  = 'UPDATE `vehical_docs` SET ? WHERE id = ?';
                   var fieldobject = [vehicalDocDetails,vehicalDocDetails.id];
                }
                else
                {
                    var sql = 'INSERT INTO `vehical_docs` SET ?';
                    var fieldobject = vehicalDocDetails;
                }
    
                con.query(sql,fieldobject,function(err,result){
                    if(err)
                    {
                        logger.writeLogs({
                            path: "cabCtrl.controller/uploadVehicalDocs",
                            line: "",
                            message: err
                        }, 'error');
    
    
                        res.send({
                            status: 0,
                            type: "error",
                            title: "Oops!",
                            message: "Something went worng, Please try again letter"
                        });
                        con.release();
                    }
                    else
                    {
                        
                        res.send({
                            status: 1,
                            type: "success",
                            title: "Done!",
                            message: "Vehical details saved successfully",
                            vehicalid:result.insertId
                        });
                        con.release();
                    }
                });
            });
        }
        else {

            res.send({
                success: false,
                type: "error",
                title: "Oops!",
                message: 'Invalid token.',
            });

        } 
};

exports.uploadvehicalImages = function(req,res)
   {                                                                                                      
          if(req.decoded.success == true) {
            connection.acquire(function (err, con) {
                if (req.files && req.body.description) {
                    var description = JSON.parse(req.body.description);
                    description.coverpic = req.files[0].filename;
                } else {
                    var description = req.body;
                    delete description.coverpictemp
                }
    
                description.createdby = req.decoded.id;
    
                if(description.id > 0)
                {
                   var sql  = 'UPDATE `vehical_pics` SET ? WHERE id = ?';
                   var fieldobject = [description,description.id];
                }
                else 
                {
                    var sql = 'INSERT INTO `vehical_pics` SET ?';
                    var fieldobject = description;
                }
    
                con.query(sql,fieldobject,function(err,result){
                    if(err)
                    {
                        logger.writeLogs({
                            path: "cabCtrl.controller/uploadVehicalDocs",
                            line: "",
                            message: err
                        }, 'error');
    
    
                        res.send({
                            status: 0,
                            type: "error",
                            title: "Oops!",
                            message: "Something went worng, Please try again letter"
                        });
                        con.release();
                    }
                    else
                    {
                        
                        res.send({
                            status: 1,
                            type: "success",
                            title: "Done!",
                            message: "Vehical details saved successfully",
                            vehicalid:result.insertId
                        });
                        con.release();
                    }
                });
            });
        }
        else {

            res.send({
                success: false,
                type: "error",
                title: "Oops!",
                message: 'Invalid token.',
            });

        }  
};


exports.deleteVehicalDocDetails = function(req,res)
   {
         if(req.decoded.success == true) {
            connection.acquire(function (err, con) {    
                con.query("DELETE FROM `vehical_docs` WHERE `id` = "+req.params.docid,function(err,result){
                    if(err)
                    {
                        logger.writeLogs({
                            path: "cabCtrl.controller/deleteVehicalDocDetails",
                            line: "",
                            message: err
                        }, 'error');
    
    
                        res.send({
                            status: 0,
                            type: "error",
                            title: "Oops!",
                            message: "Something went worng, Please try again letter"
                        });
                        con.release();
                    }
                    else
                    {
                        
                        res.send({
                            status: 1,
                            type: "success",
                            title: "Done!",
                            message: "Vehical document deleted successfully",
                            vehicalid:result.insertId
                        });
                        con.release();
                    }
                });
            });
        }
        else {

            res.send({
                success: false,
                type: "error",
                title: "Oops!",
                message: 'Invalid token.',
            });

        } 
};


exports.getVehicalDetails = function(req,res)
   {
         if(req.decoded.success == true) {
            connection.acquire(function (err, con) {    
                con.query("SELECT *,CONCAT('"+fileUrl+"',coverpic) as tmpcoverpic FROM `vehical` WHERE `id` = "+req.params.vehicalid,function(err,vehicalDetails){
                    if(err)
                    {
                        logger.writeLogs({
                            path: "cabCtrl.controller/getVehicalDetails",
                            line: "",
                            message: err
                        }, 'error');
    
    
                        res.send({
                            status: 0,
                            type: "error",
                            title: "Oops!",
                            message: "Something went worng, Please try again letter"
                        });
                        con.release();
                    }
                    else
                    {
                        if(vehicalDetails.length > 0)
                        {
                            con.query("SELECT `id`,`docname`,`vehicalid`,`docimg`,CONCAT('"+fileUrl+"',`docimg`) AS `docimgtemp` FROM `vehical_docs` WHERE `vehicalid` = "+req.params.vehicalid,function(err,vehicalDocs){
                                if(err)
                                {
                                    logger.writeLogs({
                                        path: "cabCtrl.controller/getVehicalDetails",
                                        line: "",
                                        message: err
                                    }, 'error');
                
                
                                    res.send({
                                        status: 0,
                                        type: "error",
                                        title: "Oops!",
                                        message: "Something went worng, Please try again letter"
                                    });
                                    con.release();
                                }
                                else
                                {
                                    con.query("SELECT `id`,`vehicalid`,`description`,`coverpic`,CONCAT('"+fileUrl+"',`coverpic`) as `coverpictemp` FROM `vehical_pics` WHERE `vehicalid` =  "+req.params.vehicalid,function(err,vehicalImages){
                                        if(err)
                                        {
                                            logger.writeLogs({
                                                path: "cabCtrl.controller/getVehicalDetails",
                                                line: "",
                                                message: err
                                            }, 'error');
                        
                        
                                            res.send({
                                                status: 0,
                                                type: "error",
                                                title: "Oops!",
                                                message: "Something went worng, Please try again letter"
                                            });
                                            con.release();
                                        }
                                        else
                                        {
                                            res.send({vehicalDetails:vehicalDetails,vehicalDocs:vehicalDocs,vehicalImages:vehicalImages});
                                            con.release();
                                        }
                                    });
                                }
                            });
                        }
                        else
                        {
                            res.send({
                                status: 0,
                                type: "success",
                                title: "Done!",
                                message: "No record found"
                            });
                            con.release();   
                        }
                    }
                });
            });
        }
        else {

            res.send({
                success: false,
                type: "error",
                title: "Oops!",
                message: 'Invalid token.',
            });

        } 
};


exports.uploadvahicalImages = function (req, res) {

 
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
 
         if (req.files && req.body.vahicalDetails) {
             var vahicalDetails = JSON.parse(req.body.vahicalDetails);
             vahicalDetails.coverpic = req.files[0].filename;
         } else {
             var vahicalDetails = req.body;
         }
         
         if(vahicalDetails.id != 0)
         {
             var sql = "UPDATE `vehical_pics` SET ?  WHERE `id` = ?";
             var dataObj = [vahicalDetails,vahicalDetails.id]
         }
         else
         {
             vahicalDetails.createdby = req.decoded.id;
             var sql = "INSERT INTO `vehical_pics` SET ?";
             var dataObj = vahicalDetails
         }
 
                con.query(sql,dataObj, function (err, result) {
                    if (err) {
    
                        logger.writeLogs({
                            path: "hotel.controller/uploadHotelImages",
                            line: "",
                            message: err
                        }, 'error');
    
                        res.send({
                            status: 1,
                            type: "error",
                            title: "Oops!",
                            message: "Something went worng, Please try again letter"
                        });
                        con.release();
                    } else {
                     res.send({
                         status: 0,
                         type: "success",
                         title: "Done!",
                         message: "Gallery images saved successfully"
                     });
                        con.release();
                    }
                });       
        });
    } else {
 
        res.send({
            success: false,
            type: "error",
            title: "Oops!",
            message: 'Invalid token.',
        });
    }   
 };
 
 
 exports.RemovevahicalGalleryImage = function (req, res) {
 
     if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
                con.query("DELETE FROM `vehical_pics` WHERE `id` = "+req.params.imgid, function (err, result) {
                    if (err) {
    
                        logger.writeLogs({
                            path: "hotel.controller/RemoveHotelGalleryImage",
                            line: "",
                            message: err
                        }, 'error');
    
                        res.send({
                            status: 1,
                            type: "error",
                            title: "Oops!",
                            message: "Something went worng, Please try again letter"
                        });
                        con.release();
                    } else {
                     res.send({
                         status: 0,
                         type: "success",
                         title: "Done!",
                         message: "Image deleted successfully"
                     });
                        con.release();
                    }
                });       
        });
    } else {
 
        res.send({
            success: false,
            type: "error",
            title: "Oops!",
            message: 'Invalid token.',
        });
 
    } 
 };
