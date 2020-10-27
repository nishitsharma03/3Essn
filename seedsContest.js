const mongoose = require("mongoose"),
User           = require("./models/user"),
nodemailer     = require('nodemailer');
const { use } = require("passport");

function seedDBContest() {
    User.find({} , (err, users) => {
        if(err){
            console.log(err);
        } else {
            users.map(user => {
                user.savedEvents.forEach(function (event,index) {
                    var now = new Date();
                    var startD = new Date(event.start);
                    var endD = new Date(event.end);
                    //TODO: remove old contest from db also add automation to send email if 1 day left.
                    if(now>endD){
                        // console.log(user.username, event);
                        User.findOneAndUpdate({_id: user._id }, {$pull: { savedEvents: event } }, function (err, msg) {
                            if(err){
                                console.log(err);
                            } else{
                                console.log("Deleted event");
                                // console.log(msg);
                            }
                        });
                    } else {
                        function greetUser() {
                            var HTMLTemplate ="<h1>This is the template</h1>";
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                        user: '3essenn@gmail.com',
                                        // user: process.env.COMPANYMAIL,
                                        pass: '3essenn123'
                                        // pass: process.env.COMANYPASS
                                    }
                            });
                            const mailOptions = {
                                from: '3essenn@gmail.com', 
                                to: user.email,
                                subject: `Contest Reminder!`,
                                html: `<h1 style="text-align: center;"> Reminder for:${event.event}</h1>`
                            };
                            transporter.sendMail(mailOptions, function (err, info) {
                                if(err){
                                    console.log(err)
                                } else {
                                    console.log('Email sent :',info);
                                }
                            });
                        }
                        //! checking time left    
                    }
                })
            });
        }
    });
}

module.exports = seedDBContest;