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

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function(event) {

        addMarker(event.latLng, map);
    });



}

// Adds a marker to the map.
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
        label: labels[labelIndex++ % labels.length],
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
google.maps.event.addDomListener(window, 'load', initialize);