var express = require('express');
var router = express.Router();
var user = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('androidLogin');

});
router.post('/', function(req, res, next) {
    console.log('androidLogin post method',req.body);
   // user.signIn();

});
module.exports = router;
