import mime from 'mime';

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

export const blobToDataURI = (blob: Blob) => {
  const reader = new FileReader();
  return new Promise<string>((resolve) => {
    reader.addEventListener('load', () => {
      resolve(reader.result as string);
    });
    reader.readAsDataURL(blob);
  });
};

export const base64ToFile = (base64: string, fileName: string) => {
  const arr = base64.split('base64,');
  const binaryString = atob(arr[1]);
  // @ts-ignore
  const mimeType = arr[0].match(/:(.*?);/)[1];
  const uint8Array = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
  return new File([uint8Array], `${fileName}.${mime.getExtension(mimeType)}`, {
    type: mimeType,
  });
};

export const imageUrlToBase64 = async (
  imageUrl: string,
): Promise<{ base64: string; mimeType: string }> => {
  try {
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    const arrayBuffer = await blob.arrayBuffer();

    const base64 =
      typeof btoa === 'function'
        ? btoa(
            new Uint8Array(arrayBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
          )
        : Buffer.from(arrayBuffer).toString('base64');

    return { base64, mimeType: blob.type };
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
};
