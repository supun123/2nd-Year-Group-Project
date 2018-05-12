var connection = require('./database');
var bcrypt = require('bcrypt');

var users = {
    signUp: function(obj){
        console.log(obj);
        connection.getConnection(function(err){
            if(err){
                console.log(err);
            }
            else{
                const saltRounds = 2;
                var pword = obj.password
                bcrypt.hash(pword, saltRounds, function(err, hash){
                    if(err){
                        console.log(err);
                    }
                    else{
                        var str = obj.location;
                        var res = str.split(",");
                        var one = res[0].split("(");
                        var two=res[1].split(")");
                        var sql="INSERT INTO `registered_user`(`nic`, `fname`, `lname`, `dob`, `gender`, `address`, `phoneNumber`, `email`, `latitude`, `longitude`,  `role`) VALUES ("+'"'+obj.nic+'"'+",'"+obj.fname+"','"+obj.lname+"','"+obj.dob+"','"+obj.gender+"','"+obj.address1+"','"+obj.phoneNumber+"','"+obj.email+"','"+one[1]+"','"+two[0]+"','"+obj.role+"')";
                        connection.query(sql, function (err) {
                            if (err) throw err;
                            var sql2="SELECT `userid` FROM `registered_user` WHERE `nic` = ? ";
                            connection.query(sql2, [obj.nic], function(err, result){
                                if(err) throw err;
                                var sql3="INSERT INTO `password`(`userid`, `username`, `password`) VALUES ('"+result[0].userid+"','"+ obj.username+"','"+hash+"')";
                                console.log(result[0].userid);
                                connection.query(sql3,  function(err){
                                    if(err) throw err;
                                });
                            });
                        })
                    }
                });
            }
        });
    },

    //sign in models
    signIn: function(username, password, callback){
        console.log(username);
        console.log(password);
        connection.getConnection(function(err){
            if(err){
                console.log(err);
            }
            else{
                //Retrieving data from database
                connection.query('SELECT * FROM password WHERE username = ?', [username], function(err, rslt){
                    if(err){
                        console.log(err);
                    }
                    else if(rslt.length === 0){
                        return callback(false, null, null);
                    }
                    else{
                        bcrypt.compare(password, rslt[0].password.toString(), function(err, response){
                            console.log(rslt[0].userid);
                            if(response === true){
                                //Retrieving data from database
                                connection.query('SELECT * FROM registered_user WHERE userid = ?',[rslt[0].userid], function(err, user){
                                    if(err){
                                        console.log(err);
                                        //Returning value to callback function
                                        return callback(false, null, null);
                                    }
                                    else{
                                        //Returning value to callback function
                                        return callback(true, user[0].userid,user[0].role);
                                    }
                                });
                            }
                            else{
                                //Returning value to callback function
                                return callback(false, null, null);
                            }
                        });
                    }
                });
            }
        })
    }
}

module.exports = users;