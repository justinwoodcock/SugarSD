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

        var transporter = nodemailer.createTransport({
            service: 'Mandrill',
            host: 'smtp.mandrillapp.com',
            port: 587,
            auth: {
                user: 'info@sugarsandiego.com',
                pass: 'f17VPLuDdNE5qp3TKmVtUw'
            }
        });
        
        // NB! No need to recreate the transporter object. You can use
        // the same transporter object for all e-mails

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: params.name + '<' + params.email + '>', // sender address
            to: 'info@sugarsandiego.com', // list of receivers
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