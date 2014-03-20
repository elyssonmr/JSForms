var db;

function indexedDBOk() {
	return "indexedDB" in window;
}

function initDB(){
	//No support? Go in the corner and pout.
	if(!indexedDBOk) return;

	var openRequest = indexedDB.open("protocol_db",1);

	openRequest.onupgradeneeded = function(e) {
		var thisDB = e.target.result;

		if(!thisDB.objectStoreNames.contains("protocol")) {
			var protocol = thisDB.createObjectStore("protocol", {autoIncrement:true, keyPath:"key"});
		}
	}

	openRequest.onsuccess = function(e) {
		db = e.target.result;
	}	

	openRequest.onerror = function(e) {
		//Do something for the error
	}
}

function deleteProtocol(key) {
	if(key === "" || isNaN(key)) return;
	
	var transaction = db.transaction(["protocol"], "readwrite");
	var store = transaction.objectStore("protocol");
  
	var request = store.delete(Number(key));
  
	request.onsuccess = function(e) {
	  getProtocols(e);
	};
  
	request.onerror = function(e) {
	  console.log("Error Deleting: ", e);
	};
}

function updateProtocol(protocol) {
	console.log("About to update a protocol");

	//Get a transaction
	//default for OS list is all, default for type is read
	var transaction = db.transaction(["protocol"],"readwrite");
	//Ask for the objectStore
	var store = transaction.objectStore("protocol");
				
	//Define a protocol
	var protocol = {
		desc:protocol.desc,
		type:protocol.type,
		eventDate:protocol.eventDate,
		status:protocol.eventDate
	}

	//Perform the update
	var request = store.put(protocol);

	request.onerror = function(e) {
		console.log("Error",e.target.error.name);
		//some type of error handler
	}

	request.onsuccess = function(e) {
		console.log("Woot! Did it");
	}
}

function addProtocol(protocol) {
	console.log("About to add a protocol");

	//Get a transaction
	//default for OS list is all, default for type is read
	var transaction = db.transaction(["protocol"],"readwrite");
	//Ask for the objectStore
	var store = transaction.objectStore("protocol");
				
	//Define a protocol
	var protocol = {
		desc:protocol.desc,
		type:protocol.type,
		eventDate:protocol.eventDate,
		status:protocol.eventDate
	}

	//Perform the add
	var request = store.add(protocol);

	request.onerror = function(e) {
		console.log("Error",e.target.error.name);
		//some type of error handler
	}

	request.onsuccess = function(e) {
		console.log("Woot! Did it");
	}
}

function getProtocol(key) {
	var key = document.querySelector("#key").value;
	if(key === "" || isNaN(key)) return;

	var transaction = db.transaction(["protocol"],"readonly");
	var store = transaction.objectStore("protocol");

	var request = store.get(Number(key));

	request.onsuccess = function(e) {

		var result = e.target.result;
		console.dir(result);
		if(result) {
			var s = "<h2>Key "+key+"</h2><p>";
			for(var field in result) {
				s+= field+"="+result[field]+"<br/>";
			}
			document.querySelector("#status").innerHTML = s;
		} else {
			document.querySelector("#status").innerHTML = "<h2>No match</h2>";
		}	
	}	
}

function getProtocols() {

	var protocols = [];

	db.transaction(["protocol"], "readonly").objectStore("protocol").openCursor().onsuccess = function(e) {
		var cursor = e.target.result;
		if(cursor) {	
			var protocol = {};
			protocol.id = cursor.key;			
			for(var field in cursor.value) {
				if(field=='desc'){
					protocol.desc = cursor.desc;
				} else if (field=='type'){
					protocol.type = cursor.type;
				} else if (field=='eventDate'){
					protocol.eventDate = cursor.eventDate;
				} else if (field=='status'){
					protocol.status = cursor.status;
				}
			}
			protocols.push(protocol);
			cursor.continue();
		}
		return protocols;
	}
}