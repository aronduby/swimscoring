/* Directives */
(function(window, document, undefined){ 'use strict';
	
	angular.module('myApp.directives', [])

	.directive('meetHeader', function(){
			return {
				restrict: 'EA',
				scope:{
					title: '@',
					meet: '='
				},
				templateUrl: 'partials/directives/meet-header.html',
				link: function(scope, element, attrs){

					scope.open = false;

					scope.$watch(function(){ return scope.meet; }, function(obj){
						scope.score = {
							'us': 0,
							'them': 0
						};

						var done = 0;
						_.where(scope.meet.events.list, {'done': true}).forEach(function(event){
							scope.score.us += event.score.us;
							scope.score.them += event.score.them;
							done++;
						});
						scope.done = done;
						scope.progress = (done / scope.meet.events.list.length) * 100;

					}, true);
					

					scope.close = function(){
						scope.open = false;
						element.removeClass('open');
					};
					scope.show = function(){
						scope.open = true;
						element.addClass('open');
					};
					scope.toggle = function(){
						scope.open = !scope.open;
						element.toggleClass('open');
					};
				}
			};
		})

	.directive('meetFooter', function(){
			return {
				restrict: 'E',
				scope:{
					meet: '='
				},
				templateUrl: 'partials/directives/meet-footer.html',
				link: function(scope, element, attrs){
					scope.$watch(function(){ return scope.meet; }, function(obj){
						scope.score = {
							'us': 0,
							'them': 0
						};

						_.where(scope.meet.events.list, {'done': true}).forEach(function(event){
							scope.score.us += event.score.us;
							scope.score.them += event.score.them;
						});
					}, true);
					
				}
			};
		})

	.directive('eventList', function(){
			return{
				restrict: 'E',
				scope:{
					events: '=',
					meetId: '@'
				},	
				templateUrl: 'partials/directives/event-list.html'
			};
		})

	.directive('autoActive', ['$location', '$timeout', function ($location, $timeout) {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attr) {
				function setActive() {
					var path = $location.path();
					if (!path) {
						return;
					}

					angular.forEach(element.find('li'), function (li) {
						var anchor = li.querySelector('a');
						if (anchor.href.match('#' + path + '(?=\\?|$)')) {
							angular.element(li).addClass('active');
						} else {
							angular.element(li).removeClass('active');
						}
					});
					

					angular.forEach(element.find('a'), function (anchor) {
						if (anchor.href.match('#' + path + '(?=\\?|$)')) {
							angular.element(anchor).addClass('active');
						} else {
							angular.element(anchor).removeClass('active');
						}
					});


					if (attr.href) {
						if (attr.href.match('#' + path + '(?=\\?|$)')) {
							element.addClass('active');
						} else {
							element.removeClass('active');
						}
					}
				}

				function setActiveWithTimeout() {
					var timeout = $timeout(setActive, 10);
					scope.$on('$destroy', function() {
						$timeout.cancel(timeout);
					});
				}

				setActiveWithTimeout();
				var unbind = scope.$on('$locationChangeSuccess', setActiveWithTimeout);
				scope.$on('$destroy', function() {
					unbind();
				});
			}
		};
	}])

	.directive('ngFocus', ['$timeout', function($timeout) {
	    return {
	        link: function ( scope, element, attrs ) {
	            scope.$watch( attrs.ngFocus, function ( val ) {
	                if ( angular.isDefined( val ) && val ) {
	                    $timeout( function () { element[0].focus(); }, 50 );
	                }
	            }, true);

	            element.bind('blur', function () {
	                if ( angular.isDefined( attrs.ngFocusLost ) ) {
	                    scope.$apply( attrs.ngFocusLost );

	                }
	            });
	        }
	    };
	}]);
})(window, document);