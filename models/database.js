var mysql = require('mysql');

//creating connection pool
var con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
});

module.exports = con;