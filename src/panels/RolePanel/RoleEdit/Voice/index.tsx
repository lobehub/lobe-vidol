import { Form, FormItem } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

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

  return (
    <Form layout="horizontal" preserve={false} requiredMark={false}>
      <div className={classNames(className, styles.container)} style={style}>
        <div className={styles.config}>
          <FormItem label={'语音引擎'} name={'engine'} desc="语音合成引擎，建议优先选择 Edge ">
            <TTSEngine style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
          <FormItem
            label={'语言'}
            name={'locale'}
            divider
            desc="语音合成的语种，当前仅支持最常见的几种语言，如有需要请联系"
          >
            <TTSLocale style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
          <FormItem label={'语音'} divider name={'voice'} desc="根据引擎和语种不同">
            <TTSVoice style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
          <FormItem label={'语速'} name={'speed'} desc="控制语速，取值范围 0 ~ 3，默认为 1" divider>
            <TTSSpeed style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
          <FormItem label={'音调'} name={'pitch'} desc="控制音调，取值范围 0 ~ 2，默认为 1" divider>
            <TTSPitch style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
          <FormItem label={'试听'} desc={`试听文案根据语言不同`} divider>
            <TTSPlay style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
        </div>
      </div>
    </Form>
  );
};
