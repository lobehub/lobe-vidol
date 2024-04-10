import { sessionSelectors, useSessionStore } from '@/store/session';
import { FormFooter } from '@lobehub/ui';
import { Button, Form, Input, message } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

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
    padding: 12px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px;
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
              label={'系统设定'}
              name="systemRole"
              rules={[{ message: '请输入角色的系统设定', required: true }]}
            >
              <Input.TextArea
                autoSize={{ maxRows: 18, minRows: 18 }}
                placeholder="请输入角色的系统设定"
                showCount
              />
            </FormItem>
          </div>
        </div>
        <div className={styles.footer}>
          <FormFooter>
            <Button htmlType="button" onClick={() => {}}>
              取消
            </Button>
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
