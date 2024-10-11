import { Button, Popover, Progress, Space } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useDownloadDance } from '@/hooks/useDownloadDance';
import { Dance } from '@/types/dance';

interface SubscribeButtonProps {
  dance: Dance;
}

const SubscribeButton = (props: SubscribeButtonProps) => {
  const { dance } = props;

  const { downloading, percent, fetchDanceData } = useDownloadDance();

  const { t } = useTranslation('common');

  return (
    <Popover
      open={downloading}
      getPopupContainer={() => document.querySelector('#dance_subscribe_button')!}
      title={
        <Flexbox>
          <Space>
            <Progress steps={30} percent={percent.cover} size="small" />
            <span>{t('download.cover')}</span>
          </Space>
          <Space>
            <Progress steps={30} percent={percent.audio} size="small" />
            <span>{t('download.audio')}</span>
          </Space>
          <Space>
            <Progress steps={30} percent={percent.dance} size="small" />
            <span>{t('download.dance')}</span>
          </Space>
          {dance.camera ? (
            <Space>
              <Progress steps={30} percent={percent.camera} size="small" />
              <span>{t('download.camera')}</span>
            </Space>
          ) : null}
        </Flexbox>
      }
    >
      <Button
        disabled={downloading}
        id="dance_subscribe_button"
        onClick={async () => {
          await fetchDanceData(dance);
        }}
        type={'primary'}
      >
        {t('download.subscribe')}
      </Button>
    </Popover>
  );
};

export default SubscribeButton;
