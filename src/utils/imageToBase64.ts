export const imageToBase64 = ({
  size,
  img,
  type = 'image/webp',
}: {
  img: HTMLImageElement;
  size: number;
  type?: string;
}) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  let startX = 0;
  let startY = 0;

  if (img.width > img.height) {
    startX = (img.width - img.height) / 2;
  } else {
    startY = (img.height - img.width) / 2;
  }

  canvas.width = size;
  canvas.height = size;

  ctx.drawImage(
    img,
    startX,
    startY,
    Math.min(img.width, img.height),
    Math.min(img.width, img.height),
    0,
    0,
    size,
    size,
  );

  return canvas.toDataURL(type);
};

export const coverImageToBase64 = ({
  size,
  img,
  type = 'image/webp',
}: {
  img: HTMLImageElement;
  size: {
    height: number;
    width: number;
  };
  type?: string;
}) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  let startX = 0;
  let startY = 0;

  // 目标尺寸
  const targetWidth = size.width;
  const targetHeight = size.height;

  // 计算缩放比例
  const scale = Math.min(targetWidth / img.width, targetHeight / img.height);

  // 计算压缩后的尺寸
  const width = img.width * scale;
  const height = img.height * scale;

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(img, startX, startY, width, height);

  return canvas.toDataURL(type);
};
