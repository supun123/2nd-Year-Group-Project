var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
/* GET home page. */
//router.post('/',urlencodedParser ,function(req, res,next) {
  //  console.log('xxxx',req.body[0].x1);
    //console.log('AAAA',req.body);
  //  res.render('test',{data:req.body});
//});
router.get('/',urlencodedParser, function(req, res, next) {
    res.render('test', { data: 'AAAAAAAAAA' });

});


module.exports = router;
