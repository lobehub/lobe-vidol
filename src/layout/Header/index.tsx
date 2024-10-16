'use client';

import { MenuOutlined } from '@ant-design/icons';
import { Header as LobeHeader, TabsNav } from '@lobehub/ui';
import { Button, Dropdown, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Logo from '@/components/Logo';
import { HeaderNavKey } from '@/layout/type';

import Discord from './Actions/Discord';
import Github from './Actions/Github';
import Support from './Actions/Support';
import ThemeMode from './Actions/ThemeMode';

interface Props {
  headerKey?: HeaderNavKey;
}

const Header = (props: Props) => {
  const { headerKey } = props;
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

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

  const actionItems = [
    { key: 'github', component: <Github />, title: t('menu.github') },
    { key: 'discord', component: <Discord />, title: t('menu.discord') },
    { key: 'support', component: <Support />, title: t('menu.support') },
  ];

  const dropdownItems = isMobile ? [...navigationItems, ...actionItems] : actionItems;

  const actionsDropdown = (
    <Dropdown
      menu={{
        items: dropdownItems.map((item) => ({
          key: item.key,
          label: (
            <Space>
              {item.component}
              <span>{item.title}</span>
            </Space>
          ),
        })),
      }}
      trigger={['click']}
      overlayStyle={{ minWidth: '200px' }}
    >
      <Button icon={<MenuOutlined />} />
    </Dropdown>
  );

  return (
    <LobeHeader
      actions={[<ThemeMode key="theme" />, actionsDropdown]}
      logo={
        <Space>
          <Link href="/" style={{ color: 'inherit' }}>
            <Logo extra={'Lobe Vidol'} size={36} />
          </Link>
        </Space>
      }
      nav={
        isMobile ? null : (
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
        )
      }
    />
  );
};

export default memo(Header);
