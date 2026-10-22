import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Fonte única: landing/index.html. O espelho /index.html atende ao GitHub Pages.
// A pasta landing/ permanece independente para Vercel com Root Directory = landing.
const dir = dirname(fileURLToPath(import.meta.url));
export function renderRootIndex(source) {
  return source
    .replace("<!doctype html>", "<!doctype html>\n<!-- HOME MODERNIZE: gerado por node landing/sync-home.mjs a partir de landing/index.html. -->")
    .replace(/((?:href|src)=")assets\//g, "$1landing/assets/")
    .replace('href="styles.css"', 'href="landing/styles.css"')
    .replace('src="main.js"', 'src="landing/main.js"')
    .replaceAll("https://eduardolavall.github.io/modernize/demo.html", "demo.html")
    .replaceAll("https://eduardolavall.github.io/modernize/", "slides.html");
}
const target = join(dir, "..", "index.html");
const expected = renderRootIndex(readFileSync(join(dir, "index.html"), "utf8"));
if (process.argv.includes("--check")) {
  if (readFileSync(target, "utf8") !== expected) {
    throw new Error("index.html divergiu da landing. Execute: node landing/sync-home.mjs");
  }
  console.log("OK: homepage sincronizada com a landing institucional");
} else {
  writeFileSync(target, expected, "utf8");
  console.log("Homepage atualizada em index.html");
}
