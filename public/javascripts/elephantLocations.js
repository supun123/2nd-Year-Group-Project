// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.

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
    var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: results[0].geometry.location

    });
    google.maps.event.addListener(marker, "rightclick", function (point) { id = this.__gm_id; delMarker(id) });
}




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
                var locations=JSON.parse(this.responseText);
               // document.getElementById("demo").innerHTML =locations[0].x;
                for (i in locations) {
                    var p1 = new google.maps.LatLng(locations[i].x1,locations[i].x2);
                    var p2 = new google.maps.LatLng(locations[i].y1,locations[i].y2);
                    calcRoute(p1,p2);
                }
            }
        };
        xhttp.open("GET", "/getFenceLocation", true);
        xhttp.send("aaaa");
    }

//}

// Adds a elephant locations  to the map.
function addMarker(location, map) {
    var elephantLocation = {x:0, y:0};
    elephantLocation.x=location.lat();
    elephantLocation.y=location.lng();
    allElephentLocations.push(elephantLocation);
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
        position: location,
        label: 'E',
        map: map
    });
}
/*save marked locations of the Elephants */
function saveLocation(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
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
                var myLatlng = new google.maps.LatLng(locations[i].x,locations[i].y);
                addMarker(myLatlng,map);
            }
        }
    };
    xhttp.open("GET", "/getElephanLocations", true);
    xhttp.send("aaaa");
}

google.maps.event.addDomListener(window, 'load', initialize);