module.exports = {
  pluginSearchDirs: false,
  plugins: [
    require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-packagejson'),
  ],
  printWidth: 100,
  proseWrap: 'never',
  singleQuote: true,
  endOfLine: 'lf',
  trailingComma: 'all',
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
};
