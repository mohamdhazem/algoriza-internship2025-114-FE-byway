
// Course Image
export const validateAndPreviewImage = (file, maxSizeMB = 2, maxWidth = 700, maxHeight = 430) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject("No file selected");

    // Check file size
    const MAX_SIZE = maxSizeMB * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return reject(`File size should not exceed ${maxSizeMB}MB`);
    }

    // Check dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        return reject(`Image dimensions should not exceed ${maxWidth}x${maxHeight}px`);
      }

      // Valid image — return preview URL
      resolve(img.src);
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject("Invalid image file");
    };
  });
};
