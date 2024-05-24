import { ActionIcon, Icon } from '@lobehub/ui';
import { Popover } from 'antd';
import { useTheme } from 'antd-style';
import { Monitor, Moon, Sun } from 'lucide-react';
import { memo, useMemo } from 'react';

import Menu, { type MenuProps } from '@/components/Menu';
import { useGlobalStore } from '@/store/global';

const themeIcons = {
  auto: Monitor,
  dark: Moon,
  light: Sun,
};

const ThemeButton = memo(() => {
  const theme = useTheme();
  const [themeMode, switchThemeMode] = useGlobalStore((s) => [s.themeMode, s.setThemeMode]);

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        icon: <Icon icon={themeIcons.auto} />,
        key: 'auto',
        label: '跟随系统',
        onClick: () => switchThemeMode('auto'),
      },
      {
        icon: <Icon icon={themeIcons.light} />,
        key: 'light',
        label: '亮色模式',
        onClick: () => switchThemeMode('light'),
      },
      {
        icon: <Icon icon={themeIcons.dark} />,
        key: 'dark',
        label: '暗黑模式',
        onClick: () => switchThemeMode('dark'),
      },
    ],
    [],
  );

  return (
    <Popover
      arrow={false}
      content={<Menu items={items} selectable selectedKeys={[themeMode]} />}
      overlayInnerStyle={{
        padding: 0,
      }}
      trigger={['click', 'hover']}
    >
      <ActionIcon
        icon={themeIcons[themeMode]}
        style={{ border: `1px solid ${theme.colorFillSecondary}` }}
      />
    </Popover>
  );
});

export default ThemeButton;
