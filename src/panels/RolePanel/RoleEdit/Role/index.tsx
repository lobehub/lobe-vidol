import { Form, FormItem } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

import SystemRole from '@/panels/RolePanel/RoleEdit/Role/SystemRole';

interface InfoProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css, token }) => ({
  config: css`
    padding: 12px;
    border-radius: ${token.borderRadius}px;
  `,
  container: css`
    display: flex;
    flex-direction: column;
  `,

  form: css`
    display: flex;
  `,
}));

const Info = (props: InfoProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <Form>
      <div className={classNames(className, styles.container)} style={style}>
        <div className={styles.config}>
          <FormItem
            name="systemRole"
            divider
            label="系统角色设定"
            desc="角色的背景设定，在与角色聊天时会发送给模型"
          ></FormItem>
          <SystemRole />
        </div>
      </div>
    </Form>
  );
};

export default Info;
