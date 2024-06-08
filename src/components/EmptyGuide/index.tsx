import { InboxOutlined } from '@ant-design/icons';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

import { useStyles } from './style';

interface EmptyGuideProps {
  extra?: string;
  size: { height: number; width: number };
}

const EmptyGuide = (props: EmptyGuideProps) => {
  const { styles } = useStyles();
  const { size, extra } = props;

  return (
    <Flexbox
      className={styles.guide}
      align="center"
      justify={'center'}
      style={{ height: size.height, width: size.width }}
    >
      <InboxOutlined className={styles.icon} />
      <p className={styles.info}>点击或拖拽文件到此区域上传</p>
      {extra ? <p className={styles.extra}>{extra}</p> : null}
    </Flexbox>
  );
};

export default EmptyGuide;
