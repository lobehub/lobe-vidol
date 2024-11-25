import { message } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import GridList from '@/components/GridList';
import Header from '@/components/Header';
import { TRANSPARENT_ID, backgroundOptions } from '@/constants/background';
import { useLoadBackground } from '@/hooks/useLoadBackground';
import { useGlobalStore } from '@/store/global';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    width: 100%;
    height: 100%;
    padding: 0 ${token.paddingSM}px;

    background-color: rgba(255, 255, 255, 2%);
    border-radius: ${token.borderRadius}px;
  `,
}));

interface BackgroundListProps {
  className?: string;
  style?: React.CSSProperties;
}

const BackgroundList = ({ className, style }: BackgroundListProps) => {
  const [setBackgroundUrl] = useGlobalStore((s) => [s.setBackgroundUrl]);
  const [backgroundId, setBackgroundId] = useState<string | undefined>(undefined);
  const { t } = useTranslation('chat');
  const { styles } = useStyles();
  const { downloading, fetchBackgroundUrl, getBackgroundThumbById } = useLoadBackground();

  const handleItemClick = async (id: string) => {
    setBackgroundId(id);
    if (id === TRANSPARENT_ID) {
      setBackgroundUrl(undefined);
      return;
    }
    try {
      const url = await fetchBackgroundUrl(id);
      setBackgroundUrl(url);
    } catch {
      message.error('背景图片下载失败');
    }
  };

  return (
    <Flexbox className={classNames(className, styles.container)} style={style}>
      <Header
        title={t('background.backgroundList')}
        extra={t('background.totalCount', { total: backgroundOptions.length })}
      />
      <GridList
        items={backgroundOptions.map((option) => ({
          avatar: `${getBackgroundThumbById(option.id)}`,
          id: option.id,
          name: option.name,
          url: option.url,
          spin: downloading && backgroundId === option.id,
        }))}
        onClick={handleItemClick}
      />
    </Flexbox>
  );
};

export default BackgroundList;
