/* Filters */
(function(window, document, undefined){ 'use strict';
	
	angular.module('myApp.filters', [])
	.filter('join', function() {
		return function(list, token) {
			return (list||[]).join(token);
		};
	})
	.filter('headerTitle', function(){
		return function(title){
			var parts = title.split(' ');
			if(parts.length >= 2){
				title = '<i>'+parts.shift()+'</i> <b>'+parts.join(' ')+'</b>';
			}
			return title;
		};
	})
	.filter("nl2br", function($filter) {
	 	return function(data) {
			if (!data) return data;
			return data.replace(/\n\r?/g, '<br />');
		};
	})
	.filter('pluck', function() {
		function pluck(objects, property) {
			if (!(objects && property && angular.isArray(objects))) return [];

			property = String(property);
			
			return objects.map(function(object) {
				// just in case
				object = Object(object);
				
				if (object.hasOwnProperty(property)) {
					return object[property];
				}
				
				return '';
			});
		}
		
		return function(objects, property) {
			return pluck(objects, property);
		};
	});

})(window, document);