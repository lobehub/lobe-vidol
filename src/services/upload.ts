import dayjs from 'dayjs';

import { S3 } from '@/utils/s3';
import { uuid } from '@/utils/uuid';

export const upload = async (file: File) => {
  const dateFolder = dayjs().format('YYYY/MM/DD'); // 使用当前日期作为文件夹名称
  const folderName = `files/${dateFolder}`; // e.g., "uploads/2023-10-10"
  const fileName = `${uuid()}.${file.name.split('.').at(-1)}`;

  const key = `${folderName}/${fileName}`;

  const s3 = new S3();
  const url = await s3.createPreSignedUrl(key);

  const res = await fetch(url, {
    body: file.stream(),
    headers: {
      'Content-Type': file.type,
    },
    method: 'POST',
  });

  if (res.ok) {
    return { success: true, message: 'File uploaded successfully', url: key };
  } else {
    throw new Error('Upload Error');
  }
};
