/*
 * AngularJS Module
 */
var protocolApp = angular.module('protocolApp', []);


/*
* Services
*/

protocolApp.service('IdxDbService', [function () {	
	var db = {};
	var protocols = [];
	
	this.init = function() {
		this.db = this.initDB();


		console.log('iniciado o IndexedDB');
	};

	this.initDB = function() {		
		//No support? Go in the corner and pout.
		if(!"indexedDB" in window) return;

		var openRequest = indexedDB.open("protocol_db",1);

		openRequest.onupgradeneeded = function(e) {
			var thisDB = e.target.result;

			if(!thisDB.objectStoreNames.contains("protocol")) {
				var protocol = thisDB.createObjectStore("protocol", {autoIncrement:true, keyPath:"key"});
				protocol.createIndex("desc", "desc", {unique:false});
			}
		}

		openRequest.onsuccess = function(e) {
			db = e.target.result;
			console.log("Bando de dados Aberto");
			
			console.log("Realizando consulta");
			db.transaction(["protocol"], "readonly").objectStore("protocol").openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if(cursor) {	
					var protocol = {};
					protocol.key = cursor.key;			
					for(var field in cursor.value) {
						if(field=='desc'){
							protocol.desc = cursor.value[field];
						} else if (field=='type'){
							protocol.type = cursor.value[field];
						} else if (field=='eventDate'){
							protocol.eventDate = cursor.value[field];
						} else if (field=='status'){
							protocol.status = cursor.value[field];
						}
					}
					console.log("Protocolo encontrado: " + protocol.key + " " + protocol.desc + " " + protocol.type + " " + protocol.status);
					protocols.push(protocol);
					cursor.continue();
				}
			}	
			
		}	

		openRequest.onerror = function(e) {
			//Do something for the error
		}

		return db;
	};

	this.create = function(protocol) {
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
			console.log("Protocol added!");
		}
		
		return protocol;
	};

	this.list = function(filters) {
		if(filters) {
			db.transaction(["protocol"], "readonly").objectStore("protocol").openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if(cursor) {	
					var protocol = {};
					protocol.key = cursor.key;			
					for(var field in cursor.value) {
						if(field=='desc'){
							protocol.desc = cursor.value[field];
						} else if (field=='type'){
							protocol.type = cursor.value[field];
						} else if (field=='eventDate'){
							protocol.eventDate = cursor.value[field];
						} else if (field=='status'){
							protocol.status = cursor.value[field];
						}
					}
					protocols.push(protocol);
					cursor.continue();
				}
				return protocols;
			}
		} else {

		}		
	};
	
	this.getByDesc = function(desc) {
		if(desc === "" ) return;
		
		var protocol = {};
		var transaction = db.transaction(["protocol"],"readonly");
		var store = transaction.objectStore("protocol");
		var index = store.index("desc");
		
		var request = index.get(desc);
		
		request.onsuccess = function(e) {

			var result = e.target.result;
			if(result) {
				for(var field in result) {
					if(field=='desc'){
						protocol.desc = result[field];
					} else if (field=='type'){
						protocol.type = result[field];
					} else if (field=='eventDate'){
						protocol.eventDate = result[field];
					} else if (field=='status'){
						protocol.status = result[field];
					} else if (field=='key'){
						protocol.key = result[field];
					}
				}
			} else {
			}	
		}	
	return protocol;		
	};
	
	this.getProtocols = function() {
		return protocols;		
	};

	this.update = function(protocol) {
		console.log("About to update a protocol");
		
		var protocolToUpdate = {};
		protocolToUpdate = this.getByDesc(protocol.desc);
		
		//Get a transaction
		//default for OS list is all, default for type is read
		var transaction = db.transaction(["protocol"],"readwrite");
		//Ask for the objectStore
		var store = transaction.objectStore("protocol");
					
		//Perform the update
		protocolToUpdate.desc = protocol.desc;
		protocolToUpdate.type = protocol.type;
		protocolToUpdate.eventDate = protocol.eventDate;
		protocolToUpdate.status = protocol.status;
		var request = store.put(protocolToUpdate);

		request.onerror = function(e) {
			console.log("Error",e.target.error.name);
			//some type of error handler
		}

		request.onsuccess = function(e) {
			console.log("Protocol updated!");
		}
	};

	this.delete = function(key) {
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
	};
}]);