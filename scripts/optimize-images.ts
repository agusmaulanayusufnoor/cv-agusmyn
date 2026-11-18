import sharp from 'sharp';

async function optimizeImages() {
  console.log('Optimizing images...');
  
  // Hero WebP (640px max width, quality 80)
  await sharp('public/profile.jpg')
    .resize(640, null, { withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile('public/profile.webp');
  console.log('✓ Generated public/profile.webp');

  // Thumbnail WebP for avatar (120px max width, quality 80)
  await sharp('public/profile.jpg')
    .resize(120, null, { withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile('public/profile-thumb.webp');
  console.log('✓ Generated public/profile-thumb.webp');
}

optimizeImages().catch(console.error);
