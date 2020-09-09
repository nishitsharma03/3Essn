var mongoose = require("mongoose");

 var UserSchema = new mongoose.Schema({
     firstName: String,
     lastName : String,
     email    : String,
     phoneNo  : String,
     password : String
 });