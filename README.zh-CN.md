<div align="center"><a name="readme-top"></a>

<img height="120" src="https://registry.npmmirror.com/@lobehub/assets-logo/1.0.0/files/assets/logo-3d.webp">
<img height="120" src="https://gw.alipayobjects.com/zos/kitchen/qJ3l3EPsdW/split.svg">
<img height="120" src="https://registry.npmmirror.com/@lobehub/assets-emoji-anim/1.0.0/files/assets/teddy-bear.webp">

# Lobe Vidol

与 Lobe Vidol 一起体验虚拟偶像创作的魔力，享受我们精致的 UI 设计，支持 MMD 的舞蹈内容，并能与人物进行流畅的对话 — 所有这些功能都集成在一个无缝的平台上。

<sup>每个人都可以创造虚拟偶像</sup>

[English](./README.md) · **简体中文** · [日本語](./README.ja-JP.md) · [文档][docs] · [Changelog](./CHANGELOG.md) · [Report Bug][github-issues-link] · [Request Feature][github-issues-link]

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
> Lobe Vidol 目前处于开发初期，现已开放 Beta 测试。欢迎您加入我们，一起参与贡献！

<details>
<summary><kbd>目录</kbd></summary>

#### TOC

- [👋🏻 开始使用 & 交流](#-开始使用--交流)
- [✨ 特性一览](#-特性一览)
  - [1. **流畅的对话体验**](#1-流畅的对话体验)
  - [2. **视频对话体验**](#2-视频对话体验)
  - [3. **多模型服务商支持**](#3-多模型服务商支持)
  - [4. **角色与舞蹈市场**](#4-角色与舞蹈市场)
  - [5. **TTS & STT 语音会话**](#5-tts--stt-语音会话)
  - [6. **渐进式 Web 应用 (PWA)**](#6-渐进式-web-应用-pwa)
- [📦 生态](#-生态)
- [⌨️ 本地开发](#️-本地开发)
- [🤝 参与贡献](#-参与贡献)
- [🩷 社区赞助](#-社区赞助)
- [🔗 更多工具](#-更多工具)
  - [更多项目](#更多项目)
  - [相关链接](#相关链接)

####

</details>

## 👋🏻 开始使用 & 交流

LobeVidol 目前正在积极开发中，有任何需求或者问题，欢迎提交 \[issues]\[issues-link]

| [![][vercel-shield-badge]][vercel-link]   | 无需安装或注册！访问我们的网站，即可快速体验                                  |
| :---------------------------------------- | :---------------------------------------------------------------------------- |
| [![][discord-shield-badge]][discord-link] | 加入我们的 Discord 社区！这是你可以与开发者和其他 LobeHub 热衷用户交流的地方. |

> \[!IMPORTANT]
>
> **收藏项目**，你将从 GitHub 上无延迟地接收所有发布通知～⭐️

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

## ✨ 特性一览

### `1`. **文字聊天模式**

流式响应带来流畅的对话体验，你可以通过设定角色对话情境来创造沉浸式的对话体验。

<img width="1285" alt="fluent chat experience" src="https://github.com/user-attachments/assets/d2585e90-b44e-494b-ac55-113f924abefc">

### `2`. **视频对话模式**

通过消息框中的视频按钮，你可以与角色模型进行更丰富的交互体验，如面对面聊天，角色表演等，也可以设置角色所处的背景，舞台，动作，舞蹈等。

<img width="1285" alt="video chat experience" src="https://github.com/user-attachments/assets/4af0dfb3-97b9-468e-b1c9-a672242d8aad">

你可以通过设定背景图片的方式让对话更加符合情境：

<img width="1318" alt="background setting" src="https://github.com/user-attachments/assets/e62b635c-168d-4f4e-8741-39aac0f7cfd3">

内置 Mixamo 角色动作与姿式库，你可以让角色在对话时摆出你想要的姿势或动作:

<img width="1323" alt="motions and postures" src="https://github.com/user-attachments/assets/95d9a42e-4215-45f2-8171-f631a91065c9">

使用角色编辑器，你可以创建属于你自己的虚拟偶像，设定触摸反应，上传 VRM 模型到网站并与他们互动。

<img width="1291" alt="role edit" src="https://github.com/user-attachments/assets/3d319554-ae14-4932-b527-e220c910fd51">

借助 mmd-parser 的支持，你可以使用 vmd 文件和最喜欢的偶像一起跳舞；Just Dance!

<https://github.com/user-attachments/assets/c017be86-dbac-4ce1-9f00-a10248b58621">

我们添加了舞台加载功能并内置丰富的舞台选择，让角色跳舞时可以搭配不同的舞台风格:

<img width="1317" alt="pmx stage" src="https://github.com/user-attachments/assets/ec436b96-c270-431a-acef-f140584e6938">

点击角色的不同身体部位，角色将做出不同的反应，你也可以自己编辑角色的触摸反应来创造与众不同的交互效果：

<https://github.com/user-attachments/assets/a283bca0-222c-4ac8-8757-8c56ce3873c2>

### `3`. **多模型服务商支持**

<img width="1285" alt="multi model provider" src="https://oss.vidol.chat/docs/2024/12/7ae6ec6df8f75837f30204069b823736.png">

在提供 AI 会话服务时模型服务商的多样性对于满足社区需求非常重要。因此，我们不再局限于单一的模型服务商，而是拓展了对多种模型服务商的支持，以便为用户提供更为丰富和多样化的会话选择。通过这种方式，LobeVidol 能够更灵活地适应不同用户的需求，同时也为开发者提供了更为广泛的选择空间。

#### 已支持的模型服务商

我们已经实现了对以下模型服务商的支持：

- **AWS Bedrock**：集成了 AWS Bedrock 服务，支持了 **Claude / LLama2** 等模型，提供了强大的自然语言处理能力。[了解更多](https://aws.amazon.com/cn/bedrock)
- **Google AI (Gemini Pro、Gemini Vision)**：接入了 Google 的 **Gemini** 系列模型，包括 Gemini 和 Gemini Pro，以支持更高级的语言理解和生成。[了解更多](https://deepmind.google/technologies/gemini/)
- **Anthropic (Claude)**：接入了 Anthropic 的 **Claude** 系列模型，包括 Claude 3 和 Claude 2，多模态突破，超长上下文，树立行业新基准。[了解更多](https://www.anthropic.com/claude)
- **ChatGLM**：加入了智谱的 **ChatGLM** 系列模型（GLM-4/GLM-4-vision/GLM-3-turbo），为用户提供了另一种高效的会话模型选择。[了解更多](https://www.zhipuai.cn/)
- **Moonshot AI (月之暗面)**：集成了 Moonshot 系列模型，这是一家来自中国的创新性 AI 创业公司，旨在提供更深层次的会话理解。[了解更多](https://www.moonshot.cn/)
- **Together.ai**：集成部署了数百种开源模型和向量模型，无需本地部署即可随时访问这些模型。[了解更多](https://www.together.ai/)
- **01.AI (零一万物)**：集成了零一万物模型，系列 API 具备较快的推理速度，这不仅缩短了处理时间，同时也保持了出色的模型效果。[了解更多](https://www.lingyiwanwu.com/)
- **Groq**：接入了 Groq 的 AI 模型，高效处理消息序列，生成回应，胜任多轮对话及单次交互任务。[了解更多](https://groq.com/)
- **OpenRouter**：其支持包括 **Claude 3**，**Gemma**，**Mistral**，**Llama2**和**Cohere**等模型路由，支持智能路由优化，提升使用效率，开放且灵活。[了解更多](https://openrouter.ai/)
- **Minimax**: 接入了 Minimax 的 AI 模型，包括 MoE 模型 **abab6**，提供了更多的选择空间。[了解更多](https://www.minimaxi.com/)
- **DeepSeek**: 接入了 DeepSeek 的 AI 模型，包括最新的 **DeepSeek-V2**，提供兼顾性能与价格的模型。[了解更多](https://www.deepseek.com/)
- **Qwen**: 接入了 Qwen 的 AI 模型，包括最新的 **qwen-turbo**，**qwen-plus** 和 **qwen-max** 等模型。[了解更多](https://help.aliyun.com/zh/dashscope/developer-reference/model-introduction)
- **Novita AI**: 性价比最高的开源模型供应商，支持 **Llama**，**Mistral** 系列等最前沿的开源模型。在情感陪伴等场景表现优异，无任何内容限制或审查。 [了解更多](https://novita.ai/model-api/product/llm-api?utm_source=lobechat&utm_medium=ch&utm_campaign=api)

同时，我们也在计划支持更多的模型服务商以进一步丰富我们的服务商库。如果你希望让 LobeVidol 支持你喜爱的服务商，欢迎加入我们的[社区讨论](https://github.com/lobehub/lobe-vidol/discussions/162)。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

### `4`. **角色与舞蹈市场**

在 LobeVidol 的角色市场中汇聚了众多精心设计的角色，这些角色让你可以体验到不同的情境和交互体验，让你拥有不一样的陪伴体验。
我们的市场不仅是一个展示平台，更是一个协作的空间。在这里，每个人都可以贡献自己的想象，分享个人设定的角色。

> \[!TIP]
>
> 通过创建角色功能你可以轻松地将你的角色作品提交到我们的平台，我们特别强调的是，LobeVidol 建立了一套精密的自动化国际化（i18n）工作流程， 它的强大之处在于能够无缝地将你的角色转化为多种语言版本。 这意味着，不论你的用户使用何种语言，他们都能无障碍地体验到你的角色。

<img width="1320" alt="discover" src="https://github.com/user-attachments/assets/9f155227-6856-4957-9f6e-a9b3f534df24">

在 LobeVidol 的舞蹈市场中添加了丰富的 MMD 舞蹈资源，这些舞蹈构成了丰富的视觉体验，你可以搭配不同的角色，舞台，音乐和舞蹈来创造不一样的观看体验。

<img width="1323" alt="Snipaste_2024-11-05_21-22-47" src="https://github.com/user-attachments/assets/684ba6ad-17a9-4af3-9943-fcaaee121216">

### `5`. **TTS & STT 语音会话**

LobeVidol 支持文字转语音（Text-to-Speech，TTS）和语音转文字（Speech-to-Text，STT）技术，这使得我们的应用能够将文本信息转化为清晰的语音输出，用户可以像与真人交谈一样与我们的对话助手进行交流。
用户可以从多种声音中选择，给助手搭配合适的音源。 同时，对于那些倾向于听觉学习或者想要在忙碌中获取信息的用户来说，TTS 提供了一个极佳的解决方案。

在 LobeVidol 中，我们精心挑选了一系列高品质的声音选项 (OpenAI Audio, Microsoft Edge Speech)，以满足不同地域和文化背景用户的需求。用户可以根据个人喜好或者特定场景来选择合适的语音，从而获得个性化的交流体验。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

### `6`. **渐进式 Web 应用 (PWA)**

我们深知在当今多设备环境下为用户提供无缝体验的重要性。为此，我们采用了渐进式 Web 应用 [PWA](https://support.google.com/chrome/answer/9658361) 技术，
这是一种能够将网页应用提升至接近原生应用体验的现代 Web 技术。通过 PWA，LobeVidol 能够在桌面和移动设备上提供高度优化的用户体验，同时保持轻量级和高性能的特点。
在视觉和感觉上，我们也经过精心设计，以确保它的界面与原生应用无差别，提供流畅的动画、响应式布局和适配不同设备的屏幕分辨率。

> \[!NOTE]
>
> 若您未熟悉 PWA 的安装过程，您可以按照以下步骤将 LobeVidol 添加为您的桌面应用（也适用于移动设备）：
>
> - 在电脑上运行 Chrome 或 Edge 浏览器 .
> - 访问 LobeVidol 网页 .
> - 在地址栏的右上角，单击 <kbd>安装</kbd> 图标 .
> - 根据屏幕上的指示完成 PWA 的安装 .

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📦 生态

| NPM                               | 仓库                                    | 描述                                                                                     | 版本                                      |
| --------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------- |
| [@lobehub/ui][lobe-ui-link]       | [lobehub/lobe-ui][lobe-ui-github]       | 构建 AIGC 网页应用程序而设计的开源 UI 组件库                                             | [![][lobe-ui-shield]][lobe-ui-link]       |
| [@lobehub/icons][lobe-icons-link] | [lobehub/lobe-icons][lobe-icons-github] | 主流 AI / LLM 模型和公司 SVG Logo 与 Icon 合集                                           | [![][lobe-icons-shield]][lobe-icons-link] |
| [@lobehub/tts][lobe-tts-link]     | [lobehub/lobe-tts][lobe-tts-github]     | AI TTS / STT 语音合成 / 识别 React Hooks 库                                              | [![][lobe-tts-shield]][lobe-tts-link]     |
| [@lobehub/lint][lobe-lint-link]   | [lobehub/lobe-lint][lobe-lint-github]   | LobeHub 代码样式规范 ESlint，Stylelint，Commitlint，Prettier，Remark 和 Semantic Release | [![][lobe-lint-shield]][lobe-lint-link]   |

- **[Vidol market](https://github.com/v-idol/vidol-chat-agents)** - This is the Market Index of Vidol Chat. Vidol accesses index.json from this repo to show user the list of available agents and dances.
- **[Vidol agent sample](https://github.com/v-idol/vidol-agent-sample)** - Vidol 人物数据模版
- **[Vidol dance sample](https://github.com/v-idol/vidol-dance-sample)** - Vidol 舞蹈数据模版

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ⌨️ 本地开发

可以使用 GitHub Codespaces 进行在线开发：

[![][github-codespace-shield]][github-codespace-link]

或者使用以下命令进行本地开发：

[![][bun-shield]][bun-link]

```bash
$ git clone https://github.com/lobehub/lobe-vidol.git
$ cd lobe-vidol
$ bun install
$ bun dev
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤝 参与贡献

我们非常欢迎各种形式的贡献。如果你对贡献代码感兴趣，可以查看我们的 GitHub [Issues][github-issues-link] 和 \[Projects]\[github-project-link]，大展身手，向我们展示你的奇思妙想。

[![][pr-welcome-shield]][pr-welcome-link]

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

[![][back-to-top]](#readme-top)

</div>

## 🩷 社区赞助

每一分支持都珍贵无比，汇聚成我们支持的璀璨银河！你就像一颗划破夜空的流星，瞬间点亮我们前行的道路。感谢你对我们的信任 —— 你的支持笔就像星辰导航，一次又一次地为项目指明前进的光芒。

<a href="https://opencollective.com/lobehub" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/lobehub/.github/blob/main/static/sponsor-dark.png?raw=true">
    <img  src="https://github.com/lobehub/.github/blob/main/static/sponsor-light.png?raw=true">
  </picture>
</a>

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🔗 更多工具

### 更多项目

- **[🤖 Lobe Chat][lobe-chat] :** 一个开源、支持可扩展（Function Calling）的插件系统、现代化设计 ChatGPT/LLMs 聊天应用与开发框架。支持一键免费部署您的私人 ChatGPT/LLMs 应用
- **[🅰️ Lobe SD Theme][lobe-theme]:** Stable Diffusion WebUI 的现代主题，精致的界面设计，高度可定制的 UI，以及提高效率的功能。
- **[⛵️ Lobe Midjourney WebUI][lobe-midjourney-webui]:** Midjourney WebUI, 能够根据文本提示快速生成丰富多样的图像，激发创造力，增强对话交流。
- **[🌏 Lobe i18n][lobe-i18n]:** Lobe i18n 是一个由 ChatGPT 驱动的 i18n（国际化）翻译过程的自动化工具。它支持自动分割大文件、增量更新，以及为 OpenAI 模型、API 代理和温度提供定制选项的功能。

### 相关链接

- **mmd-parser** - <https://github.com/takahirox/mmd-parser>
- **three-vrm** - <https://github.com/pixiv/three-vrm>
- **tts-vue** - <https://github.com/LokerL/tts-vue>

<div align="right">

[![][back-to-top]](#readme-top)

</div>

---

#### 📝 License

Copyright © 2024 [lobehub][profile-link]. <br />
This project is [Apache 2.0](./LICENSE) licensed.

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
