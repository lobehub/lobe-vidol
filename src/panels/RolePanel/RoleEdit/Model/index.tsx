import { Form, FormItem } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
  `,
  description: css`
    font-size: ${token.fontSizeSM}px;
    color: ${token.colorTextDescription};
  `,
}));

const Model = (props: ModelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const { t } = useTranslation('panel');

  return (
    <Form>
      <div className={classNames(className, styles.container)} style={style}>
        <div className={styles.left}>
          <Touch />
        </div>
        <div className={styles.right}>
          <FormItem label={t('info.modelLabel')} name={'model'} desc={t('info.modelDescription')} />
          <ViewerWithUpload />
        </div>
      </div>
    </Form>
  );
};

export default Model;
