'use client';

import { Header as LobeHeader, Logo, TabsNav } from '@lobehub/ui';
import { Space, Tag, Tooltip } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { HeaderNavKey } from '@/layout/type';

import Discord from './Actions/Discord';
import Github from './Actions/Github';
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
              label: t('header.chat'),
            },
            {
              key: HeaderNavKey.Role,
              label: t('header.role'),
            },
            {
              key: HeaderNavKey.Market,
              label: t('header.market'),
            },
            {
              key: HeaderNavKey.Settings,
              label: t('header.settings'),
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
