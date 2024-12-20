steal(function() {
	/**
	 * @constructor DocumentJS.tags.author @author
	 * @tag documentation
	 * @parent DocumentJS
	 * 
	 * @description 
	 * 
	 * Describes who the author of a class is.
	 * 
	 * ###Example:
	 * 
	 * @codestart
	 * /*
	 *  * @author Justin Meyer
	 *  * @author Brian Moschel
	 *  *|
	 * @codeend
	 */
	return {
		add: function( line ) {
			var m = line.match(/^\s*@author\s*(.*)/)
			if ( m ) {
				this.author = m[1];
			}
		}
	};
})
