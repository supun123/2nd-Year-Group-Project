// This example creates a 2-pixel-wide red polyline showing the path of William
// Kingsford Smith's first trans-Pacific flight between Oakland, CA, and
// Brisbane, Australia.
//var query=require('../../query');
    var objectOfLocation = [];//take location Object in this array

//var s=require('../../supun');
//s.one("xsssf");
//var su="zzz";
function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: {lat: 6.902096, lng: 79.860561},
        mapTypeId: 'terrain'
    });
    var x = 0;
    //var objectFencelLocation = [];
    var fencelLocation = [];//taking google.maps.LatLng objects which is help to mark fences in the map
    function location(x1,x2,y1,y2) {//use this function as a class  use this function to create (objectLocation ) object
        this.x1=x1;
        this.x2=x2;
        this.y1=y1;
        this.y2=y2;
    }
    var objectLocation=new location(null,null,null,null);//create object of location function

    google.maps.event.addListener(map, 'click', function (e) {
        if (x == 1) { //console.log(x,"Aza");
            var startPt = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
            fencelLocation.push(startPt);
            calcRoute(fencelLocation[0], fencelLocation[1]);//using calcRoute funtion display map start point and end point of the fence
            objectLocation.y1=e.latLng.lat();//put  location in numerical format
            objectLocation.y2= e.latLng.lng();//put  location in numerical format
            console.log("A",objectLocation.y1,objectLocation.y2);//display location point of  click
            objectOfLocation.push(objectLocation);//put objectLocation to this array which will help to put data in to database

            //console.log("objectOfLocation[][]",objectOfLocation[0].x1,objectOfLocation[0].x2,objectOfLocation[0].y1,objectOfLocation[0].y2);
            //objectFencelLocation.push(fencelLocation);
            fencelLocation = [];
            objectLocation=new location(null,null,null,null);

            //console.log("objectOfLocation[][]after",objectOfLocation[0].x1,objectOfLocation[0].x2,objectOfLocation[0].y1,objectOfLocation[0].y2);

            x = 0;

            document.getElementById("demo").innerHTML = e.latLng;

        }
        else {

            var startPt = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
            objectLocation.x1=e.latLng.lat();//put  location in numerical format
            objectLocation.x2= e.latLng.lng();//put  location in numerical format
            console.log("B",objectLocation.x1,objectLocation.x2);//display in console, location of the click point
            fencelLocation.push(startPt);//push google.maps.LatLng object
            x++;
            document.getElementById("demo").innerHTML = e.latLng;

        }


    });

    function calcRoute(source, destination) {
        var polyline = new google.maps.Polyline({
            path: [source, destination],
            strokeColor: 'red',
            strokeWeight: 2,
            strokeOpacity: 1
        });

        polyline.setMap(map);
    }


}

function saveLocation(){
    var test =[
        { x:"elehant"},
        {y:"tiger"}
    ];
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    var x
    var http = new XMLHttpRequest();
    var url = "/get_data";
    var params = "data data data ";
    http.open("POST", url, true);
//Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(test);
   // console.log("save",objectOfLocation[0].length);
    console.log("supun",objectOfLocation[0].x1,objectOfLocation[0].x2,objectOfLocation[0].y1,objectOfLocation[0].y2);
    console.log("szaax",objectOfLocation[1].x1,objectOfLocation[1].x2,objectOfLocation[1].y1,objectOfLocation[1].y2);
    //query.data.saveLocationOfFence(objectOfLocation) ;



}


