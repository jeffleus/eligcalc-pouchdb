// player.js
(function() {
    'use strict';

    angular
        .module('eligcalc.model')
        .factory('Player', Player);

//	Player.$inject = ['$pouch'];

    function Player() {
        var _type = 'Player';
		// Define the constructor function.
		function Player( doc ) {
			var self = this;
            self.type = _type;
            self._id = doc._id || "";
            self._rev = doc._rev || "";
			self.FirstName = doc.FirstName || "";
			self.LastName = doc.LastName || "";
			self.GradYr = doc.GradYr || "";
            self._conflicts = doc._conflicts || [];
            
            Object.defineProperty(this, "hasConflicts", {
                get: function() {
                    return self._conflicts && self._conflicts.length > 0;
                }
            });
		}
        
        Player.ChangeHandler =  {
            docType: _type,
            handleChange: function(change) {
                var self = this;
                console.log('PlayerChangeHandler: begin');
                if(!change.deleted) {
                    console.log('PlayerChangeHandler: change');
                    self.database.get(change.id).then(function(doc) {
                        self.msgSvc.playerChanged(doc);
                    }).catch(function(err) {
                        console.error(err);
                    });
                } else {
                    console.log('PlayerChangeHandler: delete');
                    //no doc to get after deletion...
                    self.msgSvc.playerDeleted(change.doc);
                }
            }
        };
		// Return constructor - this is what defines the actual
		// injectable in the DI framework.
		return( Player );
	}
})();
