const { createCanvas } = require('canvas');
    const fs = require('fs');

    const textContent = "Your long text content goes here...";
    const portions = splitTextIntoPortions(textContent, 8);
    const width = 1080;
    const height = 1920;

    portions.forEach((text, index) => {
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');

      // Set random background color
      ctx.fillStyle = getRandomColor();
      ctx.fillRect(0, 0, width, height);

      // Set text properties
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '48px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Add text to the canvas
      ctx.fillText(text, width / 2, height / 2);

      // Save the image
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(`image_${index + 1}.png`, buffer);
    });

    function splitTextIntoPortions(text, numPortions) {
      const portionSize = Math.ceil(text.length / numPortions);
      const portions = [];
      for (let i = 0; i < numPortions; i++) {
        portions.push(text.slice(i * portionSize, (i + 1) * portionSize));
      }
      return portions;
    }

    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
