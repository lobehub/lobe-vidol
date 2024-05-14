import { Form, Input, message } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';
import React from 'react';

import { agentListSelectors, useAgentStore } from '@/store/agent';

import { useSyncSettings } from '../useSyncSetting';

const FormItem = Form.Item;

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
  footer: css`
    margin-top: 20px;
  `,
  form: css`
    display: flex;
  `,
  more: css`
    flex: 2;
    padding: 12px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px;
  `,
}));

const Info = (props: InfoProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const currentAgent = useAgentStore((s) => agentListSelectors.currentAgentItem(s), isEqual);
  const updateAgentConfig = useAgentStore((s) => s.updateAgentConfig);

  useSyncSettings(form);

  return (
    <Form
      form={form}
      initialValues={currentAgent}
      layout="horizontal"
      onFinish={() => {
        form.validateFields().then((values) => {
          updateAgentConfig(values);
          message.success('保存成功');
        });
      }}
      requiredMark={false}
    >
      <div className={classNames(className, styles.container)} style={style}>
        <div className={styles.form}>
          <div className={styles.config}>
            <FormItem
              name="systemRole"
              rules={[{ message: '请输入角色的系统设定', required: true }]}
            >
              <Input.TextArea
                autoSize={{ maxRows: 28, minRows: 28 }}
                placeholder="请输入角色的系统设定"
                showCount // TODO: 这里应该计算 Token 数量
              />
            </FormItem>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Info;
