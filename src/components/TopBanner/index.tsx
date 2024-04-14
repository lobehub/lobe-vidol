import { GridBackground } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import React, { memo } from 'react';
import { Center } from 'react-layout-kit';

const useStyles = createStyles(({ css }) => ({
  background: css`
    width: 90%;
    margin: -24px 0 -12px;
  `,
  title: css`
    z-index: 2;
    margin-top: 24px;
    font-size: 36px;
    font-weight: 800;
  `,
}));

interface TopBannerProps {
  className?: string;
  style?: React.CSSProperties;
  title: string;
}

const TopBanner = (props: TopBannerProps) => {
  const { style, className, title = '' } = props;
  const { theme, styles } = useStyles();

  return (
    <Center className={className} style={style}>
      <h1 className={styles.title}>{title}</h1>
      <GridBackground animation className={styles.background} colorFront={theme.colorText} random />
    </Center>
  );
};

export default memo(TopBanner);
