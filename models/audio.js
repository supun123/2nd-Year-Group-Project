var connection = require('./database');

var uploadAudio = {

    //Check if audio name already in audio file in server
    checkAudioName: function(name, callback){
        connection.getConnection(function(err, connection){
            if(err){
                console.log(err);
            }
            else{
                console.log(name);
                connection.query( "SELECT `audioName` FROM `audio` WHERE `audioName` = '" + name + "'", function (err, result){
                    if (err) throw err;
                    console.log(result);
                    connection.release();
                    return(callback(result));
                });
            }
        });
    },

    //Insert audio information into database
    insertAudio: function(user, name, location, description, callback){
        var str = location;
        var res = str.split(",");
        var one = res[0].split("(");
        var two=res[1].split(")");

        var audio = {
            userid: user.userid,
            audioname: name,
            audiourl: "/audio/" + name,
            description: description
        };

        connection.getConnection(function(err, connection){
            if(err){
                console.log(err);
            }
            else{
                connection.query("INSERT INTO `audio` (`userId`, `audioName`, `storedLocation`, `collectedLocationLatitude`, `collectedLocationLongitude`, `descrption`) VALUES ('2','"+audio.audioname+"','"+audio.audiourl+"' , '"+one[1]+"', '"+two[0]+"','"+audio.description+"');", function (err, result){
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

module.exports = uploadAudio;