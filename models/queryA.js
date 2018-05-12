var databaseConnection=require('./dbConnection');
var con=databaseConnection.data.connection();
var methods = {
    addLocationOfFence: function addLocationOfFence(myObj) {
        console.log("XXXX");
        //console.log("add asdadadaa ddaddaad");
       // var x=00;
        con.query("SELECT `fenceId` FROM `fencelocation` ORDER BY `fenceId` DESC LIMIT 1",function callback(err, result, fields) {
            if (err) throw err;
            if(result.length!=0){
                var x=result[0].fenceId+1;
                var count=1;
                console.log(count);
                for (i in myObj) {
                    var sql = "INSERT INTO `fencelocation`(`fenceId`, `vertexId`, `lat`, `lng`, `deleteFence`, `brokenFence`) VALUES(" +x+","+count +","+myObj[i].lat + "," + myObj[i].lng + ","+"'no','no'"+")";
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
                    var sql = "INSERT INTO `fencelocation`(`fenceId`, `vertexId`, `lat`, `lng`,`deleteFence`, `brokenFence`) VALUES(" +1+","+count +","+myObj[i].lat + "," + myObj[i].lng + ","+"'no','no'"+ ")";
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
    addElephantLocation: function addElephantLocation(myObj) {//add elephant location to the database

        //console.log("AAA");
        con.query("SELECT `elephantId` FROM `elephant` ORDER BY `elephantId` DESC LIMIT 1",function callback(err, result, fields) {
            if (err) throw err;
            var count;
            if(result.length ===0){
                count=1;
            }else{
                count=result[0].elephantId;
            }
        for (i in myObj) {

            var sql = "INSERT INTO `elephant`(`elephantId`,`x`, `y`, `year`, `month`, `day`, `hours`, `minutes`, `seconds`) VALUES (" + count + "," + myObj[i].x + "," + myObj[i].y +","+myObj[i].Year+","+myObj[i].month+","+myObj[i].day+","+myObj[i].Hours+","+myObj[i].Minutes+","+myObj[i].Seconds+")";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(" Elephant record inserted");
            })
            count++;
        }
        })
    },
    deletePartOfFence: function deletePartOfFence(fenceNum,start,end) {
        for(i=start;i< end;i++){
            var sql="UPDATE `fencelocation` SET `deleteFence`= 'yes'  WHERE fenceId="+fenceNum+ " and vertexId="+i ;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(" Ok delete Fence part");
            })
        }
    },
    getLocations:function getLocations() {
        return con;
    },
    deleteFence: function  deleteFence(fenceId) {
        var sql="DELETE FROM `fencelocation` WHERE fenceId ="+fenceId ;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Ok delete one Fence");
        })
    },
    markeBrockenFence: function  markeBrockenFence(fenceNum,start,end) {
        for(i=start;i<=end;i++){
            var sql="UPDATE `fencelocation` SET `brokenFence`= 'yes'  WHERE fenceId="+fenceNum+ " and vertexId="+i ;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(" Ok brocken Fence mark  part");
            })
        }
    },
    test: function  test() {
        var sql="SELECT `*` FROM `elephant`";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log('result');
            var x=[1,2,3,1];
            return x;
        })
    }
    };




exports.data = methods;
