import { Form, Input } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { debounce, isEqual } from 'lodash-es';
import React, { useEffect } from 'react';

import { agentListSelectors, useAgentStore } from '@/store/agent';

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
  `,
}));

const Info = (props: InfoProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const currentAgent = useAgentStore((s) => agentListSelectors.currentAgentItem(s), isEqual);
  const updateAgentConfig = useAgentStore((s) => s.updateAgentConfig);

  useEffect(() => {
    form.setFieldsValue(currentAgent);
  }, [currentAgent, form]);

  return (
    <Form
      form={form}
      initialValues={currentAgent}
      onValuesChange={debounce(updateAgentConfig, 100)}
      layout="horizontal"
      requiredMark={false}
    >
      <div className={classNames(className, styles.container)} style={style}>
        <div className={styles.form}>
          <div className={styles.config}>
            <FormItem
              label={'名称'}
              name={['meta', 'name']}
              required
              rules={[{ message: '请输入角色名称', required: true }]}
            >
              <Input placeholder="请输入角色名称" />
            </FormItem>
            <FormItem
              label={'描述'}
              name={['meta', 'description']}
              rules={[{ message: '请输入角色描述', required: true }]}
            >
              <Input placeholder="请输入角色描述" />
            </FormItem>
            <FormItem
              label={'招呼'}
              name="greeting"
              rules={[{ message: '请输入角色与你打招呼时的用语', required: true }]}
            >
              <Input.TextArea
                autoSize={{ maxRows: 6, minRows: 6 }}
                placeholder="请输入角色与你打招呼时的用语"
              />
            </FormItem>
            <FormItem
              label={'说明'}
              name={['meta', 'readme']}
              rules={[{ message: '请输入角色说明', required: true }]}
            >
              <Input.TextArea
                autoSize={{ maxRows: 15, minRows: 15 }}
                placeholder="请输入角色说明"
                showCount
              />
            </FormItem>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Info;
