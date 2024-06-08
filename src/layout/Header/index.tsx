'use client';

import { Header as LobeHeader, Logo, TabsNav } from '@lobehub/ui';
import { Space, Tag, Tooltip } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

import Discord from '@/features/Actions/Discord';
import Github from '@/features/Actions/Github';
import ThemeMode from '@/features/Actions/ThemeMode';
import { HeaderNavKey } from '@/layout/type';

interface Props {
  headerKey?: HeaderNavKey;
}

const Header = (props: Props) => {
  const { headerKey } = props;
  const router = useRouter();

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
          <Tooltip title="项目当前正在施工中，不保证数据稳定性，如果遇到问题可以在系统设置中清除会话消息与重置系统设置，造成不便敬请谅解">
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
              label: '聊天',
            },
            {
              key: HeaderNavKey.Role,
              label: '角色',
            },
            {
              key: HeaderNavKey.Market,
              label: '发现',
            },
            {
              key: HeaderNavKey.Settings,
              label: '设置',
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
