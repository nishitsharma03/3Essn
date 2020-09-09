var mongoose = require("mongoose");

 var UserSchema = new mongoose.Schema({
     firstName: String,
     lastName : String,
     email    : String,
     phoneNo  : String,
     username : String,
     password : String
 });