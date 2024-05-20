import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';

import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
import SessionList from '@/features/SessionList';
import { useGlobalStore } from '@/store/global';

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
      {/*<Header />*/}
      <SessionList />
    </DraggablePanel>
  );
};

export default SideBar;
