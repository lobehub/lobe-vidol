import classNames from 'classnames';
import React from 'react';

import { useStyles } from './style';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  systemRole?: string;
}

export default (props: Props) => {
  const { styles } = useStyles();
  const { systemRole = [], className, style } = props;

  return (
    <div className={classNames(styles.systemRole, className)} style={style}>
      <div className={styles.desc}>{systemRole}</div>
    </div>
  );
};
