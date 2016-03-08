// course.js
(function() {
    'use strict';

    angular
        .module('eligcalc.model')
        .factory('Course', Course);

//	Course.$inject = ['$pouch'];
	
    function Course() { 
		// Define the constructor function.
		function Ctor( doc ) {
			var self = this;
            self.type = "Course";
            self.id = doc._id || "";
            self.rev = doc._rev || "";
            self.isDeleted = doc.isDeleted || false;
            self.Title = doc.Title || "";
            self.Transcript = doc.Transcript || {};
            self.Courses = doc.Courses || [];
            self.Subject = doc.Subject || {};
            self.Term = doc.Term || {};
            self.Grade = doc.Grade || {};
		}
		// Return constructor - this is what defines the actual
		// injectable in the DI framework.
		return( Course );
	}
})();
