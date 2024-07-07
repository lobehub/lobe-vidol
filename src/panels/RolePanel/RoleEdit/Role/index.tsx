import { Form } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

import SystemRole from '@/panels/RolePanel/RoleEdit/Role/SystemRole';

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
      <Form>
        <SystemRole />
      </Form>
    </div>
  );
};

export default Info;
