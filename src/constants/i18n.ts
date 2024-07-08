// default language
export const DEFAULT_LANG = 'en-US';
// locale cookie
export const LOBE_LOCALE_COOKIE = 'LOBE_LOCALE';
// cookie cache days
export const COOKIE_CACHE_DAYS = 30;
// debug mode
export const getDebugConfig = () => ({
  // developer debug mode
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEVELOPER_DEBUG === '1',

  // i18n debug mode
  I18N_DEBUG: process.env.NEXT_PUBLIC_I18N_DEBUG === '1',
  I18N_DEBUG_BROWSER: process.env.NEXT_PUBLIC_I18N_DEBUG_BROWSER === '1',
  I18N_DEBUG_SERVER: process.env.NEXT_PUBLIC_I18N_DEBUG_SERVER === '1',
});
