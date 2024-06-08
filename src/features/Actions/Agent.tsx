import { ActionIcon, Icon } from '@lobehub/ui';
import { Popover } from 'antd';
import { Monitor, Moon, PlusCircle, Sun } from 'lucide-react';
import { memo, useMemo } from 'react';

import Menu, { type MenuProps } from '@/components/Menu';
import { useAgentStore } from '@/store/agent';
import { GenderEnum } from '@/types/agent';

const genderIcons = {
  female: Monitor,
  male: Moon,
  other: Sun,
};

const ThemeButton = memo(() => {
  const createNewAgent = useAgentStore((s) => s.createNewAgent);

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        icon: <Icon icon={genderIcons.female} />,
        key: 'light',
        label: '女性',
        onClick: () => createNewAgent(GenderEnum.FEMALE),
      },
      {
        icon: <Icon icon={genderIcons.male} />,
        key: 'auto',
        label: '男性',
        onClick: () => createNewAgent(GenderEnum.MALE),
      },
      {
        icon: <Icon icon={genderIcons.other} />,
        key: 'dark',
        label: '其他',
        onClick: () => createNewAgent(GenderEnum.OTHER),
      },
    ],
    [],
  );

  return (
    <Popover
      arrow={false}
      content={<Menu items={items} />}
      overlayInnerStyle={{
        padding: 0,
      }}
      trigger={['click', 'hover']}
    >
      <ActionIcon icon={PlusCircle} />
    </Popover>
  );
});

export default ThemeButton;
