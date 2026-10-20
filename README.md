# HLP Fire (MediaWiki skin)

Small custom skin for the FreeSpace Wiki, built on MediaWiki's standard `SkinMustache` system.

- Layout: header bar (logo, menu, search, user links), article with tabs, sticky table of contents on the right.
- Colours: Fire (default) and Void, switched by a button; the choice is stored in the browser (`localStorage`).
- Colour values come from the HLP Fire forum theme. FSO version boxes use inline colours from their templates and are not touched.

## Update safety

- Only the standard Mustache data keys are used (`html-body-content`, `data-portlets`, `data-search-box`, `data-footer`, ...).
- No custom PHP code.
- The table of contents is moved by `main.js`; if MediaWiki changes its markup, the TOC just stays inside the article.

## Before every MediaWiki update

1. Update the dev wiki first.
2. Open the main page, an article with a TOC (for example Ai.tbl), an edit page and Special:RecentChanges.
3. Check the browser console and the PHP error log for deprecation warnings.
