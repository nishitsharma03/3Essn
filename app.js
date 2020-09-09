var express           = require("express"),
bodyParser            = require("body-parser"),
mongoose              = require("mongoose"),
passport              = require("passport"),
localStrategy         = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose");


var app = express();
// mongoose.connect("mongodb://127.0.0.1:27017/btpptoj_2020");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {
    res.render("main/index");
});

app.get("/user", function (req, res) {
    res.send("this is the users page");
});

app.get("/register", function (req, res) {
    res.render("register/form");
})

app.post("/register", function (req, res) {
    res.send("Registration request recieved");
})

app.get("/login", function (req, res) {
    res.render("login/form");
});

app.post("/login", function (req, res) {
   res.send("Login request recieved will add processing after sometime");     
});

app.get("*", function (req, res) {
    res.send("Webpage does not exist!!");
});

app.listen("3000", function () {
    console.log("Server is running!");
});