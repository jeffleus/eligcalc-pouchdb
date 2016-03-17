// Ionic Starter App
(function() {
    'use strict';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('eligcalc', ['ionic', 'eligcalc.data', 'eligcalc.model'])

.run(function($ionicPlatform, $window) {
  $ionicPlatform.ready(function() {
    if($window.cordova && $window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if($window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.run(function(SUBJECTS, TERMS, GRADES) {
    console.log(SUBJECTS);
    console.log(TERMS);
    console.log(GRADES);
})

.directive('animateOnChange', function($animate,$timeout) {
  return function(scope, elem, attr) {
      scope.$watch(attr.animateOnChange, function(nv,ov) {
        if (nv!=ov) {
          console.info('animateOnChange');
          var c = 'item-complex item-energized';
          $animate.addClass(elem,c).then(function() {
            $timeout(function() {$animate.removeClass(elem,c);}, 350);
          });
        }
      });
   };
});
	
})();
