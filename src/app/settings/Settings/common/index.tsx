import { Form, FormGroup, FormItem } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { Monitor, Settings2, User2Icon } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ClearSession from '@/features/Actions/ClearSession';
import ResetConfig from '@/features/Actions/ResetConfig';

import AvatarWithUpload from './AvatarWithUpload';
import BackgroundEffect from './BackgroundEffect';
import LocaleSetting from './LocaleSetting';
import NickName from './NickName';
import ThemeSwatchesNeutral from './ThemeSwatchesNeutral';
import ThemeSwatchesPrimary from './ThemeSwatchesPrimary';

interface CommonConfigProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css }) => ({
  config: css`
    display: flex;
    flex-grow: 1;
    justify-content: center;
  `,
  effect: css`
    width: 160px;
    margin-bottom: 0;
  `,
}));

const CommonConfig = (props: CommonConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const { t } = useTranslation('settings');
  return (
    <div className={classNames(styles.config, className)} style={style}>
      <Form style={{ display: 'flex', flexGrow: 1 }}>
        <FormGroup icon={User2Icon} title={t('common.chat.title')}>
          <FormItem
            desc={t('common.chat.avatar.desc')}
            divider
            label={t('common.chat.avatar.title')}
            name={'avatar'}
          >
            <AvatarWithUpload />
          </FormItem>
          <FormItem
            desc={t('common.chat.nickName.desc')}
            divider
            label={t('common.chat.nickName.desc')}
            name={'nickName'}
          >
            <NickName />
          </FormItem>
        </FormGroup>
        <FormGroup icon={Settings2} title={t('common.theme.title')}>
          <FormItem
            divider
            label={t('common.theme.locale.title')}
            desc={t('common.theme.locale.desc')}
            name={'localeSetting'}
          >
            <LocaleSetting style={{ width: '200px' }} />
          </FormItem>
          <FormItem
            desc={t('common.theme.primaryColor.desc')}
            divider
            label={t('common.theme.primaryColor.title')}
            name={'primaryColor'}
          >
            <ThemeSwatchesPrimary />
          </FormItem>
          <FormItem
            desc={t('common.theme.neutralColor.desc')}
            divider
            label={t('common.theme.neutralColor.title')}
            name={'neutralColor'}
          >
            <ThemeSwatchesNeutral />
          </FormItem>
          <FormItem
            desc={t('common.theme.backgroundEffect.desc')}
            divider
            label={t('common.theme.backgroundEffect.title')}
            name={'backgroundEffect'}
          >
            <BackgroundEffect />
          </FormItem>
        </FormGroup>
        <FormGroup icon={Monitor} title={t('common.system.title')}>
          <FormItem
            desc={t('common.system.clear.desc')}
            divider
            label={t('common.system.clear.title')}
          >
            <ClearSession />
          </FormItem>
          <FormItem
            desc={t('common.system.reset.desc')}
            divider
            label={t('common.system.reset.title')}
          >
            <ResetConfig />
          </FormItem>
        </FormGroup>
      </Form>
    </div>
  );
};

export default CommonConfig;
