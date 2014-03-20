/*
 * AngularJS Module
 */
var protocolApp = angular.module('protocolApp', []);


/*
* Services
*/

protocolApp.service('IdxDbService', [function () {	

	this.init = function() {
		this.db = this.initDB();


		console.log('iniciado o IndexedDB');
	};

	this.initDB = function() {		
		var db = {};
		//No support? Go in the corner and pout.
		if(!"indexedDB" in window) return;

		var openRequest = indexedDB.open("protocol_db",1);

		openRequest.onupgradeneeded = function(e) {
			var thisDB = e.target.result;

			if(!thisDB.objectStoreNames.contains("protocol")) {
				var protocol = thisDB.createObjectStore("protocol", {autoIncrement:true, keyPath:"key"});
			}
		}

		openRequest.onsuccess = function(e) {
			db = e.target.result;
			console.log("Bando de dados Aberto");
		}	

		openRequest.onerror = function(e) {
			//Do something for the error
		}

		return db;
	};

	this.create = function(protocol) {

	};

	this.list = function(filters) {
		if(filters) {

		} else {

		}		
	};

	this.update = function(protocol) {

	};

	this.delete = function(id) {

	};
}]);