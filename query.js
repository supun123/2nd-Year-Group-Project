var databaseConnection=require('./databaseConnection');
var con=databaseConnection.data.connection();
var methods = {
    addLocationOfFence: function addLocationOfFence(myObj) {

        console.log("AAA");
        for (i in myObj) {
            //console.log("Azz",x[0].x1,x[0].x2,x[0].y1,[0].y2);
       var sql = "INSERT INTO locations (x1, x2,y1,y2) VALUES ('" + myObj[i].x1 + "', '" + myObj[i].x2 + "','"+myObj[i].y1+"','"+myObj[i].y2+"')";
       con.query(sql, function (err, result) {
           if (err) throw err;
           console.log(" Eence record inserted");
       })
        }
    },
    addElephantLocation: function addElephantLocation(myObj) {

        console.log("AAA");
        for (i in myObj) {
            console.log("Azz",myObj[0].x,myObj[0].y);

            var sql="INSERT INTO `elephant`(`x`, `y`) VALUES ("+ myObj[i].x +","+myObj[i].y +")";
            con.query(sql, function (err, result) {
                if (err) throw err;
               console.log(" Elephant record inserted");
            })
        }
    },
    getLocations: function getLocations() {



        //console.log(res);
        return(con);
    }
    };


exports.data = methods;
