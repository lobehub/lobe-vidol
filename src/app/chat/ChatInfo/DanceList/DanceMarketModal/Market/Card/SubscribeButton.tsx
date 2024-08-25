import { Button, Progress } from 'antd';
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
    <Button
      disabled={downloading}
      onClick={async () => {
        await fetchDanceData(dance);
      }}
      type={'primary'}
    >
      <Flexbox align={'center'} horizontal gap={8}>
        {t('download.subscribe')}
        {downloading ? (
          <Progress
            type="circle"
            percent={(percent.dance + percent.cover + percent.audio) / 3}
            size={[20, 20]}
          />
        ) : null}
      </Flexbox>
    </Button>
  );
};

export default SubscribeButton;
