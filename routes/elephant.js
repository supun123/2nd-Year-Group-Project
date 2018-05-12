var express = require('express');
var router = express.Router();
var elphantLocation = require('../models/elephantLocation.js');
var auth = require('./authentication')
/* GET home page. */

router.get('/',auth.requireRole(1), function(req, res, next) {
    res.render('elephant', { data: ['null','null'] });
});

//save elephant locations
router.post('/allElephentLocations',function (req,res,next) {
    console.log("allElephentLocations :",req.body);
    var x=req.body;
    elphantLocation.addElephantLocation(x,req.user.userid);

} );

module.exports = router;
