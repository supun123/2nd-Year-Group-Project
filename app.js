var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var supun=require('./supun');
var index = require('./routes/index');
var users = require('./routes/users');
var elephantFenceMap = require('./routes/elephantFenceMap');
var mapObject=require('./routes/mapObject');
var elephantLocations=require('./routes/routesElephantsLocations');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//##########################

//supun.supun(kavinda.s[0].x);

app.use('/', index);
app.use('/users', users);

app.use('/elephantFenceMap',elephantFenceMap);
app.use('/mapObject',mapObject);
app.use('/elephantLocations',elephantLocations);

var query= require('./query.js');

app.post('/get_data',function (req,res) {

    console.log("xxxx :",req.body);
    var x=req.body;
    query.data.connection(x);


} );

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
