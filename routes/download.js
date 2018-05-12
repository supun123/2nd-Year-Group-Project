var express = require('express');
var router = express.Router();
var fs = require('fs');

//Download the ELOC device interface
router.get('/elocGetUpdate', function(req, res) {
    //res.sendFile('D:/version2/kashtija/Nodejs/upload/a.pkl');
    var filePath = 'D:/version2/kashtija/Nodejs/upload/a.pkl';
    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});

//Interface to check the ELOC version
router.get('/elocVersion', function(req, res){
    var data = fs.readFileSync('D:/version2/kashtija/Nodejs/data.json');
    var sendData = JSON.parse(data);
    res.send(sendData);
});

module.exports = router;