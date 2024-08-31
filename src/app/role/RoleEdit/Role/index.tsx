import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

import SystemRole from './SystemRole';
import Templates from './Templates';

const useStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    flex-direction: column;
    padding: 0 16px;
  `,
}));

const Info = () => {
  const { styles } = useStyles();

  return (
    <div className={classNames(styles.container)}>
      <SystemRole />
      <Templates />
    </div>
  );
};

export default Info;
