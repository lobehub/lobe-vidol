import { Form, Modal } from '@lobehub/ui';
import { Button, message } from 'antd';
import { PlusCircle } from 'lucide-react';
import qs from 'query-string';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import TopBanner from '@/components/TopBanner';
import { INPUT_WIDTH_LG, INPUT_WIDTH_MD } from '@/constants/token';
import { Dance } from '@/types/dance';

import AudioUpload from './AudioUpload';
import CoverImageUpload from './CoverImageUpload';
import DanceIdInput from './DanceIdInput';
import DanceName from './DanceName';
import DanceUpload from './DanceUpload';
import ReadMe from './ReadMe';

const DANCES_INDEX_GITHUB_ISSUE = 'https://github.com/your-repo/issues/new';

interface FormValues {
  audio: string;
  cover: { thumb: string; value: string };
  name: string;
  src: string;
}

const CreateDanceModal = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('dance');
  const [form] = Form.useForm<FormValues>();

  const handleSubmit = async (data: FormValues) => {
    try {
      const danceId = `dance-${Date.now()}`;
      const dance: Partial<Dance> = {
        name: data.name,
        danceId: danceId,
        audio: data.audio,
        cover: data.cover.value,
        thumb: data.cover.thumb,
        src: data.src,
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
      name: 'danceId',
      label: t('create.danceId.title'),
      required: true,
      desc: t('create.danceId.desc'),
      children: <DanceIdInput style={{ width: INPUT_WIDTH_MD }} />,
    },
    {
      name: 'name',
      label: t('create.name.title'),
      required: true,
      desc: t('create.name.desc'),
      children: <DanceName style={{ width: INPUT_WIDTH_MD }} />,
    },
    {
      name: 'cover',
      label: t('create.cover.title'),
      required: true,
      desc: t('create.cover.desc'),
      children: <CoverImageUpload />,
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
      name: 'readme',
      label: t('create.readme.title'),
      required: false,
      desc: t('create.readme.desc'),
      children: <ReadMe style={{ width: INPUT_WIDTH_LG }} />,
    },

    {
      name: 'actions',
      children: (
        <Button type="primary" htmlType="submit" block>
          {t('create.submit')}
        </Button>
      ),
    },
  ];

  return (
    <>
      <Button icon={<PlusCircle />} onClick={() => setOpen(true)}>
        {t('create.title')}
      </Button>
      <Modal
        open={open}
        title={t('create.title')}
        onCancel={() => setOpen(false)}
        footer={null}
        width={800}
      >
        <TopBanner title={t('createDance')} />
        <Form form={form} onFinish={handleSubmit} variant="pure" items={basic} itemsType="flat" />
      </Modal>
    </>
  );
};

export default CreateDanceModal;
