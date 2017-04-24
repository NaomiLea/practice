var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var smtpPool = require('nodemailer-smtp-pool');
var transporter = require("transporter");
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './app/public')));

app.get("/", function(req, res) {

    res.sendFile(path.join(__dirname + '/app/index.html'));

})
app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})


app.post("/contact", urlencodedParser, function(req, res) {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'naomikudren@gmail.com',
            pass: 'Pass'
        }
    });

    // setup email data with unicode symbols
    var mailOptions = {
        from: '"Naomi Kudren" <naomikudren@gmail.com>', // sender address
        to: 'Naomi, naomikudren@gmail.com', // list of receivers
        subject: 'Hello ', // Subject line
        text: 'Hello', // plain text body
        html: `Name:${req.body.name}, <br>Phone:${req.body.tel}, <br>${req.body.email}, <br>Message:${req.body.message}` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            res.redirect('/');
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
});
