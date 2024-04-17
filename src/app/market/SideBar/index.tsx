import { createStyles, useResponsive } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import MarketList, { MarketListProps } from './MarketList';

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    border-inline-end: 1px solid ${token.colorBorder};
  `,
  logo: css`
    fill: ${token.colorText};
  `,
  top: css`
    font-size: 20px;
    font-weight: bold;
  `,
}));

const SideBar = memo<MarketListProps>(({ activeTab }) => {
  const { styles } = useStyles();

  const { mobile } = useResponsive();

  return (
    <Flexbox className={styles.container} width={280}>
      <Flexbox className={styles.top} padding={16}>
        发现
      </Flexbox>
      <Flexbox gap={8} style={{ paddingInline: 8 }}>
        <MarketList activeTab={activeTab} mobile={mobile} />
      </Flexbox>
    </Flexbox>
  );
});

export default SideBar;
