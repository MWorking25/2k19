const logger = require('../config/logger'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    express = require('express'),
    connection = require('../config/connection'),
    crypto = require('crypto'),
    app = express();
var encryptionKey = process.env.ENC_TOKEN;

app.set('superSecret', process.env.jwt_secret);

encrypt = function (text) {

    if (text === null || typeof text === 'undefined') {
        return text;
    };
    var cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
};


exports.authenticateUser = function (req, res) {
    // if (req.tokenApprove === true) {
        var hashedString = encrypt(String(req.body.passwordCtrl));
        connection.acquire(function (err, con) {
			console.log(hashedString);
            con.query('SELECT `id`,`name`,`role`,`profilepic`,`status` FROM `users` WHERE `email` =? AND `password` =?', [req.body.useremailCtrl, hashedString], function (err, result) {
                if (err) {
                    logger.writeLogs({
                        path: "users.controller/authenticateUser",
                        line: "",
                        message: err
                    }, 'error');
                    res.send({
                        success:false,
                        message: "Somthing went wrong"
                    });
                    connection.disconnect();
                } else {

                    if (result.length === 1) {

                        if (result[0].status === 1) 
                        {
                            res.send({success:false,message:'You are blocked from admin'})    
                        } 
                        else {

                            var tokenpayload = {
                                id: result[0].id
                            };

                            var token = jwt.sign(tokenpayload, app.get('superSecret'), {
                                expiresIn: 86400 // expires in 24 hours = 86400
                            });

                            res.cookie('token', token, {
                                httpOnly: true
                            });
                            res.cookie('name', result[0].name, {
                                httpOnly: true
                            });
                            res.cookie('role', result[0].role, {
                                httpOnly: true
                            });

                            var responsePayload = {
                                success:true,
                                token: token,
                                name: result[0].name,
                                role: result[0].role,
                                profilepic: result[0].profilepic,
                            }

                            res.json(responsePayload);
                            con.release();
                        }
                    }
                    else
                    {
                        res.send({success:false,message:'Email id or password does not match, Please try again.'}) 
                    }
                }
            });
        });
    /* } else {
        res.json({
            status: 0,
            message: "Invalid access token and key pair"
        });
    } */
};



exports.checkTokenValidation = function(req,res)
   {

    var verificationObject = [{}];

    function getvaluesinObject(passedval) {
        var charindex = passedval.indexOf("=");
        var strindex = passedval.length;
        var field = passedval.substring(0, charindex).trim();
        var value = passedval.substring(charindex + 1, strindex);

        verificationObject[0][field] = value.trim();


    };

    if(req.headers.cookie)
	{   

        req.headers.cookie.replace(/[^0-9]/g, '');
            var cookies = req.headers.cookie.split(';', 20);
			cookies.map(function (value) {
				getvaluesinObject(value)
			});
    // check header or url parameters or post parameters for token
    var token = verificationObject[0].token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                res.send({success:false});
            } else {
                res.send({success:true});
            }
        });

    } else {
        res.send({success:false});
    }
}
};
