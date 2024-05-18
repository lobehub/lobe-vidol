import {
  PrimaryColors,
  Swatches,
  findCustomThemeName,
  primaryColors,
  primaryColorsSwatches,
} from '@lobehub/ui';
import { memo } from 'react';

import { useConfigStore } from '@/store/config';

const ThemeSwatchesPrimary = memo(() => {
  const [primaryColor, setConfig] = useConfigStore((s) => [s.config.primaryColor, s.setConfig]);

  const handleSelect = (v: any) => {
    const name = findCustomThemeName('primary', v) as PrimaryColors;
    setConfig({ primaryColor: name || '' });
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
