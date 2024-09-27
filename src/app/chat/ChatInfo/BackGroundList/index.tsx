import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import GridList from '@/components/GridList';
import Header from '@/components/Header';
import { backgroundOptions } from '@/constants/background';
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
  const [backgroundId, setBackgroundId] = useGlobalStore((s) => [
    s.backgroundId,
    s.setBackgroundId,
  ]);
  const { t } = useTranslation('chat');

  const { styles } = useStyles();
  return (
    <Flexbox className={classNames(className, styles.container)} style={style}>
      <Header
        title={t('background.backgroundList')}
        extra={t('background.totalCount', { total: backgroundOptions.length })}
      />
      <GridList
        items={backgroundOptions.map((option) => ({
          avatar: `https://r2.vidol.chat/backgrounds/${encodeURIComponent(option.thumbnail)}`,
          id: option.id,
          name: option.name,
          url: option.url,
        }))}
        onClick={(id) => setBackgroundId(id)}
        isActivated={(id) => id === backgroundId}
      />
    </Flexbox>
  );
};

export default BackgroundList;
