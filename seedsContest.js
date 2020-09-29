var mongoose = require("mongoose"),
User         = require("./models/user");

function seedDBContest() {
    User.find({} , (err, users) => {
        if(err){
            console.log(err);
        } else {
            users.map(user => {
                user.savedEvents.forEach(function (event,index) {
                    console.log(event);
                })
            });
        }
    });
}

module.exports = seedDBContest