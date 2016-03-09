// pouch.js
    (function() {
        'use strict';

    angular
        .module('eligcalc.data')
        .service('$pouch', pouch);
	
	pouch.$inject = ['$q', '$rootScope'];

    function pouch($q, $rootScope) { 
        /*jshint validthis: true*/
        var self = this;
		var database;
        var syncHandler;
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
            compact: _compact,
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
                since: 'now',
				live: true,
				include_docs: true
			}).on("change", function(change) {
				if(!change.deleted) {
                    console.log('document changed...');
                    console.log(change);
					$rootScope.$broadcast("$pouchDB:change", change.doc);
				} else {
                    console.log('document deleted...');
                    console.log(change);
					$rootScope.$broadcast("$pouchDB:delete", change.doc);
				}
			}).on("complete", function(info) {
                console.info('$pouch complete event...');
                console.info(info);
            }).on("error", function(error) {
                console.warn('$pouch error event...');
                console.error(error);
            });
		}

		function _stopListening() {
			changeListener.cancel();
		}

		function _sync(options) {
            if (!!options.cancel) {
                console.log('cancel sync with server: ' + options.remoteDatabase);
                syncHandler.on('complete', function(info) {
                    console.log(info);
                });
                syncHandler.cancel();
            } else {
                console.log('start sync with server: ' + options.remoteDatabase);
                syncHandler = _getDatabase()
                    .sync('http://localhost:5984/eligcalc', {live: true, retry: true})
                    .on('change', function(change) {
                        console.log('sync_change: ' + change.direction + ' (' + change.change.docs.length + ')');
                        console.info(change);
                    })
                    .on('paused', function(info) {
                        console.log('sync_paused: ' + info);
                    })
                    .on('active', function(info) {
                        console.log('sync_active: ' + info.direction);
                    })
                    .on('error', function(err) {
                        console.log('sync_error: ' + err);
                        console.error(err);
                    });
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
        
        function _compact() {
            return _getDatabase().compact().then(function(info) {
                console.log('pouchdb_compact: ' + info);
                return info;
            }).catch(function(error) {
                console.error('pouchdb_compact_err: ' + error);
            });
        }

		function _destroy() {
			database.destroy();
		}
	}
})();
