import { Form } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

import ViewerWithUpload from './ViewerWithUpload';

interface ModelProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
    width: 100%;
    height: 100%;
  `,
  left: css`
    flex: 2;
    margin-right: 12px;
    border-radius: ${token.borderRadius}px;
  `,

  right: css`
    flex: 1;
    max-height: 740px;
  `,
  description: css`
    font-size: ${token.fontSizeSM}px;
    color: ${token.colorTextDescription};
  `,
}));

const Model = (props: ModelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <Form>
      <div className={classNames(className, styles.container)} style={style}>
        <ViewerWithUpload />
      </div>
    </Form>
  );
};

export default Model;
