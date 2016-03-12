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
			destroy: _destroy,
            syncHandler: syncHandler,
            changeListener: changeListener
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
				conflicts: true,
				include_docs: true
			}).on("change", function(change) {
				if(!change.deleted) {
                    console.log('document changed...');
                    console.log(change);
					
					if (change._conflicts && change._conflicts.length > 0) {
						alert('yo, day some sum conflicts up in dis bitch!');
					}else {
						service.get(change.id).then(function(doc) {
							$rootScope.$broadcast("$pouchDB:change", doc);
						}).catch(function(err) {
							console.error(err);
						});
					}
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
			var remotedb = 'http://admin:Eraser$16@ec2-52-26-70-170.us-west-2.compute.amazonaws.com:5984/eligcalc';
            if (!!options && !!options.cancel) {
                console.log('cancel sync with server: ' + remotedb);
                syncHandler.on('complete', function(info) {
                    console.log(info);
                });
                syncHandler.cancel();
            } else {
                console.log('start sync with server: ' + remotedb);
                syncHandler = _getDatabase()
                    .sync(remotedb, {live: true, retry: true})
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
				return database.put(jsonDocument, jsonDocument._id, jsonDocument._rev);
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
