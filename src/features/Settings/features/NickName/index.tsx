import { Input } from 'antd';
import { isEqual } from 'lodash-es';
import React, { CSSProperties, memo } from 'react';

import { MAX_NAME_LENGTH } from '@/constants/common';
import { useSettingStore } from '@/store/setting';

interface Props {
  style?: CSSProperties;
}

const NickName = memo<Props>((props) => {
  const { style } = props;
  const [nickName, setNickName] = useSettingStore((s) => [s.nickName, s.setNickName], isEqual);

  return (
    <Input
      style={style}
      defaultValue={nickName}
      placeholder={'请输入昵称'}
      maxLength={MAX_NAME_LENGTH}
      showCount
      onChange={(e) => {
        setNickName(e.target.value);
      }}
    />
  );
});

export default NickName;
