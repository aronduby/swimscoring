/* Main App */
(function(window, document, undefined){ 'use strict';

	// Declare app level module which depends on filters, and services
	angular.module('myApp', [
		'ngRoute',
		'ngTouch',
		'ngSanitize',
		'ngAnimate',
		'ui.bootstrap',
		'ngStorage',
		'uuid',
		'toggle-switch',
		'monospaced.elastic',
		'ng',
		'ajoslin.promise-tracker',
		'angularSpinner',
		'myApp.filters',
		'myApp.services',
		'myApp.directives',
		'myApp.controllers',
		'myApp.sharer',
	])
	.config([
		'$routeProvider', '$locationProvider', '$animateProvider',
		function ($routeProvider, $locationProvider, $animateProvider){

			$routeProvider
				.when('/', {
					controller: 'HomeCtrl',
					templateUrl: 'partials/home.html'
				})
				.when('/meet/new', {
					controller: 'AddEditMeetCtrl',
					templateUrl: 'partials/add-edit-meet.html'
				})
				.when('/meet/edit/:meet_id', {
					controller: 'AddEditMeetCtrl',
					templateUrl: 'partials/add-edit-meet.html'
				})
				.when('/meet/:meet_id', {
					controller: 'MeetCtrl',
					templateUrl: 'partials/meet.html'
				})
				.when('/meet/:meet_id/event/:event_id', {
					controller: 'EventCtrl',
					templateUrl: 'partials/event.html'
				})
				.when('/meet/:meet_id/final', {
					controller: 'FinalCtrl',
					templateUrl: 'partials/final.html'
				})
				.when('/notes', {
					controller: 'NotesCtrl',
					templateUrl: 'partials/notes.html'
				})
				.otherwise({
					redirectTo: '/'
				});

			// only animate containers
			$animateProvider.classNameFilter(/ss-animate/);
		}
	])
	.run([
		'$rootScope', '$location', '$localStorage',
		function($rootScope, $location, $localStorage){

			/*
			 * Helper method for main page transitions. Useful for specifying a new page partial and an arbitrary transition.
			 * @param  {String} path               The root-relative url for the new route
			 * @param  {String} pageAnimationClass A classname defining the desired page transition
			*/
			$rootScope.go = function(path, pageAnimationClass){

				// Use a default, your choice
				if(typeof(pageAnimationClass) === 'undefined') {
					$rootScope.pageAnimationClass = 'cross-fade';
				
				// Use the specified animation
				} else { 
					$rootScope.pageAnimationClass = pageAnimationClass;
				}

				// Allow a 'back' keyword to go to previous page
				if (path === 'back') {
					$window.history.back();
				
				// Go to the specified path
				} else {
					$location.path(path);
				}
			};

			// setup our defaults for scoring and events
			if($localStorage.scoring === undefined){
				$localStorage.scoring = [{
					'id': '1',
					'title': "default",
					'points': {
						'relay': [8,4,2,0],
						'indv': [6,4,3,2,1,0]
					}
				}];
			}

			if($localStorage.events === undefined){
				$localStorage.events = [{
					"id":"1",
					"title": "default",
					"list": [
						{
							"id":"1",
							"title": "200 Medley Relay",
							"type": "relay",
							"order": 1
						}, {
							"id":"2",
							"title": "200 Free",
							"type": "indv",
							"order": 2
						}, {
							"id":"3",
							"title": "200 IM",
							"type": "indv",
							"order": 3
						}, {
							"id":"4",
							"title": "50 Free",
							"type": "indv",
							"order": 4
						}, {
							"id":"5",
							"title": "Diving",
							"type": "indv",
							"order": 5
						}, {
							"id":"6",
							"title": "100 Fly",
							"type": "indv",
							"order": 6
						}, {
							"id":"7",
							"title": "100 Free",
							"type": "indv",
							"order": 7
						}, {
							"id":"8",
							"title": "500 Free",
							"type": "indv",
							"order": 8
						}, {
							"id":"9",
							"title": "200 Free Relay",
							"type": "relay",
							"order": 9
						}, {
							"id":"10",
							"title": "100 Back",
							"type": "indv",
							"order": 10
						}, {
							"id":"11",
							"title": "100 Breast",
							"type": "indv",
							"order": 11
						}, {
							"id":"12",
							"title": "400 Free Relay",
							"type": "relay",
							"order": 12
						}
					]
				}];
			}

			if($localStorage.meets === undefined){
				$localStorage.meets = [];
			}

			if($localStorage.notes === undefined){
				$localStorage.notes = [];
			}
		}
	]);

})(window, document);