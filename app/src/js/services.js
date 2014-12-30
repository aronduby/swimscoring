/* Services */
(function(window, document, undefined){ 'use strict';
	
	angular.module('myApp.services', [])
	.factory('shareImage', ['$q', function($q){

		return function(data){
			var defaults = {
				scores: {
					circle: {
						radius: 100,
						fill: '#fff',
						originX: 'center',
						originY: 'center'
					},
					text: {
						fontSize: 100,
						fontFamily:'Roboto Condensed',
						fontWeight: 'bold',
						originX: 'center',
						originY: 'center',
						fill: '#757679',
						letterSpacing: -8
					},
					group: {
						top: 315,
						editable: false
					}
				}
			};

			var overrides = {
				us: {
					scores: {
						group:{
							left: 110
						}
					}
				},
				them: {
					scores: {
						group:{
							left: 330
						}
					}
				}
			};

			var winner = {
				scores: {
					circle: {
						stroke: '#ff851b',
						strokeWidth: 12,
						shadow: {
							color: '#f27101',
							blur: 0,    
							offsetX: 0,
							offsetY: 12,
							opacity: 1,
							fillShadow: true, 
							strokeShadow: true 
						}
					},
					text: {
						fill: '#58585a'
					},
					group: {
						top: 309
					}
				}
			};

			function load(path, cb){
				var deferred = $q.defer();

				fabric.util.loadImage(path, function(img){
					cb(img);
					deferred.resolve(img);
				});
				
				return deferred.promise;
			}


			var canvas = new fabric.StaticCanvas('c', {
				backgroundColor: '#eaeaea',
				width: 640,
				height: 640
			});
			var bg_load = load('./layout_imgs/bg.jpg', function(img) {
				canvas.backgroundColor = new fabric.Pattern({
					source: img,
					repeat: 'repeat'
				});
				canvas.renderAll();
			});


			/*
			 *  Text at the top
			*/
			var result = (data.us.winner ? 'defeats' : 'loses to'),
				y = 30,
				spacing = 78,
				text_opts = {
					fontSize: 80,
					fontFamily:'Roboto Condensed',
					fontWeight: 100,
					originX: 'center',
					originY: 'top',
					left: 320,
					fill: '#58585a',
					letterSpacing: -2
				};

			canvas.add(new fabric.TextWithLetterSpacing(data.us.name.toUpperCase(), _.defaults({
				top: y
			}, text_opts)));

			y += spacing;
			canvas.add(new fabric.TextWithLetterSpacing(result.toUpperCase(), _.defaults({
				top: y,
				fontWeight: 'bold'
			}, text_opts)));

			y += spacing;
			canvas.add(new fabric.TextWithLetterSpacing(data.them.name.toUpperCase(), _.defaults({
				top: y
			}, text_opts)));


			/*
			 *  Scores
			*/
			_.each(['us', 'them'], function(which){
			 
				var team = data[which],
					options = _.merge({}, defaults, overrides[which], (team.winner ? winner : {}));

				// force score to be a string
				var score = new fabric.TextWithLetterSpacing(team.score+'', options.scores.text);
				var circle = new fabric.Circle(options.scores.circle);
				var group = new fabric.Group([ circle, score ], options.scores.group);
				
				canvas.add(group);
			});



			/*
			 *  Logo
			*/
			var logo_load = load('./layout_imgs/logo-horz.svg', function(img){
				var logo = new fabric.Image(img, {
					top: 571,
					left: 430
				});
				logo.scaleToWidth(200);
				canvas.add(logo);
			});


			/*
			 *  The data uri
			*/
			var all_done = $q.defer();
			$q.all([bg_load, logo_load])
			.then(function(){
				all_done.resolve( canvas.toDataURL() );	
			});
			return all_done.promise;
		};

	}]);
	
})(window, document);