var express = require('express');
var multer = require('multer');
var router = express.Router();
var uploadImage = require('../models/image');
var uploadAudio = require('../models/audio');
var fs = require('fs');
var path = require('path');
var authen = require('./authentication');

//configure to store ELOC update
var storePkl = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null,'upload/');
    },
    filename: function(req, file, callback){
        callback(null, 'eloc_update.pkl');
    }
});
var upload = multer({storage : storePkl, fileFilter : function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.pkl') {
        return callback(new Error('Only .pkl is allowed'))
    }
    callback(null, true)
}}).single("file");

//configure to store audio files
var storeAudio = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null,'tmp/');
    },
    filename: function(req, file, callback){
        callback(null, file.fieldname + req.sessionID + ".wav");
    }
});
var uploadAudios = multer({storage : storeAudio, fileFilter : function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.wav') {
        return callback(new Error('Only .wav is allowed'))
    }
    callback(null, true)
}}).single("audio");

//configure to store image files
var storeImage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null,'tmp/');
    },
    filename: function(req, file, callback){
        callback(null, file.fieldname + req.sessionID + ".jpg");
    }
});
var uploadImages = multer({storage : storeImage, fileFilter : function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.jpg') {
        return callback(new Error('Only i.jpg are allowed'))
    }
    callback(null, true)
}}).single("images");

//ELOC upload view
router.get('/elocupdate', function(req, res) {
    res.render('upload');
});

//Image upload view
router.get('/images',authen.requireRole(1), function(req,res){
    res.render('uploadImages');
});

//Audio upload view
router.get('/audio',authen.requireRole(1), function(req,res){
    res.render('audio');
});

//Send ELOC update to server authen.requireRole(2),
router.post('/elocupdate', function(req,res) {
    upload(req, res, function(err){
        if(err){
            res.render('upload');
        }
        else{
            var data = {"version": req.body.version};
            fs.writeFile('./data.json' ,JSON.stringify(data) ,function(err){
                if(err){
                    console.log(err);
                }
            });
        }
    });
    res.redirect('/');
});

//Send images to server
router.post('/images',authen.requireRole(1), function(req,res){
    uploadImages(req, res, function(err){
        if(err){
            res.render('uploadImages');
        }
        else{
            uploadImage.checkImageName(req.body.name, function(rtn){
                if(rtn[0] == null){
                    fs.rename('./tmp/images'+ req.sessionID + '.jpg', './images/'+ req.body.name + ".jpg", function(){
                        if(err){
                            console.log(err);
                        }
                        else{
                            uploadImage.insertImage(req.user, req.body.name, req.body.location, req.body.description, function (rslt){
                                res.send(rslt);
                            });
                        }
                    });
                }
                else{
                    fs.unlinkSync('./tmp/images'+ req.sessionID + '.jpg');
                    res.redirect('/');
                }
            })
        }
    });
});

//Send audio to server
router.post('/audio',authen.requireRole(1), function(req,res){
    console.log(req.body);
    uploadAudios(req, res, function(err){
        if(err){
            res.render('audio');
        }
        else{
            uploadAudio.checkAudioName(req.body.name, function(rtn){
                console.log(rtn);
                if(rtn[0] == null){
                    //
                    console.log('here');
                    fs.rename('./tmp/audio'+ req.sessionID + '.wav', './audio/'+ req.body.name + ".wav", function(){
                        if(err){
                            console.log(err);
                        }
                        else{
                            uploadAudio.insertAudio(req.body.name, req.body.location, req.body.description, function (rslt){
                                res.send(rslt);
                            });
                        }
                    });
                }
                else{
                    fs.unlinkSync('./tmp/audio'+ req.sessionID + '.wav');
                    res.redirect('/');
                }
            })
        }
    });
});

module.exports = router;