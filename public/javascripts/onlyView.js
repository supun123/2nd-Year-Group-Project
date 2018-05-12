
//  creates an interactive map which constructs a polyline based on
// user clicks. Note that the polyline only appears once its path property
// contains two LatLng coordinates.

var poly;
var map;
var locationsOfFences=[];
var select="fence";
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
    getElephantLocation(map);
    getFenceData();
    // Add a listener for the click event
    // map.addListener('click', addLatLng);
    var allFenceLocations=[];
   /* function getFenceData(map) {
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
                                if(i!=0) {//only first location should not be display
                                    setFenceData(finaltemp);
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
                    setFenceData(finaltemp);
                }
                for(x  in locations){
                    var locationObj = { lat:locations[ii].lat,lng:locations[ii].lng};
                    allFenceLocations.push(locationObj);
                }
            }
        }
        xhttp.open("GET", "/getElephantFenceLocations/getFenceLocation", true);
        xhttp.send("aaaa");
    };*/
    //set fence data which get from database, to the map
    /*function setFenceData(arr) {
        //console.log(arr);
        var Path = new google.maps.Polyline({
            path: arr,
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3
        });
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
    }*/
    //--------------------------------------------------------------------------
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
    }
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
    //-------------------------------------------------------


function fenceVertex(lat,lng) {//use this function as a class  use this function to create (objectLocation ) object
    this.lat=lat;
    this.lng=lng;
}

//-----------------------------------
//use to add elephant locations



// Adds a elephant locations  to the map.
function addElephantLocations(location, map,locationobj) {//create markers and add locations
    var elephantLocation = {x:0, y:0};
    elephantLocation.x=location.lat();
    elephantLocation.y=location.lng();
    allElephentLocations.push(elephantLocation);
    // Add the marker at the clicked location, and add the next-available label

    //  console.log(location.lat(),location.lng());
    var marker = new google.maps.Marker({
        position: location,
        label:'E',
        map: map,
        id:locationobj
    });
    marker.addListener('click', function() {
        console.log("click event in marker");
        showelElephantData(marker);

    });
}
function showelElephantData(marker) {
    document.getElementById("eleId").innerHTML = "Elephant Id: "+marker.id.elephantId;
    document.getElementById("date").innerHTML = "Date: "+marker.id.year+"/"+marker.id.month+"/"+marker.id.day;
    document.getElementById("time").innerHTML ="Time :"+marker.id.hours+":"+marker.id.minutes+":"+marker.id.seconds;
}
/*function showelElephantData(location) {//send massage to the sever to show elephant data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    xhttp.open("POST", "/onlyView/showelElephantData", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    var zz=[1,2,3]
    xhttp.send(JSON.stringify(zz));

    //-------------------------
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var locations=JSON.parse(this.responseText);
            for (i in locations) {
                var myLatlng = new google.maps.LatLng(locations[i].x,locations[i].y);
                addElephantLocations(myLatlng,map);
            }
        }
    };
    xhttp.open("GET", "/onlyView/showelElephantData", true);
    xhttp.send("aaaa");
}*/

//get elephant locations data  from backend
function getElephantLocation(map) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var locations=JSON.parse(this.responseText);
            for (i in locations) {
                var myLatlng = new google.maps.LatLng(locations[i].x,locations[i].y);
                addElephantLocations(myLatlng,map,locations[i]);
            }
        }
    };
    xhttp.open("GET", "/getElephantFenceLocations/getElephanLocations", true);
    xhttp.send("aaaa");
}

