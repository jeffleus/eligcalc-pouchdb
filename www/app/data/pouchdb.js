// pouch.js
    (function() {
        'use strict';

    angular
        .module('eligcalc.data')
        .service('$pouch', pouch);
	
	pouch.$inject = ['$q'];

    function pouch($q) { 
        /*jshint validthis: true*/
        var self = this;
		var database;
        var syncHandler;
		var changeListener;
        var service = {
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
        };
		
		return service;
		////////////
//********************************************************************************
// Mgmt Operations: setDb, compact, sync, destroy, start/stopListening
//********************************************************************************
		function _setDatabase( db ) {
			if (typeof db === 'string') {
				database = new PouchDB( db );
			} else {
				database = db;
			}
		}
        
        function _compact() {
            var db = this;
            return db.compact().then(function(info) {
                console.log('pouchdb_compact: ' + info);
                return info;
            }).catch(function(error) {
                console.error('pouchdb_compact_err: ' + error);
            });
        }

		function _sync(remotedb, options) {
            var db = this;
            //if no remotedb, use a default link
            var _remotedb = remotedb || 
                'http://admin:Eraser$16@ec2-52-26-70-170.us-west-2.compute.amazonaws.com:5984/eligcalc';
            //if no options, use a default config continuous sync w/retry
            var _options = options || {live: true, retry: true};
            //note, just return the synchandler directly and allow client to handle
            // the event emitters
            return db.sync(_remotedb, _options);
		}

		function _destroy() {
            var db = this;
			return db.destroy();
		}

		function _startListening() {
            var db = this;
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
			changeListener = db.changes(options);            
            //return the listener for the client to attach to events
			return changeListener;
		}

		function _stopListening() {
            var db = this;
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
//********************************************************************************
// CRUD Operations: get, getRevision, getWithConflicts, save, and delete
//********************************************************************************
		function _get(documentId) {
            var db = this;
			return db.get(documentId, {});
		}
		
		function _getSpecificRevision(documentId, revId) {
			return database.get(documentId, { rev: revId });
		}
		
		function _getWithRevisionsAndConflicts(documentId) {
			return database.get(documentId, { revs:true,conflicts:true });
		}
        
		function _save(doc) {
            var db = this;
            //no _id means new object to be posted, need to revise to always post w/ my own id's
			if(!doc._id) {
				return db.post(doc);
			} else {
                //_id and _rev required to be able to update
				return db.put(doc, doc._id, doc._rev);
			}
		}

		function _delete(documentId, documentRevision) {
            var db = this;            
			return db.remove(documentId, documentRevision);
		}
    }
})();
