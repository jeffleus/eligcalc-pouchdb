// dataservice.js
(function() {
    'use strict';

    angular
        .module('eligcalc.data')
        .service('dataservice', dataservice);

	dataservice.$inject = ['$pouch', 'Player', 'Transcript', 'Course'];
	
    function dataservice($pouch, Player, Transcript, Course) { 
		var service = {
            sync: _sync,
			getPlayers: _getPlayers,
            addPlayer: _addPlayer,
            savePlayer: _savePlayer,
            deletePlayer: _deletePlayer, 
			getTranscripts: _getTranscripts,
			getCourses: _getCourses,
			getLookups: _getLookups//,
			//ready: ready
		};

		return service;
    ////////////
        function _sync() {
            var options = { start: true, remoteDatabase: 'http://localhost:5984/eligcalc' };
            $pouch.sync(options);
        }
        
        function _getEntities(view, Entity) {
			// implementation details go here
			console.info('get entities using view: ' + view);
			return $pouch.db().query(view, {include_docs:true}).then(function(result) {
			 	// do something with result
				console.log(Entity.name + 'Entities found: ' + result.total_rows);
				var entities = [];
				result.rows.forEach(function(r) {
					var e = new Entity(r.doc);
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
            return _getEntities('player_idx', Player);
		}
        
        function _addPlayer(p) {
			var json = angular.toJson(p);			
            return $pouch.save(p).then(function(resp) {
//                p.id = resp.id;
//                p.rev = resp.rev;
                console.log(resp);
                return p;
            }).catch(function(err) {
                console.error(err);
            });
        }
        
        function _savePlayer(p) {
			var json = angular.toJson(p);			
            return $pouch.save(p).then(function(resp) {
                console.log(resp);
                return p;
            }).catch(function(err) {
                console.error(err);
            });
        }

		function _deletePlayer(p) {
            return $pouch.delete(p._id, p._rev).then(function(resp) {
                console.log(resp);
            }).catch(function(err) {
                console.error(err);
            });
        }

		function _getTranscripts() {
            return _getEntities('transcript_idx', Transcript);
		}

		function _getCourses() {
            return _getEntities('course_idx', Course);
		}

		function _getLookups() {
			// implementation details go here
		}

		function ready(nextPromises) {
			// implementation details go here
		}		
	}
})();
