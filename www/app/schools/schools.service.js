// schools.js
(function() {
    'use strict';

    angular
        .module('eligcalc.schools')
        .service('SchoolSvc', schoolService);

	schoolService.$inject = [];
	
    function schoolService() {
        /*jshint validthis: true*/
        var self = this;
        self.schools = [
            {schoolName: 'Oaks Christian'},
            {schoolName: 'St John Bosco'},
            {schoolName: 'Crespi Encino'}
        ];
	}
})();
