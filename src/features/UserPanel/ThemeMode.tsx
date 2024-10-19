import { ActionIcon, Icon } from '@lobehub/ui';
import { Popover } from 'antd';
import { useTheme } from 'antd-style';
import { Monitor, Moon, Sun } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('common');
  const items: MenuProps['items'] = useMemo(
    () => [
      {
        icon: <Icon icon={themeIcons.auto} />,
        key: 'auto',
        label: t('theme.auto'),
        onClick: () => switchThemeMode('auto'),
      },
      {
        icon: <Icon icon={themeIcons.light} />,
        key: 'light',
        label: t('theme.light'),
        onClick: () => switchThemeMode('light'),
      },
      {
        icon: <Icon icon={themeIcons.dark} />,
        key: 'dark',
        label: t('theme.dark'),
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
      placement={'bottom'}
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
