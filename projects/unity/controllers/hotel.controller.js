const logger = require('../config/logger'),
    express = require('express'),
    connection = require('../config/connection'),
    app = express();
var sendMail = require('./mail.controller');



exports.SaveHotelDetails = function (req, res) {

    console.log(req.files)
    console.log(req.body)

    /* if (req.decoded.success == true) {
        connection.acquire(function (err, con) {


            if(req.body.hoteldetails.hotelid != 0)
            {
                
            }
            else
            {
                    
            con.query("", function (err, result) {
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

                    if(result.mobile_exist > 0)
                    {
                        res.send({
                            status: 0,
                            type: "error",
                            title: "Oops!",
                            message: "Mobile Number(s) already exist."
                        });
                        con.release();
                    }
                    else
                    {
                        con.query("", function (err, result) {
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
            
                                if(result.email_exist > 0)
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

    } */
};

