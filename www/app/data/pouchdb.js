// pouch.js
(function() {
    'use strict';

    angular
        .module('eligcalc.data')
        .service('$pouch', pouch);
	
	pouch.$inject = ['$q', '$rootScope', '$console'];

    function pouch($q, $rootScope, $console) { 
        /*jshint validthis: true*/
        var self = this;
		var database;
        var sync;
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
                    $console.log('document changed...');
                    $console.log(change);
					$rootScope.$broadcast("$pouchDB:change", change.doc);
				} else {
                    $console.log('document deleted...');
                    $console.log(change);
					$rootScope.$broadcast("$pouchDB:delete", change);
				}
			}).on("complete", function(info) {
                $console.info('$pouch complete event...');
                $console.info(info);
            }).on("error", function(error) {
                $console.warn('$pouch error event...');
                $console.error(error);
            });
		}

		function _stopListening() {
			changeListener.cancel();
		}

		function _sync(options) {
            if (options.start) {
                $console.log('start sync with server: ' + options.remoteDatabase);
                sync = _getDatabase().sync('http://localhost:5984/eligcalc', {live: true, retry: true});                
            } else {
                $console.log('cancel sync with server: ' + options.remoteDatabase);
                sync.cancel();
            }
		}

		function _save(jsonDocument) {
			if(!jsonDocument._id) {
				return database.post(jsonDocument);
			} else {                
				return database.put(jsonDocument);
			}
		}

		function _delete(documentId, documentRevision) {
			return _getDatabase().remove(documentId, documentRevision);
		}

		function _get(documentId) {
			return database.get(documentId);
		}

		function _destroy() {
			database.destroy();
		}
	}
})();
