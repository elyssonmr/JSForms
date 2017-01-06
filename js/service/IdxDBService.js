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

    service.create = function(protocol) {
        return $q(function(resolve, reject) {
            var store = service.db.transaction(["protocol"], "readwrite").transaction.objectStore("protocol");
            var protocol = {
    			desc: protocol.desc,
    			type: protocol.type,
    			eventDate: protocol.eventDate,
    			status: protocol.status
    		};
            var request = store.add(protocol);

            request.onsuccess = function(event) {
                protocol.key = request.result;
                resolve(protocol);
            };

            request.onerror = function(e) {
    			reject(event.target.error);
    		};
        });
    };

	service.getById = function(key) {
        return $q(function(resolve, reject) {
            var protocol = {};
    		var store = service.db.transaction(["protocol"], "readonly").transaction.objectStore("protocol");

    		var request = store.get(Number(key));

    		request.onsuccess = function(event) {
    			var result = event.target.result;
    			if(result) {
    				for(var field in result) {
                        switch (field) {
                            case "desc":
                                protocol.desc = result.value[field];
                                break;
                            case "type":
                                protocol.type = result.value[field];
                                break;
                            case "eventDate":
                                protocol.eventDate = result.value[field];
                                break;
                            case "status":
                                protocol.status = result.value[field];
                                break;
                        }
    				}
                    resolve(protocol);
    			} else {
                    resolve({});
    			}
    		}
        });
	};

	service.update = function(protocol) {
        return $q(function(resolve, reject) {
            var store = service.db.transaction(["protocol"],"readwrite").transaction.objectStore("protocol");
            var getRequest = store.get(Number(protocol.key))
            getRequest.onsuccess = function(event) {
    			var protocolToUpdate = event.target.result;
    			protocolToUpdate.desc = protocol.desc;
    			protocolToUpdate.type = protocol.type;
    			protocolToUpdate.eventDate = protocol.eventDate;
    			protocolToUpdate.status = protocol.status;
    			var request = store.put(protocolToUpdate);

    			request.onerror = function(event) {
    				reject(event.target.error.name);
    			};

    			request.onsuccess = function(e) {
                    resolve(protocolToUpdate);
    			};
    		};

            getRequest.onerror = function(event) {
                reject("Protocol não existe")
            };
        });
	};

	service.delete = function(key) {
        return $q(function(resolve, reject) {
            if(key === "" || isNaN(key)) {
                reject("Key não é um ID válido")
            }

    		var store = service.db.transaction(["protocol"], "readwrite").objectStore("protocol");

    		var request = store.delete(Number(key));

            request.onsuccess = function(event) {
                resolve();
    		};

    		request.onerror = function(event) {
                reject(event.target.error);
    		};
        });
	};
}]);
