import { SearchBar } from '@lobehub/ui';
import React, { memo } from 'react';

interface Props {
  className?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
  value?: string;
}

// eslint-disable-next-line react/display-name
export default memo((props: Props) => {
  const { value, onChange, style, className } = props;

  return (
    <SearchBar
      enableShortKey
      onChange={(e) => {
        if (onChange) onChange(e.target.value);
      }}
      placeholder="搜索"
      shortKey="f"
      value={value}
      style={style}
      className={className}
    />
  );
});
