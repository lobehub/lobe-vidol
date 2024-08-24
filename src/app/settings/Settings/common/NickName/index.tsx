import { Input } from 'antd';
import { isEqual } from 'lodash-es';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { MAX_NAME_LENGTH } from '@/constants/common';
import { useSettingStore } from '@/store/setting';

interface Props {
  style?: CSSProperties;
}

const NickName = memo<Props>((props) => {
  const { style } = props;
  const { t } = useTranslation('settings');

  const [nickName, setNickName] = useSettingStore(
    (s) => [s.config.nickName, s.setNickName],
    isEqual,
  );

  return (
    <Input
      style={style}
      value={nickName}
      placeholder={t('common.chat.nickName.placeholder')}
      maxLength={MAX_NAME_LENGTH}
      showCount
      onChange={(e) => {
        setNickName(e.target.value);
      }}
    />
  );
});

export default NickName;
