const logger = require('../config/logger'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    express = require('express'),
    connection = require('../config/connection'),
    crypto = require('crypto'),
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
    console.log(req.files);
    console.log(req.body.vehicalDocDetails);
         if(req.decoded.success == true) {
            connection.acquire(function (err, con) {
                if (req.files && req.body.vehicalDocDetails) {
                    var vehicalDocDetails = JSON.parse(req.body.vehicalDocDetails);
                    vehicalDocDetails.docimg = req.files[0].filename;
                } else {
                    var vehicalDocDetails = req.body;
                }
    
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
