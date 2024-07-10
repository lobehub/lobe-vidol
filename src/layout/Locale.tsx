'use client';

import { ConfigProvider } from 'antd';
import { PropsWithChildren, memo, useEffect, useState } from 'react';

import { createI18nNext } from '@/locales/create';
import { isOnServerSide } from '@/utils/env';
import { getAntdLocale } from '@/utils/locale';

interface LocaleLayoutProps extends PropsWithChildren {
  antdLocale?: any;
  defaultLang?: string;
}

const Locale = memo<LocaleLayoutProps>(({ children, defaultLang, antdLocale }) => {
  const [i18n] = useState(createI18nNext(defaultLang));
  const [lang, setLang] = useState(defaultLang);
  const [locale, setLocale] = useState(antdLocale);

  // if run on server side, init i18n instance everytime
  if (isOnServerSide) {
    i18n.init().then(() => {
      console.debug('inited server.');
    });
  } else {
    // if on browser side, init i18n instance only once
    if (!i18n.instance.isInitialized)
      // console.debug('locale', lang);
      i18n.init().then(() => {
        console.debug('inited client');
      });
  }

  // handle i18n instance language change
  useEffect(() => {
    const handleLang = async (lng: string) => {
      setLang(lng);

      if (lang === lng) return;

      const newLocale = await getAntdLocale(lng);
      setLocale(newLocale);
    };

    i18n.instance.on('languageChanged', handleLang);
    return () => {
      i18n.instance.off('languageChanged', handleLang);
    };
  }, [i18n, lang]);

  return <ConfigProvider locale={locale}>{children}</ConfigProvider>;
});

Locale.displayName = 'Locale';

export default Locale;
