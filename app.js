var bodyParser        = require("body-parser"),
mongoose              = require("mongoose"),
express               = require("express");

var app = express();
// mongoose.connect("mongodb://127.0.0.1:27017/");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {
    res.render("home");
});

app.get("/register", function (req, res) {
    res.render("register");
})

app.get("/login", function (req, res) {
    res.render("login");
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