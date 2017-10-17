var mysql = require('mysql');


var methods = {
    connection: function connection() {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "mydb"
        });
        con.connect(function (err) {
            if (err) throw err;
            console.log("Database Connected!");
            //var sql = "INSERT INTO customers (name, address) VALUES ('" + Fname + "', '" + Lname + "')";
            //con.query(sql, function (err, result) {
            //if (err) throw err;
            //console.log("1 record inserted");

        });
        return con;
    }

}
exports.data = methods;