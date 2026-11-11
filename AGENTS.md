# Working on the HLP Fire skin

Instructions for AI coding agents (Claude Code and others) working in this repository.

## Rules

- Only standard SkinMustache data keys, no custom PHP. The skin must survive MediaWiki updates.
- Comments in code and config are written in English.
- CSS custom properties start with `--hlp-`. User-facing texts are i18n messages (`hlpfire-*`) in `i18n/en.json` and `i18n/qqq.json`.
- FSO version colour boxes (e.g. `Table3612`) are never restyled.
- Run stylelint (no duplicate selectors, no unknown properties) and a CSS validator before every commit.

## Test every visual change before committing

Test in a real browser, not only by reading the CSS:

1. Dev wiki: https://wiki.hard-light.org (live: https://wiki.hard-light.net).
2. Try the change by injecting the new CSS into the page first, then commit.
3. Check at these sizes: phone portrait 375x812, phone landscape 812x375, tablet 768x1024, desktop 1440 wide.
4. Check at least these pages: Main_Page, Ai.tbl, Fonts.tbl, Ships.tbl, SC_Rakshasa, Command-Line_Reference, a mission page (e.g. Bearbaiting), an edit page and Special:RecentChanges.
5. Run `tools/overflow-check.js` in the browser: every line must show `docW` equal to the width and no items.
6. Check Fire and Void schemes and take screenshots of anything that changed.

## Known traps

- Wiki templates use fixed inline widths, `white-space:nowrap`, big paddings and floats (`align=right`, `width=20%`). Narrow-screen rules live in the `@container hlp-main` block at the end of `main.css`; they react to the article column width, not the screen width, because the TOC side panel also takes space.
- `overflow:hidden` on rounded boxes cuts off wide content. Wide tables must scroll inside themselves, never the whole page.
- Changes reach the server only after `git pull` in `skins/HLPFire` on the dev or live server.
