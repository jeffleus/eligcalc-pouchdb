// modelservice.js
(function () {
    'use strict';

    angular
        .module('eligcalc.model')
        .controller('Players', Players);

	Players.$inject = ['$scope', '$q', '$http', '$ionicModal', '$pouch', 'modelservice', 'Player', 'PlayerMock'];
	//Players.$inject = ['$scope', '$pouch', 'Player', 'PlayerMock'];
	
    function Players($scope, $q, $http, $ionicModal, $pouch, modelservice, Player, PlayerMock) {
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
//            $pouch.startListening();
        });
        $scope.$on('modelservice::players_updated', function() {
            $scope.$apply();
        });
		_loadModal();
        _loadConflictModal();

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
			if (self.syncStatus) {
				modelservice.stopSync();
			} else {				
				modelservice.startSync();
			}
			self.syncStatus = !self.syncStatus;
		}
		
		function _loadModal() {
			$ionicModal.fromTemplateUrl('app/player/player.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
			});
		}
		
		function _loadConflictModal() {
			$ionicModal.fromTemplateUrl('app/player/playerConflict.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.conflict = modal;
			});
		}

		$scope.openConflictModal = function(p) {
            if (p.hasConflicts) {
                modelservice.processPlayerConflicts(p).then(function(player) {
                    self.selectedPlayer = p;
                    $scope.conflict.show();
                });
            }
        };

		$scope.openModal = function(p) {
            if (p.hasConflicts) {
                modelservice.processPlayerConflicts(p).then(function(player) {
                    self.selectedPlayer = p;
                    $scope.modal.show();
                });
            } else { 
                self.selectedPlayer = p; 
                $scope.modal.show();                
            }
		};

//            $pouch.db().get(p._id, {revs:true}).then(function(doc) {
//                //$pouch.db().remove(doc);
//                console.info(doc._revisions.ids);
//            });
//            $pouch.db().get(p._id, {conflicts:true}).then(function(doc) {
//                //$pouch.db().remove(doc);
//                console.info(doc._conflicts);
//                $pouch.db().get(p._id, {rev:doc._conflicts[0]}).then(function(doc) {
//                    //$pouch.db().remove(doc);
//                    console.info(doc._conflicts);
//                });
//            });
            
//            $pouch.db().get(p._id, {conflicts:true}).then(function(response) {
//                console.info(response);
//                
//                if (response._conflicts && response._conflicts.length > 0) {
//                    response._conflicts.forEach(function(conflict) {
//                        $pouch.db().get(p._id, {rev:'7-6eba51992b88cd9df2db814d419c267a'}).then(function(doc) {
//                            //$pouch.db().remove(doc);
//                            console.info(doc);
//                        });
//                    });
//                }
//                
		
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