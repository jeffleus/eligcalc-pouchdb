// modelservice.js
(function() {
    'use strict';

    angular
        .module('eligcalc.data')
        .service('modelservice', modelservice);

	modelservice.$inject = ['$rootScope', 'dataservice'];
	
    function modelservice($rootScope, dataservice) {
        var self = this;
        var players;
        var transcripts;
        var courses;
        
        var gradeTypes;
        var unitTypes;
        var subjectTypes;
        
        self.addPlayer = _addPlayer;
        self.deletePlayer = _deletePlayer;
        
        _init();        
        function _init() {
            dataservice.getPlayers().then(function(players) {
                self.players = players;
                $rootScope.$broadcast('modelservice::players_loaded');
            }).catch(function(err) {
                console.error(err);
            })
        }
        
        function _addPlayer(p) {
            return dataservice.addPlayer(p).then(function(resp) {
                self.players.push(p);
            }).catch(function(err) {
                console.error(err);
            })
        }
        
        function _deletePlayer(p) {
            //delete from the database using dataservice
            return dataservice.deletePlayer(p).then(function(deletedP) {
                //and after db delete, clear from the local array in the modelSvc
                var index = self.players.indexOf(p);
                if (index>=0) self.players.splice(index, 1);
            }).catch(function(err) {
                console.error(err);
            })            
        }
    }
})();