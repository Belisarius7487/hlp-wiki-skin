# HLP Fire (MediaWiki skin)

Small custom skin for the FreeSpace Wiki, built on MediaWiki's standard `SkinMustache` system.

- Layout: header bar (logo, menu, search, user links), article with tabs, sticky table of contents on the right.
- Colours: Fire (default) and Void, switched by a button; the choice is stored in the browser (`localStorage`).
- Colour values come from the HLP Fire forum theme. FSO version boxes use inline colours from their templates and are not touched.

## Update safety

- Only the standard Mustache data keys are used (`html-body-content`, `data-portlets`, `data-search-box`, `data-footer`, ...).
- No custom PHP code.
- The table of contents is moved by `main.js`; if MediaWiki changes its markup, the TOC just stays inside the article.
- Interface texts (menu and button labels) are MediaWiki messages in `i18n/` (prefix `hlpfire-`), so wiki admins can change them on the page `MediaWiki:<message-name>`.
- All CSS colour variables start with `--hlp-` so they cannot clash with gadgets or `MediaWiki:Common.css`.

## Before every MediaWiki update

1. Update the dev wiki first.
2. Open the main page, an article with a TOC (for example Ai.tbl), an edit page and Special:RecentChanges.
3. Check the browser console and the PHP error log for deprecation warnings.

## Template boxes restyled by the skin

Several wiki templates still carry fixed inline colours or sizes. The skin recognises them by those values and restyles them
(rounded corners, theme colours, Fire/Void switching). If someone changes such a value in a template, only that box falls back to its own look.

| Where | What the skin matches | What it does |
| --- | --- | --- |
| Main Page: Featured Article, Main Screens | tables with `width="65%"` and `width="620px"` and border `#AA2020` | rounded full-width cards, glow, two screenshots side by side |
| Main Page wrapper | table that contains both cards | fills the space next to the floated navigation box |
| Main nav, portals, infoboxes | inline border `#AA2020`, `table.infobox`, `table.toccolours` | rounded corners, theme border colour, cell padding |
| Black backgrounds in templates | `background: #000` / `#000000` / `black` | replaced by the theme background |
| Red-brown headers and rows (Void only) | `#512020`, `#302020`, `#462424`, `#3C1E1E`, `#202020` | violet panel colours in Void; unchanged in Fire |
| Mission navigation (`Template:Mission`) | table with `background:#000000` and `cellpadding="8"` | previous / walkthrough / next as rounded buttons with arrows |
| Canon / non-canon notices | thin black border (`1px solid #000` / `black`) | filled card with glow |
| Veteran Comments and other bordered boxes | any `div`/`p` with an inline border | rounded corners |
| FSO version colour boxes (e.g. `Table3612`) | **not matched** | keep their own colours |

Planned clean-up: move these templates from inline colours to CSS classes (for example `hlp-card`) provided by the skin.
Then this table shrinks and editors only need to use the class names.
