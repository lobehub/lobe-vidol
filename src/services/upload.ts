import dayjs from 'dayjs';

import { edgeClient } from '@/libs/trpc/client';
import { uuid } from '@/utils/uuid';

export const upload = async (file: File) => {
  const dateFolder = dayjs().format('YYYY/MM/DD'); // 使用当前日期作为文件夹名称
  const folderName = `files/${dateFolder}`; // e.g., "uploads/2023-10-10"
  const fileName = `${uuid()}.${file.name.split('.').at(-1)}`;

  const pathname = `${folderName}/${fileName}`;

  const url = await edgeClient.upload.createS3PreSignedUrl.mutate({ pathname });

  const res = await fetch(url, {
    body: file.stream(),
    headers: {
      'Content-Type': file.type,
    },
    method: 'POST',
  });

  if (res.ok) {
    return { success: true, message: 'File uploaded successfully', pathname: pathname };
  } else {
    throw new Error('Upload Error');
  }
};
