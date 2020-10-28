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
                    } else if(startD.getTime() - now.getTime() < 24*60*60*1000) {
                        greetUser(event);
                        function greetUser(contest) {
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                        user: '3essenn@gmail.com',
                                        // user: process.env.COMPANYMAIL,
                                        pass: '3essenn123'
                                        // pass: process.env.COMANYPASS
                                    }
                            });
                            var start = contest.start.split('T');
                            // start = new Date(start[0]);
                            const mailOptions = {
                                from: '3essenn@gmail.com', 
                                to: user.email,
                                subject: `Contest Reminder!`,
                                html: `
                                <html>
                                    <body style="color: black;">
                                        <h1 style="text-align: center;">Contest Reminder!</h1>
                                        <hr>
                                        <p>
                                        Hey <strong> ${user.firstName} ${user.lastName}</strong>,<br>
                                        Here's your <strong>Reminder</strong> for <strong><a href="${contest.href}"> ${contest.event} </a></strong>. The Contest is scheduled on :- <em> ${start[0]}</em> <em> ${start[1]} </em>.
                                        <br><br>
                                        All the Best!!<br>
                                        <strong>3ESSENN</strong>
                                        </p>
                                        <br><br>
                                        <br><br>
                                        <hr>
                                        <p style="text-align: center;">Visit Us: <strong><a href="https://immense-falls-32098.herokuapp.com/">3ESSENN</a></strong></p>
                                    </body>
                                </html>`
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