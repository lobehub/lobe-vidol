# New Language Addition Guide

Using [lobe-i18n](https://github.com/lobehub/lobe-cli-toolbox/tree/master/packages/lobe-i18n) as the i18n solution allows you to quickly add new language support to your application.

## TOC

- [Adding New Language Support](#adding-new-language-support)
  - [Step 1: Update the Internationalization Configuration File](#step-1-update-the-internationalization-configuration-file)
  - [Step 2: Automatically Translate Language Files](#step-2-automatically-translate-language-files)
  - [Step 3: Submit and Review Your Changes](#step-3-submit-and-review-your-changes)
  - [Additional Information](#additional-information)

## Adding New Language Support

To add new internationalization support for a language (for example, adding Vietnamese `vi-VN`), please follow these steps:

### Step 1: Update the Internationalization Configuration File

1. Open the `.i18nrc.js` file. You can find this file in the root directory of your project.
2. Add the new language code to the configuration file. For instance, to add Vietnamese, you need to include `'vi-VN'` in the configuration.

```js
module.exports = {
  // ... other configurations

  outputLocales: [
    'zh-TW',
    'en-US',
    'ru-RU',
    'ja-JP',
    // ... other languages

    'vi-VN', // Add 'vi-VN' to the array
  ],
};
```

### Step 2: Automatically Translate Language Files

Use the `lobe-i18n` tool to automatically translate language files, so you don't have to manually update the i18n files.

Run the following command to automatically translate and generate the language files for Vietnamese:

```bash
npm run i18n
```

This will utilize the `lobe-i18n` tool to process the language files.

### Step 3: Submit and Review Your Changes

Once you have completed the above steps, you need to submit your changes and create a Pull Request.

Please ensure that you follow the contribution guidelines and provide the necessary description to explain your changes.

### Additional Information

- After submitting your Pull Request, please be patient while waiting for the project maintainers to review it.
- If you encounter any issues, feel free to reach out to the community for assistance.
- For more accurate results, ensure that your Pull Request is based on the latest main branch and is kept in sync with it.

By following the steps above, you can successfully add new language support and ensure that the application can provide a localized experience for more users.
