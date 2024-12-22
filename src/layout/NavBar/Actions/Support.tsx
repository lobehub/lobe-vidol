/* eslint-disable @next/next/no-img-element */
import { ActionIcon } from '@lobehub/ui';
import { Popover } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import { Coffee } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles(({ token }) => ({
  supportContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  qrCode: {
    width: '200px',
    height: '200px',
  },
  kofiLink: {
    'color': token.colorPrimary,
    'textDecoration': 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const Support: React.FC = () => {
  const { styles } = useStyles();
  const { t } = useTranslation('common');
  const theme = useTheme();

  const content = (
    <div className={styles.supportContent}>
      <img
        className={styles.qrCode}
        src="https://r2.vidol.chat/common/wechat.jpg"
        alt={t('support.wechatQRCode')}
      />
      <a href="https://ko-fi.com/Q5Q214AGLQ" target="_blank" rel="noreferrer">
        <img
          height="36"
          style={{ border: '0px', height: '36px' }}
          src="https://storage.ko-fi.com/cdn/kofi5.png?v=3"
          alt="Buy Me a Coffee at ko-fi.com"
        />
      </a>
    </div>
  );

  return (
    <Popover content={content} title={t('support.title')} trigger="hover" placement="right">
      <ActionIcon
        icon={Coffee}
        key="coffee"
        title={`♥️ ${t('support.tooltip')}`}
        style={{ border: `1px solid ${theme.colorFillSecondary}` }}
      />
    </Popover>
  );
};

export default Support;
