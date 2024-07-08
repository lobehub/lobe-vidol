'use client';

import { FluentEmoji } from '@lobehub/ui';
import { Button } from 'antd';
import Link from 'next/link';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { MAX_WIDTH } from '@/constants/common';
import ResetConfig from '@/features/Actions/ClearSession';
import ClearChat from '@/features/Actions/ResetConfig';

interface ErrorCaptureProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorCapture = memo<ErrorCaptureProps>(({ reset, error }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const { t } = useTranslation('error');

  return (
    <Flexbox align={'center'} justify={'center'} style={{ minHeight: '100%', width: '100%' }}>
      <h1
        style={{
          filter: 'blur(8px)',
          fontSize: `min(${MAX_WIDTH / 6}px, 25vw)`,
          fontWeight: 900,
          margin: 0,
          opacity: 0.12,
          position: 'absolute',
          zIndex: 0,
        }}
      >
        {t('error')}
      </h1>
      <FluentEmoji emoji={'🤧'} size={64} />
      <h2 style={{ fontWeight: 'bold', marginTop: '1em', textAlign: 'center' }}>
        {t('errorTip.problem')}
      </h2>
      <p style={{ marginBottom: '2em' }}>
        {t('errorTip.description')}
        <ClearChat text={t('errorTip.clearSession')} type={'link'} />
        {t('errorTip.or')} <ResetConfig text={t('errorTip.resetSystem')} type={'link'} />
        {t('errorTip.forgive')}
      </p>
      <Flexbox gap={12} horizontal style={{ marginBottom: '1em' }}>
        <Button onClick={() => reset()}>{t('reload')}</Button>
        <Link href="/">
          <Button type={'primary'}>{t('goBack')}</Button>
        </Link>
      </Flexbox>
    </Flexbox>
  );
});

ErrorCapture.displayName = 'ErrorCapture';

export default ErrorCapture;
