// pages/api/upload.js
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
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

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const now = new Date();

    const dateFolder = `/${now.getFullYear()}/${now.getMonth()}/${now.getDay()}`; // 使用当前日期作为文件夹名称
    const folderName = `files/${dateFolder}`; // e.g., "uploads/2023-10-10"
    const fileName = `${uuid()}.${file.name.split('.').at(-1)}`;

    const key = `${folderName}/${fileName}`;

    const params = {
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: key,
      Body: file.stream(),
      ContentType: file.type,
    };

    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);

    return NextResponse.json({ success: true, message: 'File uploaded successfully', data });
  } catch (error) {
    return NextResponse.json({ success: false, body: JSON.stringify(error) }, { status: 500 });
  }
}
