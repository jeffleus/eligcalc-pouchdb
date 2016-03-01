// modelservice.js
(function () {
    'use strict';
    /*global angular */
    angular
        .module('eligcalc.data')
        .service('modelservice', modelservice);

	modelservice.$inject = ['$rootScope', 'dataservice', 'Player'];
	
    function modelservice($rootScope, dataservice, Player) {
        /*jshint validthis: true*/
        var self = this;
        var players;
        var transcripts;
        var courses;
        
        var gradeTypes;
        var unitTypes;
        var subjectTypes;
        
        self.addPlayer = _addPlayer;
        self.deletePlayer = _deletePlayer;
        
        $rootScope.$on("$pouchDB:change", function(event, doc) {
            if (doc.type === 'Player') {
                var p = _.findWhere(self.players, { id: doc._id });
                if (p) {
                    var revisedPlayer = new Player( doc );
                    var index = self.players.indexOf(p);
                    if (index !== -1) {
                        self.players[index] = revisedPlayer;
                        $rootScope.$broadcast('modelservice::players_updated');
                    }
                }
            }
        });

        
        _init();        
        function _init() {
            _initPlayers()
            .then(_initTranscripts())
            .then(_initCourses())
            .then(dataservice.sync());
        }

        function _initPlayers() {
            return dataservice.getPlayers().then(function(players) {
                self.players = players;
                $rootScope.$broadcast('modelservice::players_loaded');
            }).catch(function(err) {
                console.error(err);
            });        
        }
        
        function _initTranscripts() {
            return dataservice.getTranscripts().then(function(transcripts) {
                self.transcripts = transcripts;
                $rootScope.$broadcast('modelservice::transcripts_loaded');
            }).catch(function(err) {
                console.error(err);
            });
        }
        
        function _initCourses() {
            return dataservice.getCourses().then(function(courses) {
                self.courses = courses;
                $rootScope.$broadcast('modelservice::courses_loaded');
            }).catch(function(err) {
                console.error(err);
            });
        }
        
        function _addPlayer(p) {
            return dataservice.addPlayer(p).then(function(resp) {
                self.players.push(p);
            }).catch(function(err) {
                console.error(err);
            });
        }
        
        function _deletePlayer(p) {
            //delete from the database using dataservice
            return dataservice.deletePlayer(p).then(function(deletedP) {
                //and after db delete, clear from the local array in the modelSvc
                var index = self.players.indexOf(p);
                if (index>=0) self.players.splice(index, 1);
            }).catch(function(err) {
                console.error(err);
            });      
        }
    }
})();