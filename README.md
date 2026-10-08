# WARPED project website

Project website for **WARPED: Wrist-Aligned Rendering for Robot Policy Learning from Egocentric Human Demonstrations**.

Live URL: <https://kantor-lab.github.io/WARPED/>

## Preview locally

The site is plain HTML, CSS, and JavaScript. No build step or package installation is required.

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Media

Task switching and media paths are defined in `static/js/gallery.js`. Each task has browser-compatible WebM and MP4 files:

```text
static/videos/<task-id>/human-demo.webm
static/videos/<task-id>/human-demo.mp4
static/videos/<task-id>/robot-render.webm
static/videos/<task-id>/robot-render.mp4
static/videos/rollouts/<task-id>.webm
static/videos/rollouts/<task-id>.mp4
```

The six task IDs are:

- `rotate-box`
- `pour-mug`
- `bottle-from-rack`
- `wipe-brush`
- `can-on-plate`
- `open-microwave`

To replace a clip, overwrite its WebM and MP4 files using the same filenames. The page prefers WebM and uses MP4 as a fallback.

## Publish with GitHub Pages

The live site is already configured from the `gh-pages` branch of `Kantor-Lab/WARPED`. This local repository has independent history and no remote, so connect it, fetch the existing branch, commit the site, and replace the current placeholder safely:

```bash
git remote add origin https://github.com/Kantor-Lab/WARPED.git
git fetch origin
git add .
git commit -m "Update WARPED project website"
git branch -M gh-pages
git push --force-with-lease -u origin gh-pages
```

The `--force-with-lease` option is required because the local and remote branches have independent histories. It replaces the existing coming-soon page but refuses to overwrite the branch if it changed after the fetch. GitHub Pages will automatically update <https://kantor-lab.github.io/WARPED/> after the push. The `.nojekyll` file tells GitHub Pages to serve the static files directly.

## Credits

The site follows the [Nerfies](https://nerfies.github.io/) academic project-page template and the layout of [MVP-LAM](https://jm-this.github.io/mvp_lam/).
