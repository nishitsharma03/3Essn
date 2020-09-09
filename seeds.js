var mongoose = require("mongoose"),
User         = require("./models/user");

var users =[
    {
        firstName: "Shubham",
        lastName : "Mehra",
        username : "shubhammehra01",
        password : "password"
    }
];

function SeedDB() {
    User.remove({}, function (err) {
       if(err){
           console.log(err);
       }
       console.log("Cleared Collection");
    });
};

module.exports = SeedDB;
