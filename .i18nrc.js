const { defineConfig } = require('@lobehub/i18n-cli');

module.exports = defineConfig({
  entry: 'locales/zh-CN',
  entryLocale: 'zh-CN',
  output: 'locales',
  outputLocales: [
    'bg-BG',
    'zh-TW',
    'en-US',
    'ru-RU',
    'ja-JP',
    'ko-KR',
    'fr-FR',
    'tr-TR',
    'es-ES',
    'pt-BR',
    'de-DE',
    'it-IT',
    'nl-NL',
    'pl-PL',
    'vi-VN',
  ],
  temperature: 0,
  modelName: 'gpt-4o-mini',
  splitToken: 2048,
  experimental: {
    jsonMode: true,
  },
  // 后续说明文档、技术文档等所需的国际化配置（暂时不需要）
  markdown: {
    reference: '你需要保持 md 的格式，输出文本不需要包裹任何代码块语法',
    entry: ['./README.zh-CN.md', './contributing/**/*.zh-CN.md', './docs/**/*.zh-CN.mdx'],
    entryLocale: 'zh-CN',
    outputLocales: ['en-US'],
    exclude: ['./contributing/_Sidebar.md', './contributing/_Footer.md', './contributing/Home.md'],
    outputExtensions: (locale, { filePath }) => {
      if (filePath.includes('.mdx')) {
        if (locale === 'en-US') return '.mdx';
        return `.${locale}.mdx`;
      } else {
        if (locale === 'en-US') return '.md';
        return `.${locale}.md`;
      }
    },
  },
});
