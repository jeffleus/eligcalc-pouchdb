// pouch.js
(function() {
    'use strict';

    angular
        .module('eligcalc.data')
        .service('$pouch', pouch);
	
	pouch.$inject = ['$q'];

    function pouch($q) { 
		var self = this;
		var database;
		var changeListener;
		
		var service = {
			db: _getDatabase, 
			setDatabase: _setDatabase,
			startListening: _startListening,
			stopListening: _stopListening,
			sync: _sync,
			save: _save,
			delete: _delete,
			get: _get,
			destroy: _destroy
		};
		
		return service;

		////////////

		function _getDatabase() {
			if (!database) _setDatabase('eligcalc');
			return database;
		}
		
		function _setDatabase(databaseName) {			
			database = new PouchDB(databaseName);
		}

		function _startListening() {
			changeListener = database.changes({
				live: true,
				include_docs: true
			}).on("change", function(change) {
				if(!change.deleted) {
					$rootScope.$broadcast("$pouchDB:change", change);
				} else {
					$rootScope.$broadcast("$pouchDB:delete", change);
				}
			});
		}

		function _stopListening() {
			changeListener.cancel();
		}

		function _sync(remoteDatabase) {
			database.sync(remoteDatabase, {live: true, retry: true});
		}

		function _save(jsonDocument) {
			var deferred = $q.defer();
			if(!jsonDocument._id) {
				database.post(jsonDocument).then(function(response) {
					deferred.resolve(response);
				}).catch(function(error) {
					deferred.reject(error);
				});
			} else {
				database.put(jsonDocument).then(function(response) {
					deferred.resolve(response);
				}).catch(function(error) {
					deferred.reject(error);
				});
			}
			return deferred.promise;
		}

		function _delete(documentId, documentRevision) {
			return database.remove(documentId, documentRevision);
		}

		function _get(documentId) {
			return database.get(documentId);
		}

		function _destroy() {
			database.destroy();
		}
	}
})();
