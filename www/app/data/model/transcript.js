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
        
        Transcript.ChangeHandler = function() {
            var _docType = 'Transcript';
            this.docType = _docType;
            this.handleChange = function(change) {
                var self = this;
                console.log('TranscriptChangeHandler: begin');
                if(!change.deleted) {
                    console.log('TranscriptChangeHandler: change');
                    self.database.get(change.id).then(function(doc) {
                        self.msgSvc.transcriptChanged(doc);
                    }).catch(function(err) {
                        console.error(err);
                    });
                } else {
                    console.log('TranscriptChangeHandler: delete');
                    //no doc to get after deletion...
                    self.msgSvc.transcriptDeleted(change.doc);
                }
            };
        };
		// Return constructor - this is what defines the actual
		// injectable in the DI framework.
		return( Transcript );
	}
})();
