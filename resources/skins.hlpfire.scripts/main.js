/*
 * HLP Fire skin: colour scheme switch and table-of-contents placement.
 * Plain ES5, no dependencies, so it keeps working across MediaWiki updates.
 */
( function () {
	var KEY = 'hlp-wiki-scheme';
	var root = document.documentElement;

	function isVoid() {
		return root.classList.contains( 'hlp-void' );
	}

	function setupSwitch() {
		var btn = document.getElementById( 'hlp-scheme-switch' );
		if ( !btn ) {
			return;
		}
		function label() {
			btn.textContent = 'Theme: ' + ( isVoid() ? 'Void' : 'Fire' );
		}
		btn.addEventListener( 'click', function () {
			var next = isVoid() ? 'fire' : 'void';
			if ( next === 'void' ) {
				root.classList.add( 'hlp-void' );
			} else {
				root.classList.remove( 'hlp-void' );
			}
			try {
				localStorage.setItem( KEY, next );
			} catch ( e ) {}
			label();
		} );
		label();
	}

	function setupLayoutSwitch() {
		var btn = document.getElementById( 'hlp-layout-switch' );
		if ( !btn ) {
			return;
		}
		function isWide() {
			return root.classList.contains( 'hlp-wide' );
		}
		function label() {
			btn.textContent = 'Layout: ' + ( isWide() ? 'Wide' : 'Normal' );
		}
		btn.addEventListener( 'click', function () {
			var next = isWide() ? 'normal' : 'wide';
			if ( next === 'wide' ) {
				root.classList.add( 'hlp-wide' );
			} else {
				root.classList.remove( 'hlp-wide' );
			}
			try {
				localStorage.setItem( 'hlp-wiki-layout', next );
			} catch ( e ) {}
			label();
		} );
		label();
	}

	// Move the standard table of contents into the sticky side panel.
	// If MediaWiki changes its markup and nothing is found, the TOC simply stays in the text.
	function setupToc() {
		var aside = document.getElementById( 'hlp-aside' );
		var toc = document.querySelector( '#bodyContent #toc, #bodyContent #mw-toc, #bodyContent .toc' );
		if ( aside && toc ) {
			aside.appendChild( toc );
			aside.hidden = false;
		}
	}

	function init() {
		setupSwitch();
		setupLayoutSwitch();
		setupToc();
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
}() );
