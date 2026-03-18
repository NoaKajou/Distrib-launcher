import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'public');

const pathsToPublish = [
  'distribution.json',
  'meta',
  'modpacks',
  'repo',
  'schemas',
  'servers',
];

async function removeDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyPath(relativePath) {
  const source = path.join(root, relativePath);
  const destination = path.join(outDir, relativePath);
  await fs.cp(source, destination, { recursive: true, force: true });
}

function generateIndexHtml() {
  const links = pathsToPublish
    .map((item) => `<li><a href="./${item}">${item}</a></li>`)
    .join('\n');

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Distrib Launcher - Static Endpoint</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 2rem; line-height: 1.5; }
      h1 { margin-bottom: .5rem; }
    </style>
  </head>
  <body>
    <h1>Distrib Launcher</h1>
    <p>Endpoints publiés via GitHub Pages :</p>
    <ul>
      ${links}
    </ul>
  </body>
</html>`;
}

await removeDir(outDir);
await ensureDir(outDir);

for (const relativePath of pathsToPublish) {
  await copyPath(relativePath);
}

await fs.writeFile(path.join(outDir, 'index.html'), generateIndexHtml(), 'utf8');
console.log('Static site built in ./public');
