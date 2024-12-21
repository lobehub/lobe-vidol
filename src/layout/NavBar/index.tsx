'use client';

import { ActionIcon, SideNav } from '@lobehub/ui';
import { theme } from 'antd';
import { Compass, MessageSquare, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { HeaderNavKey } from '@/layout/type';

import Avatar from './Actions/Avatar';
import Documentation from './Actions/Documentation';
import Github from './Actions/Github';
import Support from './Actions/Support';

interface NavBarProps {
  headerKey?: HeaderNavKey;
}

const NavBar = (props: NavBarProps) => {
  const { headerKey: propHeaderKey } = props;
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation('common');
  const { token } = theme.useToken();

  const headerKey = useMemo(() => {
    if (propHeaderKey) return propHeaderKey;
    const path = pathname.split('/')[1];
    return Object.values(HeaderNavKey).includes(path as HeaderNavKey)
      ? (path as HeaderNavKey)
      : HeaderNavKey.Chat;
  }, [propHeaderKey, pathname]);

  const navigationItems = useMemo(() => {
    return [
      {
        key: HeaderNavKey.Chat,
        icon: MessageSquare,
        label: t('header.chat'),
        title: t('header.chat'),
      },
      {
        key: HeaderNavKey.Role,
        icon: User,
        label: t('header.role'),
        title: t('header.role'),
      },
      {
        key: HeaderNavKey.Discover,
        icon: Compass,
        label: t('header.discover'),
        title: t('header.discover'),
      },
    ];
  }, [t]);

  const topActions = useMemo(
    () =>
      navigationItems.map((item) => (
        <ActionIcon
          key={item.key}
          icon={item.icon}
          size="large"
          active={headerKey === item.key}
          title={item.title}
          onClick={() => router.push(`/${item.key}`)}
        />
      )),
    [navigationItems, router, headerKey],
  );

  const bottomActions = useMemo(
    () => [
      <Flexbox key="actions" gap={8}>
        <Documentation key="doc" />
        <Github key="github" />
        <Support key="support" />
      </Flexbox>,
    ],
    [],
  );

  return (
    <SideNav
      avatar={<Avatar />}
      style={{
        backgroundColor: token.colorBgContainer,
      }}
      topActions={topActions}
      bottomActions={bottomActions}
    />
  );
};

export default memo(NavBar);
