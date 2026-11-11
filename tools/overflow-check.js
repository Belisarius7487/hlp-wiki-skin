/*
 * Layout check for the HLP Fire skin. Paste into the browser console (or run via a
 * browser automation tool) on any page of the wiki. It loads several pages in hidden
 * iframes at several widths, optionally injects test CSS, and reports:
 *  - docW > width: the whole page scrolls sideways (bug)
 *  - items: outermost elements that stick out of the screen and are not inside a scroll area
 * Usage: await hlpCheck( [ 'Main_Page', 'Fonts.tbl' ], [ 375, 812, 1440 ], extraCss )
 */
async function hlpCheck( pages, widths, css ) {
	function test( page, width ) {
		return new Promise( function ( resolve ) {
			var f = document.createElement( 'iframe' );
			f.style.cssText = 'position:fixed;left:0;top:0;width:' + width + 'px;height:800px;opacity:0;pointer-events:none';
			f.src = '/index.php/' + page;
			f.onload = function () {
				var d = f.contentDocument;
				if ( css ) {
					var s = d.createElement( 'style' );
					s.textContent = css;
					d.head.appendChild( s );
				}
				setTimeout( function () {
					var vw = d.documentElement.clientWidth;
					var bad = Array.prototype.filter.call( d.body.querySelectorAll( '*' ), function ( e ) {
						var r = e.getBoundingClientRect();
						if ( !( r.width > 0 && r.right > vw + 1 ) ) {
							return false;
						}
						for ( var a = e.parentElement; a && a !== d.body; a = a.parentElement ) {
							if ( getComputedStyle( a ).overflowX !== 'visible' ) {
								return false;
							}
						}
						return true;
					} );
					var outer = bad.filter( function ( e ) {
						return bad.indexOf( e.parentElement ) === -1;
					} );
					resolve( page + ' @' + width + ' docW=' + d.documentElement.scrollWidth + ' ' +
						outer.slice( 0, 4 ).map( function ( e ) {
							return e.tagName + '.' + String( e.className ).split( ' ' )[ 0 ] +
								' w' + Math.round( e.getBoundingClientRect().width );
						} ).join( ', ' ) );
					f.remove();
				}, 1500 );
			};
			document.body.appendChild( f );
		} );
	}
	var out = [];
	for ( var i = 0; i < widths.length; i++ ) {
		for ( var j = 0; j < pages.length; j++ ) {
			out.push( await test( pages[ j ], widths[ i ] ) );
		}
	}
	return out.join( '\n' );
}
