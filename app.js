var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var expressValidator=require('express-validator');
var session=require('express-session');
var passport = require('passport');
var strategy = require('passport-local').Strategy;
var mySQLStore = require('express-mysql-session')(session);
var users = require('./models/users');

var index = require('./routes/index');
var upload = require('./routes/upload');
var download = require('./routes/download');
var elephantFenceMap = require('./routes/elephant');
var fence=require('./routes/fence');
var onlyView=require('./routes/onlyView');
var getElephantFenceLocation=require('./routes/getElephant&FenceLocations');
var home=require('./routes/home');
var user=require('./routes/user');
var request=require('./routes/request');
var androidLogin=require('./routes/androidLogin');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Session storing configuration
var sessionStore = new mySQLStore({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
});

//Setting up session
app.use(session({
    secret: 'no One i mean no one',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
}));

//Passport initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req,res,next) {

    res.locals.isAuthenticated=req.isAuthenticated();
    if(req.isAuthenticated()){
        res.locals.username=req.user.username;
    }

    next();
});

app.use('/', index);
app.use('/upload', upload);
app.use('/download', download);
app.use('/elephant',elephantFenceMap);
app.use('/fence',fence);
app.use('/onlyView',onlyView);
app.use('/getElephantFenceLocations',getElephantFenceLocation);
app.use('/home',home);
app.use('/user',user);
app.use('/request',request);
app.use('/androidLogin',androidLogin);

//Setting up passport strategy for logging
passport.use(new strategy(function(username, password, done){
    users.signIn(username, password, function(rslt, userid, role){
        if(rslt){
            return done(null, {userid: userid, role: role,username:username})
        }
        else{
            return done(null, false);
        }
    })
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
