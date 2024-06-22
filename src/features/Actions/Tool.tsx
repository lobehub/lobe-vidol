import { ActionIcon } from '@lobehub/ui';
import { Dropdown } from 'antd';
import { Blocks } from 'lucide-react';

import { useGlobalStore } from '@/store/global';

export default () => {
  const [openPanel] = useGlobalStore((s) => [s.openPanel]);

  const pluginStoreItems = [
    {
      key: 'pluginStore',
      label: '插件商店',
      onClick: () => {
        openPanel('pluginStore');
      },
    },
  ];

  return (
    <Dropdown
      menu={{
        items: pluginStoreItems,
      }}
    >
      <ActionIcon icon={Blocks} title="扩展插件" />
    </Dropdown>
  );
};
