# Muhammad Takmeel — Portfolio

A responsive portfolio made with HTML, CSS and vanilla JavaScript. No framework, packages or build command required.

## Files

- `index.html` — page content and metadata
- `styles.css` — layout, responsive styles and CSS project illustrations
- `script.js` — navigation, project filters, detail dialogs and copy email
- `assets/` — portrait, downloadable CV and favicon

Open `index.html` in a browser to view the website. Copy email supports the Clipboard API, a local-file fallback, and a manual copy prompt if the browser blocks clipboard access. Email links open Gmail compose in a new tab with the recipient filled in; project enquiries also include the project name. Visitors can sign into Gmail if needed.

## Publish on GitHub Pages

1. Upload the contents of this project folder to your repository. Keep `index.html` at the repository root, with `styles.css`, `script.js` and `assets/` beside it.
2. In the repository, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select **main** and **/ (root)**, then save.
4. GitHub displays the published URL after deployment finishes.

All local links use relative paths, so the website works on both account and project GitHub Pages URLs. No custom workflow or build setup is needed.

## Edit the portfolio

Update profile and contact details in `index.html`. Edit project descriptions and feature lists in the `projects` object in `script.js`. Change theme variables at the start of the foundation section in `styles.css`. Replace the portrait or PDF in `assets/` using the same filenames, or update the corresponding HTML links.

Project artwork is illustrative CSS artwork rather than application screenshots. The CV and original portrait have been retained. The editorial portrait in `assets/takmeel-editorial.png` was edited using the built-in image generation tool. Prompt: Preserve Muhammad Takmeel’s facial identity; create a studio portrait in a charcoal overshirt and black T-shirt, hands in pockets, with a transparent background. The hero applies grayscale in CSS; the About section uses the color asset. Fonts load from Google Fonts, with system fonts as a fallback. Contact actions open Gmail compose, telephone or WhatsApp; no backend is required.
