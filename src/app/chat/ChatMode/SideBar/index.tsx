'use client';

import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { rgba } from 'polished';
import { memo, useEffect } from 'react';

import { HEADER_HEIGHT, SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
import { useGlobalStore } from '@/store/global';

import SessionList from './SessionList';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
    height: 100% !important;
  `,
  sidebar: css`
    display: flex;
    flex-direction: column;

    height: calc(100vh - ${HEADER_HEIGHT}px);

    background-color: ${rgba(token.colorBgLayout, 0.2)};
    backdrop-filter: saturate(180%) blur(8px);
  `,
}));

interface SideBarProps {
  mobile?: boolean;
}

const SideBar = memo(({ mobile }: SideBarProps) => {
  const { styles } = useStyles();
  const [showSessionList, setSessionList] = useGlobalStore((s) => [
    s.showSessionList,
    s.setSessionList,
  ]);

  useEffect(() => {
    if (mobile && showSessionList) {
      setSessionList(false);
    }
  }, [mobile]);

  const handleExpandChange = (expand: boolean) => {
    if (!mobile) {
      setSessionList(expand);
    }
  };

  return (
    <DraggablePanel
      className={styles.sidebar}
      classNames={{ content: styles.content }}
      maxWidth={SIDEBAR_MAX_WIDTH}
      minWidth={SIDEBAR_WIDTH}
      mode={'fixed'}
      placement={'left'}
      onExpandChange={handleExpandChange}
      expand={showSessionList}
    >
      <SessionList />
    </DraggablePanel>
  );
});

export default memo(SideBar);
