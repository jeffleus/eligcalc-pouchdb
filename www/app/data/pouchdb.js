// pouch.js
    (function() {
        'use strict';

    angular
        .module('eligcalc.data')
        .service('$pouch', pouch);
	
	pouch.$inject = ['$q', '$rootScope', '$http'];

    function pouch($q, $rootScope, $http) { 
        /*jshint validthis: true*/
        var self = this;
		var database;
        var syncHandler;
		var changeListener;
        var service = {
//            db: _getDatabase, 
            setDatabase: _setDatabase,
            compact: _compact,
            sync: _sync,
            destroy: _destroy,
            startListening: _startListening,
            stopListening: _stopListening,
            get: _get,
            getSpecificRevision: _getSpecificRevision, 
            getWithRevisionsAndConflicts: _getWithRevisionsAndConflicts,
            save: _save,
            delete: _delete
//            syncHandler: syncHandler,
//            changeListener: changeListener
        };
		
		return service;
		////////////

		function _getDatabase() {
			if (!database) _setDatabase('eligcalc');
			return database;
		}
		
		function _setDatabase( db ) {
			if (typeof db === 'string') {
				database = new PouchDB( db );
			} else {
				database = db;
			}
		}
        
        function _compact() {
            return _getDatabase().compact().then(function(info) {
                console.log('pouchdb_compact: ' + info);
                return info;
            }).catch(function(error) {
                console.error('pouchdb_compact_err: ' + error);
            });
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

		function _destroy() {
			return database.destroy();
		}

		function _startListening( _database ) {
            //since:'now' prevents listening during init stages and live:true keeps listening
            // during live replication and changes in the UI.
            //listener options requires the conflicts and include docs to wire up conflict
            // resolution code.
            var options = {
                since: 'now',
				live: true,
				conflicts: true,
				include_docs: true
			};
            //save a ref to the changeListener for evenutal cancel
			changeListener = _database.changes(options);            

			return changeListener;
		}

		function _stopListening() {
			//check for a changeListener in the service
            if (changeListener) {
				//if found, wire a complete handler to log the execution of the cancel
                changeListener.on('complete', function(info) {
                    console.log('live listening canceled on dataservice.');
                    console.log(info);
                });
				//log and start the cancelation on the changeListener
                console.log('canceling live listening on the dataservice...');
                changeListener.cancel();
            }
		}

		function _get(documentId) {
			return database.get(documentId, {});
		}
		
		function _getSpecificRevision(documentId, revId) {
			return database.get(documentId, { rev: revId });
		}
		
		function _getWithRevisionsAndConflicts(documentId) {
			return database.get(documentId, { revs:true,conflicts:true });
		}
        
		function _save(doc) {
            //no _id means new object to be posted, need to revise to always post w/ my own id's
			if(!doc._id) {
				return database.post(doc);
			} else {
                //_id and _rev required to be able to update
				return database.put(doc, doc._id, doc._rev);
			}
		}

		function _delete(documentId, documentRevision) {
			return database.remove(documentId, documentRevision);
		}
//****************************************
// Load Conflicts and Parent
//****************************************
// given a doc marked with conflicts retrieve the parent
// for change tracking and the conflict docs to allow for
// user intervention to resolve the conflicts
//                
        function loadConflicts(doc) {
            //root doc is the current 'winner' chosen by CouchDB/PouchDB
            var winner = doc;
            self.winner = winner;
            //get the parent by contacting the server REST api directly because
            // replication does not send non-leaf records and the parent may be missing from
            // the localdb
            var parent;
            var parent_rev = (doc._revisions.start - 1).toString() + '-' + doc._revisions.ids[1];			
			var url = 'http://52.26.70.170:5984/eligcalc/' +
				doc._id + '?rev=' + parent_rev;
			
            return $http.get(url).then(function(response) {
				console.log(response);
				parent = response.data;
				self.parent = parent;
                return parent;
			}).then(function() {
                if (doc._conflicts) {
                    var conflicts = doc._conflicts.map(function(conflict_rev) {
                        return database.get(doc._id, {rev:conflict_rev})
                            .then(function(conflictDoc) {
                                console.log('Conflict Doc Retrieved...');
                                console.info(conflictDoc._rev);
                                return conflictDoc;
                        });
                    });
                    return $q.all(conflicts).then(function(conflictDocs) {
                        self.conflicts = conflictDocs;
                        console.log('all conflicts found');
                        if (self.conflicts[0]) {
                            self.loser = self.conflicts[0];
                        }
                        return conflictDocs;
                    });
                } else { return; }
            }).then(function() {
                return {
                    winner: self.winner,
                    loser: self.loser,
                    conflicts: self.conflicts,
                    parent: self.parent
                };
            });
        }
	}
})();
