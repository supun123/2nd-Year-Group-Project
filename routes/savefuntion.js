var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var router = express.Router();
app.use(bodyParser.json());
//app.use(express.bodyParser());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/',urlencodedParser,function (req,res) {
    //var n=JSON.parse(req.body);
    console.log("xxxx :",req.body);
    var x=req.body;
    //  var obj = JSON.parse(req.x);

} );

module.exports = router;
