import { Form, Modal } from '@lobehub/ui';
import { Button, Input, Space, Upload, message } from 'antd';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUploadDance } from '@/hooks/useUploadDance';
import { Dance } from '@/types/dance';

interface FormValues {
  audio: File;
  author: string;
  cover: File;
  name: string;
  src: File;
}

const CreateDanceModal = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('dance');
  const [form] = Form.useForm<FormValues>();
  const { uploading, uploadDanceData } = useUploadDance();

  const handleSubmit = async (values: FormValues) => {
    try {
      const dance: Partial<Dance> = {
        name: values.name,
        author: values.author,
        danceId: `dance-${Date.now()}`,
        createAt: new Date().toISOString(),
      };

      const { audioUrl, srcUrl, coverUrl } = await uploadDanceData(dance.danceId!, {
        audio: values.audio,
        src: values.src,
        cover: values.cover,
      });

      dance.audio = audioUrl;
      dance.src = srcUrl;
      dance.cover = coverUrl;

      // 这里可以添加将舞蹈数据保存到后端或状态管理的逻辑
      console.log('Dance uploaded:', dance);

      message.success(t('uploadSuccess'));
      setOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('Upload failed:', error);
      message.error(t('uploadFailed'));
    }
  };

  return (
    <>
      <Button icon={<PlusCircle />} onClick={() => setOpen(true)}>
        {t('createDance')}
      </Button>
      <Modal
        open={open}
        title={t('createDance')}
        onCancel={() => setOpen(false)}
        footer={
          <Space>
            <Button onClick={() => setOpen(false)}>{t('cancel')}</Button>
            <Button type="primary" htmlType="submit" loading={uploading}>
              {t('submit')}
            </Button>
          </Space>
        }
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="name" label={t('danceName')} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="author" label={t('author')} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="audio" label={t('audioFile')} rules={[{ required: true }]}>
            <Upload accept=".mp3,.wav" beforeUpload={() => false}>
              <Button icon={<PlusCircle />}>{t('uploadAudio')}</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="src" label={t('danceFile')} rules={[{ required: true }]}>
            <Upload accept=".vmd" beforeUpload={() => false}>
              <Button icon={<PlusCircle />}>{t('uploadDance')}</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="cover" label={t('coverImage')} rules={[{ required: true }]}>
            <Upload accept="image/*" beforeUpload={() => false}>
              <Button icon={<PlusCircle />}>{t('uploadCover')}</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateDanceModal;
