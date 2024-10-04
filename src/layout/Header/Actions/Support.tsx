/* eslint-disable @next/next/no-img-element */
import { ActionIcon } from '@lobehub/ui';
import { Popover } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import { Coffee } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles(({ token, css }) => ({
  supportContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  icon: css`
    svg {
      fill: ${token.colorTextDescription};
    }

    &:hover {
      svg {
        fill: ${token.colorText};
      }
    }
  `,
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
      <a
        className={styles.kofiLink}
        href="https://ko-fi.com/your-kofi-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        ♥️ {`${t('support.kofiSupport')}`}
      </a>
    </div>
  );

  return (
    <Popover content={content} title={t('support.title')} trigger="hover" placement="bottom">
      <ActionIcon
        icon={Coffee}
        className={styles.icon}
        key="coffee"
        title={`♥️ ${t('support.tooltip')}`}
        style={{ border: `1px solid ${theme.colorFillSecondary}` }}
      />
    </Popover>
  );
};

export default Support;
