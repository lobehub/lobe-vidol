import { useMarketStore } from '@/store/market';
import { Button } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo, useEffect } from 'react';

const useStyles = createStyles(({ css }) => ({
  actions: css`
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
  `,
  address: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  content: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  label: css`
    flex-shrink: 0;
  `,
}));

interface HeaderProps {
  className?: string;
  style?: React.CSSProperties;
}

const Header = (props: HeaderProps) => {
  const { style, className } = props;
  const [fetchDanceIndex, danceLoading] = useMarketStore((s) => [
    s.fetchDanceIndex,
    s.danceLoading,
  ]);
  const { styles } = useStyles();

  useEffect(() => {
    fetchDanceIndex();
  }, [fetchDanceIndex]);

  return (
    <div className={classNames(styles.content, className)} style={style}>
      <h2>舞蹈列表</h2>
      <Button loading={danceLoading} onClick={() => fetchDanceIndex()} type="primary">
        重新加载
      </Button>
    </div>
  );
};

export default memo(Header);
