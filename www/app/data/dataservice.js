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
			getTranscripts: _getTranscripts,
			getCourses: _getCourses,
			getLookups: _getLookups//,
			//ready: ready
		};

		return service;

		////////////

		function _getPlayers() {
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
