(function(window, document, undefined){ 'use strict';

	angular.module('myApp.sharer', [])
	.factory('sharer', ['$window', function($window){
		return function(file){
			// message, subject, fileOrFileArray, url, successCallback, errorCallback
			$window.plugins.socialsharing.share(null, null, file, null);
		};
	}]);

})(window, document);