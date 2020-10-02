const mongoose = require("mongoose"),
User           = require("./models/user"),
nodemailer     = require('nodemailer');

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
                    }else{
                        //! checking time left 
                        var HTMLTemplate ="<h1>Welcome to our Site!</h1>";
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                    user: process.env.COMPANYMAIL,
                                    pass: process.env.COMANYPASS
                                }
                        });
                        const mailOptions = {
                            from: process.env.COMPANYMAIL, 
                            to: user.email,
                            subject: `Welcome ${user.firstName} ${user.lastName} to 3EssEnn`,
                            // TODO styled html for geeting mail.active
                            html: HTMLTemplate
                        };
                        transporter.sendMail(mailOptions, function (err, info) {
                            if(err)
                            console.log(err)
                            else
                            console.log('Email sent :',info);
                        });
                        // console.log(Math.abs(startD.getTime()-now.getTime())/(1000*60*60));         
                    }
                })
            });
        }
    });
}

module.exports = seedDBContest;