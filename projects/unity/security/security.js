const logger = require('../config/logger'),
        mysql = require('mysql'),
        connection = require('../config/connection'),
        crypto = require('crypto');

        module.exports = function (req, res) {
            var token = req.params.token;
            var key = req.params.key;
            console.log(token)
            console.log(key)

            connection.acquire(function (err, con) {
                con.query("SELECT COUNT(*) FROM `access_token` WHERE token = ? AND accesskey = ?",[token,key], function (err, result) {
                    if(err)
                    {
                        res.send({status:0,message:"Something went worng while verifying token, Please try again letter"});
                        con.release();
                    }
                    else
                    {
                        req.tokenApprove = true;
                    }
                });
            });

        };