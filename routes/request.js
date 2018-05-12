var express = require('express');
var router = express.Router();
var request=require('../models/request');
/* GET request page. */

router.get('/', function(req, res, next) {
    res.render('makeRequest',{title:'form validation',success:req.session.success,errors:req.session.errors} );
    req.session.errors=null;
});
/* GET ViewRequest page. */
router.get('/viewRequest',function (req,res) {
    request.viewRequest(function(rslt){
        res.render('viewRequest', {data:rslt });
    });
});
router.post('/add', function(req, res, next) {
    req.check('Projectname','Project Name is required ').notEmpty();
    req.check('description','description is required ').notEmpty();
    req.check('location','Mark location on the map').notEmpty();
    var errors=req.validationErrors();
    console.log('erros:',errors);


   if(errors){
       req.session.errors=errors;
       req.session.success=false;
       res.redirect('/request');
   }
   else{
       req.session.errors=errors;
       req.session.success=true;
       console.log(req.body.Projectname,req.body.description,req.body.location);
       request.addRequest(req.body.Projectname,req.body.description,req.body.location);
       res.redirect('/request');
   }
});
router.get('/reject/:id', function(req, res, next) {
    console.log('reject',req.params.id);
    request.delete(req.params.id);
    //res.redirect('/request/viewRequest');
  //  request.addRequest(req.body.nic,req.body.name,req.body.email,req.body.address,req.body.phoneNumber);
});
router.get('/accept/:id', function(req, res, next) {
    console.log('reject',req.params.id);
    request.accept(req.params.userid, request.viewRequest(function (rslt) {
        //res.redirect('/viewRequest');
        //  request.addRequest(req.body.nic,req.body.name,req.body.email,req.body.address,req.body.phoneNumber);
    }));


});
module.exports = router;