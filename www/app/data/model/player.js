// player.js
(function() {
    'use strict';

    angular
        .module('eligcalc.model')
        .factory('Player', Player);

//	Player.$inject = ['$pouch'];

    function Player() { 
		// Define the constructor function.
		function Player( doc ) {
			var self = this;
            self.type = "Player";
            self._id = doc._id || "";
            self._rev = doc._rev || "";
			self.FirstName = doc.FirstName || "";
			self.LastName = doc.LastName || "";
			self.GradYr = doc.GradYr || "";
		}

		// Return constructor - this is what defines the actual
		// injectable in the DI framework.
		return( Player );
	}
})();
