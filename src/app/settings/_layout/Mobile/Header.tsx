'use client';

import { MobileNavBar, MobileNavBarTitle } from '@lobehub/ui';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { mobileHeaderSticky } from '@/styles/mobileHeader';

import { useActiveSettingsKey } from '../../hooks/useActiveSettingsKey';

const Header = memo(() => {
  const { t } = useTranslation('setting');

  const router = useRouter();
  const activeSettingsKey = useActiveSettingsKey();

  return (
    <MobileNavBar
      center={
        <MobileNavBarTitle
          title={
            <Flexbox align={'center'} gap={8} horizontal>
              <span style={{ lineHeight: 1.2 }}> {t(`tab.${activeSettingsKey}`)}</span>
            </Flexbox>
          }
        />
      }
      onBackClick={() => {
        router.back();
      }}
      showBackButton
      style={mobileHeaderSticky}
    />
  );
});

export default Header;
