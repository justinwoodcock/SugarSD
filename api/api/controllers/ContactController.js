/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var nodemailer = require('nodemailer');
module.exports = {
    email: function(req, res) {

        var params = req.params.all();

        if (!params.name || !params.email || !params.message) {
            res.send(500);
        }

        // create reusable transporter object using SMTP transport
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'gmail_user',
                pass: 'gmail_pass'
            }
        });

        // NB! No need to recreate the transporter object. You can use
        // the same transporter object for all e-mails

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: params.name + '<' + params.email + '>', // sender address
            to: 'justin@digitaluprisingdesign.com', // list of receivers
            subject: params.name + ' submitted your sugarsandiego.com contact form.', // Subject line
            //text: params.message, // plaintext body
            html: params.message // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    }
};