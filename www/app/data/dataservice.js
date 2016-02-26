// dataservice.js
(function() {
    'use strict';

    angular
        .module('eligcalc.data')
        .service('dataservice', dataservice);

	dataservice.$inject = ['$pouch', 'Player'];
	
    function dataservice($pouch, Player) { 
		var isPrimed = false;
		var primePromise;

		var service = {
			getPlayers: _getPlayers,
            addPlayer: _addPlayer,
            deletePlayer: _deletePlayer, 
			getTranscripts: _getTranscripts,
			getCourses: _getCourses,
			getLookups: _getLookups//,
			//ready: ready
		};

		return service;

		////////////

        function _getEntities(view, entity) {
			// implementation details go here
			console.info('start qry view: ' + view);
			return $pouch.db().query(view, {include_docs:true}).then(function(result) {
			 	// do something with result
				console.log('Entities found: ' + result.total_rows);
				var entities = [];
				result.rows.forEach(function(r) {
					var e = new entity(r.doc);
					entities.push(e);
					console.log('Entity: ' + angular.toJson(e));
				});
				return entities;
			}).catch(function(error) {
				console.error(error);
				return null;
			});            
        }
        
		function _getPlayers() {
//            return _getEntities('player_idx', Player);
			// implementation details go here
			console.info('start player qry');
			return $pouch.db().query('player_idx', {include_docs:true}).then(function(result) {
			 	// do something with result
				console.log('Players found: ' + result.total_rows);
				var players = [];
				result.rows.forEach(function(r) {
					var p = new Player(r.doc);
					players.push(p);
					console.log('Player: ' + p.FirstName + ' ' + p.LastName);		
				});
				return players;
			}).catch(function(error) {
				console.error(error);
				return null;
			});
		}
        
        function _addPlayer(p) {
            var json = angular.toJson(p);
            return $pouch.save(p).then(function(resp) {
                p.id = resp.id;
                p.rev = resp.rev;
                console.log(resp);
                return p;
            }).catch(function(err) {
                console.error(err);
            })
        }
        
        function _deletePlayer(p) {
            return $pouch.delete(p.id, p.rev).then(function(resp) {
                console.log(resp);
            }).catch(function(err) {
                console.error(err);
            })
        }

		function _getTranscripts() {
			// implementation details go here
		}

		function _getCourses() {
			// implementation details go here
		}

		function _getLookups() {
			// implementation details go here
		}

		function ready(nextPromises) {
			// implementation details go here
		}		
	}
})();
