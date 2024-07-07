import { Form } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

import SystemRole from '@/panels/RolePanel/RoleEdit/Role/SystemRole';

interface InfoProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    flex-direction: column;
  `,
}));

const Info = (props: InfoProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <div className={classNames(className, styles.container)} style={style}>
      <Form>
        <SystemRole />
      </Form>
    </div>
  );
};

export default Info;
