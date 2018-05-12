var express = require('express');
var router = express.Router();
var uploadImage = require('../models/image');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.isAuthenticated());
    console.log(req.user);
    res.render('index', { title: 'liyanage' });
});

module.exports = router;
