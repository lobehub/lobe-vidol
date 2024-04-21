import { FormFooter } from '@lobehub/ui';
import { Button, Form, Input, message } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

import HolographicCard from '@/components/HolographicCard';
import { sessionSelectors, useSessionStore } from '@/store/session';

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

    border: 1px solid ${token.colorBorderSecondary};
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
  const [currentAgent, updateAgentConfig] = useSessionStore((s) => [
    sessionSelectors.currentAgent(s),
    s.updateAgentConfig,
  ]);

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
              label={'说明'}
              name={['meta', 'readme']}
              rules={[{ message: '请输入角色说明', required: true }]}
            >
              <Input.TextArea
                autoSize={{ maxRows: 11, minRows: 11 }}
                placeholder="请输入角色说明"
                showCount
              />
            </FormItem>
          </div>
          <div className={styles.more}>
            <HolographicCard img={currentAgent?.meta.cover} />
          </div>
        </div>
        <div className={styles.footer}>
          <FormFooter>
            <Button htmlType="button">取消</Button>
            <Button htmlType="submit" type="primary">
              应用
            </Button>
          </FormFooter>
        </div>
      </div>
    </Form>
  );
};

export default Info;
