// messageservice.js
(function() {
    'use strict';

angular
    .module('eligcalc.data')
    .service('MessageSvc', message);

message.$inject = [];

function message() { 
    /*jshint validthis: true*/
    var self = this;
    
    var playerChangeHandlers = [];    
    self.playerChanged = function(data) {
        angular.forEach(playerChangeHandlers, function(handler) {
            handler(data);
        });
    };
    self.onPlayerChange = function(handler) {
        playerChangeHandlers.push(handler);
    };
    
    var transcriptChangeHandlers = [];    
    self.transcriptChanged = function(data) {
        angular.forEach(transcriptChangeHandlers, function(handler) {
            handler(data);
        });
    };
    self.onTranscriptChange = function(handler) {
        transcriptChangeHandlers.push(handler);
    };
    
    var courseChangeHandlers = [];    
    self.courseChanged = function(data) {
        angular.forEach(courseChangeHandlers, function(handler) {
            handler(data);
        });
    };
    self.onCourseChange = function(handler) {
        courseChangeHandlers.push(handler);
    };
    
}
})();