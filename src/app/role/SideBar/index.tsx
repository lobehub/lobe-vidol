import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';

import { HEADER_HEIGHT, SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
import RoleList from '@/features/RoleList';
import { useGlobalStore } from '@/store/global';

const useStyles = createStyles(({ css }) => ({
  content: css`
    display: flex;
    flex-direction: column;
    height: 100% !important;
  `,
  sidebar: css`
    display: flex;
    flex-direction: column;
    height: calc(100vh - ${HEADER_HEIGHT}px);
  `,
}));

const SideBar = () => {
  const { styles } = useStyles();
  const [showRoleList, setRoleList] = useGlobalStore((s) => [s.showRoleList, s.setRoleList]);

  return (
    <DraggablePanel
      className={styles.sidebar}
      classNames={{ content: styles.content }}
      maxWidth={SIDEBAR_MAX_WIDTH}
      minWidth={SIDEBAR_WIDTH}
      mode={'fixed'}
      placement={'left'}
      onExpandChange={(expand) => setRoleList(expand)}
      expand={showRoleList}
    >
      {/*<Header.tsx />*/}
      <RoleList />
    </DraggablePanel>
  );
};

export default SideBar;
