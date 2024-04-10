import { ActionIcon, ChatInputActionBar } from '@lobehub/ui';
import { Maximize2, Minimize2 } from 'lucide-react';
import { memo } from 'react';

import ActionBar from './ActionBar';

interface HeaderProps {
  expand: boolean;
  setExpand: (expand: boolean) => void;
}

const Header = memo<HeaderProps>(({ expand, setExpand }) => (
  <ChatInputActionBar
    leftAddons={<ActionBar />}
    rightAddons={
      <ActionIcon
        icon={expand ? Minimize2 : Maximize2}
        onClick={() => {
          setExpand(!expand);
        }}
      />
    }
  />
));

export default Header;
