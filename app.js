var express           = require("express"),
bodyParser            = require("body-parser"),
mongoose              = require("mongoose"),
flash                 = require("connect-flash"),
passport              = require("passport"),
LocalStrategy         = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
spawn                 = require("child_process").spawn,
fs                    = require("fs"),
User                  = require("./models/user"),
// seedDB                = require("./seeds"),
// seedContest           = require("./seedsContest");
app                   = express();

// ==================================
//            APP CONGIG
// ==================================

mongoose.connect("mongodb://127.0.0.1:27017/btpproj2020", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});
// mongoose.connect("mongodb+srv://admin01:97QnGxY9Au6eUDSc@3essenn.ggkqf.mongodb.net/btpproj2020?retryWrites=true&w=majority", {useNewUrlParser: true,useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
// seedDB();
// seedContest();
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

// ====================================
//            API Script
// ====================================

function contestRefresh() {
    var process = spawn('python',["contestretreiverapi.py"] );
    
    process.stderr.on('data', (data) => {
        console.log(`error:${data}`);
    }); 
    process.on('close', (code) => {
        console.log(`child process (contest) close all stdio with code ${code}`);
    })
}

function pastContestRefresh() {
    var process = spawn('python',["pastcontests.py"] );
    
    process.stderr.on('data', (data) => {
        console.log(`error:${data}`);
    }); 
    process.on('close', (code) => {
        console.log(`child process (pastContest) close all stdio with code ${code}`);
    })
}
// pastContestRefresh();
// contestRefresh();
var timeGap = 3*60*60*1000; //hours
setInterval(contestRefresh, timeGap); //for deployement
setInterval(pastContestRefresh, 8*timeGap); //for deployement
var dataToSend = null;

// =====================================
//            Basic ROUTES
// =====================================
var logos = {
    "codechef.com": "https://www.codechef.com/misc/fb-image-icon.png" ,  
    "hackerearth.com": "https://upload.wikimedia.org/wikipedia/commons/e/e8/HackerEarth_logo.png" ,  
    "leetcode.com": "https://leetcode.com/static/images/LeetCode_logo.png" ,  
    "codeforces.com": "https://image.winudf.com/v2/image/Y29tLlNvZnRUZWNocy5Db2RlRm9yY2VzX2ljb25fMF9jOTA3NjNhMA/icon.png?w=170&fakeurl=1" ,  
    "atcoder.com": "https://img.atcoder.jp/assets/atcoder.png"
}; 
app.get("/", function (req, res) {
    fs.readFile("data.json", function(err, data) { 
        if (err) throw err; 
        res.render("main/index", {data:JSON.parse(data), logo:logos});  
    });
});

app.get("/calender", function (req, res) {
    res.render("calender");
});

app.get("/resources", function (req, res) {
    res.render("resources");
});

app.get("/about", function (req, res) {
    res.render("aboutus");
});

// =======================================
//            AUTH ROUTES
// =======================================

app.get("/register", isLoggedOut, function (req, res) {
    res.render("register/form");
});

app.post("/register",isLoggedOut, function (req, res) {
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
            return res.render("register/form");
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

app.post("/login", isLoggedOut, passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,            
        failureFlash: true,
        successFlash: 'Successfully Logged in',
    }), function (req, res) {
});

app.get("/logout", isLoggedIn, function (req, res) {
    req.logOut();
    req.flash("success", "Logged Out!");
    res.redirect("/");
});

// =========================================
//            USER ROUTES
// =========================================

app.get("/userprofile", isLoggedIn, function (req, res) {
    res.render("user/profile");
});

app.get("/user/:id/:name", isLoggedIn, function (req, res) {
    var ID = req.params.id;
    var saveEvent = req.params.name;
    User.findOneAndUpdate({_id: ID}, {$addToSet: {savedEvents: saveEvent}}, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error", "Error please try again");
            res.redirect("/");
        } else{
            console.log("Update Saved Events!");
            req.flash("success", "Successfully Saved Event!");
            res.redirect("/");
        }
    });
});

app.get("/problems", isLoggedIn, function (req, res) {
    fs.readFile("pastcont.json", function(err, data) { 
        if (err) throw err; 
        res.render("problems/problem",{data:dataToSend, contest:JSON.parse(data)});
        dataToSend = null;
    });
});

app.post("/problems", isLoggedIn, function (req, res) {

    var process = spawn('python',["codeforcesapi.py", req.body.tags, req.body.lrating, req.body.urating] );
    
    process.stderr.on('data', (data) => {
        console.log(`error:${data}`);
    });

    process.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString()
    });

    process.on('close', (code) => {
        console.log(`child process (QuestionAPI) close all stdio with code ${code}`);
        dataToSend = dataToSend.split("|");
        res.redirect("/problems");
    });
});


//**********DEFAULT ROUTE**************

app.get("*", function (req, res) {
    res.render("null");
});

// ***********Middlewares**************

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


//************PORT*******************

app.listen("3000", function () {
    console.log("Server is running!");
    console.log("http://localhost:3000/");
});

// app.listen(process.env.PORT, process.env.IP, function () {
//     console.log("Server is running!");
// });
// admin01
// 97QnGxY9Au6eUDSc
