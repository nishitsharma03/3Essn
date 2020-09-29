var mongoose          = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose");


 var UserSchema = new mongoose.Schema({
    firstName         : String,
    lastName          : String,
    username          : String,
    email             : String,
    company           : String,
    phoneNo           : String,
    password          : String,
    codechefUsername  : String,
    codeforcesUsername: String,
    savedEvents       : [],
    savedProblems     : []
 });

UserSchema.plugin(passportLocalMongoose);

 module.exports = mongoose.model("User", UserSchema);