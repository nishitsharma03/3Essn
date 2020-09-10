var mongoose          = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose");


 var UserSchema = new mongoose.Schema({
     firstName: String,
     lastName : String,
     username : String,
     email    : String,
     password : String,
     phoneNo  : String,
 });

UserSchema.plugin(passportLocalMongoose);

 module.exports = mongoose.model("User", UserSchema);