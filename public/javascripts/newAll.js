
// This example creates an interactive map which constructs a polyline based on
// user clicks. Note that the polyline only appears once its path property
// contains two LatLng coordinates.

var poly;
var map;
var locationsOfFences=[];

//var locationObj = {lat:0, lng:0 };
var select="fence";
var markers=[];
var map, polyline;//-----------
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';//-------------
var labelIndex = 0;//----------
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
       // center: {lat: 6.902096, lng: 79.860561},

        center: {lat: -33.9, lng: 151.2},
        mapTypeId: 'terrain'
    });

    poly = new google.maps.Polyline({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });
    poly.setMap(map);
    getFenceData();
//-------------------------
    var a = new google.maps.LatLng(-33.890542, 151.274856);
    var b = new google.maps.LatLng(-33.923036, 151.259052);
    var c = new google.maps.LatLng(-34.028249, 151.157507);
    addMarker(a, map);
    addMarker(b, map);
    addMarker(c, map);


    function addMarker(location) {//*(*(*
        // Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        var marker = new google.maps.Marker({
            position: location,
            label: labels[labelIndex++ % labels.length],
            map: map
        });
        markers.push(marker);
        poly.getPath().setAt(markers.length - 1, location);
        google.maps.event.addListener(marker ,'click', function (event) {

            removePoint(marker);
        });
    }
    //--------------------------
    // Add a listener for the click event
   // map.addListener('click', addLatLng);
    google.maps.event.addListener( map,'click', function(event) {
        // addMarker(event.latLng, map);
        console.log("click");
        var marker = new google.maps.Marker({
            position: event.latLng,
            label: 'X',
            map: map
        });
        removePoint(marker);
    });




    function removePoint(marker) {
        console.log("removePoint");
        for (var i = 0; i < markers.length; i++) {

            if (markers[i] === marker) {
                console.log(markers[i].position.lat(),markers[i].position.lng());
                markers[i].setMap(null);
                markers.splice(i, 1);

                polyline.getPath().removeAt(i);
                //poly.getPath().removeAt(i);
            }
        }
    }
}

function fenceVertex(lat,lng) {//use this function as a class  use this function to create (objectLocation ) object
    this.lat=lat;
    this.lng=lng;
}
// Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(event) {
    var path = poly.getPath();
    // Because path is an MVCArray, we can simply append a new coordinate
    // and it will automatically appear.
    path.push(event.latLng);
    var locationObj=new fenceVertex(null,null);
    locationObj.lat=event.latLng.lat();
    locationObj.lng=event.latLng.lng();
    locationsOfFences.push(locationObj);

    // Add a new marker at the new plotted point on the polyline.
    var marker = new google.maps.Marker({
        position: event.latLng,
        title: '#' + path.getLength(),
        map: map
    });
}
var allFenceLocations=[];
var FenceObjects=[];
function getFenceData(map) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var locations=JSON.parse(this.responseText);
            // document.getElementById("demo").innerHTML =locations[0].x;
            var first="yes";
            var fid=0;
            var x=[];
            var noOfFence=0;
            for (i in locations){
                if(first=="yes"){
                    first="false";
                    fid=locations[i].fenceId;
                    noOfFence++;
                }
                else{
                    if(fid!=locations[i].fenceId){
                        fid=locations[i].fenceId;
                        noOfFence++;
                    }
                }
            }
            for (i = 1; i <= noOfFence; i++) {
                var temp= new Array();
                for (ii in locations) {
                    if(locations[ii].fenceId==i){
                        var locationObj = { lat:locations[ii].lat,lng:locations[ii].lng};
                        temp.push(locationObj);

                    }
                }
                //console.log(temp);
                //console.log(temp[0].lat);
                FenceObjects.push(temp);
                setFenceData(temp);

            }
            for(x  in locations){
                var locationObj = { lat:locations[ii].lat,lng:locations[ii].lng};
                allFenceLocations.push(locationObj);
            }
        }

    }
    xhttp.open("GET", "/getFenceLocation", true);
    xhttp.send("aaaa");
};
// console.log("AAA",allFenceLocations);

//set fence data which get from database, to the map
function setFenceData(arr) {
    //console.log(arr);
    var Path = new google.maps.Polyline({
        path: arr,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3

    });
    Path.setMap(map);
    var x=Path.getPath();
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;
    for(t =0;t<arr.length;t++ ){
        console.log(t);
        // get new id
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(arr[t].lat,arr[t].lng),
            label: labels[labelIndex++ % labels.length],
            map: map
        });
        //var id = marker.__gm_id;
        markers.push(marker);

    }

}
function saveLocation() {
    if (select=="fence") {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
            }
        };
        xhttp.open("POST", "/fenceLocation", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        console.log(locationsOfFences[0].lng);
        xhttp.send(JSON.stringify(locationsOfFences));
        //console.log("supun", objectOfLocation[0].x1, objectOfLocation[0].x2, objectOfLocation[0].y1, objectOfLocation[0].y2);
       // console.log("szaax", objectOfLocation[1].x1, objectOfLocation[1].x2, objectOfLocation[1].y1, objectOfLocation[1].y2);
    }
    else if(select=="location"){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            }
        };
        xhttp.open("POST", "/allElephentLocations", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(allElephentLocations));


    }
}


