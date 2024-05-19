import { Form, FormItem } from '@lobehub/ui';
import { Input } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { debounce } from 'lodash-es';
import React from 'react';

import {
  MAX_DESCRIPTION_LENGTH,
  MAX_GREETING_LENGTH,
  MAX_NAME_LENGTH,
  MAX_README_LENGTH,
} from '@/constants/common';
import { INPUT_WIDTH_L } from '@/constants/token';
import { useAgentStore } from '@/store/agent';

import { useSyncSettings } from '../useSyncSetting';
import AvatarWithUpload from './AvatarWithUpload';

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
  const updateAgentConfig = useAgentStore((s) => s.updateAgentConfig);

  useSyncSettings(form);

  return (
    <Form
      form={form}
      onValuesChange={debounce(updateAgentConfig, 100)}
      layout="horizontal"
      requiredMark={false}
    >
      <div className={classNames(className, styles.container)} style={style}>
        <div className={styles.form}>
          <div className={styles.config}>
            <FormItem desc={'自定义头像'} label={'头像'} name={'avatar'}>
              <AvatarWithUpload />
            </FormItem>
            <FormItem
              label={'名称'}
              desc={'角色名称，与角色聊天时的称呼'}
              divider
              name={['meta', 'name']}
              required
              rules={[{ message: '请输入角色名称', required: true }]}
            >
              <Input placeholder="请输入角色名称" maxLength={MAX_NAME_LENGTH} showCount />
            </FormItem>
            <FormItem
              label={'描述'}
              divider
              desc={'角色描述，用于角色的简单介绍'}
              name={['meta', 'description']}
              rules={[{ message: '请输入角色描述', required: true }]}
            >
              <Input
                placeholder="请输入角色描述"
                maxLength={MAX_DESCRIPTION_LENGTH}
                showCount
                style={{ width: INPUT_WIDTH_L }}
              />
            </FormItem>
            <FormItem
              label={'招呼'}
              desc={'与角色初次聊天时的招呼用语'}
              divider
              name="greeting"
              rules={[{ message: '请输入角色与你打招呼时的用语', required: true }]}
            >
              <Input.TextArea
                autoSize={{ minRows: 2, maxRows: 4 }}
                placeholder="请输入角色与你打招呼时的用语"
                style={{ width: INPUT_WIDTH_L }}
                showCount
                maxLength={MAX_GREETING_LENGTH}
              />
            </FormItem>
            <FormItem
              label={'角色说明'}
              name={['meta', 'readme']}
              divider
              desc="角色的说明文件，用于发现页展示角色的详细说明"
            >
              <Input.TextArea
                autoSize={{ minRows: 6, maxRows: 12 }}
                placeholder="请输入角色说明"
                showCount
                maxLength={MAX_README_LENGTH}
                style={{ width: '480px' }}
              />
            </FormItem>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Info;
