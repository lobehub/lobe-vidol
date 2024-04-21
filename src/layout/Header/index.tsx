'use client';

import { ActionIcon, Header as LobeHeader, Logo, TabsNav } from '@lobehub/ui';
import { GithubIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

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
        <ActionIcon
          icon={GithubIcon}
          key="github"
          onClick={() => window.open('https://github.com/lobehub/lobe-vidol', '_blank')}
          size="large"
        />,
      ]}
      logo={<Logo extra={'Vidol'} size={36} type={'combine'} />}
      nav={
        <TabsNav
          activeKey={headerKey}
          items={[
            {
              key: HeaderNavKey.Chat,
              label: '聊天',
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
