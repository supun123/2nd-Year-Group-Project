// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var allElephentLocations = [];
function initialize() {
    var bangalore = { lat: 12.97, lng: 77.59 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: {lat: 6.902096, lng: 79.860561},
        mapTypeId: 'terrain'
    });
    getElephantLocation(map);
    getFenceData(map);
    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng, map);
    });
//create a elephant fence for given location in the map
    function calcRoute(source, destination) {
        var polyline = new google.maps.Polyline({
            path: [source, destination],
            strokeColor: 'red',
            strokeWeight: 2,
            strokeOpacity: 1
        });

        polyline.setMap(map);
    }
    //get fence data from the database
    function getFenceData(map) {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // var  parser = new JSONParser();
                //JSONObject jsnobject = new JSONObject();
                // JSONArray jsonArray = new JSONArray(this.responseText);

                var locations=JSON.parse(this.responseText);
               // document.getElementById("demo").innerHTML =locations[0].x;
                for (i in locations) {
                    console.log("zz",locations[i].x1,locations[i].x2,locations[i].y1,locations[i].y2);
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

// Adds a elephant locations  to the map.
function addMarker(location, map) {
    var elephantLocation = {x:0, y:0};
    elephantLocation.x=location.lat();
    elephantLocation.y=location.lng();
    allElephentLocations.push(elephantLocation);
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    console.log(location.lat(),location.lng());
    var marker = new google.maps.Marker({
        position: location,
        label: 'E',
        map: map
    });
}
function saveLocation(){

    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", "/allElephentLocations", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(allElephentLocations));





}
function getElephantLocation(map) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var locations=JSON.parse(this.responseText);
            for (i in locations) {
                console.log("zz",locations[i].x,locations[i].y);
                var myLatlng = new google.maps.LatLng(locations[i].x,locations[i].y);
                addMarker(myLatlng,map);
            }
        }
    };
    xhttp.open("GET", "/getElephanLocations", true);
    xhttp.send("aaaa");
}
google.maps.event.addDomListener(window, 'load', initialize);