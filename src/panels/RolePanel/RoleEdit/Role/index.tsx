import { Form, FormItem } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';
import React from 'react';

import { INPUT_WIDTH_L, INPUT_WIDTH_XL } from '@/constants/token';
import Greeting from '@/panels/RolePanel/RoleEdit/Role/Greeting';
import SystemRole from '@/panels/RolePanel/RoleEdit/Role/SystemRole';
import { agentSelectors, useAgentStore } from '@/store/agent';

import { useSyncSettings } from '../useSyncSetting';

interface InfoProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css, token }) => ({
  config: css`
    flex: 3;
    margin-right: 12px;
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
  const [form] = Form.useForm();
  const currentAgent = useAgentStore((s) => agentSelectors.currentAgentItem(s), isEqual);

  useSyncSettings(form);

  return (
    <Form form={form} initialValues={currentAgent} layout="horizontal">
      <div className={classNames(className, styles.container)} style={style}>
        <div className={styles.form}>
          <div className={styles.config}>
            <FormItem label={'招呼'} desc={'与角色初次聊天时的招呼用语'} name="greeting">
              <Greeting style={{ width: INPUT_WIDTH_L }} />
            </FormItem>
            <FormItem
              name="systemRole"
              divider
              label="系统角色设定"
              desc="角色的背景设定，在与角色聊天时会发送给模型"
            >
              <SystemRole style={{ width: INPUT_WIDTH_XL }} />
            </FormItem>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Info;
