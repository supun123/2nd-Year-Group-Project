var express = require('express');
var router = express.Router();

/* GET web page. */
router.get('/', function(req, res, next) {
    res.render('Home', {title:'form validation',success:true,errors:null });
    req.session.errors=null;
});


module.exports = router;