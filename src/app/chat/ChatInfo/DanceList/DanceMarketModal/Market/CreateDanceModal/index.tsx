import { Form, Modal } from '@lobehub/ui';
import { Button, message } from 'antd';
import { PlusCircle } from 'lucide-react';
import qs from 'query-string';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import TopBanner from '@/components/TopBanner';
import { INPUT_WIDTH_M } from '@/constants/token';
import { Dance } from '@/types/dance';

import AudioUpload from './AudioUpload';
import CoverImageUpload from './CoverImageUpload';
import DanceName from './DanceName';
import DanceUpload from './DanceUpload';

const DANCES_INDEX_GITHUB_ISSUE = 'https://github.com/your-repo/issues/new';

interface FormValues {
  audio: string;
  cover: string;
  name: string;
  src: string;
}

const CreateDanceModal = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('dance');
  const [form] = Form.useForm<FormValues>();

  const handleSubmit = async (values: FormValues) => {
    try {
      const danceId = `dance-${Date.now()}`;
      const dance: Partial<Dance> = {
        name: values.name,
        danceId: danceId,
        audio: values.audio,
        cover: values.cover,
        src: values.src,
      };

      const body = [
        '### danceId',
        danceId,
        '### name',
        dance.name,
        '### audio',
        dance.audio,
        '### src',
        dance.src,
        '### cover',
        dance.cover,
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
      children: <DanceName style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      name: 'audio',
      label: t('create.audio.title'),
      required: true,
      desc: t('create.audio.desc'),
      children: <AudioUpload />,
    },
    {
      name: 'src',
      label: t('create.dance.title'),
      required: true,
      desc: t('create.dance.desc'),
      children: <DanceUpload />,
    },
    {
      name: 'cover',
      label: t('create.cover.title'),
      required: true,
      desc: t('create.cover.desc'),
      children: <CoverImageUpload />,
    },
    {
      name: 'actions',
      children: (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button onClick={() => setOpen(false)}>{t('cancel', { ns: 'common' })}</Button>
          <Button type="primary" htmlType="submit">
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
        <TopBanner title={t('createDance')} />
        <Form form={form} onFinish={handleSubmit} variant="pure" items={basic} itemsType="flat" />
      </Modal>
    </>
  );
};

export default CreateDanceModal;
