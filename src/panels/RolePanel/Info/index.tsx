import { sessionSelectors, useSessionStore } from '@/store/session';
import { Avatar, FormFooter } from '@lobehub/ui';
import { Button, Form, Input, Upload, message } from 'antd';
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

  const { cover, avatar } = currentAgent?.meta || {};

  // const uploadButton = (
  //   <div>
  //     {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
  //     <div style={{ marginTop: 8 }}>上传</div>
  //   </div>
  // );

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
            <FormItem label={'头像'} name={['meta', 'avatar']}>
              <Upload
                showUploadList={false}
                // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                // beforeUpload={beforeUpload}
                // onChange={handleChange}
              >
                <Avatar shape="circle" size={96} src={avatar} />
              </Upload>
            </FormItem>
            <FormItem label={'封面'} name={['meta', 'cover']}>
              <Upload
                showUploadList={false}
                // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                // beforeUpload={beforeUpload}
                // onChange={handleChange}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="example" src={cover} width={200} />
              </Upload>
            </FormItem>
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
