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

  // Minify HTML files
  for (const file of ["index.html", "404.html"]) {
    const src = fs.readFileSync(path.join(__dirname, file), "utf8");
    const out = await minify(src, minifyOpts);
    fs.writeFileSync(path.join(DIST, file), out);
    const pct = ((1 - out.length / src.length) * 100).toFixed(1);
    console.log(`${file}: ${src.length} → ${out.length} bytes (${pct}% reduction)`);
  }

  // Copy static assets
  for (const dir of ["assets"]) {
    copyDir(path.join(__dirname, dir), path.join(DIST, dir));
  }
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
