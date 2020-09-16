var mongoose          = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose");


 var UserSchema = new mongoose.Schema({
     firstName: String,
     lastName : String,
     username : String,
     email    : String,
     phoneNo  : String,
     password : String
 });

UserSchema.plugin(passportLocalMongoose);

 module.exports = mongoose.model("User", UserSchema);