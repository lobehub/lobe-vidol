/* eslint-disable @next/next/no-img-element */
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { SIDEBAR_WIDTH } from '@/constants/token';
import PlayList from '@/features/PlayList';
import { useDanceStore } from '@/store/dance';

import { useStyles } from './style';

interface PlayListProps {
  onClose: () => void;
  open: boolean;
}

const DrawerPlayList = (props: PlayListProps) => {
  const { open = false, onClose } = props;
  const { styles } = useStyles();
  const clearPlayList = useDanceStore((s) => s.clearPlayList);
  const { t } = useTranslation('common');

  return (
    <Drawer
      extra={
        <Button icon={<DeleteOutlined />} onClick={() => clearPlayList()} size="small">
          {t('actions.clearAll')}
        </Button>
      }
      onClose={onClose}
      open={open}
      classNames={{
        content: styles.content,
        body: styles.body,
        header: styles.header,
      }}
      title={t('playlist')}
      width={SIDEBAR_WIDTH}
      getContainer={false}
    >
      <PlayList />
    </Drawer>
  );
};

export default memo(DrawerPlayList);
