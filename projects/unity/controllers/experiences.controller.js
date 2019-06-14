const logger = require('../config/logger'),
    express = require('express'),
    connection = require('../config/connection'),
    app = express();
var sendMail = require('./mail.controller');




exports.getCruzList = function (req, res) {

    if (req.decoded.success == true) {
       connection.acquire(function (err, con) {
            
           if(req.Loggedinuser.role === 'Superadmin')
           {
               var sql = "SELECT `id`,`name`,`price`,`discounted_price`,`igst`,`cgst`,`sgst`,`capacity` FROM `cruze`";
           }
           else
           {
                   var sql  ="SELECT `id`,`name`,`price`,`discounted_price`,`igst`,`cgst`,`sgst`,`capacity` FROM `cruze` WHERE `createdby`  = "+req.decoded.id;
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