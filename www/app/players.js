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
            $pouch.db().get(p._id, {revs:true, conflicts:true}).then(function(doc) {
                loadConflicts(doc);
                
//                console.log('doc_id:  ' + doc._id);
//                console.log('doc_rev: ' + doc._rev);
//                console.info(doc);
//                $pouch.db().get(doc._id, {conflicts:true, rev:doc._conflicts[0]}).then(function(doc) {
//                    console.log('doc_id:  ' + doc._id);
//                    console.log('doc_rev: ' + doc._rev);
//                    console.info(doc);
//                });
            });
            $scope.modal.show();                
//            });            
		};
        
        function loadConflicts(doc) {
            var winner = doc;
            self.winner = winner;
            
            var parent;
            var parent_rev = (doc._revisions.start - 1).toString() + '-' + doc._revisions.ids[1];			
			var url = 'http://52.26.70.170:5984/eligcalc/'
				+ doc._id + '?rev=' + parent_rev;
			$http.get(url).then(function(response) {
				console.log(response);
				parent = response.data;
				self.parent = parent;
			});
            
			if (doc._conflicts) {
				var conflicts = doc._conflicts.map(function(conflict_rev) {
					return $pouch.db().get(doc._id, {rev:conflict_rev})
						.then(function(conflictDoc) {
							console.log('Conflict Doc Retrieved...')
							console.info(conflictDoc._rev);
							return conflictDoc;
					});
				});
				$q.all(conflicts).then(function(x) {
					self.conflicts = x;
					console.log('all conflicts found');
					self.loser = self.conflicts[0];
				});
			}			
        }

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