import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { Suspense } from 'react';

import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
import { useGlobalStore } from '@/store/global';

import SessionList from './SessionList';
import SkeletonList from './SkeletonList';

const useStyles = createStyles(({ css }) => ({
  sidebar: css`
    display: flex;
    flex-direction: column;
  `,
}));

const SideBar = () => {
  const { styles } = useStyles();
  const [showSessionList, setSessionList] = useGlobalStore((s) => [
    s.showSessionList,
    s.setSessionList,
  ]);

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
      <Suspense fallback={<SkeletonList />}>
        <SessionList />
      </Suspense>
    </DraggablePanel>
  );
};

export default SideBar;
