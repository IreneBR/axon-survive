(function(){

	//call the UI page "home"
	App.load('Home');

	setInterval(function(){
	
		$.getJSON( "http://localhost:8080/nervousnet-api/raw-sensor-data/GPS", function( data ) {
			
			$("#sensordata").html(JSON.stringify(data));
			gps = JSON.stringify(data);
		});
		
		
	}, 1000);
	

})();

var data = {}; 
var gps = "";


function checkedBox(checkbox)
{
   
    	//console.log("yay");
    	
    	if (checkbox.checked){
        	data[checkbox.name] = checkbox.value;
    	} else {
    		delete data[checkbox.name];
    	}
	//var res = makeResultString();
	//$("#counter").html(res);
    
}

function changeSelect(sel)
{
	if (sel.value != "empty"){
        	data[sel.name] = sel.value;
	} else {
		delete data[sel.name];
	}
	//var res = makeResultString();
	//$("#counter").html(res);
}

function sendData()
{
	var obj = JSON.parse(gps);
	for (var key in data) {
    		var valu = data[key] + "::" + obj.lat + "::" + obj.long;
		storeNameValue(key,valu);
	}
//	alert("Sending " + res);
} 

function storeNameValue(nam, val){
	alert("scheiss " + gps);
	
	
	$.ajax({ type: 'POST',
	processData: false,
	contentType: 'application/json',
	//data: '{ "names" : "Guillaumeee" }', 
	data: '{"' + nam + '": "' +  val + '"}', 
	//data: '{"vars": "vala"}',
	url: 'http://axonserver-mistelip.c9users.io:8080/',
	success: function(json) { 
		console.log('/sayHello POST was successful.');
		console.log(json); 
	} });
	
	//alert("Name: " + nam + " val: " + val + " " + gps["lat"]);
	alert("Name: " + nam + " val: " + val);
}

function makeResultString(){
	var res = "";
	for (var key in data) {
    		res = res + key + ": " + data[key] + "\r";
	}
	return res;
}
