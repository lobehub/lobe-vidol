import { Avatar } from '@lobehub/ui';
import { Form } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { debounce, isEqual } from 'lodash-es';
import React from 'react';

import HolographicCard from '@/components/HolographicCard';
import { useSyncSettings } from '@/panels/RolePanel/RoleEdit/useSyncSetting';
import { agentSelectors, useAgentStore } from '@/store/agent';

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
  const currentAgent = useAgentStore((s) => agentSelectors.currentAgentItem(s), isEqual);
  const updateAgentConfig = useAgentStore((s) => s.updateAgentConfig);

  useSyncSettings(form);

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
            <FormItem label={'头像'} name={['meta', 'avatar']}>
              <Avatar src={currentAgent?.meta.avatar} size={96} />
            </FormItem>
            <FormItem label={'立绘'} name={['meta', 'cover']}>
              <HolographicCard img={currentAgent?.meta.cover} />
            </FormItem>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Info;
