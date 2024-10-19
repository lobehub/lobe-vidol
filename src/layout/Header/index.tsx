'use client';

import { Header as LobeHeader, TabsNav } from '@lobehub/ui';
import { Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Logo from '@/components/Logo';
import { HeaderNavKey } from '@/layout/type';

import LocaleSwitch from '../../features/UserPanel/LocaleSwitch';
import ThemeMode from '../../features/UserPanel/ThemeMode';
import Avatar from './Actions/Avatar';
import Documentation from './Actions/Documentation';
import Github from './Actions/Github';

interface Props {
  headerKey?: HeaderNavKey;
}

const Header = (props: Props) => {
  const { headerKey } = props;
  const router = useRouter();
  const { t } = useTranslation('common');

  const navigationItems = [
    {
      key: HeaderNavKey.Chat,
      component: t('header.chat'),
      title: t('header.chat'),
    },
    {
      key: HeaderNavKey.Role,
      component: t('header.role'),
      title: t('header.role'),
    },
    {
      key: HeaderNavKey.Market,
      component: t('header.market'),
      title: t('header.market'),
    },
    {
      key: HeaderNavKey.Settings,
      component: t('header.settings'),
      title: t('header.settings'),
    },
  ];

  return (
    <LobeHeader
      actions={[
        <ThemeMode key="theme" />,
        <LocaleSwitch key="locale" />,
        <Documentation key="doc" />,
        <Github key="github" />,
        <Avatar key="avatar" />,
      ]}
      logo={
        <Space>
          <Link href="/" style={{ color: 'inherit' }}>
            <Logo extra={'Lobe Vidol'} size={36} />
          </Link>
        </Space>
      }
      nav={
        <TabsNav
          activeKey={headerKey}
          items={navigationItems.map((item) => ({
            key: item.key as HeaderNavKey,
            label: (
              <Link href={`/${item.key}`} style={{ color: 'inherit' }}>
                {item.component}
              </Link>
            ),
          }))}
          onChange={(key) => {
            router.push(`/${key}`);
          }}
        />
      }
    />
  );
};

export default memo(Header);
