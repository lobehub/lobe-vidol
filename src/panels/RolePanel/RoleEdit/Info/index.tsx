import { Form, FormItem } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { COVER_COMPRESS_HEIGHT, COVER_COMPRESS_WIDTH } from '@/constants/common';
import { INPUT_WIDTH_L, INPUT_WIDTH_M } from '@/constants/token';
import CoverWithUpload from '@/panels/RolePanel/RoleEdit/Info/CoverWithUpload';
import Greeting from '@/panels/RolePanel/RoleEdit/Info/Greeting';
import ReadMe from '@/panels/RolePanel/RoleEdit/Info/ReadMe';
import RoleCategory from '@/panels/RolePanel/RoleEdit/Info/RoleCategory';
import RoleDescription from '@/panels/RolePanel/RoleEdit/Info/RoleDescription';
import RoleGender from '@/panels/RolePanel/RoleEdit/Info/RoleGender';
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
  const { t } = useTranslation('panel');

  return (
    <Form form={form} layout="horizontal">
      <div className={classNames(className, styles.container)} style={style}>
        <div className={styles.form}>
          <div className={styles.config}>
            <FormItem
              label={t('info.avatarLabel')}
              desc={t('info.avatarDescription')}
              name={'avatar'}
              required
            >
              <AvatarWithUpload />
            </FormItem>
            <FormItem
              label={t('info.nameLabel')}
              desc={t('info.nameDescription')}
              divider
              name={['name']}
              required
            >
              <RoleName style={{ width: INPUT_WIDTH_M }} />
            </FormItem>
            <FormItem
              label={t('info.descLabel')}
              desc={t('info.descDescription')}
              divider
              name={'description'}
              required
            >
              <RoleDescription style={{ width: INPUT_WIDTH_L }} />
            </FormItem>
            <FormItem
              label={t('info.greetLabel')}
              desc={t('info.greetDescription')}
              name="greeting"
              divider
              required
            >
              <Greeting style={{ width: INPUT_WIDTH_L }} />
            </FormItem>
            <FormItem
              label={t('info.genderLabel')}
              desc={t('info.genderDescription')}
              divider
              name={['gender']}
            >
              <RoleGender style={{ width: INPUT_WIDTH_M }} />
            </FormItem>
            <FormItem
              label={t('info.categoryLabel')}
              desc={t('info.categoryDescription')}
              divider
              name={['category']}
            >
              <RoleCategory style={{ width: INPUT_WIDTH_M }} />
            </FormItem>
            <FormItem
              label={t('info.readmeLabel')}
              desc={t('info.readmeDescription')}
              name={'readme'}
              divider
            >
              <ReadMe style={{ width: INPUT_WIDTH_L }} />
            </FormItem>
          </div>
          <div className={styles.more}>
            <FormItem
              label={t('info.coverLabel')}
              desc={t('info.coverDescription', {
                width: COVER_COMPRESS_WIDTH,
                height: COVER_COMPRESS_HEIGHT,
              })}
              name={'cover'}
              required
            />
            <CoverWithUpload />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Info;
