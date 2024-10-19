'use client';

import {
  CloseOutlined,
  MenuOutlined,
  MessageOutlined,
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Header as LobeHeader, TabsNav } from '@lobehub/ui';
import { Button, Drawer, Menu, Space, theme } from 'antd';
import { useResponsive } from 'antd-style';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import Logo from '@/components/Logo';
import { HeaderNavKey } from '@/layout/type';

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
  const { mobile } = useResponsive();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { token } = theme.useToken();

  const navigationItems = [
    {
      key: HeaderNavKey.Chat,
      icon: <MessageOutlined />,
      component: t('header.chat'),
      title: t('header.chat'),
    },
    {
      key: HeaderNavKey.Role,
      icon: <UserOutlined />,
      component: t('header.role'),
      title: t('header.role'),
    },
    {
      key: HeaderNavKey.Market,
      icon: <ShopOutlined />,
      component: t('header.market'),
      title: t('header.market'),
    },
    {
      key: HeaderNavKey.Settings,
      icon: <SettingOutlined />,
      component: t('header.settings'),
      title: t('header.settings'),
    },
  ];

  const renderDesktopNav = () => (
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
  );

  const renderMobileNav = () => (
    <>
      <Button icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} />
      <Drawer
        title={
          <Flexbox horizontal justify="space-between" align="center">
            <Logo extra={'Lobe Vidol'} size={28} />
            <Button type="text" icon={<CloseOutlined />} onClick={() => setDrawerVisible(false)} />
          </Flexbox>
        }
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
        closeIcon={null}
        styles={{
          body: { padding: 0, backgroundColor: token.colorBgContainer },
          content: { backgroundColor: token.colorBgContainer },
          header: {
            padding: '16px 24px',
            borderBottom: `1px solid ${token.colorBorder}`,
            backgroundColor: token.colorBgContainer,
          },
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[headerKey as string]}
          style={{
            border: 'none',
            backgroundColor: token.colorBgContainer,
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
      </Drawer>
    </>
  );

  return (
    <LobeHeader
      actions={[
        <Flexbox key="actions" gap={8} direction="horizontal">
          <Documentation key="doc" />
          <Github key="github" />
          <Avatar key="avatar" />
        </Flexbox>,
      ]}
      logo={
        <Space>
          {mobile ? renderMobileNav() : null}
          <Link href="/" style={{ color: 'inherit' }}>
            <Logo extra={'Lobe Vidol'} size={36} />
          </Link>
        </Space>
      }
      nav={mobile ? null : renderDesktopNav()}
    />
  );
};

export default memo(Header);
