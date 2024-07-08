import { InboxOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useStyles } from './style';

interface EmptyGuideProps {
  extra?: string;
  size: { height: number; width: number };
}

const EmptyGuide = (props: EmptyGuideProps) => {
  const { styles } = useStyles();
  const { size, extra } = props;
  const { t } = useTranslation('common');

  return (
    <Flexbox
      className={styles.guide}
      align="center"
      justify={'center'}
      style={{ height: size.height, width: size.width }}
    >
      <InboxOutlined className={styles.icon} />
      <p className={styles.info}>{t('uploadTip')}</p>
      {extra ? <p className={styles.extra}>{extra}</p> : null}
    </Flexbox>
  );
};

export default EmptyGuide;
