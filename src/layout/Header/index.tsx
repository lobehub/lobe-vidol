'use client';

import { ActionIcon, Header as LobeHeader, Logo, TabsNav } from '@lobehub/ui';
import { GithubIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState(pathname.split('/')[1] || 'home');
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
          activeKey={activeKey}
          items={[
            {
              key: 'home',
              label: '互动',
            },
            {
              key: 'chat',
              label: '聊天',
            },
            {
              key: 'market',
              label: '发现',
            },
            {
              key: 'my',
              label: '我的',
            },
          ]}
          onChange={(key) => {
            setActiveKey(key);
            router.push(`/${key}`);
          }}
        />
      }
    />
  );
};

export default Header;
