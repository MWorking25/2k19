
var nodemailer = require('nodemailer');
module.export = {
    
    mailTransporter : nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'mhatremayur2520@gmail.com', // generated ethereal user
            pass: '25031994@M' // generated ethereal password
        }
    }),

    senderEmail : "mhatremayur2520@gmail.com",
    
    
};