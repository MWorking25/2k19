const logger = require('../config/logger'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    express = require('express'),
    connection = require('../config/connection'),
    crypto = require('crypto'),
    app = express();



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

exports.DeleteAreadetails = function (req, res) {
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            var ids ='(';
            for(var i =0;i < req.body.length;i++)
            {
                    ids+= req.body[i].id+',';
            }
            ids = ids.substring(0,ids.length -1)+')';

            con.query("DELETE FROM `areas` WHERE areas.id IN "+ids, function (err, result) {
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
                    res.send({status:1,message:"Area details deleted successfully.",type:"success",title:"Done!"});
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
        if(req.files.length > 0)
        {
            userData.profilepic =  req.files[0].filename;
        }
        console.log(userData);

       /*  connection.acquire(function (err, con) {
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
        }); */
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
        
        console.log(userData);

       /*  connection.acquire(function (err, con) {
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
        }); */
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
            if(req.body.areaid != 0)
            {
                con.query("UPDATE `areas` SET `name`= ?,`stateid`= ?,`cityid`= ? WHERE id =?",[req.body.areaname,parseInt(req.body.state),parseInt(req.body.city),parseInt(req.body.areaid)],function(err,result){
                    if(err)
                    {
                        
                        logger.writeLogs({
                            path: "master.controller/saveAreadetails - update record",
                            line: "",
                            message: err
                        }, 'error');

                        res.send({status:0,message:"Something went worng, Please try again letter",type:"error",title:"Sorry!"});
                        con.release();
                    }
                    else
                    {
                        res.send({status:1,message:"Area details updated successfully.",type:"success",title:"Done!"});
                        con.release();
                    }
                });   
            }
            else
            {
            con.query("SELECT count(*) as areaexist FROM `areas` WHERE `name` = ? AND stateid =? AND cityid=?",[req.body.areaname,parseInt(req.body.state),parseInt(req.body.city)], function (err, result) {
                if (err) {

                    logger.writeLogs({
                        path: "master.controller/saveAreadetails - count for duplication",
                        line: "",
                        message: err
                    }, 'error');


                    res.send({status:0,message:"Something went worng, Please try again letter",type:"error",title:"Sorry!"});
                    con.release();
                } else {
                    
                    console.log(result[0].areaexist)
                    if(result[0].areaexist > 0)
                    {
                        res.send({status:0,message:"This area already exist in system.",type:"error",title:"Sorry!"});
                        con.release();
                    }
                    else{
                            con.query("INSERT INTO `areas`(`name`, `stateid`, `cityid`, `createdby`) VALUES (?,?,?,?)",[req.body.areaname,parseInt(req.body.state),parseInt(req.body.city),parseInt(req.decoded.id)],function(err,result){
                                if(err)
                                {

                                    logger.writeLogs({
                                        path: "master.controller/saveAreadetails - insert details",
                                        line: "",
                                        message: err
                                    }, 'error');
                

                                    res.send({status:0,message:"Something went worng, Please try again letter",type:"error",title:"Sorry!"});
                                    con.release();
                                }
                                else
                                {
                                    res.send({status:1,message:"Area details saved successfully.",type:"success",title:"Done!"});
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