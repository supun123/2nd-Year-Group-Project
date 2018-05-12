var express = require('express');
var router = express.Router();
var auth=require('./authentication');
var fenceLocation = require('../models/fenceLocation.js');
//var zz=require('../models/queryA');
/* GET new All page. */

router.get('/',auth.requireRole(2),function(req, res) {
    res.render('fence', { data: ['null','null'] });
});
//delete vertexes(delete part of the fence)
router.post('/delete', function(req, res) {
    var start=req.body.start;
    start=start.toUpperCase();
    var end=req.body.end;
    end=end.toUpperCase();
    console.log(start,end);
    var char=" ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var xx;
    var yy;
    for(i=0;i<char.length;i++){
        if(char[i]===start[0]){
            xx=i;
        }
        if(char[i]===end[0]){
            yy=i;
        }
    }
    var fenceNum;
    if(xx==yy){
        fenceNum=xx;
    }
    //console.log(xx,yy);
    var strnum=Number(start.substring(1,start.length));
    var endnum=Number(end.substring(1,end.length));
    console.log(strnum,endnum,fenceNum);
    if(strnum<endnum){
        fenceLocation.deletePartOfFence(fenceNum,strnum,endnum);
    }
    res.redirect('/fence');
});
//delete fences(delete particular  fence)

router.post('/deletefence', function(req, res, next) {
    var fenceName=req.body.deletefence;
    var fenceName=fenceName.toUpperCase();
    if(fenceName.length===1){//inputfence name lenth should be 1
        //also should be letter A-Z

        var char=" ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var fenceId;
        for(i=0;i<char.length;i++){
            if(char[i]===fenceName){
                fenceId=i;
            }
        }
        zz.data.deleteFence(fenceId);
        console.log(fenceName,fenceId);
    }
res.redirect('/fence');
});
//add new fence
router.post('/fenceLocation',function (req,res){
    var x=req.body;
    console.log('user',req.user.userid);
    fenceLocation.addLocationOfFence(x,req.user.userid);
    res.send("Done");

});

//marke Brocken Fence
router.post('/markeBrockenFence', function(req, res) {
    var start=req.body.start;
    start=start.toUpperCase();
    var end=req.body.end;
    end=end.toUpperCase();
    console.log(start,end);
    var char=" ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var xx;
    var yy;
    for(i=0;i<char.length;i++){
        if(char[i]===start[0]){
            xx=i;
        }
        if(char[i]===end[0]){
            yy=i;
        }
    }
    var fenceNum;
    if(xx==yy){
        fenceNum=xx;
    }
    //console.log(xx,yy);
    var strnum=Number(start.substring(1,start.length));
    var endnum=Number(end.substring(1,end.length));
    console.log(strnum,endnum,fenceNum);

    if(strnum<endnum){
        zz.data.markeBrockenFence(fenceNum,strnum,endnum);
    }
    res.redirect('/fence');
});

module.exports = router;