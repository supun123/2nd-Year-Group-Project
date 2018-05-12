var express = require('express');
var router = express.Router();
var users = require('../models/users');
var passport=require('passport');


router.get('/signup', function(req, res) {
    res.render('signUp', {title:'form validation',success: false, errors: null});
});

//Login user page
router.get('/login', function(req, res) {
    res.render('login');
});
router.get('/logout',function (req,res) {
    req.logOut();
    req.session.destroy();
    res.redirect('/');
})

//use to get signUp up data
router.post('/signup',function (req,res) {
    req.check('fname','First name is required ').notEmpty();
    req.check('lname','Last name is required').notEmpty();
    req.check('nic','Invalid NIC ').isLength({min:10}).exists();
    req.check('dob','Dob is required').notEmpty();
    req.check('gender','required').notEmpty();
    req.check('address1','Invalid Address').notEmpty().isLength({max:150});
    req.check('phoneNumber','Invalid Phone Number').isLength({max:20});
    req.check('email','Invalid Email').isEmail();
    req.check('location','Location is required').notEmpty();
    req.check('password','Password is invalid').isLength({min:4}).equals(req.body.confirmPassword);

    var errors=req.validationErrors();
    console.log(errors);
    if(errors){
        res.render('signUp', {title:'form validation',success: false, errors: errors});
    }
    else{
        users.signUp(req.body);
        req.session.success=true;
        res.redirect('/');
    }
});

//When hit the login button
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login'
}));

//Setting up session function
passport.serializeUser(function(user, done) {
    done(null, user);
});

//Retrieving session information ex:req.user.userid
passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = router;
