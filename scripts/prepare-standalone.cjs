/*
  Prepare Next.js standalone output for Azure Static Web Apps SSR runtime.
  - Copies .next/static into .next/standalone/.next/
  - Copies public/ into .next/standalone/public/
  - No-op if folders are missing.
*/
const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const root = process.cwd();
const nextDir = path.join(root, '.next');
const standaloneDir = path.join(nextDir, 'standalone');

try {
  if (!fs.existsSync(standaloneDir)) {
    console.log('No .next/standalone output found. Skipping standalone prepare.');
    process.exit(0);
  }
  // Ensure inner .next directory exists
  const innerNextDir = path.join(standaloneDir, '.next');
  fs.mkdirSync(innerNextDir, { recursive: true });

  // Copy .next/static to .next/standalone/.next/
  copyDir(path.join(nextDir, 'static'), path.join(innerNextDir, 'static'));

  // Copy public to .next/standalone/public
  copyDir(path.join(root, 'public'), path.join(standaloneDir, 'public'));

  console.log('Standalone assets prepared for SWA SSR.');
} catch (err) {
  console.error('Error preparing standalone assets:', err);
  process.exit(1);
}
