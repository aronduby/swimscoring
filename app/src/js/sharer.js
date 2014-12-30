(function(window, document, undefined){ 'use strict';

	angular.module('myApp.sharer', [])
	.factory('sharer', ['$window', function($window){
		return function(url){
			$window.open( url );
		};
	}]);

})(window, document);