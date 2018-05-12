
//  creates an interactive map which constructs a polyline based on
// user clicks. Note that the polyline only appears once its path property
// contains two LatLng coordinates.

var poly;
var map;
var locationsOfFences=[];
//var select="fence";
var markers=[];
var allElephentLocations = [];//put elephantlocations as objects of var elephantLocation = {x:0, y:0};
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: {lat: 6.438895, lng: 80.888441},
        mapTypeId: 'terrain'
    });

    poly = new google.maps.Polyline({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });
    poly.setMap(map);
   // getElephantLocation(map);
    getFenceData();
    // Add a listener for the click event
    map.addListener('click', addLatLng);
    var allFenceLocations=[];
    function getFenceData(map) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var locations=JSON.parse(this.responseText);
                // document.getElementById("demo").innerHTML =locations[0].x;
                var first="yes";
                var fid=0;
                var fidarray=new Array();//all fence id store in this array
                var x=[];
                var noOfFence=0;
                for (i in locations){
                    if(first=="yes"){
                        first="false";
                        fid=locations[i].fenceId;
                        fidarray.push(locations[i]);
                        noOfFence++;
                    }
                    else{
                        if(fid!=locations[i].fenceId){
                            fid=locations[i].fenceId;
                            noOfFence++;
                            fidarray.push(locations[i]);
                        }
                    }
                }
             //   console.log("noOfFence",noOfFence);
                for (iz = 0; iz < noOfFence; iz++) {
                   // console.log("suppa",iz);
                    var temp= new Array();
                    for (ii in locations) {
                        //console.log("U",ii,locations[ii].fenceId,fidarray[iz].fenceId);
                       if(locations[ii].fenceId==fidarray[iz].fenceId){
                          // console.log("v",ii);
                           var locationObj = { lat:locations[ii].lat,lng:locations[ii].lng,fenceId:locations[ii].fenceId,vertexId:locations[ii].vertexId,deleteFence:locations[ii].deleteFence,brokenFence:locations[ii].brokenFence};
                           temp.push(locationObj);
                       }
                    }
                   // console.log("temp.length:",temp.length);
                    //setFenceData(temp);
                    var finaltemp=new Array();
                    var pree='no';
                    var firtOrtVetex='true';//if we delete first or last vertex we should avoid those vertex

                    for(i=0 ;i<temp.length;i++){
                         if(temp[i].deleteFence==="yes"){
                           // console.log("A",i+1);
                            if(pree==='yes'){
                             //   console.log("B",i+1);
                            }else{
                               // console.log("C",i+1);
                                pree='yes';
                                finaltemp.push(temp[i]);
                                if(i!=0) {
                                    abc(finaltemp);//only first location should not be display
                                    /*var broFence = new Array();//++++++++++++++++++
                                    var goodFence=new Array();
                                    var goodtemp=finaltemp;
                                   // setFenceData(finaltemp);//--------------------------
                                    var beforeBrooken='no';
                                    var beforeGood='no';
                                    for(ia=0 ;ia<goodtemp.length;ia++){
                                        if(goodtemp[ia].brokenFence==="yes"){
                                            beforeBrooken='yes';
                                            if(goodFence.length>0){
                                                goodFence.push(goodtemp[ia]);
                                                setFenceData(goodFence,'no');
                                                goodFence=[];
                                            }
                                            broFence.push(goodtemp[ia]);
                                        }else{
                                            if(beforeBrooken==='yes'){
                                                beforeBrooken='no';
                                                //show broken callfuntion
                                                setFenceData(broFence,'dashed');
                                                broFence=[];
                                                goodFence.push(goodtemp[ia]);
                                            }else{
                                                goodFence.push(goodtemp[ia]);
                                            }
                                        }
                                    }
                                    if(goodFence.length>0){
                                        setFenceData(goodFence,'no');
                                    }else if (broFence.length>0){
                                        setFenceData(broFence,'yes');
                                    }*///++++++++++++++++
                                }
                                finaltemp=[];
                            }
                        }else{
                            if(pree==='yes'){
                                pree='no';
                                if(i!=temp.length-1){//only  last location should not  display
                                    finaltemp.push(temp[i]);
                                }
                            }else{
                                finaltemp.push(temp[i]);
                            }
                            //console.log("D",i+1);
                        }
                    }
                    //setFenceData(finaltemp);
                    abc(finaltemp);//++++++++++++
                }
                for(x  in locations){
                    var locationObj = { lat:locations[ii].lat,lng:locations[ii].lng};
                    allFenceLocations.push(locationObj);
                }
                    }
            }
        xhttp.open("GET", "/getElephantFenceLocations/getFenceLocation", true);
        xhttp.send("aaaa");
        };
    //set fence data which get from database, to the map
    function setFenceData(arr,typePath) {
        //console.log(arr);

        if(typePath==='dashed') {
            var lineSymbol = {
                path: 'M 0,-1 0,1',
                strokeOpacity: 1,
                scale: 4
            };
            var Path = new google.maps.Polyline({
                path: arr,
                strokeColor: '#000000',
                strokeOpacity: 0,
                    icons: [{
                        icon: lineSymbol,
                        offset: '0',
                        repeat: '20px'
                    }],
                strokeWeight: 3
            });
        }else{
            var Path = new google.maps.Polyline({
                path: arr,
                strokeColor: '#000000',
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        }
        Path.setMap(map);
        var x=Path.getPath();
        var labels = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var labelIndex = 0;
        for(t =0;t<arr.length;t++ ){
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(arr[t].lat,arr[t].lng),
                title: '#' + x.getLength(),
                label: labels[arr[t].fenceId]+arr[t].vertexId,
                map: map
            });

        }
    }
    function abc(finaltemp) {
//only first location should not be display
        var broFence = new Array();
        var goodFence=new Array();
        var goodtemp=finaltemp;
        // setFenceData(finaltemp);//--------------------------
        var beforeBrooken='no';
        for(ia=0 ;ia<goodtemp.length;ia++){
            if(goodtemp[ia].brokenFence==="yes"){
                beforeBrooken='yes';
                if(goodFence.length>0){
                    goodFence.push(goodtemp[ia]);
                    setFenceData(goodFence,'no');
                    goodFence=[];
                }
                broFence.push(goodtemp[ia]);
            }else{
                if(beforeBrooken==='yes'){
                    beforeBrooken='no';
                    //show broken callfuntion
                    setFenceData(broFence,'dashed');
                    broFence=[];
                    console.log("A",goodtemp[ia]);
                    goodFence.push(goodtemp[ia-1]);
                    goodFence.push(goodtemp[ia]);
                }else{
                    goodFence.push(goodtemp[ia]);
                }
            }
        }
        if(goodFence.length>0){
            console.log('goodFence.length',goodFence.length);
            setFenceData(goodFence,'no');
        }else if (broFence.length>0){
            setFenceData(broFence,'dashed');
        }
    }
}

