<div align="center"><a name="readme-top"></a>

<img height="120" src="https://registry.npmmirror.com/@lobehub/assets-logo/1.0.0/files/assets/logo-3d.webp">
<img height="120" src="https://gw.alipayobjects.com/zos/kitchen/qJ3l3EPsdW/split.svg">
<img height="120" src="https://registry.npmmirror.com/@lobehub/assets-emoji-anim/1.0.0/files/assets/teddy-bear.webp">

# Lobe Vidol

Experience the magic of virtual idol creation with Lobe Vidol. Enjoy our exquisite UI design, support for MMD dance content, and seamless conversations with characters—all integrated into one cohesive platform.

<sup>Anyone can create a virtual idol</sup>

**English** · [简体中文](./README.zh-CN.md) · [Documentation][docs] · [Changelog](./CHANGELOG.md) · [Report Bug][github-issues-link] · [Request Feature][github-issues-link]

[![][github-release-shield]][github-release-link]
[![][vercel-shield]][vercel-link]
[![][discord-shield]][discord-link]
[![][github-releasedate-shield]][github-releasedate-link]
[![][github-action-test-shield]][github-action-test-link]
[![][github-action-release-shield]][github-action-release-link]<br/>
[![][github-contributors-shield]][github-contributors-link]
[![][github-forks-shield]][github-forks-link]
[![][github-stars-shield]][github-stars-link]
[![][github-issues-shield]][github-issues-link]
[![][github-license-shield]][github-license-link]<br>
[![][sponsor-shield]][sponsor-link]

