var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var mysql = require('mysql');






router.perform = function(req, res, next) {

	var connection = mysql.createConnection({
	host:'localhost',
	user:'node',
	password:'node',
	database:'mailer'
	})

	connection.connect(function(err){
		if(err) throw err
			console.log('You are now connected');
	})
		// connection.query('create table members(mid int primary key,name varchar(30),email varchar(30),access int)',function(err,result){
		// 	if(err) throw err
		// })


    var transporter = nodemailer.createTransport('smtps://divyanshu.1996@gmail.com:battleforglory@smtp.gmail.com');

    var mailOptions = {
        from: '"Divyanshu" <divyanshu.1996@gmail.com>',
        to: 'divyanshu.1996@gmail.com, mehulshekharmukherjee@gmail.com',
        subject: 'Hello',
        text: 'Testting IECSE Mailer',
        html: 'Embedded image: <img src="cid:unique"/>',
        attachments: [{
            path: '../index.jpeg',
            cid: 'unique'
        }]


    };


    transporter.sendMail(mailOptions, function(error, info) {
        if (error)
            return console.log(error);
        else
            console.log('Message Sent: ' + info.response);
    });
    res.send();

};
module.exports = router;
