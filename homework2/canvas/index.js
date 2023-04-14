const getScaledDimensions = (img, maxWidth, maxHeight) => {
  const scaled = {
      ratio: img.width / img.height,
      width: img.width,
      height: img.height
  }

  if (scaled.width > maxWidth) {
      scaled.width = maxWidth;
      scaled.height = scaled.width / scaled.ratio;
  }

  if (scaled.height > maxHeight) {
      scaled.height = maxHeight;
      scaled.width = scaled.height / scaled.ratio;
  }

  return scaled;
}

const invertColor = (data) => {
  for (let i = 0; i < data.length; i+= 4) {
    data[i] = data[i] ^ 255;
    data[i+1] = data[i+1] ^ 255;
    data[i+2] = data[i+2] ^ 255;
  }
}

const handleFiles = (e) => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image;
  img.src = URL.createObjectURL(e.target.files[0]);
  img.onload = function() {
      const scaled = getScaledDimensions(img, 400, 300);

      ctx.canvas.width = scaled.width;
      ctx.canvas.height = scaled.height;

      ctx.drawImage(img, 0, 0, ctx.canvas.width, canvas.height);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      invertColor(imgData.data);
      
      ctx.putImageData(imgData, 0, 0);
  }
}

const input = document.getElementById('input');
input.addEventListener('change', handleFiles);