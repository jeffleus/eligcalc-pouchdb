// modelservice.js
(function() {
    'use strict';

    angular
        .module('eligcalc.data')
        .controller('Players', Players);

	Players.$inject = ['$scope', 'modelservice', 'Player', 'PlayerMock'];
	
    function Players($scope, modelservice, Player, PlayerMock) {
        var self = this;
        self.modelSvc = modelservice;    
        self.addPlayer = _addPlayer;
        self.deletePlayer = _deletePlayer;

        $scope.$on('modelservice::players_loaded', function() {
            $scope.$apply();
        });

        function _addPlayer() {
            var p = new Player(PlayerMock.players[modelservice.players.length+1]);
            
            return modelservice.addPlayer(p).then(function() {
                $scope.$apply();
            });
        }
        
        function _deletePlayer(p) {
            return modelservice.deletePlayer(p).then(function() {
                $scope.$apply();
            });            
        }
        
    }
})();