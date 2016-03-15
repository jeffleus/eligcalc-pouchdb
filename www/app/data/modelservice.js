// modelservice.js
(function () {
    'use strict';
    /*global angular */
    angular
        .module('eligcalc.data')
        .service('modelservice', modelservice);

	modelservice.$inject = ['$rootScope', 'dataservice', 'MessageSvc', 'Player'];
	
    function modelservice($rootScope, dataservice, MessageSvc, Player) {
        /*jshint validthis: true*/
        var self = this;
        var players;
        var transcripts;
        var courses;
        
        var gradeTypes;
        var unitTypes;
        var subjectTypes;
        
        self.startSync = _startSync;
        self.stopSync = _stopSync;
        
        self.addPlayer = _addPlayer;
        self.savePlayer = _savePlayer;
        self.deletePlayer = _deletePlayer;
        self.processPlayerConflicts = _processPlayerConflicts;
        
        $rootScope.$on("$pouchDB:change", function(event, doc) {
//            if (doc.type === 'Player') {
//                var p = _.findWhere(self.players, { _id: doc._id });
//                if (p && p._rev !== doc._rev) {
//                    var revisedPlayer = new Player( doc );
//                    console.info(p._rev + ' --> ' + revisedPlayer._rev);
//                    var index = self.players.indexOf(p);
//                    if (index !== -1) {
//                        self.players[index] = revisedPlayer;
//                        $rootScope.$broadcast('modelservice::players_updated');
//                    }
//                }
//            }
        });
        $rootScope.$on("$pouchDB:delete", function(event, doc) {
//            var p = _.findWhere(self.players, { _id: doc._id });
//            if (p) {
//                console.info('delete --> ' + p._id);
//                var index = self.players.indexOf(p);
//                if (index !== -1) {
//                    self.players.splice(index, 1);
//                    $rootScope.$broadcast('modelservice::players_updated');
//                }
//            }
        });

        _init();        
        function _init() {
            MessageSvc.onPlayerChanged(_playerChanged);
            MessageSvc.onPlayerDeleted(_playerDeleted);
            _initPlayers()
                .then( _initTranscripts() )
                .then( _initCourses() );
//            .then(dataservice.service.sync());
        }
        
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
        
        function _startSync() {
            dataservice.startSync();
        }
        
        function _stopSync() {
            dataservice.stopSync();
        }
        
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
        
        function _processPlayerConflicts(p) {
            return dataservice.processDocForConflicts(p).then(function(result) {
                p.winner = result.winner;
                p.loser = result.loser;
                p.parent = result.parent;
                
                return p;
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
    }
})();