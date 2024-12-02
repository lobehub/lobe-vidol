'use client';

import { DraggablePanel } from '@lobehub/ui';
import { createStyles, useResponsive } from 'antd-style';
import isEqual from 'lodash-es/isEqual';
import { rgba } from 'polished';
import { memo, useEffect, useState } from 'react';

import { SIDEBAR_WIDTH } from '@/constants/token';
import { useGlobalStore } from '@/store/global';

import SessionList from './SessionList';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
    height: 100% !important;
  `,
  sidebar: css`
    z-index: 10;
    background-color: ${rgba(token.colorBgLayout, 0.2)};
    backdrop-filter: saturate(180%) blur(8px);
  `,
}));

const SideBar = memo(() => {
  const { styles } = useStyles();
  const [showSessionList, setSessionList] = useGlobalStore((s) => [
    s.showSessionList,
    s.setSessionList,
  ]);

  const { md = true } = useResponsive();

  const [cacheExpand, setCacheExpand] = useState<boolean>(Boolean(showSessionList));

  const handleExpand = (expand: boolean) => {
    if (isEqual(expand, Boolean(showSessionList))) return;
    setSessionList(expand);
    setCacheExpand(expand);
  };

  useEffect(() => {
    if (md && cacheExpand) setSessionList(true);
    if (!md) setSessionList(false);
  }, [md, cacheExpand]);

  return (
    <DraggablePanel
      className={styles.sidebar}
      classNames={{ content: styles.content }}
      minWidth={SIDEBAR_WIDTH}
      showHandlerWhenUnexpand={false}
      showHandlerWideArea={false}
      mode={md ? 'fixed' : 'float'}
      placement={'left'}
      onExpandChange={handleExpand}
      expand={showSessionList}
    >
      <SessionList />
    </DraggablePanel>
  );
});

export default memo(SideBar);