function fenceVertex(lat,lng) {//use this function as a class  use this function to create (objectLocation ) object
    this.lat=lat;
    this.lng=lng;
}
function removePoint(marker) {

    for (var i = 0; i < markers.length; i++) {

        if (markers[i] === marker) {
            console.log(markers[i].position.lat(),markers[i].position.lng());
            markers[i].setMap(null);
            markers.splice(i, 1);
            poly.getPath().removeAt(i);
            locationsOfFences.splice(i, 1);

        }
    }
}

// Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(event) {
    // Add a new marker at the new plotted point on the polyline.
    var marker = new google.maps.Marker({
        position: event.latLng,
        title: '#',
        map: map
    });
    markers.push(marker);
    poly.getPath().setAt(markers.length - 1, event.latLng);
    // Because path is an MVCArray, we can simply append a new coordinate
    // and it will automatically appear.
    //path.push(event.latLng);
    var locationObj=new fenceVertex(null,null);
    locationObj.lat=event.latLng.lat();
    locationObj.lng=event.latLng.lng();
    locationsOfFences.push(locationObj);
    google.maps.event.addListener(marker ,'click', function (event) {
            removePoint(marker);
    });
}
function saveLocation() {
//    if (select=="fence") {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
            }
        };
        xhttp.open("POST", "/fence/fenceLocation", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        console.log(locationsOfFences[0].lng);
        xhttp.send(JSON.stringify(locationsOfFences));
        window.location.replace('/fence');
  //  }
    /*else if(select=="location"){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            }
        };
        xhttp.open("POST", "/allElephentLocations", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(allElephentLocations));
    }*/
}

//+++++++++++++++++++++++++++++++++



//-----------------------------------
//use to add elephant locations




