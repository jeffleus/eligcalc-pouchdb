// transcript.js
(function() {
    'use strict';

    angular
        .module('eligcalc.model')
        .factory('Transcript', Transcript);

//	Transcript.$inject = ['$pouch'];
	
    function Transcript() { 
		// Define the constructor function.
		function Transcript( doc ) {
			var self = this;
            self.type = "Transcript";
            self.id = doc._id || "";
            self.rev = doc._rev || "";
            self.Title = doc.Title || "";
            self.Player = doc.Player || "";
            self.isDeleted = doc.isDeleted || false;
		}
		// Return constructor - this is what defines the actual
		// injectable in the DI framework.
		return( Transcript );
	}
})();
