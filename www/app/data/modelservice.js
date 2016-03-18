// modelservice.js
(function () {
    'use strict';
    /*global angular */
    angular
        .module('eligcalc.data')
        .service('modelservice', modelservice);

	modelservice.$inject = ['$rootScope', 'dataservice', 'MessageSvc', 'Player', 'Transcript'];
	
    function modelservice($rootScope, dataservice, MessageSvc, Player, Transcript) {
        /*jshint validthis: true*/
        var self = this;
// private service instance variables
        var players;
        var transcripts;
        var courses;
// private lookup types        
        var gradeTypes;
        var unitTypes;
        var subjectTypes;
// pouch sync and db API       
        self.startSync = _startSync;
        self.stopSync = _stopSync;
		self.destroyDb = _destroyDb;
// Player entity methods: add, save, delete, processConflicts        
        self.addPlayer = _addPlayer;
        self.savePlayer = _savePlayer;
        self.deletePlayer = _deletePlayer;
        self.processPlayerConflicts = _processPlayerConflicts;
// Contorller Initialization
        _init();        
        function _init() {
            //register handlers by entity type, pulling each from entity class definitions
            _registerHandlers();
            //cascade init the entities: players -> transcripts -> courses
            _initPlayers()
                .then( _initTranscripts() )
                .then( _initCourses() );
//            .then(dataservice.service.sync());
        }
//**********************************************************************
// Event handlers for Player changes/deletions
//**********************************************************************
        function _playerChanged(doc) {
            console.log('ModelSvc:playerChanged');
            if (doc.type === 'Player') {
                var p = _.findWhere(self.players, { _id: doc._id });
                if (p && p._rev !== doc._rev) {
                    var revisedPlayer = new Player( doc );
                    console.info(p._rev + ' --> ' + revisedPlayer._rev);
                    var index = self.players.indexOf(p);
                    if (index !== -1) {
                        self.players[index] = revisedPlayer;
                    }
                } else {
                    var newPlayer = new Player( doc );
                    self.players.push( newPlayer );
                }
                $rootScope.$broadcast('modelservice::players_updated');
            }
        }
        
        function _playerDeleted(doc) {
            console.log('ModelSvc:playerDeleted');
            var p = _.findWhere(self.players, { _id: doc._id });
            if (p) {
                console.info('delete --> ' + p._id);
                var index = self.players.indexOf(p);
                if (index !== -1) {
                    self.players.splice(index, 1);
                    $rootScope.$broadcast('modelservice::players_updated');
                }
            }
        }
        
        function _transcriptChanged(doc) {
            console.log('transcript changed is handled...');
        }
        
        function _startSync() {
            dataservice.startSync();
        }
        
        function _stopSync() {
            dataservice.stopSync();
        }
        
		function _destroyDb() {
			return dataservice.destroy().then(function(result) {
				console.log('localdb destroyed');
				self.players = [];
				self.transcripts = [];
				self.courses = [];
				return 0;
			}).catch(function(err) {
				console.log('problem destroying localdb');
				console.error(err);
				return -1;
			});
		}
//**********************************************************************
// Entity Initializers: players, transcripts, and courses
//**********************************************************************
        function _initPlayers() {
            return dataservice.service.getPlayers().then(function(players) {
                self.players = players;
                $rootScope.$broadcast('modelservice::players_loaded');
            }).catch(function(err) {
                console.error(err);
            });        
        }

        function _initTranscripts() {
            return dataservice.service.getTranscripts().then(function(transcripts) {
                self.transcripts = transcripts;
                $rootScope.$broadcast('modelservice::transcripts_loaded');
            }).catch(function(err) {
                console.error(err);
            });
        }

        function _initCourses() {
            return dataservice.service.getCourses().then(function(courses) {
                self.courses = courses;
                $rootScope.$broadcast('modelservice::courses_loaded');
            }).catch(function(err) {
                console.error(err);
            });
        }
//**********************************************************************
// Entity Mgmt CRUD: add, save, delete, and processConflicts
//**********************************************************************
        function _addPlayer(p) {
            return dataservice.service.addPlayer(p).then(function(resp) {
                //self.players.push(p);
            }).catch(function(err) {
                console.error(err);
            });
        }

        function _savePlayer(p) {
            return dataservice.service.savePlayer(p).then(function(resp) {
                console.log('ModelSvc: player saved');
            }).catch(function(err) {
                console.error(err);
            });
        }

        function _deletePlayer(p) {
            //delete from the database using dataservice
            return dataservice.service.deletePlayer(p).then(function(deletedP) {
                //and after db delete, clear from the local array in the modelSvc
                var index = self.players.indexOf(p);
                if (index>=0) self.players.splice(index, 1);
            }).catch(function(err) {
                console.error(err);
            });      
        }
        
        function _processPlayerConflicts(p) {
            return dataservice.processDocForConflicts(p).then(function(result) {
                p.winner = result.winner;
                p.loser = result.loser;
                p.parent = result.parent;
                
                return p;
            });
        }
                
        function _registerHandlers() {
            //handlers are defined in each factory class by entity
            dataservice.registerEventHandler( Player.ChangeHandler );
            dataservice.registerEventHandler( Transcript.ChangeHandler );
            //wireup change methods to respond to entity changes (Player)
            MessageSvc.onPlayerChanged(_playerChanged);
            MessageSvc.onPlayerDeleted(_playerDeleted);
            MessageSvc.onTranscriptChange(_transcriptChanged);
        }
    }
})();