/* Controllers */
(function(window, document, undefined){ 'use strict';

	angular.module('myApp.controllers', [])
	.controller('HomeCtrl', 
		['$scope', '$localStorage', 
		function($scope, $localStorage){

			$scope.meets = $localStorage.meets;

			$scope.calcScore = function(meet){
				var done = _.chain(meet.events.list)
					.where({'done': true})
					.pluck('score')
					.value();

				var sum = function(s, n){
					return s + n;
				};

				return {
					us: _.pluck(done, 'us').reduce(sum),
					them: _.pluck(done, 'them').reduce(sum)
				};
			};

		}])

	.controller('AddEditMeetCtrl',
		['$scope', '$localStorage', '$routeParams', '$rootScope', 'uuid4',
		function($scope, $localStorage, $routeParams, $rootScope, uuid4){

			$scope.scoring = $localStorage.scoring;
			$scope.events = $localStorage.events;
			$scope.meets = $localStorage.meets;

			if($routeParams.meet_id === undefined){
				$scope.meet = {};

				if($scope.scoring.length == 1)
					$scope.meet.scoring = _.cloneDeep($scope.scoring[0]);

				if($scope.events.length == 1)
					$scope.meet.events = _.cloneDeep($scope.events[0]);
				
			} else {
				$scope.meet = _.find($localStorage.meets, {id: $routeParams.meet_id});
			}

			$scope.save = function(){
				if($scope.newMeet.$valid){
					// give meet an id, push to storage and open it up
					if($scope.meet.id === undefined){
						$scope.meet.id = uuid4.generate();
						$scope.meet.created = _.now();

						$scope.meets.push($scope.meet);	
					}
					
					$rootScope.go('/meet/'+$scope.meet.id, 'slide-left');
				}
			};

			$scope.delete = function(){
				var idx = _.findIndex($scope.meets, {'id': $scope.meet.id});
				$scope.meets.splice(idx, 1);
				$rootScope.go('/', 'slide-right');
			};
		}])

	.controller('MeetCtrl', 
		['$scope', '$routeParams', '$localStorage', '$rootScope',
		function($scope, $routeParams, $localStorage, $rootScope){
			
			$scope.meet = _.find($localStorage.meets, {id: $routeParams.meet_id});
			$scope.done = _.where($scope.meet.events.list, {'done': true}).length == $scope.meet.events.list.length;

			$scope.next = function(){
				$rootScope.go('/meet/' + $scope.meet.id + '/event/' + $scope.meet.events.list[0].id, 'slide-left');
			};

			$scope.prev = function(){
				$rootScope.go('/', 'slide-right');
			};
		}])

	.controller('EventCtrl', 
		['$scope', '$routeParams', '$localStorage', '$rootScope', 'uuid4',
		function($scope, $routeParams, $localStorage, $rootScope, uuid4){

			$scope.meet = $scope.meet = _.find($localStorage.meets, {id: $routeParams.meet_id});
			$scope.event = _.find($scope.meet.events.list, {id: $routeParams.event_id});
			
			$scope.buttons = false;

			var num_lanes = Number($scope.meet.num_lanes),
				next_place = 1;

			// add the finishes array if it doesn't exist
			if($scope.event.finishes === undefined || $scope.event.finishes.length != num_lanes){
				var us_lanes = $scope.meet.us_lanes;

				$scope.event.finishes = [];
				for(var i=1; i <= num_lanes; ++i){
					$scope.event.finishes.push({
						'lane': i,
						'team': (i%2 && us_lanes=='odd' ? 'us' : (i%2 && us_lanes=='even' ? 'them' : 'us')),
						'place': 0
					});
				}
			}

			$scope.places = new Array(num_lanes);

			$scope.tap = function(lane){
				if(lane.place === 0){
					lane.place = next_place;
					next_place++;
				} else {
					lane.place++;
					if(lane.place > num_lanes){
						lane.place = 1;
					}
				}
			};

			$scope.clear = function(){
				next_place = 1;
				_.forEach($scope.event.finishes, function(f){
					f.place = 0;
				});
				$scope.event.done = false;
				delete $scope.event.score;
			};

			$scope.save = function(){
				$scope.event.done = true;
				$scope.event.score = {
					'us': 0,
					'them': 0
				};

				var points = $scope.meet.scoring.points[$scope.event.type],
					i = 0;

				function addTies(lane, per_team){
					$scope.event.score[lane.team] += per_team;
				}

				while(i < points.length){
					var lanes = _.where($scope.event.finishes, {'place': i+1});

					// ties
					if(lanes.length > 1){
						var combined = 0;
						for(var j=0; j<lanes.length; j++){
							combined += points[i + j];
						}
						var per_team = combined / lanes.length;

						_.forEach(lanes, addTies);

					} else if(lanes.length == 1) {
						$scope.event.score[lanes[0].team] += points[i];
					}

					i += (lanes.length ? lanes.length : 1);
				}			

				$scope.next();
			};

			$scope.next = function(){
				// figure out where to go next
				var i = _.indexOf($scope.meet.events.list, $scope.event),
					next = '';

				if(i < $scope.meet.events.list.length - 1){
					next = 'event/'+$scope.meet.events.list[++i].id;
				} else {
					next = 'final';
				}

				$rootScope.go('/meet/'+$scope.meet.id+'/'+next, 'slide-left');
			};

			$scope.prev = function(){
				// figure out where to go next
				var i = _.indexOf($scope.meet.events.list, $scope.event),
					prev = '';

				if(i === 0){
					prev = '';
				} else {
					prev = 'event/'+$scope.meet.events.list[--i].id;
				}
				
				$rootScope.go('/meet/'+$scope.meet.id+'/'+prev, 'slide-right');
			};

			/*
			 *	Notes
			*/
			$scope.edit_notes = false;
			$scope.notes = _.find($localStorage.notes, {events: [$scope.event.id]});
			if($scope.notes === undefined){
				$scope.notes = {};
			}

			$scope.editNotes = function(){
				$scope.edit_notes = true;
			};

			$scope.saveNotes = function(){
				if($scope.notes.id === undefined){
					$scope.notes.id = uuid4.generate();
					$scope.notes.events = [$scope.event.id];

					$localStorage.notes.push($scope.notes);	
				}

				$scope.edit_notes = false;
			};

		}])

	.controller('FinalCtrl', 
		['$scope', '$routeParams', '$localStorage', '$rootScope', 'promiseTracker', 'shareImage', 'sharer',
		function($scope, $routeParams, $localStorage, $rootScope, promiseTracker, shareImage, sharer ){
			
			$scope.meet = _.find($localStorage.meets, {id: $routeParams.meet_id});
			$scope.score = {
				'us': 0,
				'them': 0
			};

			_.forEach($scope.meet.events.list, function(event){
				if(event.score !== undefined){
					$scope.score.us += event.score.us;
					$scope.score.them += event.score.them;
				}
			});

			$scope.prev = function(){
				var last = _.last($scope.meet.events.list);
				$rootScope.go('/meet/'+$scope.meet.id+'/event/'+last.id, 'slide-right');
			};

			$scope.shareTracker = promiseTracker();
			$scope.share = function(){
				var data = {
					us: {
						name: $scope.meet.us,
						score: $scope.score.us,
						winner: $scope.score.us > $scope.score.them
					},
					them: {
						name: $scope.meet.them,
						score: $scope.score.them,
						winner: $scope.score.them > $scope.score.us
					}
				};

				$scope.shareTracker.addPromise(
					shareImage(data).then(function(url){
						sharer( url );
					})
				);
			};

		}])

	.controller('NotesCtrl', 
		['$scope', '$localStorage', 'uuid4', 
		function($scope, $localStorage, uuid4){

			$scope.events = $localStorage.events[0];
			$scope.notes = $localStorage.notes;

			$scope.getNote = function(event_id){
				var note = _.find($localStorage.notes, {events: [event_id]});
				if(note === undefined){
					note = {
						events: [event_id]
					};
				}

				return note;
			};

			$scope.saveNote = function(note){
				if(note.text !== undefined && note.text.length){
					if(note.id === undefined){
						note.id = uuid4.generate();
						$scope.notes.push(note);	
					}
				}
			};

			$scope.clear = function(note){
				if(note.id !== undefined){
					var idx = _.findIndex($scope.notes, {'id': note.id});
					$scope.notes.splice(idx, 1);
				}
				
				return {
					'events': note.events
				};
			};

		}]);




	/*	Usage:
		var confirmInstance = $modal.open({
			templateUrl: 'partials/modals/confirm.html',
			controller: ConfirmModalCtrl,
			resolve: {
				title: function () { return 'Did '+$scope.game.stats[sprint_by].first_name+' win the sprint?'; },
			}
		});

		confirmInstance.result
			.then(function (result) {
				game.sprint(sprint_by, result);
				$location.path('/game/'+game.game_id+'/inplay');
			});
	*/
	var ConfirmModalCtrl = function ($scope, $modalInstance, title) {
		$scope.title = title;

		$scope.confirm = function(){
			$modalInstance.close(true);
		};

		$scope.cancel = function(){
			$modalInstance.close(false);
		};

		$scope.cancel = function(){
			$modalInstance.dismiss('cancel');
		};
	};
})(window, document);