'use client';

import { ActionIcon, Header as LobeHeader, Logo } from '@lobehub/ui';
import { GithubIcon } from 'lucide-react';

const Header = () => {
  return (
    <LobeHeader
      actions={[
        <ActionIcon
          icon={GithubIcon}
          key="github"
          onClick={() => window.open('https://github.com/v-idol/vidol.chat', '_blank')}
          size="large"
        />,
      ]}
      logo={<Logo extra={'VChat'} size={36} type={'combine'} />}
    />
  );
};

export default Header;
