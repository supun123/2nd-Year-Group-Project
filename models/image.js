var connection = require('./database');

var uploadImage = {

    //Check if image name exist in images file
    checkImageName: function(name, callback){
        connection.getConnection(function(err, connection){
            if(err){
                console.log(err);
            }
            else{
                connection.query( "SELECT imageName FROM images WHERE imageName = '" + name + "'", function (err, result){
                    if (err) throw err;
                    connection.release();
                    return(callback(result));
                });
            }
        });
    },

    //Save image file in image server file
    insertImage: function(user, name, location, description, callback){
        var str = location;
        var res = str.split(",");
        var one = res[0].split("(");
        var two=res[1].split(")");

        var image = {
            userid: user.userid,
            imagename: name,
            imageurl: "/image/" + name,
            description: description
        };

        connection.getConnection(function(err, connection){
            if(err){
                console.log(err);
            }
            else{
                //Insert image information into database
                connection.query("INSERT INTO `images` (`userId`, `imageName`, `storedLocation`, `collectedLocationLatitude`, `collectedLocationLongitude`, `descrption`) VALUES ('"+image.userid+"','"+image.imagename+"','"+image.imageurl+"','"+one[1]+"','"+two[0]+"','"+image.description+"');", function (err, result){
                    if (err) throw err;
                    var str = JSON.stringify(result);
                    var rows = JSON.parse(str);
                    connection.release();
                    return(callback(rows));
                });
            }
        });
    }
}

 module.exports = uploadImage;

