angular.module("protocolApp")
.service('IdxDbService', ["$q", function ($q) {
    service = this;
	service.db = {};

	service.init = function() {
        return $q(function(resolve, reject) {
            if(!"indexedDB" in window) {
                reject("IndexedDB Não suportado");
            }

            var openRequest = indexedDB.open("protocol_db", 1);
            openRequest.onupgradeneeded = function(event) {
    			var thisDB = event.target.result;

    			if(!thisDB.objectStoreNames.contains("protocol")) {
    				var protocol = thisDB.createObjectStore("protocol", {autoIncrement: true, keyPath: "key"});
    				protocol.createIndex("desc", "desc", {unique: false});
    			}
    		};

            openRequest.onsuccess = function(event) {
                service.db = event.target.result;
    		    resolve();
    		}

            openRequest.onerror = function(e) {
    		    reject(event.target.error);
    		}
        });
	};

    service.listAll = function() {
        return $q(function(resolve, reject) {
            protocols = [];
            var cursor = service.db.transaction(["protocol"], "readonly").objectStore("protocol").openCursor();
            cursor.onsuccess = function(event) {
    			var cursor = event.target.result;
    			if(cursor) {
    				var protocol = {};
    				protocol.key = cursor.key;
    				for(var field in cursor.value) {
                        switch (field) {
                            case "desc":
                                protocol.desc = cursor.value[field];
                                break;
                            case "type":
                                protocol.type = cursor.value[field];
                                break;
                            case "eventDate":
                                protocol.eventDate = cursor.value[field];
                                break;
                            case "status":
                                protocol.status = cursor.value[field];
                                break;
                        }
    				}
    				protocols.push(protocol);
    				cursor.continue();
    			} else {
                    resolve(protocols);
                }
    		}

            cursor.onerror = function(event) {
                reject(event.target.error);
            };
        });
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
			status:protocol.status
		}

		//Perform the add
		var request = store.add(protocol);

		request.onerror = function(e) {
			console.log("Error",e.target.error.name);
			//some type of error handler
		}

		request.onsuccess = function(e) {
			console.log("Protocol added!");
			//Get the ID from the result request
			protocol.key = request.result;
		}

		return protocol;
	};

	this.getById = function(key) {
		var protocol = {};
		var transaction = db.transaction(["protocol"],"readonly");
		var store = transaction.objectStore("protocol");

		var request = store.get(Number(key));

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

	this.update = function(protocol) {
		console.log("About to update a protocol");

		//Get a transaction
		//default for OS list is all, default for type is read
		var transaction = db.transaction(["protocol"],"readwrite");
		//Ask for the objectStore
		var store = transaction.objectStore("protocol");

		//Get the protocol by description, must be by ID, not description!!!
		store.get(Number(protocol.key)).onsuccess = function(e) {
			var protocolToUpdate = e.target.result;
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

		}


	};

	this.deleteProtocol = function(key) {
		if(key === "" || isNaN(key)) return;

		var transaction = db.transaction(["protocol"], "readwrite");
		var store = transaction.objectStore("protocol");

		var request = store.delete(Number(key));

		request.onsuccess = function(e) {
		  console.log("Deleted key: ", key);
		};

		request.onerror = function(e) {
		  console.log("Error Deleting key: ", key);
		};
	};
}]);
