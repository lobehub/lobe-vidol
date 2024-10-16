'use client';

import { Header as LobeHeader, TabsNav } from '@lobehub/ui';
import { Space, Tag, Tooltip } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
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

  return (
    <LobeHeader
      actions={[
        // <Alert
        //   message="近期由于 OSS 服务商限制，部分资源可能无法加载，可以从发现页重新订阅角色与舞蹈，造成的不便敬请谅解"
        //   key={'alert'}
        //   banner
        //   closable
        // />,
        <Github key="github" />,
        <ThemeMode key={'theme'} />,
        <Discord key={'discord'} />,
        // <UserAvatar key="user" />,
        <Support key={'support'} />,
      ]}
      logo={
        <Space>
          <Link href="/" style={{ color: 'inherit' }}>
            <Logo extra={'Lobe Vidol'} size={36} />
          </Link>
          <Tooltip title={t('header.tips')}>
            <Tag color="yellow">WIP</Tag>
          </Tooltip>
        </Space>
      }
      nav={
        <TabsNav
          activeKey={headerKey}
          items={[
            {
              key: HeaderNavKey.Chat,
              label: (
                <Link href={`/chat`} style={{ color: 'initial' }}>
                  {t('header.chat')}
                </Link>
              ),
            },
            {
              key: HeaderNavKey.Role,
              label: (
                <Link href={`/role`} style={{ color: 'initial' }}>
                  {t('header.role')}
                </Link>
              ),
            },
            {
              key: HeaderNavKey.Market,
              label: (
                <Link href={`/market`} style={{ color: 'initial' }}>
                  {t('header.market')}
                </Link>
              ),
            },
            {
              key: HeaderNavKey.Settings,
              label: (
                <Link href={`/settings`} style={{ color: 'initial' }}>
                  {t('header.settings')}
                </Link>
              ),
            },
          ]}
          onChange={(key) => {
            router.push(`/${key}`);
          }}
        />
      }
    />
  );
};

export default memo(Header);
