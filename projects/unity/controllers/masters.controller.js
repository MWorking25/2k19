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


exports.getCountryList = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            con.query("SELECT `id`,`name` FROM `countries` ORDER BY name ASC", function (err, result) {
                if (err) {

                    logger.writeLogs({
                        path: "master.controller/getCountryList",
                        line: "",
                        message: err
                    }, 'error');

                    res.send({
                        status: 0,
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

exports.getStatesList = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            con.query("SELECT `id`,`name` FROM `states` ORDER BY name ASC", function (err, result) {
                if (err) {

                    logger.writeLogs({
                        path: "master.controller/getStatesList",
                        line: "",
                        message: err
                    }, 'error');

                    res.send({
                        status: 0,
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

exports.getStatesOnCountries = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            con.query("SELECT `id`,`name` FROM `states` WHERE `country_id` = " + req.params.countryid + " ORDER BY name ASC", function (err, result) {
                if (err) {

                    logger.writeLogs({
                        path: "master.controller/getStatesOnCountries",
                        line: "",
                        message: err
                    }, 'error');


                    res.send({
                        status: 0,
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

exports.getCitiesList = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            con.query("SELECT `id`,`name` FROM `cities` ORDER BY name ASC", function (err, result) {
                if (err) {

                    logger.writeLogs({
                        path: "master.controller/getCitiesList",
                        line: "",
                        message: err
                    }, 'error');

                    res.send({
                        status: 0,
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

exports.getCitiesOnStates = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            con.query("SELECT `id`,`name` FROM `cities` WHERE `state_id` = " + req.params.stateid + " ORDER BY name ASC", function (err, result) {
                if (err) {

                    logger.writeLogs({
                        path: "master.controller/getCitiesList",
                        line: "",
                        message: err
                    }, 'error');


                    res.send({
                        status: 0,
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


exports.getAreasOnCity = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            con.query("SELECT `id`,`name` FROM `areas` WHERE `cityid` = " + req.params.cityid + " ORDER BY name ASC", function (err, result) {
                if (err) {

                    logger.writeLogs({
                        path: "master.controller/getAreasOnCity",
                        line: "",
                        message: err
                    }, 'error');


                    res.send({
                        status: 0,
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

exports.DeleteAreadetails = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            var ids = '(';
            for (var i = 0; i < req.body.length; i++) {
                ids += req.body[i].id + ',';
            }
            ids = ids.substring(0, ids.length - 1) + ')';

            con.query("DELETE FROM `areas` WHERE areas.id IN " + ids, function (err, result) {
                if (err) {

                    logger.writeLogs({
                        path: "master.controller/DeleteAreadetails",
                        line: "",
                        message: err
                    }, 'error');


                    res.send({
                        status: 0,
                        message: "Something went worng, Please try again letter"
                    });
                    con.release();
                } else {
                    res.send({
                        status: 1,
                        message: "Area details deleted successfully.",
                        type: "success",
                        title: "Done!"
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

exports.getAreaslist = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            con.query("SELECT *,(SELECT states.country_id FROM states WHERE states.id = areas.stateid) as countryid,(SELECT states.name FROM states WHERE states.id = areas.stateid) as statename,(SELECT cities.name FROM cities WHERE cities.id = areas.cityid) as cityname,(SELECT countries.name FROM countries WHERE countries.id = (SELECT states.country_id FROM states WHERE states.id = areas.stateid)) as countryname FROM `areas`", function (err, result) {
                if (err) {


                    logger.writeLogs({
                        path: "master.controller/getAreaslist",
                        line: "",
                        message: err
                    }, 'error');


                    res.send({
                        status: 0,
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

exports.saveUserDetails = function (req, res) {
    if (req.decoded.success == true) {

        var userData = JSON.parse(req.body.userdetails);
        if (req.files.length > 0) {
            userData.profilepic = req.files[0].filename;
        }
        /*         console.log(userData);
                console.log(req.decoded.id);
                console.log(req.Loggedinuser.role); */

        connection.acquire(function (err, con) {


            if (userData.userid != 0) {
                con.query("SELECT COUNT(*) as userexist FROM `users` WHERE `email` =? AND  `id` != ?", [userData.email, userData.userid], function (err, result) {
                    if (err) {


                        logger.writeLogs({
                            path: "master.controller/updateuserdetails-email-verification",
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

                        if (result[0].userexist != 0) {
                            res.send({
                                status: 1,
                                type: "error",
                                title: "Oops!",
                                message: "Email id already exist"
                            });
                            con.release();
                        } else {
                            con.query("SELECT COUNT(*) as userexist FROM `users` WHERE `mobile` =? AND id != ?", [userData.mobile, userData.userid], function (err, result) {
                                if (err) {


                                    logger.writeLogs({
                                        path: "master.controller/updateuserdetails-mobile-verification",
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

                                    if (result[0].userexist != 0) {
                                        res.send({
                                            status: 1,
                                            type: "error",
                                            title: "Oops!",
                                            message: "Mobile Number already exist"
                                        });
                                        con.release();
                                    } else {
                                        con.query("UPDATE `users` SET `name`=?,`email`=?,`mobile`=?,`role`=?,`status`=?,`profilepic`=? WHERE `id`= ?", [userData.fullname, userData.email, userData.mobile, userData.userRole, userData.status, userData.profilepic, userData.userid], function (err, result) {
                                            if (err) {

                                                logger.writeLogs({
                                                    path: "master.controller/updateuserdetails-mobile-verification",
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
                                                    message: "User`s details updated successfully.failed to send password"
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
            } else {

                con.query("SELECT COUNT(*) as userexist FROM `users` WHERE `email` =?", [userData.email], function (err, result) {
                    if (err) {


                        logger.writeLogs({
                            path: "master.controller/saveuserdetails-email-verification",
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

                        if (result[0].userexist != 0) {
                            res.send({
                                status: 1,
                                type: "error",
                                title: "Oops!",
                                message: "Email id already exist"
                            });
                            con.release();
                        } else {
                            con.query("SELECT COUNT(*) as userexist FROM `users` WHERE `mobile` =?", [userData.mobile], function (err, result) {
                                if (err) {


                                    logger.writeLogs({
                                        path: "master.controller/saveuserdetails-mobile-verification",
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

                                    if (result[0].userexist != 0) {
                                        res.send({
                                            status: 1,
                                            type: "error",
                                            title: "Oops!",
                                            message: "Mobile Number already exist"
                                        });
                                        con.release();
                                    } else {

                                        var passwordtxt = "";
                                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                                        for (var i = 0; i < 6; i++) {
                                            passwordtxt += possible.charAt(Math.floor(Math.random() * possible.length));
                                        }

                                        var hashpassword = encrypt(passwordtxt);

                                        con.query("INSERT INTO `users`(`name`, `email`, `mobile`, `role`, `profilepic`, `status`, `password`, `createdby`) VALUES (?,?,?,?,?,?,?,?)", [userData.fullname, userData.email, userData.mobile, userData.userRole, userData.profilepic, 0, hashpassword, req.decoded.id], function (err, result) {
                                            if (err) {

                                                logger.writeLogs({
                                                    path: "master.controller/saveuserdetails-mobile-verification",
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


                                                var emailsent = sendMail.newUserRegistartion({
                                                    name: userData.fullname,
                                                    email: userData.email,
                                                    passwordtxt: passwordtxt
                                                })
                                                if (emailsent == "error") {
                                                    res.send({
                                                        status: 0,
                                                        type: "success",
                                                        title: "Done!",
                                                        message: "User`s details saved successfully.failed to send password"
                                                    });
                                                } else {
                                                    res.send({
                                                        status: 0,
                                                        type: "success",
                                                        title: "Done!",
                                                        message: "User`s details saved successfully.Password had sent to respected user`s email"
                                                    });
                                                }
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


exports.SaveUserDetailsWIthoutPic = function (req, res) {
    if (req.decoded.success == true) {

        var userData = req.body;

        connection.acquire(function (err, con) {


            if (userData.userid != 0) {
                con.query("SELECT COUNT(*) as userexist FROM `users` WHERE `email` =? AND  `id` != ?", [userData.email, userData.userid], function (err, result) {
                    if (err) {


                        logger.writeLogs({
                            path: "master.controller/updateuserdetails-email-verification",
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

                        if (result[0].userexist != 0) {
                            res.send({
                                status: 1,
                                type: "error",
                                title: "Oops!",
                                message: "Email id already exist"
                            });
                            con.release();
                        } else {
                            con.query("SELECT COUNT(*) as userexist FROM `users` WHERE `mobile` =? AND id != ?", [userData.mobile, userData.userid], function (err, result) {
                                if (err) {


                                    logger.writeLogs({
                                        path: "master.controller/updateuserdetails-mobile-verification",
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

                                    if (result[0].userexist != 0) {
                                        res.send({
                                            status: 1,
                                            type: "error",
                                            title: "Oops!",
                                            message: "Mobile Number already exist"
                                        });
                                        con.release();
                                    } else {
                                        con.query("UPDATE `users` SET `name`=?,`email`=?,`mobile`=?,`role`=?,`status`=? WHERE `id`= ?", [userData.fullname, userData.email, userData.mobile, userData.userRole, userData.status, userData.userid], function (err, result) {
                                            if (err) {

                                                logger.writeLogs({
                                                    path: "master.controller/updateuserdetails-mobile-verification",
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
                                                    message: "User`s details updated successfully.failed to send password"
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
            } else {
                con.query("SELECT COUNT(*) as userexist FROM `users` WHERE `email` =?", [userData.email], function (err, result) {
                    if (err) {


                        logger.writeLogs({
                            path: "master.controller/saveuserdetails-email-verification",
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

                        if (result[0].userexist != 0) {
                            res.send({
                                status: 1,
                                type: "error",
                                title: "Oops!",
                                message: "Email id already exist"
                            });
                            con.release();
                        } else {
                            con.query("SELECT COUNT(*) as userexist FROM `users` WHERE `mobile` =?", [userData.mobile], function (err, result) {
                                if (err) {


                                    logger.writeLogs({
                                        path: "master.controller/saveuserdetails-mobile-verification",
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

                                    if (result[0].userexist != 0) {
                                        res.send({
                                            status: 1,
                                            type: "error",
                                            title: "Oops!",
                                            message: "Mobile Number already exist"
                                        });
                                        con.release();
                                    } else {

                                        var passwordtxt = "";
                                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                                        for (var i = 0; i < 6; i++) {
                                            passwordtxt += possible.charAt(Math.floor(Math.random() * possible.length));
                                        }

                                        var hashpassword = encrypt(passwordtxt);

                                        con.query("INSERT INTO `users`(`name`, `email`, `mobile`, `role`, `status`, `password`, `createdby`) VALUES (?,?,?,?,?,?,?)", [userData.fullname, userData.email, userData.mobile, userData.userRole, 0, hashpassword, req.decoded.id], function (err, result) {
                                            if (err) {

                                                logger.writeLogs({
                                                    path: "master.controller/saveuserdetails-mobile-verification",
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


                                                var emailsent = sendMail.newUserRegistartion({
                                                    name: userData.fullname,
                                                    email: userData.email,
                                                    passwordtxt: passwordtxt
                                                })
                                                if (emailsent == "error") {
                                                    res.send({
                                                        status: 0,
                                                        type: "success",
                                                        title: "Done!",
                                                        message: "User`s details saved successfully.failed to send password"
                                                    });
                                                } else {
                                                    res.send({
                                                        status: 0,
                                                        type: "success",
                                                        title: "Done!",
                                                        message: "User`s details saved successfully.Password had sent to respected user`s email"
                                                    });
                                                }
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

exports.saveAreadetails = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            if (req.body.areaid != 0) {
                con.query("UPDATE `areas` SET `name`= ?,`stateid`= ?,`cityid`= ? WHERE id =?", [req.body.areaname, parseInt(req.body.state), parseInt(req.body.city), parseInt(req.body.areaid)], function (err, result) {
                    if (err) {

                        logger.writeLogs({
                            path: "master.controller/saveAreadetails - update record",
                            line: "",
                            message: err
                        }, 'error');

                        res.send({
                            status: 0,
                            message: "Something went worng, Please try again letter",
                            type: "error",
                            title: "Sorry!"
                        });
                        con.release();
                    } else {
                        res.send({
                            status: 1,
                            message: "Area details updated successfully.",
                            type: "success",
                            title: "Done!"
                        });
                        con.release();
                    }
                });
            } else {
                con.query("SELECT count(*) as areaexist FROM `areas` WHERE `name` = ? AND stateid =? AND cityid=?", [req.body.areaname, parseInt(req.body.state), parseInt(req.body.city)], function (err, result) {
                    if (err) {

                        logger.writeLogs({
                            path: "master.controller/saveAreadetails - count for duplication",
                            line: "",
                            message: err
                        }, 'error');


                        res.send({
                            status: 0,
                            message: "Something went worng, Please try again letter",
                            type: "error",
                            title: "Sorry!"
                        });
                        con.release();
                    } else {

                        console.log(result[0].areaexist)
                        if (result[0].areaexist > 0) {
                            res.send({
                                status: 0,
                                message: "This area already exist in system.",
                                type: "error",
                                title: "Sorry!"
                            });
                            con.release();
                        } else {
                            con.query("INSERT INTO `areas`(`name`, `stateid`, `cityid`, `createdby`) VALUES (?,?,?,?)", [req.body.areaname, parseInt(req.body.state), parseInt(req.body.city), parseInt(req.decoded.id)], function (err, result) {
                                if (err) {

                                    logger.writeLogs({
                                        path: "master.controller/saveAreadetails - insert details",
                                        line: "",
                                        message: err
                                    }, 'error');


                                    res.send({
                                        status: 0,
                                        message: "Something went worng, Please try again letter",
                                        type: "error",
                                        title: "Sorry!"
                                    });
                                    con.release();
                                } else {
                                    res.send({
                                        status: 1,
                                        message: "Area details saved successfully.",
                                        type: "success",
                                        title: "Done!"
                                    });
                                    con.release();
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


exports.getUsersList = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            if (req.Loggedinuser.role === 'Superadmin') {
                var sql = "SELECT `id`,`name`,`email`,`mobile`,`role`,`status`,createddate,DATE_FORMAT(createddate,'%d/%m/%Y') AS creationdate,(CASE WHEN status = 0 THEN 'Active' ELSE 'Blocked' END) as userstatus,profilepic FROM `users` ORDER BY id ASC";
            } else {
                var sql = "SELECT `id`,`name`,`email`,`mobile`,`role`,`status`,DATE_FORMAT(createddate,'%d/%m/%Y') AS creationdate,createddate,(CASE WHEN status = 0 THEN 'Active' ELSE 'Blocked' END) as userstatus,profilepic FROM `users` WHERE `createdby` = " + req.decoded.id + "ORDER BY id ASC";
            }
            con.query(sql, function (err, result) {
                if (err) {
                    logger.writeLogs({
                        path: "master.controller/getUsersList",
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

exports.getAmintiesListList = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            if (req.Loggedinuser.role === 'Superadmin') {
                var sql = "SELECT *,DATE_FORMAT(createddate,'%d/%m/%Y') AS creationdate,(SELECT COUNT(*) from hotel_subaminities WHERE hotel_subaminities.aminityid = hotel_aminities.id) as totalaminities FROM `hotel_aminities` ORDER BY id ASC";
            } else {
                var sql = "SELECT *,DATE_FORMAT(createddate,'%d/%m/%Y') AS creationdate,(SELECT COUNT(*) from hotel_subaminities WHERE hotel_subaminities.aminityid = hotel_aminities.id) as totalaminities FROM `hotel_aminities` WHERE `createdby` = " + req.decoded.id + "ORDER BY id ASC";
            }
            con.query(sql, function (err, result) {
                if (err) {
                    logger.writeLogs({
                        path: "master.controller/getAmintiesListList",
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


exports.getAmintiesDetails = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM `hotel_aminities` WHERE `id` = '+ req.params.aminityid, function (err, result) {
                if (err) {
                    logger.writeLogs({
                        path: "master.controller/getAmintiesDetails",
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
                    

                    con.query('SELECT * FROM `hotel_subaminities` WHERE `aminityid` = '+ req.params.aminityid, function (err, subaminities) {
                        if (err) {
                            logger.writeLogs({
                                path: "master.controller/getAmintiesDetails",
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
                            res.send({master:result,subaminities:subaminities});
                            con.release();
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


exports.DeleteUsersDetails = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            var ids = '(';
            for (var i = 0; i < req.body.length; i++) {
                ids += req.body[i].id + ',';
            }
            ids = ids.substring(0, ids.length - 1) + ')';

            con.query("DELETE FROM `users` WHERE id IN " + ids, function (err, result) {
                if (err) {

                    logger.writeLogs({
                        path: "master.controller/DeleteUsersDetails",
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
                    res.send({
                        status: 1,
                        message: "User details deleted successfully.",
                        type: "success",
                        title: "Done!"
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


exports.SaveAminityDetails = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            if(req.body[0].id > 0)
            {
                var verificationsql = "SELECT COUNT(*) as aminityexist FROM `hotel_aminities` WHERE `amenity` = ? AND id != ?"
            }
            else
            {
                var verificationsql = "SELECT COUNT(*) as aminityexist FROM `hotel_aminities` WHERE `amenity` = ?"
            }
            con.query(verificationsql, [req.body[0].amenity,req.body[0].id], function (err, result) {
                if (err) {

                    logger.writeLogs({
                        path: "master.controller/SaveAminityDetails - verifyname",
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
                    if(result[0].aminityexist > 0)
                    {
                        res.send({
                            status: 0,
                            type: "error",
                            title: "Oops!",
                            message: "This name already exist"
                        });
                        con.release();  
                    }
                    else
                    {

                        if(req.body[0].id > 0)
                        {
                            var sql = "UPDATE `hotel_aminities` SET `amenity`=?,`amenity_icon`= ? WHERE `id` = ?";
                            var fields = [req.body[0].amenity, (req.body[0].amenity_icon || null), req.body[0].id]
                        }
                        else
                        {
                            var sql = "INSERT INTO `hotel_aminities`(`amenity`, `amenity_icon`, `createdby`) VALUES (?,?,?)";
                            var fields = [req.body[0].amenity, (req.body[0].amenity_icon || null), req.decoded.id]
                        }

                    con.query(sql,fields, function (err, result) {
                        if (err) {

                            logger.writeLogs({
                                path: "master.controller/SaveAminityDetails -- saev-master-aminity",
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


                            if(result.insertId > 0)
                             {
                                var masterid = result.insertId;
                             }
                             else
                             {
                                var masterid = req.body[0].id;
                             }

                            var ss = '';
                            for(var i = 0 ; i < req.body[0].AminitiesList.length ; i++)
                            {

                                if(req.body[0].AminitiesList[i].id > 0)
                                {
                                    ss+='UPDATE `hotel_subaminities` SET `name`= "'+req.body[0].AminitiesList[i].name+'" WHERE `id` = '+req.body[0].AminitiesList[i].id+';';
                                }
                                else
                                {
                                    ss+= 'INSERT INTO `hotel_subaminities`(`aminityid`, `name`, `createdby`) VALUES ('+masterid+',"'+req.body[0].AminitiesList[i].name+'",'+req.decoded.id+');';
                                }
                                
                            }
                            con.query(ss, function (err, result) {
                                if (err) {
        
                                    logger.writeLogs({
                                        path: "master.controller/SaveAminityDetails -- saev-details-aminity",
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
                                    res.send({
                                        status: 1,
                                        message: "Aminity details saved successfully.",
                                        type: "success",
                                        title: "Done!"
                                    });
                                    con.release();
                                }
                            });
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

exports.DeleteAminityDetails = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            var ids = '(';
            for (var i = 0; i < req.body.length; i++) {
                ids += req.body[i].id + ',';
            }
            ids = ids.substring(0, ids.length - 1) + ')';

            con.query("DELETE FROM `hotel_subaminities` WHERE `aminityid` IN "+ids+" ;DELETE FROM `hotel_aminities` WHERE `id` IN  " + ids, function (err, result) {
                if (err) {

                    logger.writeLogs({
                        path: "master.controller/DeleteUsersDetails",
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
                    res.send({
                        status: 1,
                        message: "Aminity details deleted successfully.",
                        type: "success",
                        title: "Done!"
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



exports.saveMemberDetails = function (req, res) {
        connection.acquire(function (err, con) {

            

            if(req.body.id)
            {
                var mobileverify = 'SELECT COUNT(*) AS isexist FROM `members_master` WHERE `mobile` = '+req.body.mobile+' AND `id` != '+req.body.id;
                var emailverify = 'SELECT COUNT(*) AS isexist FROM `members_master` WHERE `email` = "'+req.body.email+'" AND `id` != '+req.body.id;
                var sql  = 'UPDATE `members_master` SET ? WHERE id = ?';
                var sqlObj = [req.body,req.body.id];
            }
            else
            {
                var mobileverify = 'SELECT COUNT(*) AS isexist FROM `members_master` WHERE `mobile` = '+req.body.mobile;
                var emailverify = 'SELECT COUNT(*) AS isexist FROM `members_master` WHERE `email` = "'+req.body.email+'"';
                var sql  = 'INSERT INTO `members_master` SET ?';
                var sqlObj = req.body;
            }

            con.query(mobileverify, function (err, mobilecount) {
                if (err) {

                    logger.writeLogs({
                        path: "master.controller/saveMemberDetails",
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
                  if(mobilecount[0].isexist > 0)
                  {
                    res.send({
                        status: 0,
                        type: "error",
                        title: "Oops!",
                        message: "Mobile number already exist"
                    });
                    con.release();
                  }
                  else
                  {
                    con.query(emailverify, function (err, emailcount) {
                        if (err) {
        
                            logger.writeLogs({
                                path: "master.controller/saveMemberDetails",
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
                           if(emailcount[0].isexist > 0)
                           {
                            res.send({
                                status: 0,
                                type: "error",
                                title: "Oops!",
                                message: "Email id already exist"
                            });
                            con.release();
                           }
                           else
                           {
                            con.query(sql,sqlObj, function (err, result) {
                                if (err) {
                
                                    logger.writeLogs({
                                        path: "master.controller/saveMemberDetails",
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
                                    res.send({
                                        status: 1,
                                        message: "Thank You!",
                                        type: "success",
                                        title: "Welcome!",
                                        object:{id:result.insertId,firstname:req.body.firstname,lastname:req.body.lastname,mobile:req.body.mobile,email:req.body.email}
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
        });
};


