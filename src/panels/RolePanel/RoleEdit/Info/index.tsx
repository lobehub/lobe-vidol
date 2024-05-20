import { Form, FormItem } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

import { COVER_COMPRESS_HEIGHT, COVER_COMPRESS_WIDTH } from '@/constants/common';
import { INPUT_WIDTH_L, INPUT_WIDTH_M } from '@/constants/token';
import CoverWithUpload from '@/panels/RolePanel/RoleEdit/Info/CoverWithUpload';
import Greeting from '@/panels/RolePanel/RoleEdit/Info/Greeting';
import ReadMe from '@/panels/RolePanel/RoleEdit/Info/ReadMe';
import RoleDescription from '@/panels/RolePanel/RoleEdit/Info/RoleDescription';
import RoleName from '@/panels/RolePanel/RoleEdit/Info/RoleName';

import AvatarWithUpload from './AvatarWithUpload';

interface InfoProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css, token }) => ({
  config: css`
    flex: 2;
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
  more: css`
    flex: 1;
    padding: 12px;
  `,
  cover: css`
    padding: 16px 0;
  `,
  name: css``,
  description: css`
    font-size: 12px;
    color: ${token.colorTextDescription};
  `,
}));

const Info = (props: InfoProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="horizontal" requiredMark={false}>
      <div className={classNames(className, styles.container)} style={style}>
        <div className={styles.form}>
          <div className={styles.config}>
            <FormItem desc={'自定义头像，点击头像自定义上传'} label={'头像'} name={'avatar'}>
              <AvatarWithUpload />
            </FormItem>
            <FormItem label={'名称'} desc={'角色名称，与角色聊天时的称呼'} divider name={['name']}>
              <RoleName style={{ width: INPUT_WIDTH_M }} />
            </FormItem>
            <FormItem label={'招呼'} desc={'与角色初次聊天时的招呼用语'} name="greeting" divider>
              <Greeting style={{ width: INPUT_WIDTH_L }} />
            </FormItem>
            <FormItem
              label={'描述'}
              divider
              desc={'角色描述，用于角色的简单介绍'}
              name={'description'}
            >
              <RoleDescription style={{ width: INPUT_WIDTH_L }} />
            </FormItem>
            <FormItem
              label={'角色说明'}
              name={'readme'}
              divider
              desc="角色的说明文件，用于发现页展示角色的详细说明"
            >
              <ReadMe style={{ width: INPUT_WIDTH_L }} />
            </FormItem>
          </div>
          <div className={styles.more}>
            <FormItem
              label={'封面'}
              name={'cover'}
              desc={`用于发现页展示角色，推荐尺寸 ${COVER_COMPRESS_WIDTH} * ${COVER_COMPRESS_HEIGHT}`}
            />
            <CoverWithUpload />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Info;
