# 国际化实现指南

欢迎阅读 国际化实现指南。本文档将指导你了解 的国际化机制，包括文件结构、如何添加新语种。 采用 `i18next` 和 `lobe-i18n` 作为国际化解决方案，旨在为用户提供流畅的多语言支持。

## TOC

- [国际化概述](#国际化概述)
- [文件结构](#文件结构)
- [核心实现逻辑](#核心实现逻辑)
- [添加新的语言支持](#添加新的语言支持)
- [资源和进一步阅读](#资源和进一步阅读)

## 国际化概述

国际化（Internationalization，简称为 i18n）是一个让应用能够适应不同语言和地区的过程。在 中，我们支持多种语言，并通过 `i18next` 库来实现语言的动态切换和内容的本地化。我们的目标是让 能够为全球用户提供本地化的体验。

## 文件结构

在 的项目中，国际化相关的文件被组织如下：

- `src/locales/default`: 包含默认开发语`言`（中文）的翻译文件，我们作为中文。
- `locales`: 包含所有支持的语言文件夹，每个语言文件夹中包含相应语言的翻译文件，这些翻译文件通过 lobe-i18n 自动生成。

在 `src/locales` 这个目录结构中，`default` 文件夹包含了原始的翻译文件（中文），其他每个语言文件夹则包含了相应语言的 JSON 翻译文件。每个语言文件夹中的文件对应 `default` 文件夹中的 TypeScript 文件，确保了各语种之间的翻译文件结构一致性。

```
src/locales
├── create.ts
├── default
│   ├── chat.ts    // 包含聊天页面相关字符
│   ├── role.ts    // 包含角色页面相关字符
│   ├── common.ts  // 包含通用字符翻译，如确认，删除等,
│   ├── error.ts   // 包含错误处理相关字符
│   ├── index.ts   // 资源索引
│   ├── market.ts  // 包含发现页面相关字符
│   ├── setting.ts // 包含设置页面字符
│   └── welcome.ts // 包含欢迎页面字符
└── resources.ts
```

通过 lobe-i18n 自动生成的文件结构如下：

```
locales
├── ar
│   ├── chat.json
│   ├── common.json
│   ├── error.json
│   └── ... (其他翻译文件)
├── de-DE
│   ├── chat.json
│   ├── common.json
│   ├── error.json
│   └── ... (其他翻译文件)
├── en-US
├── ... (其他语种目录）
├── zh-CN
└── zh-TW
```

## 核心实现逻辑

的国际化核心实现逻辑如下：

- 使用 `i18next` 库进行初始化和配置。
- 使用 `i18next-browser-languagedetector` 自动检测用户的语言偏好。
- 使用 `i18next-resources-to-backend` 动态加载翻译资源。
- 根据用户的语言偏好，设置 HTML 文档的方向（LTR 或 RTL）。

以下是一个简化的伪代码示例，用以说明 国际化的核心实现逻辑：

```ts
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { isRtlLang } from 'rtl-detect';

// 创建 i18n 实例并配置
const createI18nInstance = (lang) => {
  const i18nInstance = i18n
    .use(LanguageDetector) // 使用语言检测
    .use(
      resourcesToBackend((language, namespace) => {
        // 动态加载对应语言的翻译资源
        return import(`path/to/locales/${language}/${namespace}.json`);
      }),
    );

  // 监听语言变化事件，动态设置文档方向
  i18nInstance.on('languageChanged', (language) => {
    const direction = isRtlLang(language) ? 'rtl' : 'ltr';
    document.documentElement.dir = direction; // 设置 HTML 文档方向
  });

  // 初始化 i18n 实例
  i18nInstance.init({
    // 相关配置
  });

  return i18nInstance;
};
```

在这个示例中，我们展示了如何使用 `i18next` 和相关插件来初始化国际化设置。我们动态导入了翻译资源，并响应语言变化事件来调整页面的文本方向。这个过程为 提供了灵活的多语言支持能力。

## 添加新的语言支持

要添加新的语种支持， 详细步骤请参考：[新语种添加指南](Add-New-Locale.zh-CN.md)。

## 资源和进一步阅读

- [i18next 官方文档](https://www.i18next.com/)
- [lobe-i18n 工具说明](https://github.com/lobehub/lobe-cli-toolbox/tree/master/packages/lobe-i18n)

通过遵循本指南，你可以更好地理解和参与到 的国际化工作中，为全球用户提供无缝的多语言体验。
