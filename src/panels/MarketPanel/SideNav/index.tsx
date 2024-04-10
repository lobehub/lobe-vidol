import { useMarketStore } from '@/store/market';
import { ActionIcon, SideNav as LobeSideNav } from '@lobehub/ui';
import { Music2, User } from 'lucide-react';

interface SideNavProps {
  className?: string;
}

const SideNav = (props: SideNavProps) => {
  const { tab, setTab } = useMarketStore();
  const { className } = props;

  return (
    <LobeSideNav
      bottomActions={null}
      className={className}
      topActions={
        <>
          <ActionIcon
            active={tab === 'agent'}
            /* @ts-ignore */
            icon={User}
            onClick={() => {
              setTab('agent');
            }}
            size="large"
          />
          <ActionIcon
            active={tab === 'dance'}
            /* @ts-ignore */
            icon={Music2}
            onClick={() => {
              setTab('dance');
            }}
            size="large"
          />
        </>
      }
    />
  );
};

export default SideNav;
