'use client';

import { DraggablePanel } from '@lobehub/ui';
import { createStyles, useResponsive } from 'antd-style';
import { rgba } from 'polished';
import { useEffect } from 'react';

import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
import { useGlobalStore } from '@/store/global';

import SessionList from './SessionList';

const useStyles = createStyles(({ css, token }) => ({
  sidebar: css`
    display: flex;
    flex-direction: column;
    background-color: ${rgba(token.colorBgLayout, 0.2)};
    backdrop-filter: saturate(180%) blur(8px);
  `,
}));

const SideBar = () => {
  const { styles } = useStyles();
  const [showSessionList, setSessionList] = useGlobalStore((s) => [
    s.showSessionList,
    s.setSessionList,
  ]);

  const { mobile } = useResponsive();

  useEffect(() => {
    if (mobile && showSessionList) {
      setSessionList(false);
    }
  }, [mobile, showSessionList, setSessionList]);

  return (
    <DraggablePanel
      className={styles.sidebar}
      maxWidth={SIDEBAR_MAX_WIDTH}
      minWidth={SIDEBAR_WIDTH}
      mode={'fixed'}
      placement={'left'}
      onExpandChange={(expand) => setSessionList(expand)}
      expand={showSessionList}
    >
      <SessionList />
    </DraggablePanel>
  );
};

export default SideBar;
