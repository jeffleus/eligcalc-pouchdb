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
//************************************************************
// Player: changed and deleted
//************************************************************
    var playerChangeHandlers = [];    
    self.playerChanged = function(data) {
        angular.forEach(playerChangeHandlers, function(handler) {
            handler(data);
        });
    };
    self.onPlayerChanged = function(handler) {
        playerChangeHandlers.push(handler);
    };
    
    var playerDeleteHandlers = [];    
    self.playerDeleted = function(data) {
        angular.forEach(playerDeleteHandlers, function(handler) {
            handler(data);
        });
    };
    self.onPlayerDeleted = function(handler) {
        playerDeleteHandlers.push(handler);
    };
//************************************************************

//************************************************************
// Transcript: changed
//************************************************************
    var transcriptChangeHandlers = [];    
    self.transcriptChanged = function(data) {
        angular.forEach(transcriptChangeHandlers, function(handler) {
            handler(data);
        });
    };
    self.onTranscriptChange = function(handler) {
        transcriptChangeHandlers.push(handler);
    };
//************************************************************
    

//************************************************************
// Course: changed
//************************************************************
    var courseChangeHandlers = [];    
    self.courseChanged = function(data) {
        angular.forEach(courseChangeHandlers, function(handler) {
            handler(data);
        });
    };
    self.onCourseChange = function(handler) {
        courseChangeHandlers.push(handler);
    };
//************************************************************    
}
})();