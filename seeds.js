var mongoose = require("mongoose"),
User         = require("./models/user");

function SeedDB() {
    User.deleteMany({}, function (err) {
       if(err){
           console.log(err);
       }
       console.log("Cleared Collection");
    });
};

module.exports = SeedDB;
