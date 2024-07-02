import axios from 'axios';
import dayjs from 'dayjs';

import { edgeClient } from '@/libs/trpc/client';
import { uuid } from '@/utils/uuid';

export const upload = async (
  file: File,
  handlers: {
    onProgress?: (progress: number) => void;
  },
) => {
  const dateFolder = dayjs().format('YYYY/MM/DD'); // 使用当前日期作为文件夹名称
  const folderName = `files/${dateFolder}`; // e.g., "files/2023/10/10"
  const fileName = `${uuid()}.${file.name.split('.').at(-1)}`;

  const pathname = `${folderName}/${fileName}`;

  const url = await edgeClient.upload.createS3PreSignedUrl.mutate({ pathname });

  const formData = new FormData();
  formData.append('file', file);

  await axios.put(url, formData, {
    headers: {
      'Content-Type': file.type,
    },
    onUploadProgress: ({ progress }) => {
      handlers.onProgress?.(progress ? Math.ceil(progress * 100) : 0);
    },
  });

  return `https://r2.vidol.chat/${pathname}`;
};
