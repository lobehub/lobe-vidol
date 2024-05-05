import { Avatar } from '@lobehub/ui';
import { Space } from 'antd';
import React, { memo } from 'react';
import { Center } from 'react-layout-kit';

import { Dance } from '@/types/dance';

import { useStyles } from './style';

interface DanceInfoProps {
  actions?: React.ReactNode[];
  dance?: Dance;
  extra?: React.ReactNode;
}

const DanceInfo = (props: DanceInfoProps) => {
  const { styles, theme } = useStyles();
  const { dance, actions = [], extra } = props;
  const { name, readme, cover } = dance || {};

  return (
    <div className={styles.container}>
      <Center className={styles.header} gap={16}>
        <Avatar avatar={cover} background={theme.colorFillTertiary} shape="square" size={180} />
        <div className={styles.title}>{name}</div>
        <div className={styles.actions}>
          <Space>{actions}</Space>
        </div>
        {extra}
      </Center>
      <div className={styles.footer}>
        <div className={styles.desc}>{readme}</div>
      </div>
    </div>
  );
};

export default memo(DanceInfo);
