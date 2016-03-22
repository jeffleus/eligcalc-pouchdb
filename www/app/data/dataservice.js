// dataservice.js
(function() {
    'use strict';

    angular
        .module('eligcalc.data')
        .service('dataservice', dataservice);

	dataservice.$inject = ['$q', '$http', '$pouch', 'MessageSvc', 'Player', 'Transcript', 'Course'];
	
    function dataservice($q, $http, $pouch, MessageSvc, Player, Transcript, Course) {
        /*jshint validthis: true*/
        var self = this;
        //local state to track the localdb, remotedb, and sync/change handlers 
        var _database = {};
        var _localdb = 'eligcalc';
        var _remotedb = 'http://admin:Eraser$16@ec2-52-26-70-170.us-west-2.compute.amazonaws.com:5984/eligcalc';
        var _syncHandler = {};
        var _changeListener = {};
        self.msgSvc = MessageSvc;
        self.database = {};
        
        var _eventHandlers = [];
        self.registerEventHandler = _registerEventHandler;
                
        self.startSync = _startSync;
        self.stopSync = _stopSync;
        self.startListening = _startListening;
        self.stopListening = _stopListening;
		self.destroy = _destroy;        
        
        self.processDocForConflicts = _processDocForConflicts;
 
		self.getPlayers = _getPlayers;
		self.addPlayer = _addPlayer;
		self.savePlayer = _savePlayer;
		self.deletePlayer = _deletePlayer;
		self.getTranscripts = _getTranscripts;
		self.getCourses = _getCourses;
		self.getLookups = _getLookups;

        _init();
        function _init() {
            _setDatabase()
                .then( _startSync() )
                .then( _startListening() );
        }

		function _registerEventHandler(handler) {
            _eventHandlers.push(handler);
        }

		function _setDatabase() {
            _database = new PouchDB(_localdb);
            self.database = _database;
            return $q.when( _database );
        }
		
		function _destroy() {
			$pouch.setDatabase( _database );
			$pouch.destroy();
		}

		function _startSync() {
            console.log('start sync (datasvc) with server: ' + _remotedb);            
            _syncHandler = $pouch.sync.call(_database, _remotedb, null);//$pouch.sync(_remotedb, null);
            _syncHandler
//            _syncHandler = _database.sync(_remotedb, {live: true, retry: true})
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
                    //$rootScope.$on('', err);
                });

			return $q.when( _syncHandler ).catch(function(err) {
				console.error(err);
			});
        }

		function _stopSync() {
            if (_syncHandler) {                
                _syncHandler.on('complete', function(info) {
                    console.log('live sync canceled on dataservice.');
                    console.log(info);
                });

                console.log('canceling live sync on the dataservice...');
                _syncHandler.cancel();
            }
        }
        
        function _startListening() {
			_changeListener = $pouch.startListening.call( _database );
			_changeListener
				.on("change", function(change) {
					_eventHandlers.forEach(function(handler) {
						if (change.doc.type == handler.docType) {
							handler.handleChange.call(self, change);
						}
					});
				}).on("error", function(error) {
					console.warn('$pouch error event...');
					console.error(error);
				});
            
            return $q.when( _changeListener );
        }
        
        function _stopListening() {
			$pouch.stopListening();
        }
        
        function _compact() {
            return _database.compact().then(function(info) {
                console.log('pouchdb_compact: ' + info);
                return info;
            }).catch(function(error) {
                console.error('pouchdb_compact_err: ' + error);
            });
        }
//************************************************************
// GetEntities: getPlayers, getTranscripts, _getCourses
//************************************************************
// provides a generic mechanism to use a given view to filter by doc type
// and return a hydrated list of objects for that class
        function _getEntities(view, Entity) {
			// implementation details go here
			console.info('get entities using view: ' + view);
			return _database.query(view, {include_docs:true,conflicts:true}).then(function(result) {
			 	// do something with result
				console.log(Entity.name + ' Entities found: ' + result.total_rows);
				var entities = result.rows.map(function(r) {
					return new Entity(r.doc);
				});
				return entities;
			}).catch(function(error) {
				console.error(error);
				return null;
			});            
        }
        
		function _getPlayers() {
            return _getEntities('player_idx', Player);
		}
        
        function _getPlayer( id ) {
            return $pouch.get.call(_database, id);
        }

		function _getTranscripts() {
            return _getEntities('transcript_idx', Transcript);
		}

		function _getCourses() {
            return _getEntities('course_idx', Course);
		}
//************************************************************
// End GetEntities
//************************************************************
        
        function _addPlayer(p) {
//			$pouch.setDatabase( _database );
            return $pouch.save.call(_database, p).then(function(resp) {
                console.log('_addPlayer completed (id: ' + resp.id + ')');
                return p;
            }).catch(function(err) {
                console.log('_addPlayer failed in dataservice...');
                console.error(err);
            });
        }
        
        function _savePlayer(p) {
//			$pouch.setDatabase( _database );
            return $pouch.save.call(_database, p).then(function(resp) {
                console.log('_savePlayer completed (rev: ' + resp.rev + ')');
                return p;
            }).catch(function(err) {
                console.log('_savePlayer failed in dataservice...');
                console.error(err);
            });
        }

		function _deletePlayer(p) {
//			$pouch.setDatabase( _database );
            return $pouch.delete.call(_database, p._id, p._rev).then(function(resp) {
                console.log('_deletePlayer completed (rev: ' + resp.rev + ')');
                return resp.id;
            }).catch(function(err) {
                console.log('_deletePlayer failed in dataservice...');
                console.error(err);
            });
        }

		function _getLookups() {
			// implementation details go here
		}

		function ready(nextPromises) {
			// implementation details go here
		}        
        
//************************************************************
// CONFLICTS: processDoc, loadParentDoc, loadConflictDocs
//************************************************************
//
// used to take a doc w/ _conflicts arry and process out the current
// winner, the parent doc, and docs for each conflict listed in
// the array of conflicts on the doc
        function _processDocForConflicts(doc) {
            var result = {
                winner: doc,
                parent: null,
                conflicts: null,
                loser: null
            };
            
            return $q.all([_loadParentDoc(doc), _loadConflictDocs(doc)]).then(function(results) {
                result.parent = results[0];
                if (results[1]) {
                    return $q.all(results[1]).then(function(_conflicts){
                        result.conflicts = _conflicts;
                        result.loser = _conflicts[0];
                        return result;
                    });
                } else { return result; }
            });
        }
        
        function _loadParentDoc(doc) {
			$pouch.setDatabase( _database );
            return $pouch.getWithRevisionsAndConflicts(doc._id).then(function(doc) {
                if (doc._revisions.start == 1) {
                    console.log('no parent because first revision.');
                    return null;
                } else {
                    var parent_rev = (doc._revisions.start - 1).toString() + '-' + doc._revisions.ids[1];			
                    var url = _remotedb + '/' + doc._id + '?rev=' + parent_rev;
					
					var remoteDatabase = new PouchDB( _remotedb );
					$pouch.setDatabase( remoteDatabase );					
					
                    return $pouch.getSpecificRevision(doc._id, parent_rev).then(function(doc) {
                    //return $http.get(url).then(function(response) {
                        return doc;
                    }).catch(function(err) {
                        console.error(err);
                        return null;
                    });
                }                
            });
        }
        
        function _loadConflictDocs(doc) {
            //check for actual conflicts before trying to process
			if (doc._conflicts && doc._conflicts.length > 0) {
				return doc._conflicts.map(function(conflict_rev) {
                    var url = _remotedb + '/' + doc._id + '?rev=' + conflict_rev;
                    return $http.get(url)//.then(function(response) {

                    //return _get(doc._id, {rev:conflict_rev})
						.then(function(conflictDoc) {
							console.log('Conflict Doc Retrieved...');
							console.info(conflictDoc.data._rev);
							return conflictDoc.data;
					});
				});
            } else { return null; }
        }
	}
})();
