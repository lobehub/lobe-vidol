'use client';

import { ActionIcon, Header as LobeHeader, TabsNav } from '@lobehub/ui';
import { ConfigProvider, Drawer, Menu, theme } from 'antd';
import { useResponsive } from 'antd-style';
import { Menu as MenuIcon, MessageSquare, Settings, ShoppingBag, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import Logo from '@/components/Logo';
import { HeaderNavKey } from '@/layout/type';

import Avatar from './Actions/Avatar';
import Documentation from './Actions/Documentation';
import Github from './Actions/Github';
import Support from './Actions/Support';

interface Props {
  headerKey?: HeaderNavKey;
}

const Header = (props: Props) => {
  const { headerKey: propHeaderKey } = props;
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation('common');
  const { mobile } = useResponsive();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { token } = theme.useToken();

  const headerKey = useMemo(() => {
    if (propHeaderKey) return propHeaderKey;
    const path = pathname.split('/')[1];
    return Object.values(HeaderNavKey).includes(path as HeaderNavKey)
      ? (path as HeaderNavKey)
      : HeaderNavKey.Chat;
  }, [propHeaderKey, pathname]);

  const navigationItems = [
    {
      key: HeaderNavKey.Chat,
      icon: <MessageSquare size={18} />,
      component: t('header.chat'),
      title: t('header.chat'),
    },
    {
      key: HeaderNavKey.Role,
      icon: <User size={18} />,
      component: t('header.role'),
      title: t('header.role'),
    },
    {
      key: HeaderNavKey.Market,
      icon: <ShoppingBag size={18} />,
      component: t('header.market'),
      title: t('header.market'),
    },
    {
      key: HeaderNavKey.Settings,
      icon: <Settings size={18} />,
      component: t('header.settings'),
      title: t('header.settings'),
    },
  ];

  const renderDesktopNav = () => (
    <TabsNav
      activeKey={headerKey}
      items={navigationItems.map((item) => ({
        key: item.key,
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
  );

  const renderMobileNav = () => (
    <>
      <ActionIcon icon={MenuIcon} onClick={() => setDrawerVisible(true)} />
      <Drawer
        title={
          <Flexbox horizontal justify="space-between" align="center">
            <Logo extra={'Lobe Vidol'} size={28} />
            <ActionIcon icon={X} onClick={() => setDrawerVisible(false)} />
          </Flexbox>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
        closeIcon={null}
        styles={{
          body: {
            padding: 0,
            backgroundColor: token.colorBgContainer,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          },
          content: { backgroundColor: token.colorBgContainer },
          header: {
            padding: '16px 24px',
            borderBottom: 'none',
            backgroundColor: token.colorBgContainer,
          },
        }}
      >
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemSelectedBg: token.colorBgElevated,
                itemSelectedColor: token.colorText,
              },
            },
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[headerKey]}
            style={{
              border: 'none',
              backgroundColor: token.colorBgContainer,
              flex: 1,
            }}
            items={navigationItems.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: (
                <Link
                  href={`/${item.key}`}
                  style={{ color: 'inherit' }}
                  onClick={() => setDrawerVisible(false)}
                >
                  {item.component}
                </Link>
              ),
            }))}
            onClick={({ key }) => {
              router.push(`/${key}`);
              setDrawerVisible(false);
            }}
          />
        </ConfigProvider>
        <Flexbox padding={16} gap={8} direction="horizontal" justify="center">
          <Documentation />
          <Github />
          <Avatar />
        </Flexbox>
      </Drawer>
    </>
  );

  return (
    <LobeHeader
      actions={[
        <Flexbox key="actions" gap={8} direction="horizontal">
          {mobile ? (
            renderMobileNav()
          ) : (
            <>
              <Documentation key="doc" />
              <Github key="github" />
              <Support key="support" />
              <Avatar key="avatar" />
            </>
          )}
        </Flexbox>,
      ]}
      logo={
        <Link href="/" style={{ color: 'inherit' }}>
          <Logo extra={'Lobe Vidol'} size={36} />
        </Link>
      }
      nav={mobile ? null : renderDesktopNav()}
    />
  );
};

export default memo(Header);
