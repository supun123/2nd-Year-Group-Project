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
    getFenceData();
    getElephantLocation(map);
    var x = 0;
    //var objectFencelLocation = [];
    var fencelLocation = [];//taking google.maps.LatLng objects which is help to mark fences in the map
    function location(x1,x2,y1,y2) {//use this function as a class  use this function to create (objectLocation ) object
        this.x1=x1;
        this.x2=x2;
        this.y1=y1;
        this.y2=y2;
    }
    function calcRoute(source, destination) {
        var polyline = new google.maps.Polyline({
            path: [source, destination],
            strokeColor: 'red',
            strokeWeight: 2,
            strokeOpacity: 1
        });

        polyline.setMap(map);
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
            fencelLocation = [];
            objectLocation=new location(null,null,null,null);
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



    function getFenceData(map) {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var locations=JSON.parse(this.responseText);
                document.getElementById("demo").innerHTML =locations[0].x;
                for (i in locations) {
                    var p1 = new google.maps.LatLng(locations[i].x1,locations[i].x2);
                    var p2 = new google.maps.LatLng(locations[i].y1,locations[i].y2);
                    //     addMarker(myLatlng,map);
                    calcRoute(p1,p2);
                }
            }
        };
        xhttp.open("GET", "/getFenceLocation", true);
        xhttp.send("aaaa");
    }


}
/*Save marked locations of the fence to the database*/
function saveLocation(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    xhttp.open("POST", "/fenceLocation", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(objectOfLocation));
    console.log("supun",objectOfLocation[0].x1,objectOfLocation[0].x2,objectOfLocation[0].y1,objectOfLocation[0].y2);
    console.log("szaax",objectOfLocation[1].x1,objectOfLocation[1].x2,objectOfLocation[1].y1,objectOfLocation[1].y2);
}

// Adds a elephant locations  to the map.
function addMarker(location, map) {
    var elephantLocation = {x:0, y:0};
    elephantLocation.x=location.lat();
    elephantLocation.y=location.lng();
    //allElephentLocations.push(elephantLocation);
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
  //  console.log(location.lat(),location.lng());
    var marker = new google.maps.Marker({
        position: location,
        label:'E',
        map: map
    });
}
function getElephantLocation(map) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var locations=JSON.parse(this.responseText);
            for (i in locations) {
                var myLatlng = new google.maps.LatLng(locations[i].x,locations[i].y);
                addMarker(myLatlng,map);
            }
        }
    };
    xhttp.open("GET", "/getElephanLocations", true);
    xhttp.send("aaaa");
}


