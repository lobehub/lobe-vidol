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
  const { t } = useTranslation('common');
  t('words.');
  return (
    <div className={classNames(styles.config, className)} style={style}>
      <Form style={{ display: 'flex', flexGrow: 1 }}>
        <FormGroup icon={User2Icon} title={t('words.chatSetting')}>
          <FormItem desc={t('words.DIYAvatar')} divider label={t('words.avatar')} name={'avatar'}>
            <AvatarWithUpload />
          </FormItem>
          <FormItem
            desc={t('words.DIYNickname')}
            divider
            label={t('words.nickname')}
            name={'nickName'}
          >
            <NickName />
          </FormItem>
        </FormGroup>
        <FormGroup icon={Settings2} title={t('words.topicSetting')}>
          <FormItem divider label={t('words.localeSetting')} name={'localeSetting'}>
            <LocaleSetting style={{ width: '200px' }} />
          </FormItem>
          <FormItem
            desc={t('words.DIYTopicColor')}
            divider
            label={t('words.topicColor')}
            name={'primaryColor'}
          >
            <ThemeSwatchesPrimary />
          </FormItem>
          <FormItem
            desc={t('words.DIYColor')}
            divider
            label={t('words.midColor')}
            name={'neutralColor'}
          >
            <ThemeSwatchesNeutral />
          </FormItem>
          <FormItem
            desc={t('words.DIYBackgroundEffect')}
            divider
            label={t('words.backgroundEffect')}
            name={'backgroundEffect'}
          >
            <BackgroundEffect />
          </FormItem>
        </FormGroup>
        <FormGroup icon={Monitor} title={t('words.systemSetting')}>
          <FormItem
            desc={t('words.clearAllSessionDesc')}
            divider
            label={t('words.clearAllSession')}
          >
            <ClearSession />
          </FormItem>
          <FormItem
            desc={t('words.resetSystemSettingDesc')}
            divider
            label={t('words.resetSystemSetting')}
          >
            <ResetConfig />
          </FormItem>
        </FormGroup>
      </Form>
    </div>
  );
};

export default CommonConfig;
