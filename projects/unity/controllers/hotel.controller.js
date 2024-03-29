const logger = require('../config/logger'),
    express = require('express'),
    connection = require('../config/connection'),
    env= require('../config/env/env'),
    app = express();
var sendMail = require('./mail.controller');

var fileUrl = env.devfilesUrl;

exports.SaveHotelDetails = function (req, res) {

     if (req.decoded.success == true) {

        
    if (req.files && req.body.hoteldetails) {
        var hoteldetails = JSON.parse(req.body.hoteldetails);
             hoteldetails.bannerimg = req.files[0].filename;
    } else {
        var hoteldetails = req.body;
    }

    hoteldetails.created_by = req.decoded.id;

        connection.acquire(function (err, con) {
            if(hoteldetails.id != 0)
            {
                con.query("SELECT COUNT(*) mobile_exist,mobile1,mobile2 FROM `hotel_master` WHERE id != ? AND (mobile1 = ?  OR mobile2 = ? OR mobile1 =? OR mobile2 =?)",[hoteldetails.id,hoteldetails.mobile1,hoteldetails.mobile2,hoteldetails.mobile1,hoteldetails.mobile2], function (err, result) {
                    if (err) {

                   logger.writeLogs({
                       path: "master.controller/getCountryList",
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

                   if(result[0].mobile_exist > 0)
                   {
                       
                       if(result[0].mobile1 == hoteldetails.mobile1 || result[0].mobile2 == hoteldetails.mobile1)
                       {
                           var message = "Mobile number already exist."
                       }
                       if(result[0].mobile1 == hoteldetails.mobile2 || result[0].mobile2 == hoteldetails.mobile2)
                       {
                           var message = "Alternate Mobile number already exist."
                       }
                       res.send({
                           status: 0,
                           type: "error",
                           title: "Oops!",
                           message: message
                       });
                       con.release();
                   }
                   else
                   {
                       con.query("SELECT COUNT(*) email_exist FROM `hotel_master` WHERE `email` = ? AND id != ?",[hoteldetails.email,hoteldetails.id], function (err, result) {
                           if (err) {
           
                               logger.writeLogs({
                                   path: "master.controller/getCountryList",
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
           
                               if(result[0].email_exist > 0)
                               {
                                   res.send({
                                       status: 0,
                                       type: "error",
                                       title: "Oops!",
                                       message: "Email already exist."
                                   });
                                   con.release();
                               }
                               else
                               {
                                   con.query("UPDATE `hotel_master` SET ? WHERE ID =?",[hoteldetails,hoteldetails.id], function (err, result) {
                                       if (err) {
                       
                                           logger.writeLogs({
                                               path: "master.controller/getCountryList",
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
                                               message: "Hotel details saved successfully",
                                               hotelid:result.insertId
                                           });
                                           con.release();
                                       }
                                   });       
                               }
                           }
                       });   
                   }

               }
           });
            }
            else
            {  
                 con.query("SELECT COUNT(*) mobile_exist,mobile1,mobile2 FROM `hotel_master` WHERE mobile1 = ?  OR mobile2 = ? OR mobile1 =? OR mobile2 =?",[hoteldetails.mobile1,hoteldetails.mobile2,hoteldetails.mobile1,hoteldetails.mobile2], function (err, result) {
                     if (err) {

                    logger.writeLogs({
                        path: "master.controller/getCountryList",
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

                    if(result[0].mobile_exist > 0)
                    {
                        
                        if(result[0].mobile1 == hoteldetails.mobile1 || result[0].mobile2 == hoteldetails.mobile1)
                        {
                            var message = "Mobile number already exist."
                        }
                        if(result[0].mobile1 == hoteldetails.mobile2 || result[0].mobile2 == hoteldetails.mobile2)
                        {
                            var message = "Alternate Mobile number already exist."
                        }
                        res.send({
                            status: 0,
                            type: "error",
                            title: "Oops!",
                            message: message
                        });
                        con.release();
                    }
                    else
                    {
                        con.query("SELECT COUNT(*) email_exist FROM `hotel_master` WHERE `email` = ?",[hoteldetails.email], function (err, result) {
                            if (err) {
            
                                logger.writeLogs({
                                    path: "master.controller/getCountryList",
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
            
                                if(result[0].email_exist > 0)
                                {
                                    res.send({
                                        status: 0,
                                        type: "error",
                                        title: "Oops!",
                                        message: "Email already exist."
                                    });
                                    con.release();
                                }
                                else
                                {
                                    con.query("INSERT INTO `hotel_master` SET ?",hoteldetails, function (err, result) {
                                        if (err) {
                        
                                            logger.writeLogs({
                                                path: "master.controller/getCountryList",
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
                                                message: "Hotel details saved successfully",
                                                hotelid:result.insertId
                                            });
                                            con.release();
                                        }
                                    });       
                                }
                            }
                        });   
                    }

                }
            });
            }
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

exports.SaveHotelRoomDetails = function (req, res) {

     if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
               var ss = '';
                for(var i =0 ; i < req.body.length;i++)
                {
                    req.body[i].createdby = req.decoded.id;
                    delete req.body[i].createddate;
                }
                for(var i =0 ; i < req.body.length;i++)
                {
                    if(req.body[i].id == 0)
                    {
                        ss += "INSERT INTO `hotel_rooms`(`hotelid`, `room_type`,`capacity`, `description`, `price`, `discounted_price`, `rooms_count`,  `createdby`) VALUES ("+req.body[i].hotelid+",'"+req.body[i].room_type+"',"+(req.body[i].capacity || 0)+",'"+(req.body[i].description||null)+"',"+(req.body[i].price || 0)+","+(req.body[i].discounted_price||0)+","+(req.body[i].rooms_count || 0)+","+req.body[i].createdby +");";
                    }
                    else
                    {
                        ss += "UPDATE `hotel_rooms` SET `room_type`= '"+req.body[i].room_type+"' ,`rooms_count`= "+(req.body[i].rooms_count || 0)+" ,`description`= '"+(req.body[i].description||null)+"' ,`capacity`= "+(req.body[i].capacity || 0)+" ,`price`= "+(req.body[i].price||0)+" ,`discounted_price`= "+(req.body[i].discounted_price||0)+" WHERE `id` = "+req.body[i].id+";";
                    }
                }
                //  ss = ss.substring(0,ss.length -1);

                con.query(ss, function (err, result) {
                    if (err) {
    
                        logger.writeLogs({
                            path: "master.controller/getCountryList",
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
                            message: "Hotel`s rooms details saved successfully",
                            hotelid:req.body[0].hotelid
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


exports.HotelsList = function (req, res) {

     if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
             
            if(req.Loggedinuser.role === 'Superadmin')
            {
                var sql = "SELECT `id`,`name`,`addressline1`,`addressline2`,`email`,`mobile1`,DATE_FORMAT(`created_date`,'%d-%m-%Y') as createddate,(CASE WHEN status =0 THEN 'Active' ELSE 'Blocked' END) as activestatus,(CASE WHEN area >0 THEN (SELECT areas.name FROM areas WHERE areas.id = hotel_master.area) ELSE '' END) as areaname,(CASE WHEN `city` >0 THEN (SELECT cities.name FROM cities WHERE cities.id = hotel_master.`city`) ELSE '' END) as cityname,(CASE WHEN `state` >0 THEN (SELECT states.name FROM states WHERE states.id = hotel_master.`state`) ELSE '' END) as statename,(CASE WHEN `country` >0 THEN (SELECT countries.name FROM countries WHERE countries.id = hotel_master.`country`) ELSE '' END) as countryname FROM `hotel_master` WHERE status != 2";
            }
            else
            {
                    var sql  ="SELECT `id`,`name`,`addressline1`,`addressline2`,`email`,`mobile1`,DATE_FORMAT(`created_date`,'%d-%m-%Y') as createddate,(CASE WHEN status =0 THEN 'Active' ELSE 'Blocked' END) as activestatus,(CASE WHEN area >0 THEN (SELECT areas.name FROM areas WHERE areas.id = hotel_master.area) ELSE '' END) as areaname,(CASE WHEN `city` >0 THEN (SELECT cities.name FROM cities WHERE cities.id = hotel_master.`city`) ELSE '' END) as cityname,(CASE WHEN `state` >0 THEN (SELECT states.name FROM states WHERE states.id = hotel_master.`state`) ELSE '' END) as statename,(CASE WHEN `country` >0 THEN (SELECT countries.name FROM countries WHERE countries.id = hotel_master.`country`) ELSE '' END) as countryname FROM `hotel_master` WHERE  status != 2 AND created_by = "+req.decoded.id;
            }

                con.query(sql, function (err, result) {
                    if (err) {
    
                        logger.writeLogs({
                            path: "hotel.controller/HotelsList",
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



exports.getRelaventSearch = function (req, res) {
    connection.acquire(function (err, con) {
            con.query("SELECT areas.`name` AS serachresult,areas.id as areaid,areas.stateid,areas.cityid, (SELECT states.country_id FROM states WHERE states.id = areas.stateid) as countryid,(CASE WHEN areas.cityid > 0 THEN (SELECT CONCAT(cities.name,', ',(SELECT states.name FROM states WHERE states.id = cities.state_id),', ',(SELECT countries.name FROM countries WHERE countries.id = (SELECT states.country_id FROM states WHERE states.id = cities.state_id LIMIT 1))) FROM cities WHERE cities.id = areas.cityid) ELSE '' END) as address, 'Place' as type FROM `areas` WHERE areas.name LIKE '%"+req.params.filteredkeyword+"%' UNION SELECT hotel_master.name as serachresult ,hotel_master.area as areaid,hotel_master.state as stateid,hotel_master.city as cityid,hotel_master.country as countryid,CONCAT((CASE WHEN hotel_master.area > 0 THEN (SELECT areas.name FROM areas WHERE areas.id = hotel_master.area) ELSE '' END),', ',(CASE WHEN hotel_master.city > 0 THEN (SELECT cities.name FROM cities WHERE cities.id = hotel_master.city) ELSE '' END),', ',(CASE WHEN hotel_master.state > 0 THEN (SELECT states.name FROM states WHERE states.id = hotel_master.state) ELSE '' END),', ',(CASE WHEN hotel_master.country > 0 THEN (SELECT countries.name FROM countries WHERE countries.id = hotel_master.country) ELSE '' END)) AS address, 'Place' as type FROM hotel_master WHERE hotel_master.name LIKE '%"+req.params.filteredkeyword+"%' UNION SELECT cities.name AS serachresult ,0 as areaid,cities.state_id as stateid, cities.id AS cityid,(SELECT states.country_id FROM states WHERE states.id = cities.state_id) as countryid, CONCAT((SELECT states.name FROM states WHERE states.id = cities.state_id),', ',(SELECT countries.name FROM countries WHERE countries.id = (SELECT states.country_id FROM states WHERE states.id = cities.state_id))) as address, 'City' as type FROM cities  WHERE cities.name LIKE '%"+req.params.filteredkeyword+"%' UNION SELECT states.name AS serachresult ,0 as areaid,states.id as stateid,0 as cityid,states.country_id as countryid, (SELECT countries.name FROM countries WHERE countries.id = states.country_id) as address, 'State' as type FROM states WHERE states.name LIKE '%"+req.params.filteredkeyword+"%'", function (err, result) {
                if (err) {

                    logger.writeLogs({
                        path: "master.controller/getCountryList",
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

exports.getHotelDetails = function (req, res) {

     if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
                con.query('SELECT * FROM `hotel_master` WHERE id = '+req.params.hotelid, function (err, hoteldetails) {
                    if (err) {
    
                        logger.writeLogs({
                            path: "hotel.controller/getHotelDetails",
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
                     

                        con.query('SELECT * FROM `hotel_rooms` WHERE `hotelid` =  '+req.params.hotelid, function (err, roomsdetails) {
                            if (err) {
            
                                logger.writeLogs({
                                    path: "hotel.controller/getHotelDetails-roomsdetails",
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
                                con.query('SELECT *,CONCAT("'+fileUrl+'",filename) AS tmpfilename FROM `hotel_pics` WHERE `hotelid` =  '+req.params.hotelid, function (err, hotelPics) {
                                    if (err) {
                    
                                        logger.writeLogs({
                                            path: "hotel.controller/getHotelDetails-hotelPics",
                                            line: "",
                                            message: err
                                        }, 'error');
                    
                                        res.send({hoteldetails:hoteldetails,roomsdetails:roomsdetails});
                                            con.release();
                                        con.release();
                                    } else {
                                            res.send({hoteldetails:hoteldetails,roomsdetails:roomsdetails,hotelPics:hotelPics});
                                            con.release();
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


exports.DeleteHotelDetails = function (req, res) {

     if (req.decoded.success == true) {
        connection.acquire(function (err, con) {


            var ids = '(';
            for (var i = 0; i < req.body.length; i++) {
                ids += req.body[i] + ',';
            }
            ids = ids.substring(0, ids.length - 1) + ')';

                con.query('UPDATE `hotel_master` SET `status` = 2 WHERE `id` IN '+ids, function (err, result) {
                    if (err) {
    
                        logger.writeLogs({
                            path: "hotel.controller/getHotelDetails",
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

exports.deleteRoomDetails = function (req, res) {

     if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
                con.query('DELETE FROM `hotel_rooms` WHERE `id` = '+req.params.roomid, function (err, result) {
                    if (err) {
    
                        logger.writeLogs({
                            path: "hotel.controller/deleteRoomDetails",
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
                            message: "Item deleted successfully"
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

exports.getHotelsListOnFilters = function (req, res) {
        connection.acquire(function (err, con) {
                con.query("SELECT `id`,`name`,CONCAT('"+fileUrl+"',`bannerimg`) AS bannerinage,description,IFNULL((SELECT hotel_rooms.price FROM hotel_rooms WHERE hotel_rooms.hotelid = hotel_master.id AND hotel_rooms.price > 0 ORDER BY hotel_rooms.price ASC LIMIT 1),0) as price,IFNULL((SELECT hotel_rooms.discounted_price FROM hotel_rooms WHERE hotel_rooms.hotelid = hotel_master.id AND hotel_rooms.discounted_price > 0 ORDER BY hotel_rooms.discounted_price ASC LIMIT 1),0) as discounted_price FROM `hotel_master` WHERE hotel_master.status != 2 AND (hotel_master.name LIKE '%"+req.body.location.serachresult+"%' OR hotel_master.area = "+req.body.location.areaid+"  OR hotel_master.city = "+req.body.location.cityid+" OR hotel_master.state = "+req.body.location.stateid+" OR hotel_master.country = "+req.body.location.countryid+")", function (err, result) {
                    if (err) {
    
                        logger.writeLogs({
                            path: "hotel.controller/deleteRoomDetails",
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


exports.getHotelsDeatils = function (req, res) {
        connection.acquire(function (err, con) {
                con.query("SELECT *,(SELECT areas.name FROM areas WHERE areas.id = hotel_master.area) AS areaname,(SELECT cities.name FROM cities WHERE cities.id = hotel_master.city) AS cityname,(SELECT states.name FROM states WHERE states.id = hotel_master.state) AS statename, (SELECT countries.name FROM countries WHERE countries.id = hotel_master.country) AS countryname,CONCAT('"+fileUrl+"',`bannerimg`) AS bannerinage,IFNULL((SELECT hotel_rooms.price FROM hotel_rooms WHERE hotel_rooms.hotelid = hotel_master.id AND hotel_rooms.price > 0 ORDER BY hotel_rooms.price ASC LIMIT 1),0) as price,IFNULL((SELECT hotel_rooms.discounted_price FROM hotel_rooms WHERE hotel_rooms.hotelid = hotel_master.id AND hotel_rooms.discounted_price > 0 ORDER BY hotel_rooms.discounted_price ASC LIMIT 1),0) as discounted_price FROM `hotel_master` WHERE id = "+parseInt(req.params.hotelid), function (err, result) {
                    if (err) {
    
                        logger.writeLogs({
                            path: "hotel.controller/getHotelsDeatils",
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


exports.SavehotelAminities = function (req, res) {
        connection.acquire(function (err, con) {
                con.query("UPDATE hotel_master SET aminities =? WHERE id = ?",[JSON.stringify(req.body),parseInt(req.body[0].hotelid)], function (err, result) {
                    if (err) {
    
                        logger.writeLogs({
                            path: "hotel.controller/SavehotelAminities",
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
};


exports.uploadHotelImages = function (req, res) {

 
   if (req.decoded.success == true) {
       connection.acquire(function (err, con) {

        if (req.files && req.body.hotelDetails) {
            var hotelDetails = JSON.parse(req.body.hotelDetails);
            hotelDetails.filename = req.files[0].filename;
        } else {
            var hotelDetails = req.body;
        }
        
        if(hotelDetails.id != 0)
        {
            var sql = "UPDATE `hotel_pics` SET ?  WHERE `id` = ?";
            var dataObj = [hotelDetails,hotelDetails.id]
        }
        else
        {
            hotelDetails.createdby = req.decoded.id;
            var sql = "INSERT INTO `hotel_pics` SET ?";
            var dataObj = hotelDetails
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


exports.RemoveHotelGalleryImage = function (req, res) {

    if (req.decoded.success == true) {
       connection.acquire(function (err, con) {
               con.query("DELETE FROM `hotel_pics` WHERE `id` = "+req.params.imgid, function (err, result) {
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
