// dataservice.js
(function() {
    'use strict';

    angular
        .module('eligcalc.data')
        .service('dataservice', dataservice);

	dataservice.$inject = ['$q', '$pouch', 'MessageSvc', 'Player', 'Transcript', 'Course'];
	
    function dataservice($q, $pouch, MessageSvc, Player, Transcript, Course) {
        /*jshint validthis: true*/
        var self = this;
        //local state to track the localdb, remotedb, and sync/change handlers 
        var _database = {};
        var _localdb = 'eligcalc';
        var _remotedb = 'http://admin:Eraser$16@ec2-52-26-70-170.us-west-2.compute.amazonaws.com:5984/eligcalc';
        var _syncHandler = {};
        var _changeListener = {};   
                
        self.startSync = _startSync;
        self.stopSync = _stopSync;
        
        self.startListening = _startListening;
        self.stopListening = _stopListening;
        
        self.service = {
            sync: _startSync,
			getPlayers: _getPlayers,
            addPlayer: _addPlayer,
            savePlayer: _savePlayer,
            deletePlayer: _deletePlayer, 
			getTranscripts: _getTranscripts,
			getCourses: _getCourses,
			getLookups: _getLookups//,
			//ready: ready
		};
        
        _init();
        function _init() {
            _setDatabase()
                .then( _startSync() )
                .then( _startListening() );
        }
        
        function _setDatabase() {
            _database = new PouchDB(_localdb);
            return $q.when( _database );
        }
        
        function _startSync() {
            console.log('start sync (datasvc) with server: ' + _remotedb);
            _syncHandler = _database.sync(_remotedb, {live: true, retry: true})
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
            return $q.when( _syncHandler );
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
			_changeListener = _database.changes(options)
                .on("change", function(change) {
				if(!change.deleted) {
                    _database.get(change.id).then(function(doc) {
                        MessageSvc.playerChanged(doc);
                    }).catch(function(err) {
                        console.error(err);
                    });
				} else {
                    //no doc to get after deletion...
                    MessageSvc.playerDeleted(change.doc);
                }
			}).on("complete", function(info) {
                console.info('$pouch complete event...');
                console.info(info);
            }).on("error", function(error) {
                console.warn('$pouch error event...');
                console.error(error);
            });
            
            return $q.when( _changeListener );
        }
        
        function _stopListening() {
            if (_changeListener) {
                _changeListener.on('complete', function(info) {
                    console.log('live listening canceled on dataservice.');
                    console.log(info);
                });

                console.log('canceling live listening on the dataservice...');
                _changeListener.cancel();
            }
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

		function _getTranscripts() {
            return _getEntities('transcript_idx', Transcript);
		}

		function _getCourses() {
            return _getEntities('course_idx', Course);
		}
//************************************************************
// End GetEntities
//************************************************************

		function _get(documentId) {
			return _database.get(documentId);
		}
        
		function _save(jsonDocument) {
            //no _id means new object to be posted, need to revise to always post w/ my own id's
			if(!jsonDocument._id) {
				return _database.post(jsonDocument);
			} else {
                //_id and _rev required to be able to update
				return _database.put(jsonDocument, jsonDocument._id, jsonDocument._rev);
			}
		}

		function _delete(documentId, documentRevision) {
			return _database.remove(documentId, documentRevision);
		}
        
        function _compact() {
            return _database.compact().then(function(info) {
                console.log('pouchdb_compact: ' + info);
                return info;
            }).catch(function(error) {
                console.error('pouchdb_compact_err: ' + error);
            });
        }
        
        function _addPlayer(p) {
			var json = angular.toJson(p);			
            return $pouch.save(p).then(function(resp) {
//                p.id = resp.id;
//                p.rev = resp.rev;
                console.log(resp);
                return p;
            }).catch(function(err) {
                console.error(err);
            });
        }
        
        function _savePlayer(p) {
			var json = angular.toJson(p);			
            return $pouch.save(p).then(function(resp) {
                console.log(resp);
                return p;
            }).catch(function(err) {
                console.error(err);
            });
        }

		function _deletePlayer(p) {
            return $pouch.delete(p._id, p._rev).then(function(resp) {
                console.log(resp);
            }).catch(function(err) {
                console.error(err);
            });
        }

		function _getLookups() {
			// implementation details go here
		}

		function ready(nextPromises) {
			// implementation details go here
		}		
	}
})();
