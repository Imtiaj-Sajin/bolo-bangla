// Renders the PWA icons from public/icon.svg.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const pub = join(import.meta.dirname, '..', '..', 'public');
const svg = readFileSync(join(pub, 'icon.svg'));

await sharp(svg).resize(192, 192).png().toFile(join(pub, 'icon-192.png'));
await sharp(svg).resize(512, 512).png().toFile(join(pub, 'icon-512.png'));
await sharp(svg).resize(180, 180).png().toFile(join(pub, 'apple-touch-icon.png'));
// Maskable: full-bleed background with the bird inside the safe zone.
const bird = await sharp(svg).resize(360, 360).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#58cc02' } })
  .composite([{ input: bird, top: 76, left: 76 }])
  .png()
  .toFile(join(pub, 'icon-maskable-512.png'));
console.log('Icons written to public/');
