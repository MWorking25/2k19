var nodemailer = require('nodemailer');
var mailConfig = require('../config/mail_config');

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'mhatremayur2520@gmail.com', // generated ethereal user
        pass: '25031994@M' // generated ethereal password
    }
});

const senderEmail = "mhatremayur2520@gmail.com";



function sendMail() {

    this.newUserRegistartion = function(maildetails)
    {
        const mailOptions = {
            from: senderEmail, // sender address
            to: maildetails.email, // list of receivers
            subject: 'Welcome New user', // Subject line
            html: 'Dear ' + maildetails.name + '<br><br><br><h1 style="font-weight:bold;text-align:center;">' + maildetails.passwordtxt + '</h1> <br> <p>enter this as a  password for the app.<br><br><br><br> <div style="float:left;text-align:left;">Thanks, <br> Admin <br> (Jupiter Enterprises Pvt. Ltd.)</div></p>' // plain text body
        };



        mailTransporter.sendMail(mailOptions, function (err, info) {
            if (err)
               {
                    console.log(err)
                    return 'error';
                }
            else
                {
                    return info.response;
                }
        });
    }
}

module.exports = new sendMail();

