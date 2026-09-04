/* Builds _artifact.html — same page but with images/*.png inlined as data URIs,
   so it can be previewed as a single self-contained file (Artifact / email / USB).
   The real site (index.html) keeps relative images/ paths for GitHub Pages.
   Run:  node build-preview.mjs                                                   */
import fs from "fs";
import path from "path";

let s = fs.readFileSync("index.html", "utf8");
const dir = "images";
const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
const mime = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml" };

let n = 0, bytes = 0;
for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!mime[ext]) continue;
  const buf = fs.readFileSync(path.join(dir, file));
  const uri = `data:${mime[ext]};base64,${buf.toString("base64")}`;
  // the page builds src as  "images/" + encodeURIComponent(name)
  const needle = `images/' + encodeURIComponent(`;
  if (!s.includes(needle)) { console.error("src pattern changed — update build-preview.mjs"); process.exit(1); }
  // replace the filename inside the data arrays with the data URI, and drop the prefix at runtime
  s = s.split(`"${file}"`).join(JSON.stringify(uri));
  n++; bytes += buf.length;
}
// runtime: a data: URI must not be prefixed with images/ nor URI-encoded
const A = `'<img src="images/' + encodeURIComponent(c) + '" alt="`;
const B = `'<img src="images/' + encodeURIComponent(imgSrc(x)) + '" alt="`;
if (!s.includes(A) || !s.includes(B)) { console.error("img markup changed — update build-preview.mjs"); process.exit(1); }
s = s.split(A).join(`'<img src="' + (/^data:/.test(c) ? c : "images/" + encodeURIComponent(c)) + '" alt="`);
s = s.split(B).join(`'<img src="' + (function(v){ return /^data:/.test(v) ? v : "images/" + encodeURIComponent(v); })(imgSrc(x)) + '" alt="`);

fs.writeFileSync("_artifact.html", s);
console.log(`inlined ${n} images (${(bytes / 1048576).toFixed(2)} MB) -> _artifact.html ${(s.length / 1048576).toFixed(2)} MB`);
