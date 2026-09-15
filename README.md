# Sasindu & Piyumi — invitation review

Open `index.html` to browse all 11 invitation designs and 25 animation studies. Every preview has navigation back to the review home and between collections. This is a standalone static site; no installation or build is needed.

## Free hosting with GitHub Pages

1. Sign in at https://github.com and create a new **public** repository named `wedding-review`. GitHub Free supports Pages for public repositories.
2. Open the repository and choose **Add file → Upload files** (or **uploading an existing file** on an empty repository).
3. Upload the **contents** of this folder, preserving the `designs` and `animations` subfolders. `index.html` must be at the repository root, not inside another `wedding-review` folder. The Python helper and this README are optional. Do not upload the larger original project, reference archive or physical card.
4. Commit the upload to `main`. If GitHub's browser upload hits its file-count limit, upload the contents in smaller batches, or use GitHub Desktop to add this folder and publish the repository.
5. Open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, choose **main** and **/(root)**, then **Save**.
6. Wait for the Pages deployment to complete. GitHub displays the live address in the Pages settings, usually `https://YOUR-USERNAME.github.io/wedding-review/`.
7. Share that URL. Visitors do not need GitHub accounts, and your laptop can be switched off. Future commits to the publishing branch update the site.

The repository and website will be public, including the wedding details, sample photographs and RSVP contact numbers contained in the designs. Search-engine noindex hints are included; they do not provide access protection.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

Google Drive can share the folder or ZIP as a download, but cannot serve it as this working website. Google discontinued Drive web hosting in 2016: https://workspaceupdates.googleblog.com/2016/07/reminder-turn-down-of-google-drive-web.html

## Local review and future updates

Double-click `index.html`, or serve this folder using `python -m http.server 8093 --bind 127.0.0.1` and visit http://127.0.0.1:8093/ . This localhost URL works only on the same computer.

The combined copy is independent of the original collections. While this folder remains alongside `invitation-concepts` and `animation-studies`, run `python wedding-review/build_bundle.py` from the parent project to refresh the copied pages and assets after editing the originals. This restores the shared review navigation. The root review page is edited directly.

Original generated PNGs, prompts and downloaded vendor references are intentionally excluded from this distribution. Only optimized artwork and the assets required by the previews are included.

## Background music

All 11 complete invitation samples share `music/leberch-love-song-590429.mp3`. They attempt looping playback at 100% volume, with a floating button using each invitation's colours. Browsers that block audible autoplay require a click, tap or keypress; the Play music button also starts playback. A mute choice is remembered on this browser when local storage is available. Playback pauses while the page is hidden. The collection indexes and animation studies do not play music. Device volume settings still affect loudness.

Upload the `music` folder along with the updated design pages and other bundle files. The ZIP is also updated to include the music.


## Ivory reverie (concept 02)

The new second concept keeps Ivory promise at 01 and shifts the remaining display numbers to 03–11. Existing URLs are preserved. It adds a click-to-open arched invitation, the original Above the mist artwork with a 14-second camera motion, refined portrait and venue frames, and scroll reveals. Music on the combined version waits for the invitation to open and respects the existing mute preference. Reduced-motion preferences disable the reveals and camera animation. The hillside artwork is an imagined setting, not a view of The Halcyon Banquet.

`invitation-concepts/add_reverie.py` maintains this additional concept and the collection ordering; the main concept builder calls it automatically. No ZIP is regenerated.

Concept 02 refinements: generated ivory curtain background based on the supplied curtain reference (textiles only); reduced-motion-aware arch glow and repeating landscape; centred timeline; photo ribbon with mouse drag, touch swipe and enlargement on desktop/mobile; RSVP UI preview only with no submission endpoint or storage.
