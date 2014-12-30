(function(){

	fabric.TextWithLetterSpacing = fabric.util.createClass(fabric.Text, {

		type: 'letterSpacedText',

		initialize: function(text, options) {
			options = options ? options : {};

			this.callSuper('initialize', text, options);
			this.set('letterSpacing', options.letterSpacing || 0);
		},

		toObject: function() {
			return fabric.util.object.extend(this.callSuper('toObject'), {
				letterSpacing: this.get('letterSpacing')
			});
		},

		_getTextWidth: function(ctx, textLines) {
			var maxWidth = this._measureTextLine(ctx, textLines[0] || '|');		

			for(var i = 1, len = textLines.length; i < len; i++){
				var currentLineWidth = this._measureTextLine(ctx, textLines[i]);
				if (currentLineWidth > maxWidth) {
					maxWidth = currentLineWidth;
				}
			}
			return maxWidth;
		},

		_measureTextLine: function(ctx, line){
			var width = 0;
			for(var i = 0, len = line.length; i < len; i++){
				width += ctx.measureText(line[i]).width + this.letterSpacing;
			}
			return width;
		},

		_renderChars: function(method, ctx, chars, left, top) {
			var offset = 0,
				previousLetter = false;

			for(var i = 0, len = chars.length; i < len; i++){
				var letter = chars[i];

				ctx[method](letter, (left + offset + this.letterSpacing), top);
				offset += ctx.measureText(letter).width + this.letterSpacing;
				previousLetter = letter;
			}
		}
	});

})();