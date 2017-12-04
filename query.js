var databaseConnection=require('./databaseConnection');
var con=databaseConnection.data.connection();
var methods = {
    addLocationOfFence: function addLocationOfFence(myObj) {

        //console.log("add asdadadaa ddaddaad");
       // var x=00;
        con.query("SELECT `fenceId` FROM `fencelocation` ORDER BY `fenceId` DESC LIMIT 1",function callback(err, result, fields) {
            if (err) throw err;
            if(result.length!=0){

                var x=result[0].fenceId+1;
                var count=1;
                console.log(count);
                for (i in myObj) {
                    //console.log('NN',i);
                    var sql = "INSERT INTO `fencelocation`(`fenceId`, `vertexId`, `lat`, `lng`) VALUES(" +x+","+count +","+myObj[i].lat + "," + myObj[i].lng + ")";
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(" Eence record inserted");
                   })
                    console.log(myObj[i].lat,myObj[i].lng);
                    count++;
                }
            }else{
               // console.log("null");
                var count=1;
                for (i in myObj) {
                    //console.log("Azz",x[0].x1,x[0].x2,x[0].y1,[0].y2);
                    var sql = "INSERT INTO `fencelocation`(`fenceId`, `vertexId`, `lat`, `lng`) VALUES(" +1+","+count +","+myObj[i].lat + "," + myObj[i].lng + ")";
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(" Eence record inserted");
                    })
                    count++;
                }
            }
        })

       /* */
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
