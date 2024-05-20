import { Form, FormItem } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

import ViewerWithUpload from '@/panels/RolePanel/RoleEdit/Model/ViewerWithUpload';

import Touch from './Touch';

interface ModelProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
  `,
  left: css`
    flex: 2;
    margin-right: 12px;
    border-radius: ${token.borderRadius}px;
  `,

  right: css`
    flex: 1;

    max-height: 740px;
    padding: 12px;

    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
  `,
}));

const Model = (props: ModelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <Form>
      <div className={classNames(className, styles.container)} style={style}>
        <div className={styles.left}>
          <Touch />
        </div>
        <div className={styles.right}>
          <FormItem label={'模型预览'} name={'model'} desc="模型预览，可拖动模型文件以替换" />
          <ViewerWithUpload />
        </div>
      </div>
    </Form>
  );
};

export default Model;
