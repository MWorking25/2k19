const logger = require('../config/logger'),
    express = require('express'),
    connection = require('../config/connection'),
    env= require('../config/env/env'),
    app = express();
var sendMail = require('./mail.controller');

var fileUrl = env.devfilesUrl;


exports.getCruzList = function (req, res) {

    if (req.decoded.success == true) {
       connection.acquire(function (err, con) {
            
           if(req.Loggedinuser.role === 'Superadmin')
           {
               var sql = "SELECT `id`,`name`,`price`,`discounted_price`,`igst`,`cgst`,`sgst`,`capacity` FROM `cruze` WHERE `deletestatus` != 2";
           }
           else
           {
                   var sql  ="SELECT `id`,`name`,`price`,`discounted_price`,`igst`,`cgst`,`sgst`,`capacity` FROM `cruze` WHERE `deletestatus` != 2 AND `createdby`  = "+req.decoded.id;
           }

               con.query(sql, function (err, result) {
                   if (err) {
   
                       logger.writeLogs({
                           path: "experiences.controller/getCruzList",
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
                       res.send(result);
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


exports.deleteCruzServiceDetails = function (req, res) {

    if (req.decoded.success == true) {
       connection.acquire(function (err, con) {
               con.query("DELETE FROM `cruz_services` WHERE `id` = "+req.params.serviceid, function (err, result) {
                   if (err) {
   
                       logger.writeLogs({
                           path: "experiences.controller/deleteCruzServiceDetails",
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
                        message: "Service details deleted successfully"
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

exports.SaveCruzAminities = function (req, res) {

    if (req.decoded.success == true) {
       connection.acquire(function (err, con) {
               con.query("UPDATE cruze SET `aminities` = ? WHERE `id` = ?",[JSON.stringify(req.body),parseInt(req.body[0].cruzid)], function (err, result) {
                   if (err) {
   
                       logger.writeLogs({
                           path: "experiences.controller/SaveCruzAminities",
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
                        message: "Aminities saved successfully"
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

exports.deleteCruzTimeSlotsDetails = function (req, res) {

    if (req.decoded.success == true) {
       connection.acquire(function (err, con) {
               con.query("DELETE FROM `cruzetimeslots` WHERE `id` = "+req.params.timeslotid, function (err, result) {
                   if (err) {
   
                       logger.writeLogs({
                           path: "experiences.controller/deleteCruzTimeSlotsDetails",
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
                        message: "Timeslot details deleted successfully"
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


exports.RemoveGalleryImage = function (req, res) {

    if (req.decoded.success == true) {
       connection.acquire(function (err, con) {
               con.query("DELETE FROM `cruzegallery` WHERE `id` = "+req.params.imgid, function (err, result) {
                   if (err) {
   
                       logger.writeLogs({
                           path: "experiences.controller/RemoveGalleryImage",
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


exports.getCruzDetails = function (req, res) {
    if (req.decoded.success == true) {
       connection.acquire(function (err, con) {
               con.query("SELECT * FROM `cruze` WHERE `id` = "+req.params.cruzid, function (err, result_cruzDetails) {
                   if (err) {
   
                       logger.writeLogs({
                           path: "experiences.controller/getCruzDetails",
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

                    con.query("SELECT *,CONCAT('"+fileUrl+"',filename) AS tmpfilename FROM `cruzegallery` WHERE `cruzeid` =  "+req.params.cruzid, function (err, result_cruzGallery) {
                        if (err) {
        
                            logger.writeLogs({
                                path: "experiences.controller/getCruzGallery",
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
                            con.query("SELECT * FROM `cruz_services` WHERE `cruzid` =  "+req.params.cruzid, function (err, result_cruzServices) {
                                if (err) {
                
                                    logger.writeLogs({
                                        path: "experiences.controller/getCruzServicesDetails",
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
                                 
                                    con.query("SELECT * FROM `cruzetimeslots` WHERE `cruzeid` =  "+req.params.cruzid, function (err, result_timeslot) {
                                        if (err) {
                        
                                            logger.writeLogs({
                                                path: "experiences.controller/getCruzTimeSlotsDetails",
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
                                         res.send({cruzDetails:result_cruzDetails,cruzGalley:result_cruzGallery,cruzServices:result_cruzServices,cruzTimeslot:result_timeslot});
                                            con.release();
                                        }
                                    });

                                }
                            });       
                        }
                    });       

                     
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


exports.SaveCruzDetails = function (req, res) {

    if (req.decoded.success == true) {
       connection.acquire(function (err, con) {
        
        if (req.files && req.body.cruzDetails) {
            var cruzDetails = JSON.parse(req.body.cruzDetails);
            cruzDetails.coverpic = req.files[0].filename;
        } else {
            var cruzDetails = req.body;
        }

            

           if(cruzDetails.id > 0)
           {
               var verificationsql = "SELECT COUNT(*)  as existCruze FROM `cruze` WHERE `name`= ? AND `id` != ?";
               var verificationobj = [cruzDetails.name, cruzDetails.id];

                var sql = "UPDATE `cruze` SET ? WHERE `id` = ?";
                var dataObj = [cruzDetails,cruzDetails.id];
           }
           else
           {

            cruzDetails.createdby = req.decoded.id;
            var verificationsql = "SELECT COUNT(*) as existCruze FROM `cruze` WHERE `name`= ?";
            var verificationobj = [cruzDetails.name];  
            
            var sql = "INSERT INTO `cruze` SET ? ";
            var dataObj = cruzDetails;
           }

               con.query(verificationsql,verificationobj, function (err, existingCount) {
                   if (err) {
   
                       logger.writeLogs({
                           path: "experiences.controller/SaveCruzDetails - verificationdata",
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
                       if(existingCount[0].existCruze > 0)
                       {
                        res.send({
                            status: 1,
                            type: "error",
                            title: "Oops!",
                            message: "Cruze name already exist."
                        });
                        con.release();
                       }
                       else
                       {
                        con.query(sql, dataObj, function (err, result) {
                            if (err) {
            
                                logger.writeLogs({
                                    path: "experiences.controller/SaveCruzDetails - insert",
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
                               if(cruzDetails.id > 0)
                               {
                                res.send({
                                    status: 0,
                                    type: "success",
                                    title: "Done!",
                                    message: "Details saved successfully",
                                    cruzid:cruzDetails.id
                                });
                               }
                               else
                               {
                                res.send({
                                    status: 0,
                                    type: "success",
                                    title: "Done!",
                                    message: "Details saved successfully",
                                    cruzid:result.insertId
                                });
                               }
                            }
                        });         
                       }
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

exports.SaveCruzServicesDetails = function (req, res) {

    if (req.decoded.success == true) {
       connection.acquire(function (err, con) {


        var sql = '';
                for(var i = 0 ; i < req.body.length;i++)
                {
                    if(req.body[i].id != 0)
                    {
                       sql = sql+"UPDATE `cruz_services` SET `servicename`= '"+req.body[i].servicename+"',`description`= '"+req.body[i].description+"' WHERE `id` = "+req.body[i].id+";";
                    }
                    else
                    {
                        sql = sql+"INSERT INTO `cruz_services`(`cruzid`, `servicename`, `description`) VALUES ("+req.body[i].cruzid+",'"+req.body[i].servicename+"','"+req.body[i].description+"');";
                    }
                }
               con.query(sql, function (err, result) {
                   if (err) {
   
                       logger.writeLogs({
                           path: "experiences.controller/SaveCruzServicesDetails",
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
                        message: "Services saved successfully"
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


exports.SaveCruzTimeSlotsDetails = function (req, res) {

    if (req.decoded.success == true) {
       connection.acquire(function (err, con) {


        var sql = '';
                for(var i = 0 ; i < req.body.length;i++)
                {
                    if(req.body[i].id != 0)
                    {
                       sql = sql+"UPDATE `cruzetimeslots` SET `timeslot`= '"+req.body[i].timeslot+"',`closingtime`= '"+req.body[i].closingtime+"' WHERE `id` = "+req.body[i].id+";";
                    }
                    else
                    {
                        sql = sql+"INSERT INTO `cruzetimeslots`(`cruzeid`, `timeslot`, `closingtime`) VALUES ("+req.body[i].cruzeid+",'"+req.body[i].timeslot+"','"+req.body[i].closingtime+"');";
                    }
                }
               con.query(sql, function (err, result) {
                   if (err) {
   
                       logger.writeLogs({
                           path: "experiences.controller/SaveCruzTimeSlotsDetails",
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
                        message: "Timeslots saved successfully"
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

exports.uploadCruzImages = function (req, res) {

   if (req.decoded.success == true) {
       connection.acquire(function (err, con) {

        if (req.files && req.body.description) {
            var cruzDetails = JSON.parse(req.body.description);
            cruzDetails.filename = req.files[0].filename;
        } else {
            var cruzDetails = req.body;
        }
        
        if(cruzDetails.id != 0)
        {
            var sql = "UPDATE `cruzegallery` SET ?  WHERE `id` = ?";
            var dataObj = [cruzDetails,cruzDetails.id]
        }
        else
        {
            cruzDetails.createdby = req.decoded.id;
            var sql = "INSERT INTO `cruzegallery` SET ?";
            var dataObj = cruzDetails
        }

               con.query(sql,dataObj, function (err, result) {
                   if (err) {
   
                       logger.writeLogs({
                           path: "experiences.controller/uploadCruzImages",
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


exports.SaveCruzTimeSlotsDetails = function (req, res) {

    if (req.decoded.success == true) {
       connection.acquire(function (err, con) {


        var sql = '';
                for(var i = 0 ; i < req.body.length;i++)
                {
                    if(req.body[i].id != 0)
                    {
                       sql = sql+"UPDATE `cruzetimeslots` SET `timeslot`= '"+req.body[i].timeslot+"',`closingtime`= '"+req.body[i].closingtime+"' WHERE `id` = "+req.body[i].id+";";
                    }
                    else
                    {
                        sql = sql+"INSERT INTO `cruzetimeslots`(`cruzeid`, `timeslot`, `closingtime`) VALUES ("+req.body[i].cruzeid+",'"+req.body[i].timeslot+"','"+req.body[i].closingtime+"');";
                    }
                }

                console.log(sql)
               con.query(sql, function (err, result) {
                   if (err) {
   
                       logger.writeLogs({
                           path: "experiences.controller/SaveCruzTimeSlotsDetails",
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
                        message: "Timeslots saved successfully"
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

exports.DeleteCruzDetails = function (req, res) {

    if (req.decoded.success == true) {
       connection.acquire(function (err, con) {


        var ids = '(';
        for (var i = 0; i < req.body.length; i++) {
            ids += req.body[i] + ',';
        }
        ids = ids.substring(0, ids.length - 1) + ')';
            
               con.query('UPDATE `cruze` SET `deletestatus`= 2 WHERE `id` IN '+ids, function (err, result) {
                   if (err) {
   
                       logger.writeLogs({
                           path: "experiences.controller/DeleteCruzDetails",
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
                        message: "Record deleted successfully"
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


exports.getExperiencesList = function (req, res) {
       connection.acquire(function (err, con) {
               con.query("SELECT 'Cruz' as exp_type,`id`,`name`,(SELECT COUNT(*) FROM `experience_likes` WHERE `like` = 1 AND `expid` = cruze.id AND `memberid` = "+req.body[0].memberdetails+") as explikebymember,`description`,`price`,`discounted_price`,CONCAT('"+fileUrl+"',`coverpic`) AS bannerinage,`coverpic`,(SELECT COUNT(*) FROM experience_review WHERE experience_review.expid = cruze.id) as expreviews,(SELECT COUNT(*) FROM experience_likes WHERE experience_likes.like = 1 AND experience_likes.expid = cruze.id) as explikes FROM `cruze` WHERE `deletestatus` != 2", function (err, result) {
                   if (err) {
                       logger.writeLogs({
                           path: "experiences.controller/getExperiencesList",
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
                        res.send(result);
                        con.release();
                   }
               });       
       });
};

exports.HtLikeForExp = function (req, res) {
        connection.acquire(function (err, con) {
               con.query("SELECT COUNT(*) likeexist FROM `experience_likes` WHERE `expid` = "+req.body.exp.id+" AND `memberid` = "+req.body.member.id, function (err, result) {
                   if (err) {
                       logger.writeLogs({
                           path: "experiences.controller/HtLikeForExp",
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
                        if(result[0].likeexist > 0)
                        {
                            var sql = 'UPDATE `experience_likes` SET `like`= (CASE WHEN experience_likes.like = 0 THEN 1 ELSE 0 END) WHERE `expid` = '+req.body.exp.id+' AND `memberid` = '+req.body.member.id;
                        }
                        else
                        {
                            var sql = 'INSERT INTO `experience_likes`(`expid`, `memberid`, `like`) VALUES ('+req.body.exp.id+','+req.body.member.id+',1)'
                        }


                        con.query(sql, function (err, result) {
                            if (err) {
                                logger.writeLogs({
                                    path: "experiences.controller/HtLikeForExp -2",
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
                                    message: "Thank You!"
                                });
                                 con.release();
                            }
                        });       

                   }
               });       
       }); 
};


exports.getExperienceDetails = function (req, res) {
    connection.acquire(function (err, con) {
        if(req.body[0].exptype == 'Cruz')
        {
            var sql  = "SELECT *,(SELECT COUNT(*) FROM `experience_likes` WHERE `like` = 1 AND `expid` = cruze.id AND `memberid` = "+req.body[0].memberdetails+") as explikebymember,CONCAT('"+fileUrl+"',`coverpic`) AS bannerinage,(SELECT COUNT(*) FROM experience_review WHERE experience_review.expid = cruze.id) as expreviews,(SELECT COUNT(*) FROM experience_likes WHERE experience_likes.like = 1 AND experience_likes.expid = cruze.id) as explikes FROM `cruze` WHERE cruze.id = "+req.body[0].expid;
        }
        else
        {
            var sql = '';
        }
            con.query(sql, function (err, result) {
                if (err) {
                    logger.writeLogs({
                        path: "experiences.controller/getExperienceDetails",
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
                     res.send(result);
                     con.release();
                }
            });       
    });
};

exports.getExpServices = function (req, res) {
    connection.acquire(function (err, con) {
        if(req.params.exptype == 'Cruz')
        {
            var sql  = "SELECT * FROM `cruz_services` WHERE `cruzid` = "+req.params.expid;
        }
        else
        {
            var sql = '';
        }
            con.query(sql, function (err, result) {
                if (err) {
                    logger.writeLogs({
                        path: "experiences.controller/getExperienceDetails",
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
                     res.send(result);
                     con.release();
                }
            });       
    });
};