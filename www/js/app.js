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

.run(initPouch)

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

initPouch.$inject = ['$pouch'];    
function initPouch($pouch) {
    console.log('init the pouchdb service');
    $pouch.setDatabase('eligcalc');
//    console.log('compact the database');

	$pouch.sync({start:true});
    //$pouch.destroy();
    
//	$pouch.compact().then(function(info) {
//        console.log(info);
//    }).then(function(info) {
//        $pouch.sync({start:true});
//        //$pouch.startListening();
////      $pouch.sync({cancel:true});
//    }).catch(function(err) {
//        console.error(err);
//    });    
}    

//// initPlayers and log the count of Player objects
//.run(function(dataservice) {
//	dataservice.getPlayers().then(function(players) {
//		console.log('Players: ' + players.length);
//	});
//})

// Database Initialization
//*************************
// init database
// destroy database
//
//.run(function($pouch) {
////	console.log('setting database');
////	$pouch.setDatabase('eligcalc');
//	
//	console.log('destroying database');
//	$pouch.destroy().then(function(resp) {
//		console.info('db destroyed: ' + resp);
//	}).catch(function(error) {
//		console.error('err destroying: ' + error);
//	});
//})

// View Creation
//*************************
// make sure to match view _id and name for ease of use
//
//.run(function($pouch) {
//    var docType = 'Transcript';
//	var designDoc = {
//	  _id: '_design/transcript_idx',
//	  views: {
//		'transcript_idx': {
//		  map: function(doc) {
//			  if (doc.type === 'docType' ) {
//				  emit(doc.name);
//			  }
//		  }.toString().replace("docType", docType)
//		}
//	  }
//	};
//	console.info('Create Index: ' + docType);
//	$pouch.db().put(designDoc).then(function (info) {
//	   // design doc created
//		console.info('Idx Created: ' + info);	
//	}).catch(function (err) {
//	  // design doc already exists
//	   if (err.name === 'conflict') {
//		console.warn('Idx already exists...');
//	   } else {
//		console.error('Idx Error: ' + err);
//	   }
//	});    
//})

// Database Replication
//*************************
// force replication local --> server
// force replication server --> local
//
//.run(function($pouch) {
////    PouchDB.replicate('eligcalc', 'http://localhost:5984/eligcalc', {live: true});    
//    PouchDB.replicate('http://localhost:5984/eligcalc', 'eligcalc', {live: true});    
//})

// Player Init w/ Mock Data
//*************************
// save to pouchDb
//	
//.run(function($pouch, PlayerMock) {
//    //grab a player from the PlayerMock created from Parse export
//	var p = PlayerMock.players[4];
//	p.type = 'Player';
//	console.log('saving player[0]: ' + p.FirstName + ' ' + p.LastName);	
//	$pouch.save(p).then(function(response) {
//		console.log('saved: ' + response);
//	}).catch(function(error) {
//		console.error('error saving: ' + error);
//	});
//})

//	
// Query Players and Hyrdrate
//****************************
// use the player_idx view to get all player docs by type
// use the Player factory to hydrate each record
//
//.run(function($pouch, Player) {
//	console.info('start player qry');
//	$pouch.db().query('player_idx', {include_docs:true}).then(function(result) {
//        //loop the results and hydrate a Player object for each row
//        var players = [];
//		result.rows.forEach(function(r) {
//			var p = new Player(r.doc);            
//			console.log('Player: ' + p.FirstName + ' ' + p.LastName);		
//		});
//	}).catch(function(error) {
//		console.error(error);
//	});
//})

//	
// Query AllDocs for count of Docs
//*************************
//	
//.run(function($pouch) {
//	console.info('start alldocs qry');
//	$pouch.db().allDocs().then(function(resp) {
//		console.log('AllDocs: ' + resp.total_rows);
//	}).catch(function(error) {
//		console.error(error);
//	});
//})

// Delete Player using Id and Rev
//*************************
// get _id and _rev from a separate qry or fauxton UI
//	
//.run(function($pouch) {
//	var _id = '216D1E46-54A7-203C-9DE8-504509D1078F';
//	var _rev = '5-eb05602919e272d146855306a0b69c05';
//	$pouch.delete(_id, _rev).then(function(resp) {
//		console.log('delete Result...');
//		console.log(resp);
//	}).catch(function(error) {
//        //error in the delete call
//        console.warn('There was an error deleting doc...');
//		console.error(error);
//	});
//})
})();
