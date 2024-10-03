import { Form, Modal } from '@lobehub/ui';
import { Button, Popover, Progress, Space, Typography, message } from 'antd';
import { PlusCircle } from 'lucide-react';
import qs from 'query-string';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import TopBanner from '@/components/TopBanner';
import { INPUT_WIDTH_LG, INPUT_WIDTH_MD } from '@/constants/token';
import { AGENTS_INDEX_GITHUB_ISSUE } from '@/constants/url';
import { useUploadDance } from '@/hooks/useUploadDance';
import { Dance } from '@/types/dance';

import AudioUpload from './AudioUpload';
import CoverImageUpload from './CoverImageUpload';
import DanceIdInput from './DanceIdInput';
import DanceName from './DanceName';
import DanceUpload from './DanceUpload';
import ReadMe from './ReadMe';

interface FormValues {
  audio: File;
  danceId: string;
  image: { cover: string; thumb: string };
  name: string;
  readme: string;
  src: File;
}

const CreateDanceModal = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(['dance', 'error', 'common']); // 添加 'error' 和 'common' 命名空间
  const [form] = Form.useForm<FormValues>();

  const { uploading, uploadDanceData, percent } = useUploadDance();

  const handleSubmit = async () => {
    try {
      const data = await form.validateFields();

      try {
        const { coverUrl, thumbUrl, audioUrl, srcUrl } = await uploadDanceData(data.danceId, {
          audio: data.audio,
          cover: data.image.cover,
          src: data.src,
          thumb: data.image.thumb,
        });

        if (!thumbUrl || !coverUrl || !audioUrl || !srcUrl) {
          message.error(t('fileUploadError', { ns: 'error' }));
          return;
        }

        const dance: Partial<Dance> = {
          name: data.name,
          danceId: data.danceId,
          cover: coverUrl,
          thumb: thumbUrl,
          audio: audioUrl,
          src: srcUrl,
          readme: data.readme,
        };

        const body = [
          '### danceId',
          dance.danceId,
          '### name',
          dance.name,
          '### audio',
          dance.audio,
          '### src',
          dance.src,
          '### cover',
          dance.cover,
          '### thumb',
          dance.thumb,
          '### readme',
          dance.readme,
        ].join('\n\n');

        const url = qs.stringifyUrl({
          query: { body, labels: '💃 Dance PR', title: `[Dance] ${dance.name}` },
          url: AGENTS_INDEX_GITHUB_ISSUE,
        });

        window.open(url, '_blank');

        message.success(t('create.messages.uploadSuccess', { ns: 'dance' }));
      } catch (error) {
        console.error('Upload failed:', error);
        message.error(t('create.messages.uploadFailed', { ns: 'dance' }));
      }
    } catch (error) {
      console.error(t('formValidationFailed', { ns: 'error' }), error);
    }
  };

  const basic = [
    {
      name: 'danceId',
      label: t('create.danceId.title'),
      rules: [{ required: true, message: t('create.danceId.required') }],
      desc: t('create.danceId.desc'),
      children: <DanceIdInput style={{ width: INPUT_WIDTH_LG }} />,
    },
    {
      name: 'name',
      label: t('create.name.title'),
      rules: [{ required: true, message: t('create.name.required') }],
      desc: t('create.name.desc'),
      children: <DanceName style={{ width: INPUT_WIDTH_MD }} />,
    },
    {
      name: 'image',
      label: t('create.image.title'),
      rules: [{ required: true, message: t('create.image.required') }],
      desc: t('create.image.desc'),
      children: <CoverImageUpload />,
    },
    {
      name: 'audio',
      label: t('create.audio.title'),
      rules: [{ required: true, message: t('create.audio.required') }],
      desc: t('create.audio.desc'),
      children: <AudioUpload />,
    },
    {
      name: 'src',
      label: t('create.dance.title'),
      rules: [{ required: true, message: t('create.dance.required') }],
      desc: t('create.dance.desc'),
      children: <DanceUpload />,
    },
    {
      name: 'readme',
      label: t('create.readme.title'),
      rules: [{ required: false }],
      desc: t('create.readme.desc'),
      children: <ReadMe style={{ width: INPUT_WIDTH_LG }} />,
    },
  ];

  return (
    <>
      <Button icon={<PlusCircle />} onClick={() => setOpen(true)}>
        {t('create.title', { ns: 'dance' })}
      </Button>
      <Modal
        open={open}
        title={t('create.title', { ns: 'dance' })}
        onCancel={() => setOpen(false)}
        destroyOnClose
        footer={
          <Popover
            open={uploading}
            title={
              <Flexbox>
                <Typography.Text type={'secondary'}>
                  {t('create.uploading', { ns: 'dance' })}
                </Typography.Text>
                <Space>
                  <Progress steps={30} percent={percent.cover} size="small" />
                  <Typography.Text style={{ fontSize: 12 }}>
                    {t('create.uploadingCover', { ns: 'dance' })}
                  </Typography.Text>
                </Space>
                <Space>
                  <Progress steps={30} percent={percent.thumb} size="small" />
                  <Typography.Text style={{ fontSize: 12 }}>
                    {t('create.uploadingThumb', { ns: 'dance' })}
                  </Typography.Text>
                </Space>
                <Space>
                  <Progress steps={30} percent={percent.audio} size="small" />
                  <Typography.Text style={{ fontSize: 12 }}>
                    {t('create.uploadingAudio', { ns: 'dance' })}
                  </Typography.Text>
                </Space>
                <Space>
                  <Progress steps={30} percent={percent.src} size="small" />
                  <Typography.Text style={{ fontSize: 12 }}>
                    {t('create.uploadingDance', { ns: 'dance' })}
                  </Typography.Text>
                </Space>
              </Flexbox>
            }
          >
            <Button
              block
              onClick={handleSubmit}
              size={'large'}
              type={'primary'}
              loading={uploading}
            >
              {t('create.submit', { ns: 'dance' })}
            </Button>
          </Popover>
        }
        width={800}
      >
        <TopBanner title={t('createDance', { ns: 'dance' })} />
        <Form form={form} onFinish={handleSubmit} variant="pure" items={basic} itemsType="flat" />
      </Modal>
    </>
  );
};

export default CreateDanceModal;
