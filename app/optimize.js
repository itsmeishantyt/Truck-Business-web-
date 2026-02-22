const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'public', 'logo.jpeg');
const outputPath = path.join(__dirname, 'public', 'logo.webp');

async function optimizeImage() {
    try {
        if (!fs.existsSync(inputPath)) {
            console.error('Input file not found:', inputPath);
            return;
        }

        await sharp(inputPath)
            .resize({ height: 120 }) // Resize for navbar/footer
            .webp({ quality: 85 })
            .toFile(outputPath);

        console.log('Successfully optimized logo: logo.webp');
    } catch (err) {
        console.error('Error optimizing image:', err);
    }
}

optimizeImage();
