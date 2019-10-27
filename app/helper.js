'use strict';

var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    hbs = require('hbs'),
    mongoose = require('mongoose'),
    request = require('request'),
    fs = require('fs');


/**
 *
 */



/**
 *
 */
exports.sendHTMLEmail = function(view, dynamicFields, mailOptions, cb) {
    fs.readFile(__dirname + '/../email-template/' + view, 'utf8', function(err, htmlData) {
        var template = hbs.compile(htmlData);

        var compiledHTML = template(dynamicFields || {});
        mailOptions.html = compiledHTML;

        exports.sendMail(mailOptions, (err, response) => {
            cb(true);
        });
    });
};
