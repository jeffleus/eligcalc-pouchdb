// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('eligcalc', ['ionic', 'eligcalc.data'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.run(function(dataservice) {
	dataservice.getPlayers().then(function(players) {
		console.log('Players: ' + players.length);
	});
});
//.run(function($pouch, PlayerMock, Player) {
//	console.log('setting database');
//	$pouch.setDatabase('eligcalc');
//	
////	$pouch.destroy().then(function(resp) {
////		console.info('db destroyed: ' + resp);
////	}).catch(function(error) {
////		console.error('err destroying: ' + error);
////	});
//
//	
////	var designDoc = {
////	  _id: '_design/player_idx',
////	  views: {
////		'player_idx': {
////		  map: function(doc) {
////			  if (doc.type === 'Player' ) {
////				  emit(doc.name);
////			  }
////		  }.toString()
////		}
////	  }
////	};
////	console.info('Create Player Index...');
////	$pouch.db().put(designDoc).then(function (info) {
////	 // design doc created
////		console.info('Idx Created: ' + info);	
////	}).catch(function (err) {
////	   if (err.name === 'conflict') {
////		console.warn('Idx already exists...');
////	   } else {
////		console.error('Idx Error: ' + err);
////	   }
////	  // design doc already exists
////	});
//
//	
//	
//	
////	var p = PlayerMock.players[4];
////	p.type = 'Player';
////	console.log('saving player[0]: ' + p.FirstName + ' ' + p.LastName);	
////	$pouch.save(p).then(function(response) {
////		console.log('saved: ' + response);
////	}).catch(function(error) {
////		console.error('error saving: ' + error);
////	});
//	
////	console.info('start allDocs qry');
////	$pouch.db().allDocs().then(function(resp) {
////		console.log('AllDocs: ' + resp.total_rows);
////		console.log(resp);
////	}).catch(function(error) {
////		console.error(error);
////	});
////
////	console.info('start player qry');
////	$pouch.db().query('player_idx', {include_docs:true}).then(function(result) {
////	 // do something with result
////		result.rows.forEach(function(r) {
////			var p = new Player(r.doc);
////			console.log('Player: ' + p.FirstName + ' ' + p.LastName);		
////		});
////	}).catch(function(error) {
////		console.error(error);
////	});
//	
////	function map(doc) {
////		// sort by last name, first name, and age
////		if (doc.type === 'Prospect') {
////			emit([doc.LastName, doc.FirstName, doc.GradYr]);
////		}
////	}
////	console.info('start Prospect qry');
////	$pouch.db().query(map).then(function (result) {
////	  // handle result
////		console.log(result);
////	}).catch(function (err) {
////	  console.log(err);
////	});
//
//	
////	
////	console.info('start alldocs qry');
////	$pouch.db().allDocs().then(function(resp) {
////		console.log('AllDocs: ' + resp.total_rows);
////	}).catch(function(error) {
////		console.error(error);
////	});
////	
////	var _id = '290919BC-8ACB-AEB4-B9F4-4082415912A7';
////	var _rev = '1-a5d420432900c29caa2de2dd87cc2b7a';
////	$pouch.delete(_id, _rev).then(function(resp) {
////		console.log('get Result: ');
////		console.log(resp);
////	}).catch(function(error) {
////		console.error(error);
////	});
//})
