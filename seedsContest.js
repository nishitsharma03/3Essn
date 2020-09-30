const mongoose = require("mongoose"),
User         = require("./models/user"),
nodemailer   = require('nodemailer');

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
                })
            });
        }
    });
}

module.exports = seedDBContest;