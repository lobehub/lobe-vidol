import { ActionIcon, SearchBar } from '@lobehub/ui';
import { Plus } from 'lucide-react';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useConfigStore } from '@/store/config';

import { useStyles } from './style';

interface HeaderProps {
  onChange?: (value: string) => void;
  value?: string;
}

// eslint-disable-next-line react/display-name
const Header = memo((props: HeaderProps) => {
  const { value, onChange } = props;
  const { styles } = useStyles();
  const openPanel = useConfigStore((s) => s.openPanel);

  return (
    <Flexbox
      justify={'space-between'}
      horizontal
      align={'center'}
      className={styles.header}
      gap={4}
    >
      <SearchBar
        enableShortKey
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
        placeholder="搜索"
        shortKey="f"
        value={value}
      />
      <ActionIcon icon={Plus} onClick={() => openPanel('agent')} title={'创建对话'} />
    </Flexbox>
  );
});

export default Header;
