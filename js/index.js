
let method = "GET";
let url = "https://restcountries.eu/rest/v2/all";
let asynchronous = true;
let label = "Content-type";
let labelValue = "application/x-www-form-urlencoded";

function getCountriesData(){

	let ajaxRequest = new XMLHttpRequest();
	ajaxRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let myObj = JSON.parse(this.responseText);
			process(myObj);
		}
	};

	ajaxRequest.open(method, url , asynchronous);
	ajaxRequest.setRequestHeader(label, labelValue);
	ajaxRequest.send();

	return false;
}

function process(data){
	let countryOptions = document.getElementById("country");
	
	for(let i = 0; i < data.length; i++){
		let opt = document.createElement('option');
		opt.innerHTML = data[i].name;
		opt.value = data[i].name;
		countryOptions.appendChild(opt);
	}
}

function getCountryData(){
	let selectedCountryValue = document.getElementById("country").value;

	let ajaxRequest = new XMLHttpRequest();
	ajaxRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let myObj = JSON.parse(this.responseText);
			pageProcessing(myObj);
		}
	};

	ajaxRequest.open(method, url = "https://restcountries.eu/rest/v2/name/"+selectedCountryValue , asynchronous);
	ajaxRequest.setRequestHeader(label, labelValue);
	ajaxRequest.send();

	return false;
}

function pageProcessing(data){
	let img = document.getElementById("countryFlag");
	img.setAttribute("src", "https://restcountries.eu/data/"+data[0].alpha3Code.toLowerCase()+".svg");
	
	let capital = document.getElementById("capital");
	let timezone = document.getElementById("timezone");
	let language = document.getElementById("language");
	let currency = document.getElementById("currency");
	
	capital.innerHTML = "Capital: "+data[0].capital;
	timezone.innerHTML = "Timezone: "+data[0].timezones;
	language.innerHTML = "Language: "+data[0].languages[0].nativeName;
	currency.innerHTML = "Currency: "+data[0].currencies[0].code;
	
	let borders = document.getElementById("borders");
	
	if(borders.hasChildNodes()){
		borders.innerHTML = '';
	}
	
	if(data[0].borders[[0]]){
		for(let i = 0; i < 5; i++){
			let li = document.createElement('li');
			if(data[0].borders[[i]] != null){
				li.innerHTML = data[0].borders[[i]];
				borders.appendChild(li);
			}
		}
	}else{
		let li = document.createElement('li');
		li.innerHTML = "No data available.";
		borders.appendChild(li);
	}
	
	let table = document.getElementById("regional");
	let tableBody = document.getElementById("tableBody");
	
	if(tableBody.hasChildNodes()){
		tableBody.innerHTML = '';
	}
	
	if(data[0].regionalBlocs.length > 0){
		for(let i = 0; i < data[0].regionalBlocs.length; i++){
			let tr = document.createElement('tr');
			
			let tdAcronym = document.createElement('td');
			let tdName = document.createElement('td');
			
			tdAcronym.innerHTML = data[0].regionalBlocs[[i]].acronym;
			tdName.innerHTML = data[0].regionalBlocs[[i]].name;
			
			tr.appendChild(tdAcronym);
			tr.appendChild(tdName);
			tableBody.appendChild(tr);
			table.appendChild(tableBody);
		}
	}else{
		let tr = document.createElement('tr');
		
		let tdAcronym = document.createElement('td');
		let tdName = document.createElement('td');
		
		tdAcronym.innerHTML = "No data available.";
		tdName.innerHTML = "No data available.";
		
		tr.appendChild(tdAcronym);
		tr.appendChild(tdName);
		tableBody.appendChild(tr);
		table.appendChild(tableBody);
	}
	
	let latLong1 = data[0].latlng[0];
	let latLong2 = data[0].latlng[1];
	
	myMap(latLong1, latLong2);
}


function myMap(latLong1, latLong2) {
	let mapProp = {
		center: new google.maps.LatLng(latLong1,latLong2),
		zoom:5,
	};
	let map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}


