const logger = require('../config/logger'),
        mysql = require('mysql'),
        connection = require('../config/connection'),
        crypto = require('crypto');

        module.exports = function (req, res, next) {
            var token = req.params.token;
            var key = req.params.key;

            connection.acquire(function (err, con) {
                con.query('SELECT COUNT(*) FROM `access_token` WHERE token = ? AND key =?',[token,key], function (err, result) {
                    if(err)
                    {
                        Response.send({status:0,message:"Something went worng while verifying token, Please try again letter"});
                        con.release();
                    }
                    else
                    {
                        req.tokenApprove =true;
                    }
                });
            });

        };