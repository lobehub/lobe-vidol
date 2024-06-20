// pages/api/upload.js
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

import { uuid } from '@/utils/uuid';

const s3Client = new S3Client({
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  region: 'auto', // R2 不需要特定的 region
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
  },
});

// 服务器上传方法
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    const dateFolder = dayjs().format('YYYY/MM/DD'); // 使用当前日期作为文件夹名称
    const folderName = `files/${dateFolder}`; // e.g., "uploads/2023-10-10"
    const fileName = `${uuid()}.${file.name.split('.').at(-1)}`;

    const key = `${folderName}/${fileName}`;
    const fileData = await file.arrayBuffer();

    const params = {
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: key,
      Body: fileData,
      ContentType: file.type,
    };

    // @ts-ignore
    await s3Client.send(new PutObjectCommand(params));

    return NextResponse.json({ success: true, message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Upload error:', error);

    return NextResponse.json({ success: false, body: JSON.stringify(error) }, { status: 500 });
  }
}
