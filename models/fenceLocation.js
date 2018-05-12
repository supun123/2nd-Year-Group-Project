var connection = require('./database');

var fenceLocation = {
    addLocationOfFence: function(myObj,userId){
        console.log("XXXX");
        connection.getConnection(function(err){
            if(err){
                console.log(err);
            }
            else{
                connection.query("SELECT `fenceId` FROM `fencelocation` ORDER BY `fenceId` DESC LIMIT 1",function callback(err, result, fields) {
                    if (err) throw err;
                    if(result.length!=0){
                        var x=result[0].fenceId+1;
                        var count=1;
                        console.log(count);
                        for (i in myObj) {
                            //
                            console.log('inner model:',userId);
                            var sql = "INSERT INTO `fencelocation`(`userid`,`fenceId`, `vertexId`, `lat`, `lng`, `deleteFence`, `brokenFence`) VALUES("+userId+","+x+","+count +","+myObj[i].lat + "," + myObj[i].lng + ","+"'no','no'"+")";
                            connection.query(sql, function (err, result) {
                                if (err) throw err;
                                console.log(" Eence record inserted");
                            })
                            console.log(myObj[i].lat,myObj[i].lng);
                            count++;
                        }
                    }
                    else{
                        var count=1;
                        for (i in myObj) {
                            var sql = "INSERT INTO `fencelocation`(`userid`,`fenceId`, `vertexId`, `lat`, `lng`,`deleteFence`, `brokenFence`) VALUES("+userId+","+1+","+count +","+myObj[i].lat + "," + myObj[i].lng + ","+"'no','no'"+ ")";
                            connection.query(sql, function (err, result) {
                                if (err) throw err;
                                console.log(" Eence record inserted");
                            })
                            count++;
                        }
                    }
                })
            }
        });
    },

    deletePartOfFence: function(fenceNum,start,end) {
        connection.getConnection(function(err){
            if(err){
                console.log(err);
            }
            else{
                for(i=start;i< end;i++){
                    var sql="UPDATE `fencelocation` SET `deleteFence`= 'yes'  WHERE fenceId="+fenceNum+ " and vertexId="+i ;
                    connection.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(" Ok delete Fence part");
                    })
                }
            }
        });

    },

    deleteFence: function(fenceId) {
        connection.getConnection(function(err){
            if(err){
                console.log(err);
            }
            else{
                var sql="DELETE FROM `fencelocation` WHERE fenceId ="+fenceId ;
                connection.query(sql, function (err) {
                    if (err) throw err;
                    console.log("Ok delete one Fence");
                })
            }
        });
    },

    markeBrockenFence: function(fenceNum,start,end){
        connection.getConnection(function(err){
            if(err){
                console.log(err);
            }
            else{
                for(i=start;i<=end;i++){
                    var sql="UPDATE `fencelocation` SET `brokenFence`= 'yes'  WHERE fenceId="+fenceNum+ " and vertexId="+i ;
                    connection.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(" Ok brocken Fence mark  part");
                    })
                }
            }
        });
    },

    getFenceLocation: function(callback){
        connection.getConnection(function(err){
            if(err){
                console.log(err);
            }
            else{
                connection.query("SELECT * FROM `fencelocation`",function(err, result) {
                    if (err) throw err;
                    return(callback(result));
                });
            }
        });
    }
}

module.exports = fenceLocation;