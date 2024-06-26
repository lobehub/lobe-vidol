import dayjs from 'dayjs';

import { edgeClient } from '@/libs/trpc/client';
import { uuid } from '@/utils/uuid';

export const upload = async (file: File) => {
  const dateFolder = dayjs().format('YYYY/MM/DD'); // 使用当前日期作为文件夹名称
  const folderName = `files/${dateFolder}`; // e.g., "files/2023/10/10"
  console.log('filename', file.name);
  const fileName = `${uuid()}.${file.name.split('.').at(-1)}`;

  const pathname = `${folderName}/${fileName}`;

  const url = await edgeClient.upload.createS3PreSignedUrl.mutate({ pathname });

  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(url, {
    body: file,
    headers: {
      'Content-Type': file.type,
    },
    method: 'PUT',
  });

  if (res.ok) {
    return {
      success: true,
      message: 'File uploaded successfully',
      url: `https://r2.vidol.chat/${pathname}`,
    };
  } else {
    throw new Error('Upload Error');
  }
};
