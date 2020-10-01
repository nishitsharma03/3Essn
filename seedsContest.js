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

                        // console.log(Math.abs(startD.getTime()-now.getTime())/(1000*60*60));         
                    }
                })
            });
        }
    });
}

module.exports = seedDBContest;