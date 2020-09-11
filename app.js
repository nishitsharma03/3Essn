var express           = require("express"),
bodyParser            = require("body-parser"),
mongoose              = require("mongoose"),
flash                 = require("connect-flash"),
passport              = require("passport"),
LocalStrategy         = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
User                  = require("./models/user"),
seedDB                = require("./seeds"),
app                   = express(),
buffer = require("buffer"),
fs = require("fs")
names=['codechef.com','hackerearth.com','codeforces.com','leetcode.com','atcoder.com'],
nishit={}
// spawn = require("child_process").spawn,
largeDataSet =[]; 

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

// app.get("/aboutus", function (req, res) {
//     res.send("About Us!!");
//     var process = spawn('python',["contestretrievalapi.py", "greedy", 1100] ); 
//     process.stdout.on('data', function (data) {
//     console.log('Pipe data from python script ...');
//     largeDataSet.push(data);
//    });;
//     process.on('close', (code) => {
//     console.log(`child process close all stdio with code ${code}`);
//     // send data to browser
//     res.send(largeDataSet.join(""));
//     });
// });

app.get("/nishit", function (req, res) { 
    var spawn = require("child_process").spawn; 
      
    var process = spawn('python',["contestretreiverapi.py"] ); 
  
    // process.stdout.on('data', function (data) {
    // console.log('Pipe data from python script ...');
    //     largeDataSet.push(data);
    // });
    // var dataset = require("./data.json");


    // console.log(largeDataSet[0].toJSON());
    // console.log(typeof(largeDataSet));
    // nishit = JSON.parse(largeDataSet[0]);
    // console.log(typeof(nishit));
    process.on('close', (code) => {
    console.log('child process close all stdio with code ${code}');
    // send data to browser
    // for (let i = 0; i < nishit.length; i++) {
    //     // // var element = nishit[i];
    //     // if largeDataSet["resource"]["name"] in names{
    //     //     console.log(nishit[i]["resource"]);
    //     // }
    // }
    fs.readFile("data.json", function (err, data) {
        if(err) throw err;
        const contest = JSON.parse(data);
        // console.log(contest);
        for (let i = 0; i < contest["objects"].length; i++) {
            if (contest["objects"][i]["resource"]["name"] in names){
                // console.log(contest["objects"][i]["resource"]["name"]);
                console.log("hello");
                
                // largeDataSet.push(contest["objects"][i]);
            }
        }
        // res.send(largeDataSet);
    })
    // res.send(dataset);
    // console.log(dataset);
    });
} );

app.get("/calender", function (req, res) {
    res.render("calender");
});

// ============
// AUTH ROUTES
// ============

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

app.get("/logout", isLoggedIn, function (req, res) {
    req.logOut();
    req.flash("success", "Logged Out!");
    res.redirect("/");
});

// =============
// USER ROUTES
// =============

app.get("/user", isLoggedIn, function (req, res) {
    res.send("this is the users page");
});

app.get("/problems", isLoggedIn, function (req, res) {
    res.render("problems/problem");
})


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