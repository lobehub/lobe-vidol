import { Form, Modal } from '@lobehub/ui';
import { Button, Input, Upload, message } from 'antd';
import { PlusCircle } from 'lucide-react';
import qs from 'query-string';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUploadDance } from '@/hooks/useUploadDance';
import { Dance } from '@/types/dance';

const DANCES_INDEX_GITHUB_ISSUE = 'https://github.com/your-repo/issues/new';

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
      const danceId = `dance-${Date.now()}`;
      const dance: Partial<Dance> = {
        name: values.name,
        author: values.author,
        danceId: danceId,
        createAt: new Date().toISOString(),
      };

      const { audioUrl, srcUrl, coverUrl } = await uploadDanceData(danceId, {
        audio: values.audio,
        src: values.src,
        cover: values.cover,
      });

      if (!audioUrl || !srcUrl || !coverUrl) {
        message.error(t('create.messages.fileUploadError'));
        return;
      }

      dance.audio = audioUrl;
      dance.src = srcUrl;
      dance.cover = coverUrl;

      const body = [
        '### danceId',
        danceId,
        '### name',
        dance.name,
        '### author',
        dance.author,
        '### audio',
        dance.audio,
        '### src',
        dance.src,
        '### cover',
        dance.cover,
        '### createAt',
        dance.createAt,
      ].join('\n\n');

      const url = qs.stringifyUrl({
        query: { body, labels: '💃 Dance PR', title: `[Dance] ${dance.name}` },
        url: DANCES_INDEX_GITHUB_ISSUE,
      });

      window.open(url, '_blank');

      message.success(t('create.messages.uploadSuccess'));
      setOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('Upload failed:', error);
      message.error(t('create.messages.uploadFailed'));
    }
  };

  const basic = [
    {
      name: 'name',
      label: t('create.name.title'),
      required: true,
      desc: t('create.name.desc'),
      children: <Input />,
    },
    {
      name: 'author',
      label: t('create.author.title'),
      required: true,
      desc: t('create.author.desc'),
      children: <Input />,
    },
    {
      name: 'audio',
      label: t('create.audio.title'),
      required: true,
      desc: t('create.audio.desc'),
      children: (
        <Upload accept=".mp3,.wav" beforeUpload={() => false}>
          <Button icon={<PlusCircle />}>{t('create.audio.upload')}</Button>
        </Upload>
      ),
    },
    {
      name: 'src',
      label: t('create.dance.title'),
      required: true,
      desc: t('create.dance.desc'),
      children: (
        <Upload accept=".vmd" beforeUpload={() => false}>
          <Button icon={<PlusCircle />}>{t('create.dance.upload')}</Button>
        </Upload>
      ),
    },
    {
      name: 'cover',
      label: t('create.cover.title'),
      required: true,
      desc: t('create.cover.desc'),
      children: (
        <Upload accept="image/*" beforeUpload={() => false}>
          <Button icon={<PlusCircle />}>{t('create.cover.upload')}</Button>
        </Upload>
      ),
    },
    {
      name: 'actions',
      children: (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button onClick={() => setOpen(false)}>{t('cancel', { ns: 'common' })}</Button>
          <Button type="primary" htmlType="submit" loading={uploading}>
            {t('submit', { ns: 'common' })}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Button icon={<PlusCircle />} onClick={() => setOpen(true)}>
        {t('create.title')}
      </Button>
      <Modal open={open} title={t('create.title')} onCancel={() => setOpen(false)} footer={null}>
        <Form form={form} onFinish={handleSubmit} variant="block" items={basic} itemsType="flat" />
      </Modal>
    </>
  );
};

export default CreateDanceModal;
