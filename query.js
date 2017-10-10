var databaseConnection=require('./databaseConnection');
var con=databaseConnection.data.connection();
var methods = {
    connection: function connection(myObj) {

        console.log("AAA");
        for (i in myObj) {
            //console.log("Azz",x[0].x1,x[0].x2,x[0].y1,[0].y2);
       var sql = "INSERT INTO locations (x1, x2,y1,y2) VALUES ('" + myObj[i].x1 + "', '" + myObj[i].x2 + "','"+myObj[i].y1+"','"+myObj[i].y2+"')";
       con.query(sql, function (err, result) {
           if (err) throw err;
           console.log(" record inserted");
       })
        }
    }
    };


exports.data = methods;
