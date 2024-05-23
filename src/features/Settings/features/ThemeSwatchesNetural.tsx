import {
  NeutralColors,
  Swatches,
  findCustomThemeName,
  neutralColors,
  neutralColorsSwatches,
} from '@lobehub/ui';
import { memo } from 'react';

import { useSettingStore } from '@/store/setting';

const ThemeSwatchesNeutral = memo(() => {
  const [neutralColor, setNeutralColor] = useSettingStore((s) => [
    s.config.neutralColor,
    s.setNeutralColor,
  ]);

  const handleSelect = (v: any) => {
    const name = findCustomThemeName('neutral', v) as NeutralColors;
    setNeutralColor(name || '');
  };

  return (
    <Swatches
      activeColor={neutralColor ? neutralColors[neutralColor] : undefined}
      colors={neutralColorsSwatches}
      onSelect={handleSelect}
    />
  );
});

export default ThemeSwatchesNeutral;
