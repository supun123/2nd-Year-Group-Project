var databaseConnection=require('./databaseConnection');
var con=databaseConnection.data.connection();
var methods = {
    connection: function connection(x) {
       // var parsed = JSON.parse(x);
        console.log("AAA",x(x));
        /*   var Fname="supun";
            var Lname="senanayke";
        var sql = "INSERT INTO customers (name, address) VALUES ('" + Fname + "', '" + Lname + "')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        })*/
    }
    }


exports.data = methods;
