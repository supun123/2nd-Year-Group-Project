var express = require('express');
var router = express.Router();

/* GET home onlyView page. */
router.get('/', function(req, res, next) {
    res.render('onlyView', { title: 'Express' });
});
//when click on elephant location show details of the elephant
router.post('/showelElephantData',function(req, res, next){
    console.log("showElephantData");
});
module.exports = router;