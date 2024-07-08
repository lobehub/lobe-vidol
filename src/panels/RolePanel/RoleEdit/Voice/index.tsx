import { Form, FormItem } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { INPUT_WIDTH_M } from '@/constants/token';
import TTSEngine from '@/panels/RolePanel/RoleEdit/Voice/TTSEngine';
import TTSLocale from '@/panels/RolePanel/RoleEdit/Voice/TTSLocale';
import TTSPitch from '@/panels/RolePanel/RoleEdit/Voice/TTSPitch';
import TTSPlay from '@/panels/RolePanel/RoleEdit/Voice/TTSPlay';
import TTSSpeed from '@/panels/RolePanel/RoleEdit/Voice/TTSSpeed';
import TTSVoice from '@/panels/RolePanel/RoleEdit/Voice/TTSVoice';

interface ConfigProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css, token }) => ({
  audio: css`
    margin-top: 20px;
  `,
  config: css`
    padding: 12px;
    border-radius: ${token.borderRadius}px;
  `,
  container: css`
    display: flex;
    flex-direction: column;
  `,
}));

export default (props: ConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const { t } = useTranslation('panel');

  return (
    <Form layout="horizontal" preserve={false} requiredMark={false}>
      <div className={classNames(className, styles.container)} style={style}>
        <div className={styles.config}>
          <FormItem label={t('tts.engineLabel')} name={'engine'} desc={t('tts.engineDescription')}>
            <TTSEngine style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
          <FormItem
            label={t('tts.localeLabel')}
            desc={t('tts.localeDescription')}
            name={'locale'}
            divider
          >
            <TTSLocale style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
          <FormItem
            label={t('tts.voiceLabel')}
            desc={t('tts.voiceDescription')}
            divider
            name={'voice'}
          >
            <TTSVoice style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
          <FormItem
            label={t('tts.speedLabel')}
            desc={t('tts.speedDescription')}
            name={'speed'}
            divider
          >
            <TTSSpeed style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
          <FormItem
            label={t('tts.pitchLabel')}
            desc={t('tts.pitchDescription')}
            name={'pitch'}
            divider
          >
            <TTSPitch style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
          <FormItem label={t('tts.audition')} desc={t('tts.auditionDescription')} divider>
            <TTSPlay style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
        </div>
      </div>
    </Form>
  );
};
