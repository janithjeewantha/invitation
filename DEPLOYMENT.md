# Sasindu & Piyumi wedding invitation

Upload this folder's contents to your hosting service's public directory, with `index.html` at the site root. Keep the `assets` and `music` folders beside it. No build command, package installation, database, or Node server is needed. Use HTTPS.

This is the standalone concept 2 invitation. Review navigation, the sample index and other concepts are excluded. Fonts, images, gallery enlargements, calendar download and music are included locally. The existing Google Apps Script deployment URL is retained in `assets/rsvp-config.js`.

## RSVP on a new domain

Before accepting responses from a new domain:

1. Open your existing Google Apps Script project.
2. In `Code.gs`, change `RSVP_CONFIG.parentOrigin` from `https://janithjeewantha.github.io` to the final website origin, for example `https://your-domain.com`. Include the scheme and hostname only, without a path or trailing slash. The `www` version is a different origin; redirect visitors to your chosen canonical hostname.
3. Select Deploy → Manage deployments → Edit → New version → Deploy. Keep Execute as Me and access Anyone. Updating the existing deployment preserves its URL; if a new deployment URL is created, update `assets/rsvp-config.js` too.
4. Test a response on the published website in an incognito window and verify its row in RSVP Responses. Check music, gallery swiping/enlargements, map links and calendar download on mobile too.

Local file previews do not support live RSVP submission. Until the Apps Script origin matches the final hosting domain, RSVP will time out on that domain. The Google Sheet and Apps Script remain separate from this static website; no Google credentials belong in the hosting folder.

Search indexing remains disabled via the existing robots meta tag. This is a privacy preference, not access control. This deployment note can be omitted from the upload.

## Custom error page

Keep `404.html` at the publishing root alongside `index.html`. GitHub Pages uses it for missing pages automatically. Other hosts may need their custom error document setting pointed to `/404.html` (serve it with status 404). The page is self-contained so nested missing URLs do not break its styling.

The return link supports GitHub project URLs and a custom domain hosted at `/`. For a custom-domain subfolder, set `customBase` in `404.html` to that folder. For a GitHub user/organisation root site, remove the GitHub project-path branch and use `/`. After deployment, open a nonexistent nested URL and check the return link. A custom error page removes default hosting branding but does not conceal the hosting provider; a custom domain also removes `github.io` from the visible address.
