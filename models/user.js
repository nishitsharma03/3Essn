var mongoose          = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose");


 var UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    firstName: String,
    lastName : String,
    email    : String,
    phoneNo  : String
 });

UserSchema.plugin(passportLocalMongoose);

 module.exports = mongoose.model("User", UserSchema);