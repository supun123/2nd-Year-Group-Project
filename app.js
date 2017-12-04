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
var newAll=require('./routes/newAll');
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



app.use('/', index);
app.use('/users', users);
app.use('/mapObject',mapObject);

app.use('/elephantFenceMap',elephantFenceMap);
app.use('/elephantLocations',elephantLocations);

app.use('/NewAll',newAll);
var query= require('./query.js');

app.post('/fenceLocation',function (req,res) {

    //console.log("xxxx :",req.body);
    var x=req.body;
    query.data.addLocationOfFence(x);


} );
app.post('/allElephentLocations',function (req,res) {

    console.log("allElephentLocations :",req.body);
    var x=req.body;
    query.data.addElephantLocation(x);


} );
//get data from elephant table
app.get('/getElephanLocations',function (req,res) {
    //due to asynchronous running javascript in nodejs i could not add sql query to query file
    var con=query.data.getLocations();
    con.query("SELECT `*` FROM `elephant`",function callback(err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result) );
    });
});
//get data from fence location from location table
app.get('/getFenceLocation',function (req,res) {
    //due to asynchronous running javascript in nodejs i could not add sql query to query file
    var con=query.data.getLocations();
    con.query("SELECT `fenceId`, `vertexId`, `lat`, `lng` FROM `fencelocation`",function callback(err, result, fields) {
        if (err) throw err;
        //console.log("check get",result);
        res.send(JSON.stringify(result) );
    });
});
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
