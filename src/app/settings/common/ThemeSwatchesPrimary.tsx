import {
  PrimaryColors,
  Swatches,
  findCustomThemeName,
  primaryColors,
  primaryColorsSwatches,
} from '@lobehub/ui';
import { memo } from 'react';

import { useSettingStore } from '@/store/setting';

const ThemeSwatchesPrimary = memo(() => {
  const [primaryColor, setPrimaryColor] = useSettingStore((s) => [
    s.config.primaryColor,
    s.setPrimaryColor,
  ]);

  const handleSelect = (v: any) => {
    const name = findCustomThemeName('primary', v) as PrimaryColors;
    // @ts-ignore
    setPrimaryColor(name || '');
  };

  return (
    <Swatches
      activeColor={primaryColor ? primaryColors[primaryColor] : undefined}
      colors={primaryColorsSwatches}
      onSelect={handleSelect}
    />
  );
});

export default ThemeSwatchesPrimary;
