var connection = require('./database');

var elephantLocation = {
    addElephantLocation: function(myObj,userId){
        connection.getConnection(function(err){
            if(!err){
                connection.query("SELECT `elephantId` FROM `elephant` ORDER BY `elephantId` DESC LIMIT 1",function callback(err, result){
                    if (err) throw err;
                    var count;
                    if(result.length ===0){
                        count=0;
                        console.log('A');
                    }else{
                        console.log('B');
                        count=result[0].elephantId;
                    }
                    for (i in myObj) {
                        count++;
                        var sql = "INSERT INTO `elephant`(`elephantId`,`userid`,`x`, `y`, `year`, `month`, `day`, `hours`, `minutes`, `seconds`) VALUES (" + count + ","  + userId + "," + myObj[i].x + "," + myObj[i].y +","+myObj[i].Year+","+myObj[i].month+","+myObj[i].day+","+myObj[i].Hours+","+myObj[i].Minutes+","+myObj[i].Seconds+")";
                        connection.query(sql, function (err) {
                            if (err) throw err;
                            console.log(" Elephant record inserted");
                        })

                    }
                })
            }
            else{
                console.log(err);
            }
        })
    },

    getElephantLocation: function(callback){
        connection.getConnection(function(err){
            if(err){
                console.log(err);
            }
            else{
                connection.query("SELECT * FROM `elephant`",function(err, result) {
                    if (err) throw err;
                    return(callback(result));
                });
            }
        });
    }

}

module.exports = elephantLocation;