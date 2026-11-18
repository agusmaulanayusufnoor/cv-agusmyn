import sharp from 'sharp';

async function optimizeImages() {
  console.log('Optimizing images for 100% PageSpeed score...');

  // 1. Hero Image: 480px width (ideal for 320px display width @ 1.5x retina)
  // AVIF version (super high compression)
  await sharp('public/profile.jpg')
    .resize(480, null, { withoutEnlargement: true })
    .avif({ quality: 65, effort: 6 })
    .toFile('public/profile.avif');
  console.log('✓ Generated public/profile.avif');

  // WebP version (optimized ~14 KiB)
  await sharp('public/profile.jpg')
    .resize(480, null, { withoutEnlargement: true })
    .webp({ quality: 75, effort: 6 })
    .toFile('public/profile.webp');
  console.log('✓ Generated public/profile.webp');

  // 2. Avatar Thumbnail: 96px width (ideal for 44px display @ 2x retina)
  await sharp('public/profile.jpg')
    .resize(96, null, { withoutEnlargement: true })
    .avif({ quality: 65, effort: 6 })
    .toFile('public/profile-thumb.avif');
  console.log('✓ Generated public/profile-thumb.avif');

  await sharp('public/profile.jpg')
    .resize(96, null, { withoutEnlargement: true })
    .webp({ quality: 75, effort: 6 })
    .toFile('public/profile-thumb.webp');
  console.log('✓ Generated public/profile-thumb.webp');
}

optimizeImages().catch(console.error);
