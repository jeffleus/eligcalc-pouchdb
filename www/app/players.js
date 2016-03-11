// modelservice.js
(function () {
    'use strict';

    angular
        .module('eligcalc.model')
        .controller('Players', Players);

	Players.$inject = ['$scope', '$ionicModal', '$pouch', 'modelservice', 'Player', 'PlayerMock'];
	//Players.$inject = ['$scope', '$pouch', 'Player', 'PlayerMock'];
	
    function Players($scope, $ionicModal, $pouch, modelservice, Player, PlayerMock) {
//    function Players($scope, $pouch, Player, PlayerMock) {
        var self = this;
		self.syncStatus = true;
		self.selectedPlayer = {};

		self.modelSvc = modelservice;    
        self.addPlayer = _addPlayer;
        self.deletePlayer = _deletePlayer;
		self.toggleSync = _toggleSync;

        $scope.$on('modelservice::players_loaded', function() {
            $scope.$apply();
            $pouch.startListening();
        });
        $scope.$on('modelservice::players_updated', function() {
            $scope.$apply();
        });
		_loadModal();

        function _addPlayer() {
            var p = new Player(PlayerMock.players[modelservice.players.length]);
            
            return modelservice.addPlayer(p).then(function() {
                $scope.$apply();
            });
        }
        
        function _deletePlayer(p) {
            return modelservice.deletePlayer(p).then(function() {
                $scope.$apply();
            });            
        }
		
		function _toggleSync() {
			var options = {
				remoteDatabase: 'http://admin:Eraser$16@ec2-52-26-70-170.us-west-2.compute.amazonaws.com:5984/eligcalc'
			};
			if (self.syncStatus) {
				console.log('stopping sync');
				options.cancel = true;				
			} else {				
				console.log('starting sync');
				options.start = true;
			}
			$pouch.sync(options);
			self.syncStatus = !!options.start;
		}
		
		function _loadModal() {
			$ionicModal.fromTemplateUrl('app/player/player.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
			});
		}

		$scope.openModal = function(p) {
			self.selectedPlayer = p;
			$scope.modal.show();
		};
		
		$scope.savePlayer = function() {
			var p = self.selectedPlayer;
			modelservice.savePlayer(p).then(function() {
				$scope.modal.hide();
			}).catch(function(err) {
				console.error(err);
			});
		};
		
		$scope.closeModal = function() {
			$scope.modal.hide();
		};
		//Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function() {
			$scope.modal.remove();
		});
		// Execute action on hide modal
		$scope.$on('modal.hidden', function() {
			// Execute action
		});
		// Execute action on remove modal
		$scope.$on('modal.removed', function() {
			// Execute action
		});
	}
})();