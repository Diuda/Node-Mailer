var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var mysql = require('mysql');
var obj;

router.perform = function(req, res, next) {
    var emails = [];

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'node',
        password: 'node',
        database: 'mailer'
    })

    connection.connect(function(err) {
        if (err) throw err
        console.log('You are now connected');
    });
    // connection.query('create table members(mid int primary key,name varchar(30),email varchar(30),access int)',function(err,result){
    // 	if(err) throw err
    // })
    connection.query('Select email from members where access=3', function(err, result) {
        if (err) throw err;
        for (var i in result) {
            emails.push(result[i].email);
        }
		connection.end();

        var transporter = nodemailer.createTransport('smtps://divyanshu.1996@gmail.com:battleforglory@smtp.gmail.com');

        var topeople = emails.join(',');

        var mailOptions = {
            from: '"Divyanshu" <divyanshu.1996@gmail.com>',
            to: topeople,
            subject: 'Test Mailer',
            text: 'Testting IECSE Mailer',
            html: 'Embedded image: <img src="cid:unique"/>',
            attachments: [{
                path: '../index.jpeg',
                cid: 'unique'
            }]
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error)
                return res.send(error);
            else {
                res.send('Message Sent: ' + info.response);
            }
        });
    });
};
module.exports = router;
