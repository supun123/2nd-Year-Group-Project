// This example creates a 2-pixel-wide red polyline showing the path of William
// Kingsford Smith's first trans-Pacific flight between Oakland, CA, and
// Brisbane, Australia.
//var query=require('../../query');
//var objectOfLocation = [];//take location Object in this array
//var select ="fence";
var allElephentLocations = [];
function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: {lat: 6.438895, lng: 80.888441},
        mapTypeId: 'terrain'
    });

    getElephantLocation(map);
    var x = 0;
  // var fencelLocation = [];//taking google.maps.LatLng objects which is help to mark fences in the map
        console.log("elephant locations");
        google.maps.event.addListener(map, 'click', function(event) {
            addMarker(event.latLng, map);
        });
}
/*Save marked locations of the fence to the database*/
function saveLocation() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            }
        };
        xhttp.open("POST", "/elephant/allElephentLocations", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(allElephentLocations));
        window.location.replace('/elephant');

}

// Adds a elephant locations  to the map.
function addMarker(location, map) {
    var elephantLocation = {x:0, y:0,Year:0,month:0,day:0,Hours:0,Minutes:0,Seconds:0};
    elephantLocation.x=location.lat();
    elephantLocation.y=location.lng();
    var d = new Date();
    elephantLocation.Year= d.getFullYear();
    elephantLocation.month=d.getMonth()+1;
    elephantLocation.day=d.getDate();
    elephantLocation.Hours=d.getHours();
    elephantLocation.Minutes=d.getMinutes();
    elephantLocation.Seconds=d.getSeconds();
    allElephentLocations.push(elephantLocation);
    // Add the marker at the clicked location, and add the next-available label

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
               // addMarker(myLatlng,map);
                var mark = new google.maps.Marker({
                    position: myLatlng,
                    label:'E',
                    map: map
                });
            }
        }
    };
    xhttp.open("GET", "/getElephantFenceLocations/getElephanLocations", true);
    xhttp.send("aaaa");
}

