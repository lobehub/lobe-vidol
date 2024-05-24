'use client';

import { FluentEmoji } from '@lobehub/ui';
import { Button } from 'antd';
import Link from 'next/link';
import { memo, useEffect } from 'react';
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
        ERROR
      </h1>
      <FluentEmoji emoji={'🤧'} size={64} />
      <h2 style={{ fontWeight: 'bold', marginTop: '1em', textAlign: 'center' }}>
        页面遇到一点问题...
      </h2>
      <p style={{ marginBottom: '2em' }}>
        项目当前正在施工中，不保证数据稳定性，如果遇到问题可以尝试
        <ClearChat text="清除会话消息" type={'link'} />
        或 <ResetConfig text="重置系统设置" type={'link'} />
        ，造成地不便敬请谅解
      </p>
      <Flexbox gap={12} horizontal style={{ marginBottom: '1em' }}>
        <Button onClick={() => reset()}>重新加载</Button>
        <Link href="/">
          <Button type={'primary'}>返回首页</Button>
        </Link>
      </Flexbox>
    </Flexbox>
  );
});

ErrorCapture.displayName = 'ErrorCapture';

export default ErrorCapture;
