var connection = require('./database');

var request = {
        addRequest: function(Projectname,description,locaation) {
            connection.getConnection(function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log('addRequest call');
                    var str=locaation
                    var res = str.split(",");
                    var one = res[0].split("(");
                    var two=res[1].split(")");
                    var sql = "INSERT INTO `requests` (`userId`,`Projectname`, `description`,`latitude`, `longitude`) VALUES('"+1+"','"+Projectname+"','"+description+"','"+one[1]+"','"+two[0]+"')";
                    connection.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(" Ok add request ");
                    })
                }
            });

        },
//return all requests
    viewRequest: function(callback){
        connection.getConnection(function(err){
            if(err){
                console.log(err);
            }
            else{
                connection.query("SELECT requests.userid ,requests.Projectname, requests.description, registered_user.fname, registered_user.lname, registered_user.phoneNumber, requests.latitude, requests.longitude  FROM `requests`,`registered_user` WHERE requests.userId = registered_user.userid" ,function(err, result) {
                    if (err) throw err;
                    console.log(result);

                    return callback(result)
                });
            }
        });
    },
    isNicExist: function(callback,nic){
        connection.getConnection(function(err){
            if(err){
                console.log(err);
            }
            else{
                connection.query("SELECT * FROM `requests`WHERE nic='"+nic+"'",function(err, result) {
                    if (err) throw err;
                if(result.length>0){
                    return(callback(true));
                }
                else{
                    return(callback(false));
                }

                });
            }
        });
    },
    delete: function(userid) {
        connection.getConnection(function(err){
            if(err){
                console.log(err);
            }
            else{
                var sql = "DELETE FROM `requests` WHERE userid="+userid;
                connection.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(" Ok add request part");
                })
            }
        });

    },
    accept: function(userid,next) {
        connection.getConnection(function(err){
            console.log(userid);
            if(err){
                console.log(err);
            }
            else{
                console.log("AAAAa",userid);
                var sql = "SELECT `userId`, `Projectname`, `description`, `latitude`, `longitude`FROM `requests` WHERE userId='"+userid+"'";
                connection.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(" Ok  get request data");
                    var sql = "INSERT INTO `approved_request`(`userId`, `Projectname`, `description`, `latitude`, `longitude`) VALUES ('"+result[0].userId+"','"+result[0].Projectname+"','"+result[0].description+"','"+result[0].latitude+"','"+result[0].longitude+"')";
                    connection.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(" Ok INSERT data approved_request table ");
                        var sql = "DELETE FROM `requests` WHERE nic='"+nic+"'";
                        connection.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log(" Ok  delete data from  requests table");
                            return next;
                        })
                    })
                })


            }
        });

    }

}

module.exports = request;