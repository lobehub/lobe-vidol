import React from 'react';

import { useStyles } from './style';

interface Props {
  systemRole?: string;
}

export default (props: Props) => {
  const { styles } = useStyles();
  const { systemRole = [] } = props;

  return (
    <div className={styles.systemRole}>
      <div className={styles.desc}>{systemRole}</div>
    </div>
  );
};
