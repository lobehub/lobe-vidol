import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo } from 'react';
import ActionList from './ActionList';
import SideBar from './SideBar';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    position: relative;

    display: flex;

    width: 100%;
    min-height: 500px;

    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
  `,
}));

interface TouchProps {
  className?: string;
  style?: React.CSSProperties;
}

const Touch = (props: TouchProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <div className={classNames(className, styles.container)} style={style}>
      <SideBar />
      <ActionList />
    </div>
  );
};

export default memo(Touch);
