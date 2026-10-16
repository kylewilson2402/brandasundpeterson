# Bran Peterson portfolio website

A whiteboard themed portfolio. Bran's signature writes itself when the site opens, each doodle on the board is a link with its own little animation, the marker tray at the bottom is the menu, and the eraser wipes between pages.

Plain HTML, CSS and JavaScript. No build step, no installs.

## Open it

Double click `index.html`. It runs straight from the folder.

## Folder map

```
index.html          page structure (rarely needs edits)
css/style.css       the look
js/content.js       ALL the words, pieces, photos and prices  <- edit this one
js/main.js          behaviour (intro, wipes, lightbox, draw mode, form)
js/signature.js     Bran's signature traced into pen strokes (don't edit)
images/doodles/     Bran's home page doodles + signature
images/illustrations/          illustration images (big + "-sm" small copies)
images/illustrations/process/  WIP / process shots, one folder per piece
images/animations/             .mp4 files and poster images
images/teaching/classroom/     classroom photos (students' faces blurred)
images/teaching/projects/      one folder per teaching project
images/about/                  Bran's photo
```

## Adding work (the only thing Bran needs to know)

1. Put the image in the right folder, for example `images/illustrations/rider-study.jpg`.
2. Open `js/content.js` in any text editor (Notepad works, VS Code is nicer).
3. Find the section, copy one `{ ... }` line, paste it where you want it, and fill it in:

```js
{ title: "Rider study", image: "images/illustrations/rider-study.jpg", tags: ["Animals"], year: "2025", medium: "ink", note: "Quick study from life." },
```

4. Save and refresh.

Rules of thumb:

- An empty `image: ""` shows a placeholder sheet, so unfinished sections still look intentional.
- The first three items in Illustrations, Animations clips and Classroom photos also show on the home page.
- Tags on illustrations turn into the filter post-its automatically.
- Export images as JPG, max about 2000px wide, under 1 MB each.
- Videos can be an `.mp4` in `images/animations/` or a YouTube / Vimeo link.
- Lines marked `// PLACEHOLDER` in content.js are sample copy for Bran to replace. That includes the teaching philosophy quote and principles, the bio, tools, timeline, student count and prices.

## Process rewind (illustrations)

Any illustration can have a `process: [ ... ]` list in content.js. When it does, opening the piece shows a "watch it rewind" button (plays the steps backwards like a tape) and a down arrow ("rewind the process") that scrolls through every step from the finished piece back to the first sketch. List the steps in the order they were made; the site reverses them. Pieces with process shots get a small "process" tag on the board.

```js
process: [
  { image: "images/illustrations/process/skater/1-thumbnails.jpg", label: "thumbnails" },
  { image: "images/illustrations/process/skater/2-sketch.jpg", label: "rough sketch", note: "optional sentence" },
  { image: "images/illustrations/process/skater/3-lineart.jpg", label: "line art" },
]
```

## Contact form

Right now the Send button opens the visitor's email app with their message filled in, addressed to Branparts@gmail.com.

To have messages arrive without the visitor's email app:

1. Make a free form at https://formspree.io with Bran's email.
2. Copy the form URL (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `formEndpoint: ""` at the top of `js/content.js`.

## Putting it online (GitHub Pages, free)

1. Create a new public repo on GitHub, e.g. `bran-portfolio`.
2. Upload everything in this folder (keep the folder structure).
3. Repo Settings > Pages > Source: `main` branch, `/ (root)`. Save.
4. The site goes live at `https://<username>.github.io/bran-portfolio/` in a minute or two.

A custom domain (like branpeterson.com) can be added in the same Pages settings.

## Features at a glance

- Signature write-on intro (about 3s, plays once per visit, click or press Esc to skip, skipped for people who turn off motion)
- Doodle hover bits: head turns and winks, horse gallops off, camera bot spins its reels, apple rolls out of the basket, hand taps the mail
- Eraser wipe page transitions, marker tray nav with the active marker uncapped
- "Draw more!" post-it lets visitors draw on the board with the tray markers; the eraser wipes it
- Illustrations: filterable pinned wall plus lightbox (arrow keys and Esc work), with a process rewind on pieces that have WIP shots
- Animations: the Mind of Their Own trailer on the big screen with its award, the animatic in its own section below, plus an optional film strip of clips and a process strip
- Art Teaching: what I teach, teaching philosophy (with the full PDF), classroom photos on a clothesline, project cards that open every photo from that project, student work wall
- About and Contact / Commissions with a price menu
- Works on phones: doodles stack in a grid, marker caps become the bottom bar
- Section links work directly: `index.html#teaching`, `#illustrations`, etc.
