var express           = require("express"),
bodyParser            = require("body-parser"),
mongoose              = require("mongoose"),
flash                 = require("connect-flash"),
passport              = require("passport"),
LocalStrategy         = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
User                  = require("./models/user"),
seedDB                = require("./seeds"),
app                   = express();

// ============
// APP CONGIG
// ============

mongoose.connect("mongodb://127.0.0.1:27017/btpproj_2020", {useNewUrlParser: true,useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
seedDB();

app.use(require("express-session")({
    secret: "LKLKLK HVGYCU Ghuvggu bhjguhu",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// =============
// Basic ROUTES
// =============

app.get("/", function (req, res) {
    res.render("main/index");
});

app.get("/resources", function (req, res) {
    res.send("Resources");
});

app.get("/aboutus", function (req, res) {
    res.send("About Us!!");
});

app.get("/calender", function (req, res) {
    res.render("calender");
});

// ============
// AUTH ROUTES
// ============

app.get("/user", function (req, res) {
    res.send("this is the users page");
});

app.get("/register", isLoggedOut, function (req, res) {
    res.render("register/form");
});

app.post("/register", function (req, res) {
    var newUser = new User({
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        username : req.body.username,
        email    : req.body.email,
        phoneNo  : req.body.phoneNo,
    });
    User.register(newUser, req.body.password, function (err, user) {
        if(err){
            req.flash("error", err.message);           
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome " + user.firstName + " " + user.lastName)
            res.redirect("/");
        });
    });
});

app.get("/login", isLoggedOut, function (req, res) {
    res.render("login/form");
});

app.post("/login",passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,            
        failureFlash: true,
        successFlash: 'Successfully Logged in',
        failureFlash: 'Invalid username or passwerd.'
    }), function (req, res) {
});

app.get("/logout", isLoggedIn,function (req, res) {
    req.logOut();
    req.flash("success", "Logged Out!");
    res.redirect("/");
});

// DEFAULT ROUTE

app.get("*", function (req, res) {
    res.render("null");
});

// Middlewares
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}

function isLoggedOut(req, res, next) {
    if(!req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Logout First!");
    res.redirect("/");
}

//PORT
app.listen("3000", function () {
    console.log("Server is running!");
});