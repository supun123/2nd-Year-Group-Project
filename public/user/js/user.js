//  markers appear when the user clicks on the map.

var markers = [];
//var labelIndex = 0;
var latitude;
var xx=0;
function initialize() {6.899151, 79.860067
    var colombo = { lat: 6.899151, lng: 79.860067 };
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 18,
        center: colombo
    });
    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function(event) {
        if(markers.length!=0){
            markers[0].setMap(null);
            markers = [];}
        addMarker(event.latLng, map);

    });
    // addMarker(bangalore,map);
    // Add a marker at the center of the map.
    //addMarker(bangalore, map);
}
// Adds a marker to the map.
function addMarker(location, map) {
    // Add the marker at the clicked location
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
        //setMapOnAll(null);
        position: location,
        //label: labels[0],
        map: map
    });
    markers.push(marker);
    latitude=marker.getPosition();

    document.getElementById("Loacation").value = latitude;
}

google.maps.event.addDomListener(window, 'load', initialize);