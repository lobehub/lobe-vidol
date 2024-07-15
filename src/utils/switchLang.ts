import { changeLanguage } from 'i18next';

import { LocaleMode } from '@/types/locale';

export const switchLang = (locale: LocaleMode) => {
  const lang = locale === 'auto' ? navigator.language : locale;

  changeLanguage(lang).then(() => {
    document.documentElement.lang = lang;
    // 刷新系统 https://github.com/lobehub/lobe-chat/issues/2724
    // window.location.reload();
  });
};
