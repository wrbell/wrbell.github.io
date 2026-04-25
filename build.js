const { minify } = require("html-minifier-terser");
const fs = require("fs");
const path = require("path");

const DIST = path.join(__dirname, "dist");

const minifyOpts = {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: true,
  removeRedundantAttributes: true,
  removeEmptyAttributes: true,
};

async function build() {
  // Clean and create dist/
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  // Minify HTML files (root pages + project subpages)
  const htmlFiles = [
    "index.html",
    "404.html",
    "resume.html",
    "cases.html",
    "notebook.html",
    "projects/stark-translate.html",
    "projects/fast-fem.html",
    "projects/w26-cobot-axis.html",
    "projects/me440-vibrations.html",
    "projects/me379-fluids-lab.html",
  ];
  for (const file of htmlFiles) {
    const src = fs.readFileSync(path.join(__dirname, file), "utf8");
    const out = await minify(src, minifyOpts);
    const dest = path.join(DIST, file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, out);
    const pct = ((1 - out.length / src.length) * 100).toFixed(1);
    console.log(`${file}: ${src.length} → ${out.length} bytes (${pct}% reduction)`);
  }

  // Copy static assets
  for (const dir of ["assets"]) {
    copyDir(path.join(__dirname, dir), path.join(DIST, dir));
  }
  // Copy shared project stylesheet
  fs.mkdirSync(path.join(DIST, "projects"), { recursive: true });
  fs.copyFileSync(
    path.join(__dirname, "projects/case-study.css"),
    path.join(DIST, "projects/case-study.css")
  );
  for (const file of ["robots.txt", "sitemap.xml"]) {
    const src = path.join(__dirname, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DIST, file));
  }

  console.log("Build complete → dist/");
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
