/*
 * HLP Fire skin: colour scheme switch, page width switch and table-of-contents placement.
 * Plain ES5, no dependencies besides the mw core object, so it keeps working across MediaWiki updates.
 * The storage keys must match the inline script in templates/skin.mustache.
 */
( function () {
	var SCHEME_KEY = 'hlp-wiki-scheme';
	var LAYOUT_KEY = 'hlp-wiki-layout';
	var root = document.documentElement;

	// Connects a button to a class on <html> and remembers the choice in localStorage.
	function setupToggle( buttonId, className, storageKey, values, labels ) {
		var btn = document.getElementById( buttonId );
		if ( !btn ) {
			return;
		}
		function isOn() {
			return root.classList.contains( className );
		}
		function updateLabel() {
			btn.textContent = mw.msg( isOn() ? labels[ 1 ] : labels[ 0 ] );
		}
		btn.addEventListener( 'click', function () {
			var on = !isOn();
			root.classList.toggle( className, on );
			try {
				localStorage.setItem( storageKey, on ? values[ 1 ] : values[ 0 ] );
			} catch ( e ) {}
			updateLabel();
		} );
		updateLabel();
	}

	// Move the standard table of contents into the sticky side panel.
	// If MediaWiki changes its markup and nothing is found, the TOC simply stays in the text.
	function setupToc( container ) {
		var aside = document.getElementById( 'hlp-aside' );
		var body = document.getElementById( 'bodyContent' );
		var toc;
		if ( !aside || !body || !container || !body.contains( container ) ) {
			return;
		}
		toc = container.querySelector( '#toc, #mw-toc, .toc' );
		if ( !toc ) {
			return;
		}
		// Replace an older TOC, e.g. after "Show preview" re-rendered the page.
		while ( aside.firstChild ) {
			aside.removeChild( aside.firstChild );
		}
		aside.appendChild( toc );
		aside.hidden = false;
	}

	// The "List of Tables" box (Template:Tables) follows the reader on wide article columns
	// (see main.css). Templates place it below the revision notes, which left an empty gap
	// above it; on wide columns it is moved to the top of the article, and back again when
	// the column gets narrow. If nothing is found, the box simply stays where it is.
	function setupTablesList() {
		var po = document.querySelector( '#bodyContent .mw-parser-output' );
		var main = document.querySelector( '.hlp-main' );
		var box, marker, moved = false;
		if ( !po || !main || !window.ResizeObserver ) {
			return;
		}
		box = Array.prototype.find.call( po.children, function ( el ) {
			var th = el.tagName === 'TABLE' && el.querySelector( ':scope > tbody > tr:first-child th' );
			return th && ( th.querySelector( 'a[title="Tables"]' ) ||
				( document.body.classList.contains( 'page-Tables' ) && th.querySelector( 'a.mw-selflink' ) ) );
		} );
		if ( !box || box === po.firstElementChild ) {
			return;
		}
		marker = document.createComment( 'hlp-tables-list' );
		box.parentNode.insertBefore( marker, box );
		new ResizeObserver( function () {
			// Same threshold as the @container rule in main.css
			var wide = main.clientWidth >= 1000;
			if ( wide && !moved ) {
				po.insertBefore( box, po.firstChild );
				moved = true;
			} else if ( !wide && moved ) {
				marker.parentNode.insertBefore( box, marker );
				moved = false;
			}
		} ).observe( main );
	}

	function init() {
		setupToggle( 'hlp-scheme-switch', 'hlp-void', SCHEME_KEY,
			[ 'fire', 'void' ], [ 'hlpfire-scheme-fire', 'hlpfire-scheme-void' ] );
		setupToggle( 'hlp-layout-switch', 'hlp-wide', LAYOUT_KEY,
			[ 'normal', 'wide' ], [ 'hlpfire-layout-normal', 'hlpfire-layout-wide' ] );
		setupToc( document.getElementById( 'bodyContent' ) );
		setupTablesList();
		// Live preview and other tools replace the page content; pick up the new TOC then.
		mw.hook( 'wikipage.content' ).add( function ( $content ) {
			setupToc( $content && $content[ 0 ] );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
}() );
