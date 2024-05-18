import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';

import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
import RoleList from '@/features/RoleList';
import { useGlobalStore } from '@/store/global';

const useStyles = createStyles(({ css }) => ({
  sidebar: css`
    display: flex;
    flex-direction: column;
  `,
}));

const SideBar = () => {
  const { styles } = useStyles();
  const [showRoleList, setRoleList] = useGlobalStore((s) => [s.showRoleList, s.setRoleList]);

  return (
    <DraggablePanel
      className={styles.sidebar}
      maxWidth={SIDEBAR_MAX_WIDTH}
      minWidth={SIDEBAR_WIDTH}
      mode={'fixed'}
      placement={'left'}
      onExpandChange={(expand) => setRoleList(expand)}
      expand={showRoleList}
    >
      {/*<Header />*/}
      <RoleList />
    </DraggablePanel>
  );
};

export default SideBar;
