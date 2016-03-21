// modelservice.js
(function () {
    'use strict';

    angular
        .module('eligcalc.model')
        .controller('Players', Players);

	Players.$inject = ['$scope', '$ionicModal', 'modelservice', 'Player', 'PlayerMock'];
	
    function Players($scope, $ionicModal, modelservice, Player, PlayerMock) {
        var self = this;
// Local Ctrl State
		self.syncStatus = true;
		self.selectedPlayer = {};
// Model methods
		self.modelSvc = modelservice;    
        self.addPlayer = _addPlayer;
        self.savePlayer = _savePlayer;
        self.deletePlayer = _deletePlayer;
		self.toggleSync = _toggleSync;
		self.destroyDb = _destroyDb;
//  Wire Model Events to Refresh Scope
        $scope.$on('modelservice::players_loaded', function() {
            $scope.$apply();
        });
        $scope.$on('modelservice::players_updated', function() {
            $scope.$apply();
        });
// Modal Instances        
        var playerModal;
        var conflictModal;
        self.openModal = _openModal;
        self.openConflictModal = _openConflictModal;
        self.closeModal = _closeModal;
// Init the Controller Modals        
		_loadModal();
        _loadConflictModal();
//**********************************************************************
// Private Model Methods: add, save, delete, sync, destroy
//**********************************************************************
        function _addPlayer() {
            //grab a new player from the PlayerMock array (basically Parse export json)
            var p = new Player(PlayerMock.players[modelservice.players.length]);
            //add the player through the modelservice
            modelservice.addPlayer(p).then(function() {
                $scope.$apply();
            }).catch(function(err) {
                console.log('_deletePlayer resulted in error in playersCtrl');
            });            
        }
		
		function _savePlayer() {
			var p = self.selectedPlayer;
			modelservice.savePlayer(p).then(function() {
				playerModal.hide();
			}).catch(function(err) {
				console.error(err);
			});
		}
        
        function _deletePlayer(p) {
            modelservice.deletePlayer(p).then(function() {
                $scope.$apply();
            }).catch(function(err) {
                console.log('_deletePlayer resulted in error in playersCtrl');
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
		
		function _destroyDb() {
			modelservice.destroyDb().then(function(result) {
				console.log('localdb destroyed');
			}).catch(function(err) {
				console.error('_destroyDb had a problem in playerCtrl...');
                console.error(err);
			});
		}
//**********************************************************************
// Modal Stuff: load, open, close, and events (destroy, hide, remove)
//**********************************************************************
        function _loadModal() {
			$ionicModal.fromTemplateUrl('app/player/player.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
                playerModal = modal;
			});
		}
		
		function _loadConflictModal() {
			$ionicModal.fromTemplateUrl('app/player/playerConflict.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
                conflictModal = modal;
			});
		}

		function _openConflictModal(p) {
            if (p.hasConflicts) {
                modelservice.processPlayerConflicts(p).then(function(player) {
                    self.selectedPlayer = p;
                    conflictModal.show();
                });
            }
        }

		function _openModal(p) {
            if (p.hasConflicts && $scope.modal) {
                modelservice.processPlayerConflicts(p).then(function(player) {
                    self.selectedPlayer = p;
                    conflictModal.show();
                });
            } else { 
                self.selectedPlayer = p; 
                playerModal.show();              
            }
		}
		
		function _closeModal() {
            if (playerModal.isShown()) playerModal.hide();
            if (conflictModal.isShown()) conflictModal.hide();
		}
        
		//Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function() {
			$scope.modal.remove();
		});
		// Execute action on hide modal
		$scope.$on('modal.hidden', function() {
			// Execute action
            console.log('hide modal');
		});
		// Execute action on remove modal
		$scope.$on('modal.removed', function() {
			// Execute action
            console.log('remove modal');
		});
	}
})();