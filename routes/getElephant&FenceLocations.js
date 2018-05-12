var express = require('express');
var router = express.Router();
var fenceLocation = require('../models/fenceLocation.js');
var elephantLocation = require('../models/elephantLocation.js');
//var zz=require('../models/queryA');
//get data from elephant table
router.get('/getElephanLocations',function (req,res) {
    elephantLocation.getElephantLocation(function(rslt){
        console.log('AAAA-->',JSON.stringify(rslt));
        res.send(JSON.stringify(rslt))
    });
});

//get data from fence location from location table
router.get('/getFenceLocation',function (req,res){

    fenceLocation.getFenceLocation(function(rslt){
        console.log('BBB-->',JSON.stringify(rslt));
        res.send(JSON.stringify(rslt));
    });
});

module.exports = router;
