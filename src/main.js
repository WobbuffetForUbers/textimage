document.getElementById('generateButton').addEventListener('click', () => {
      const textContent = document.getElementById('textInput').value;
      const portions = splitTextIntoPortions(textContent, 8);
      const imageContainer = document.getElementById('imageContainer');
      imageContainer.innerHTML = ''; // Clear previous images

      // Generate a single random color for all images
      const backgroundColor = getRandomColor();

      portions.forEach((text, index) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1920;
        const ctx = canvas.getContext('2d');

        // Set background color
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set text properties
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '72px sans-serif'; // Larger font size
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Calculate margins
        const margin = 50;
        const maxWidth = canvas.width - 2 * margin;

        // Wrap text and calculate total text height
        const lines = wrapText(ctx, text, maxWidth);
        const lineHeight = 80; // Line height
        const totalTextHeight = lines.length * lineHeight;

        // Calculate starting y position to center the text block
        const startY = (canvas.height - totalTextHeight) / 2;

        // Draw text
        let y = startY;
        lines.forEach(line => {
          ctx.fillText(line, canvas.width / 2, y);
          y += lineHeight;
        });

        // Create a download link
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `image_${index + 1}.png`;
        link.textContent = 'Download Image';
        link.style.display = 'block';
        link.style.marginTop = '10px';

        // Append canvas and link to the container
        imageContainer.appendChild(canvas);
        imageContainer.appendChild(link);
      });

      // Show the "Download All Images" button
      document.getElementById('downloadAllButton').style.display = 'block';
    });

    document.getElementById('downloadAllButton').addEventListener('click', () => {
      const links = document.querySelectorAll('#imageContainer a');
      links.forEach(link => {
        link.click();
      });
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

    function wrapText(ctx, text, maxWidth) {
      const words = text.split(' ');
      const lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
          currentLine += ' ' + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
      return lines;
    }
