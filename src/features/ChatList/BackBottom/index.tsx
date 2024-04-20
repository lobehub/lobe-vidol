import { Icon } from '@lobehub/ui';
import { Button } from 'antd';
import { ListEnd } from 'lucide-react';
import { memo } from 'react';

import { useStyles } from './style';

export interface BackBottomProps {
  onScrollToBottom: () => void;
  visible: boolean;
}

const BackBottom = memo<BackBottomProps>(({ visible, onScrollToBottom }) => {
  const { styles, cx } = useStyles();

  return (
    <Button
      className={cx(styles.container, visible && styles.visible)}
      icon={<Icon icon={ListEnd} />}
      onClick={onScrollToBottom}
      size={'small'}
    >
      返回底部
    </Button>
  );
});

export default BackBottom;
