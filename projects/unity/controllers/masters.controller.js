const logger = require('../config/logger'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    express = require('express'),
    connection = require('../config/connection'),
    crypto = require('crypto'),
    app = express();



exports.getCountryList = function (req, res) {
    console.log(req.decoded.success == true)
    if (req.decoded.success == true) {
        connection.acquire(function (err, con) {
            con.query("SELECT `id`,`name` FROM `countries` ORDER BY name ASC", function (err, result) {
                if (err) {
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