![](https://github.com/lobehub/lobe-vidol/assets/17870709/90d7295f-9461-4765-a936-20720afb48c3)

</div>

> \[!NOTE]
> Lobe Vidol is currently in early development and is now open for Beta testing. We welcome you to join us and contribute!

<details>
<summary><kbd>Table of Contents</kbd></summary>

#### TOC

- [👋🏻 Getting Started & Communication](#-getting-started--communication)
- [✨ Features Overview](#-features-overview)
  - [`1`. **Text Chat Mode**](#1-text-chat-mode)
  - [`2`. **Video Conversation Mode**](#2-video-conversation-mode)
  - [`3`. **Multi-Model Provider Support**](#3-multi-model-provider-support)
  - [`4`. **Character and Dance Marketplace**](#4-character-and-dance-marketplace)
  - [`5`. **TTS & STT Voice Conversations**](#5-tts--stt-voice-conversations)
  - [`6`. **Progressive Web App (PWA)**](#6-progressive-web-app-pwa)
- [📦 Ecosystem](#-ecosystem)
- [⌨️ Local Development](#️-local-development)
- [🤝 Contributing](#-contributing)
- [🩷 Community Sponsorship](#-community-sponsorship)
- [🔗 More Tools](#-more-tools)
  - [More Projects](#more-projects)
  - [Related Links](#related-links)

####

</details>

## 👋🏻 Getting Started & Communication

Lobe Vidol is actively under development. If you have any requests or questions, feel free to submit \[issues]\[issues-link].

| [![][vercel-shield-badge]][vercel-link]   | No installation or registration required! Visit our website for a quick experience.                              |
| :---------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| [![][discord-shield-badge]][discord-link] | Join our Discord community! This is where you can interact with developers and other enthusiastic LobeHub users. |

> \[!IMPORTANT]
>
> **Star the project** to receive all release notifications from GitHub without delay!～⭐️

<img width="1749" alt="star (1)" src="https://github.com/user-attachments/assets/73f96340-ef2b-4d9b-ab6f-71f30c0c02fb">

<details><summary><kbd>Star History</kbd></summary>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=lobehub%2Flobe-vidol&theme=dark&type=Date">
    <img src="https://api.star-history.com/svg?repos=lobehub%2Flobe-vidol&type=Date">
  </picture>
</details>

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ✨ Feature Overview

### `1`. **Text Chat Mode**

Streamed responses provide a smooth conversational experience, allowing you to create an immersive dialogue by setting up character dialogue scenarios.

<img width="1285" alt="fluent chat experience" src="https://github.com/user-attachments/assets/d2585e90-b44e-494b-ac55-113f924abefc">

### `2`. **Video Chat Mode**

With the video button in the message box, you can engage in richer interactions with character models, such as face-to-face chats, character performances, and more. You can also set the background, stage, actions, and dances for the characters.

<img width="1285" alt="video chat experience" src="https://github.com/user-attachments/assets/4af0dfb3-97b9-468e-b1c9-a672242d8aad">

You can enhance the dialogue's context by setting background images:

<img width="1318" alt="background setting" src="https://github.com/user-attachments/assets/e62b635c-168d-4f4e-8741-39aac0f7cfd3">

With a built-in library of Mixamo character motions and poses, you can have characters strike the desired poses or perform actions during the conversation:

<img width="1323" alt="motions and postures" src="https://github.com/user-attachments/assets/95d9a42e-4215-45f2-8171-f631a91065c9">

Using the character editor, you can create your own virtual idol, set touch responses, upload VRM models to the site, and interact with them.

<img width="1291" alt="role edit" src="https://github.com/user-attachments/assets/3d319554-ae14-4932-b527-e220c910fd51">

With the support of mmd-parser, you can dance with your favorite idols using vmd files; Just Dance!

<https://github.com/user-attachments/assets/c017be86-dbac-4ce1-9f00-a10248b58621>

We have added stage loading features and built-in a variety of stage options, allowing characters to dance with different stage styles:

<img width="1317" alt="pmx stage" src="https://github.com/user-attachments/assets/ec436b96-c270-431a-acef-f140584e6938">

By clicking on different body parts of the character, they will respond in various ways. You can also edit the character's touch responses to create unique interactive effects:

<https://github.com/user-attachments/assets/a283bca0-222c-4ac8-8757-8c56ce3873c2>

### `3`. **Multi-Model Provider Support**

<img width="1285" alt="multi model provider" src="https://oss.vidol.chat/docs/2024/12/7ae6ec6df8f75837f30204069b823736.png">

The diversity of model providers is crucial for meeting community needs when providing AI conversation services. Therefore, we have expanded our support to multiple model providers, rather than being limited to a single one, to offer users a richer and more diverse conversation selection. This way, LobeVidol can flexibly adapt to different user needs while providing developers with a broader range of options.

#### Supported Model Providers

We have implemented support for the following model providers:

- **AWS Bedrock**: Integrated with AWS Bedrock services, supporting models like **Claude / LLama2**, providing powerful natural language processing capabilities. [Learn more](https://aws.amazon.com/cn/bedrock)
- **Google AI (Gemini Pro, Gemini Vision)**: Accessed Google's **Gemini** series models, including Gemini and Gemini Pro, to support advanced language understanding and generation. [Learn more](https://deepmind.google/technologies/gemini/)
- **Anthropic (Claude)**: Integrated with Anthropic's **Claude** series models, including Claude 3 and Claude 2, featuring multimodal breakthroughs and ultra-long context, setting new industry benchmarks. [Learn more](https://www.anthropic.com/claude)
- **ChatGLM**: Added Zhipu's **ChatGLM** series models (GLM-4/GLM-4-vision/GLM-3-turbo), providing users with another efficient conversation model option. [Learn more](https://www.zhipuai.cn/)
- **Moonshot AI**: Integrated with the Moonshot series models, an innovative AI startup from China, aiming to provide deeper conversation understanding. [Learn more](https://www.moonshot.cn/)
- **Together.ai**: Integrated hundreds of open-source models and vector models, accessible without local deployment. [Learn more](https://www.together.ai/)
- **01.AI**: Integrated with the 01.AI model, featuring APIs with fast inference speeds, reducing processing time while maintaining excellent model performance. [Learn more](https://www.lingyiwanwu.com/)
- **Groq**: Accessed Groq's AI models, efficiently processing message sequences and generating responses, suitable for multi-turn dialogues and single interaction tasks. [Learn more](https://groq.com/)
- **OpenRouter**: Supports routing for models including **Claude 3**, **Gemma**, **Mistral**, **Llama2**, and **Cohere**, enabling smart routing optimization to enhance usage efficiency, open and flexible. [Learn more](https://openrouter.ai/)
- **Minimax**: Integrated with Minimax's AI models, including the MoE model **abab6**, providing more options. [Learn more](https://www.minimaxi.com/)
- **DeepSeek**: Integrated with DeepSeek's AI models, including the latest **DeepSeek-V2**, offering models that balance performance and price. [Learn more](https://www.deepseek.com/)
- **Qwen**: Integrated with Qwen's AI models, including the latest **qwen-turbo**, **qwen-plus**, and **qwen-max** models. [Learn more](https://help.aliyun.com/zh/dashscope/developer-reference/model-introduction)
- **Novita AI**: The most cost-effective open-source model provider, supporting cutting-edge open-source models like **Llama** and **Mistral** series. Excelling in emotional companionship scenarios, with no content restrictions or censorship. [Learn more](https://novita.ai/model-api/product/llm-api?utm_source=lobechat&utm_medium=ch&utm_campaign=api)

We are also planning to support more model providers to further enrich our provider library. If you would like LobeVidol to support your favorite provider, feel free to join our [community discussion](https://github.com/lobehub/lobe-vidol/discussions/162).

<div align="right">

[![][back-to-top]](#readme-top)

</div>

### `4`. **Character and Dance Market**

The character market at LobeVidol brings together a variety of meticulously designed characters, allowing you to experience different scenarios and interactions, providing you with a unique companionship experience. Our market is not just a showcase platform; it is also a collaborative space where everyone can contribute their imagination and share their personally designed characters.

> \[!TIP]
>
> With the character creation feature, you can easily submit your character creations to our platform. We emphasize that LobeVidol has established a sophisticated automated internationalization (i18n) workflow, which seamlessly transforms your characters into multiple language versions. This means that regardless of the language your users speak, they can experience your characters without barriers.

<img width="1320" alt="discover" src="https://github.com/user-attachments/assets/9f155227-6856-4957-9f6e-a9b3f534df24">

The dance market at LobeVidol is enriched with a variety of MMD dance resources, creating a rich visual experience. You can combine different characters, stages, music, and dances to create a unique viewing experience.

<img width="1323" alt="Snipaste_2024-11-05_21-22-47" src="https://github.com/user-attachments/assets/684ba6ad-17a9-4af3-9943-fcaaee121216">

### `5`. **TTS & STT Voice Conversations**

LobeVidol supports Text-to-Speech (TTS) and Speech-to-Text (STT) technologies, enabling our application to convert text information into clear voice output. Users can interact with our conversational assistant as if they were talking to a real person. Users can choose from a variety of voices to match their assistant with the appropriate sound source. Additionally, for those who prefer auditory learning or want to gather information while busy, TTS offers an excellent solution.

At LobeVidol, we have carefully selected a range of high-quality voice options (OpenAI Audio, Microsoft Edge Speech) to meet the needs of users from different regions and cultural backgrounds. Users can choose the appropriate voice based on personal preferences or specific scenarios, thus obtaining a personalized communication experience.

<div align="right">

[!\[\]\[back-to-top\]](#readme-top)

</div>

### `6`. **Progressive Web Application (PWA)**

We understand the importance of providing a seamless experience for users in today's multi-device environment. To this end, we have adopted Progressive Web Application [PWA](https://support.google.com/chrome/answer/9658361) technology, which elevates web applications to a near-native app experience. Through PWA, LobeVidol can deliver a highly optimized user experience on both desktop and mobile devices while maintaining lightweight and high-performance characteristics.

Visually and functionally, we have also designed it carefully to ensure that its interface is indistinguishable from native applications, providing smooth animations, responsive layouts, and adapting to different device screen resolutions.

> \[!NOTE]
>
> If you are unfamiliar with the PWA installation process, you can follow these steps to add LobeVidol as your desktop application (also applicable to mobile devices):
>
> - Run Chrome or Edge browser on your computer.
> - Visit the LobeVidol webpage.
> - Click the <kbd>Install</kbd> icon in the upper right corner of the address bar.
> - Follow the on-screen instructions to complete the PWA installation.

<div align="right">

[!\[\]\[back-to-top\]](#readme-top)

</div>

## 📦 Ecosystem

| NPM                               | Repository                              | Description                                                                                             | Version                                   |
| --------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| [@lobehub/ui][lobe-ui-link]       | [lobehub/lobe-ui][lobe-ui-github]       | An open-source UI component library designed for building AIGC web applications                         | [![][lobe-ui-shield]][lobe-ui-link]       |
| [@lobehub/icons][lobe-icons-link] | [lobehub/lobe-icons][lobe-icons-github] | A collection of SVG logos and icons for mainstream AI / LLM models and companies                        | [![][lobe-icons-shield]][lobe-icons-link] |
| [@lobehub/tts][lobe-tts-link]     | [lobehub/lobe-tts][lobe-tts-github]     | A React Hooks library for AI TTS / STT voice synthesis / recognition                                    | [![][lobe-tts-shield]][lobe-tts-link]     |
| [@lobehub/lint][lobe-lint-link]   | [lobehub/lobe-lint][lobe-lint-github]   | LobeHub code style guidelines for ESlint, Stylelint, Commitlint, Prettier, Remark, and Semantic Release | [![][lobe-lint-shield]][lobe-lint-link]   |

- **[Vidol market](https://github.com/v-idol/vidol-chat-agents)** - This is the Market Index of Vidol Chat. Vidol accesses index.json from this repo to show users the list of available agents and dances.
- **[Vidol agent sample](https://github.com/v-idol/vidol-agent-sample)** - Template for Vidol character data.
- **[Vidol dance sample](https://github.com/v-idol/vidol-dance-sample)** - Template for Vidol dance data.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ⌨️ Local Development

You can use GitHub Codespaces for online development:

[![][github-codespace-shield]][github-codespace-link]

Or use the following commands for local development:

[![][bun-shield]][bun-link]

```bash
$ git clone https://github.com/lobehub/lobe-vidol.git
$ cd lobe-vidol
$ bun install
$ bun dev
```

<div align="right">

[!\[\]\[back-to-top\]](#readme-top)

</div>

## 🤝 Contributing

We warmly welcome contributions in various forms. If you're interested in contributing code, please check out our GitHub \[Issues]\[github-issues-link] and \[Projects]\[github-project-link] to showcase your creativity and ideas.

\[!\[]\[pr-welcome-shield]]\[pr-welcome-link]

<a href="https://github.com/lobehub/lobe-vidol/graphs/contributors" target="_blank">
  <table>
    <tr>
      <th colspan="2">
        <br><img src="https://contrib.rocks/image?repo=lobehub/lobe-vidol"><br><br>
      </th>
    </tr>
    <tr>
      <td>
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://next.ossinsight.io/widgets/official/compose-org-active-contributors/thumbnail.png?activity=active&period=past_90_days&owner_id=131470832&repo_ids=784800776&image_size=2x3&color_scheme=dark">
          <img src="https://next.ossinsight.io/widgets/official/compose-org-active-contributors/thumbnail.png?activity=active&period=past_90_days&owner_id=131470832&repo_ids=784800776&image_size=2x3&color_scheme=light">
        </picture>
      </td>
      <td rowspan="2">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://next.ossinsight.io/widgets/official/compose-org-participants-growth/thumbnail.png?activity=active&period=past_90_days&owner_id=131470832&repo_ids=784800776&image_size=4x7&color_scheme=dark">
          <img src="https://next.ossinsight.io/widgets/official/compose-org-participants-growth/thumbnail.png?activity=active&period=past_90_days&owner_id=131470832&repo_ids=784800776&image_size=4x7&color_scheme=light">
        </picture>
      </td>
    </tr>
    <tr>
      <td>
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://next.ossinsight.io/widgets/official/compose-org-active-contributors/thumbnail.png?activity=new&period=past_90_days&owner_id=131470832&repo_ids=784800776&image_size=2x3&color_scheme=dark">
          <img src="https://next.ossinsight.io/widgets/official/compose-org-active-contributors/thumbnail.png?activity=new&period=past_90_days&owner_id=131470832&repo_ids=784800776&image_size=2x3&color_scheme=light">
        </picture>
      </td>
    </tr>
  </table>
</a>

<div align="right">

[!\[\]\[back-to-top\]](#readme-top)

</div>

## 🩷 Community Sponsorship

Every bit of support is incredibly valuable, coming together to form the brilliant galaxy we support! You are like a shooting star that lights up our path forward. Thank you for your trust — your support acts like a guiding star, illuminating the way for the project time and again.

<a href="https://opencollective.com/lobehub" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/lobehub/.github/blob/main/static/sponsor-dark.png?raw=true">
    <img src="https://github.com/lobehub/.github/blob/main/static/sponsor-light.png?raw=true">
  </picture>
</a>

<div align="right">

[!\[\]\[back-to-top\]](#readme-top)

</div>

## 🔗 More Tools

### More Projects

- **\[🤖 Lobe Chat]\[lobe-chat] :** An open-source, extensible (Function Calling) plugin system, modern design ChatGPT/LLMs chat application and development framework. Supports one-click free deployment of your private ChatGPT/LLMs application.
- **\[🅰️ Lobe SD Theme]\[lobe-theme]:** A modern theme for Stable Diffusion WebUI, featuring exquisite interface design, highly customizable UI, and efficiency-enhancing features.
- **\[⛵️ Lobe Midjourney WebUI]\[lobe-midjourney-webui]:** Midjourney WebUI, capable of quickly generating a rich variety of images based on text prompts, inspiring creativity and enhancing dialogue.
- **\[🌏 Lobe i18n]\[lobe-i18n]:** Lobe i18n is an automation tool for the i18n (internationalization) translation process powered by ChatGPT. It supports automatic splitting of large files, incremental updates, and customizable options for OpenAI models, API proxies, and temperature.

### Related Links

- **mmd-parser** - <https://github.com/takahirox/mmd-parser>
- **three-vrm** - <https://github.com/pixiv/three-vrm>
- **tts-vue** - <https://github.com/LokerL/tts-vue>

<div align="right">

[!\[\]\[back-to-top\]](#readme-top)

</div>

---

#### 📝 License

Copyright © 2024 \[lobehub]\[profile-link]. <br />
This project is licensed under the [Apache 2.0](./LICENSE).

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-black?style=flat-square
[bun-link]: https://bun.sh
[bun-shield]: https://img.shields.io/badge/-speedup%20with%20bun-black?logo=bun&style=for-the-badge
[discord-link]: https://discord.gg/AYFPHvv2jT
[discord-shield]: https://img.shields.io/discord/1127171173982154893?color=5865F2&label=discord&labelColor=black&logo=discord&logoColor=white&style=flat-square
[discord-shield-badge]: https://img.shields.io/discord/1127171173982154893?color=5865F2&label=discord&labelColor=black&logo=discord&logoColor=white&style=for-the-badge
[docs]: https://docs.vidol.chat
[github-action-release-link]: https://github.com/actions/workflows/lobehub/lobe-vidol/release.yml
[github-action-release-shield]: https://img.shields.io/github/actions/workflow/status/lobehub/lobe-vidol/release.yml?label=release&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-action-test-link]: https://github.com/actions/workflows/lobehub/lobe-vidol/test.yml
[github-action-test-shield]: https://img.shields.io/github/actions/workflow/status/lobehub/lobe-vidol/test.yml?label=test&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-codespace-link]: https://codespaces.new/lobehub/lobe-vidol
[github-codespace-shield]: https://github.com/codespaces/badge.svg
[github-contributors-link]: https://github.com/lobehub/lobe-vidol/graphs/contributors
[github-contributors-shield]: https://img.shields.io/github/contributors/lobehub/lobe-vidol?color=c4f042&labelColor=black&style=flat-square
[github-forks-link]: https://github.com/lobehub/lobe-vidol/network/members
[github-forks-shield]: https://img.shields.io/github/forks/lobehub/lobe-vidol?color=8ae8ff&labelColor=black&style=flat-square
[github-issues-link]: https://github.com/lobehub/lobe-vidol/issues
[github-issues-shield]: https://img.shields.io/github/issues/lobehub/lobe-vidol?color=ff80eb&labelColor=black&style=flat-square
[github-license-link]: https://github.com/lobehub/lobe-vidol/blob/main/LICENSE
[github-license-shield]: https://img.shields.io/github/license/lobehub/lobe-vidol?color=white&labelColor=black&style=flat-square
[github-release-link]: https://github.com/lobehub/lobe-vidol/releases
[github-release-shield]: https://img.shields.io/github/v/release/lobehub/lobe-vidol?color=369eff&labelColor=black&logo=github&style=flat-square
[github-releasedate-link]: https://github.com/lobehub/lobe-vidol/releases
[github-releasedate-shield]: https://img.shields.io/github/release-date/lobehub/lobe-vidol?labelColor=black&style=flat-square
[github-stars-link]: https://github.com/lobehub/lobe-vidol/network/stargazers
[github-stars-shield]: https://img.shields.io/github/stars/lobehub/lobe-vidol?color=ffcb47&labelColor=black&style=flat-square
[lobe-chat]: https://github.com/lobehub/lobe-chat
[lobe-i18n]: https://github.com/lobehub/lobe-commit/tree/master/packages/lobe-i18n
[lobe-icons-github]: https://github.com/lobehub/lobe-icons
[lobe-icons-link]: https://www.npmjs.com/package/@lobehub/icons
[lobe-icons-shield]: https://img.shields.io/npm/v/@lobehub/icons?color=369eff&labelColor=black&logo=npm&logoColor=white&style=flat-square
[lobe-lint-github]: https://github.com/lobehub/lobe-lint
[lobe-lint-link]: https://www.npmjs.com/package/@lobehub/lint
[lobe-lint-shield]: https://img.shields.io/npm/v/@lobehub/lint?color=369eff&labelColor=black&logo=npm&logoColor=white&style=flat-square
[lobe-midjourney-webui]: https://github.com/lobehub/lobe-midjourney-webui
[lobe-theme]: https://github.com/lobehub/sd-webui-lobe-theme
[lobe-tts-github]: https://github.com/lobehub/lobe-tts
[lobe-tts-link]: https://www.npmjs.com/package/@lobehub/tts
[lobe-tts-shield]: https://img.shields.io/npm/v/@lobehub/tts?color=369eff&labelColor=black&logo=npm&logoColor=white&style=flat-square
[lobe-ui-github]: https://github.com/lobehub/lobe-ui
[lobe-ui-link]: https://www.npmjs.com/package/@lobehub/ui
[lobe-ui-shield]: https://img.shields.io/npm/v/@lobehub/ui?color=369eff&labelColor=black&logo=npm&logoColor=white&style=flat-square
[pr-welcome-link]: https://github.com/lobehub/lobe-vidol/pulls
[pr-welcome-shield]: https://img.shields.io/badge/%F0%9F%A4%AF%20PR%20WELCOME-%E2%86%92-ffcb47?labelColor=black&style=for-the-badge
[profile-link]: https://github.com/lobehub
[sponsor-link]: https://opencollective.com/lobehub 'Become 🩷 LobeHub Sponsor'
[sponsor-shield]: https://img.shields.io/badge/-Sponsor%20LobeHub-f04f88?logo=opencollective&logoColor=white&style=flat-square
[vercel-link]: https://vidol.lobehub.com
[vercel-shield]: https://img.shields.io/website?down_message=offline&label=vercel&labelColor=black&logo=vercel&style=flat-square&up_message=online&url=https%3A%2F%2Fvidol.lobehub.com
[vercel-shield-badge]: https://img.shields.io/website?down_message=offline&label=try%20lobechat&labelColor=black&logo=vercel&style=for-the-badge&up_message=online&url=https%3A%2F%2Fvidol.lobehub.com
