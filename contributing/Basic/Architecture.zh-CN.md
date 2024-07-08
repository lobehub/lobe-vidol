# 架构设计

LobeVidol 是一个基于 Next.js 框架构建的 AI 会话应用，旨在提供一个个性化 AI 对话平台，使用户能够与 AI 进行自然语言交互。以下是 LobeVidol 的架构设计介稿：

#### TOC

- [应用架构概览](#应用架构概览)
- [前端架构](#前端架构)
- [Edge Runtime API](#edge-runtime-api)
- [角色市场](#角色市场)
- [舞蹈市场](#舞蹈市场)
- [安全性和性能优化](#安全性和性能优化)
- [开发和部署流程](#开发和部署流程)

## 应用架构概览

LobeVidol 的整体架构由前端、EdgeRuntime API、Agents 市场、舞蹈市场组成。这些组件相互协作，以提供完整的 AI 体验。

## 前端架构

LobeVidol 的前端采用 Next.js 框架，利用其强大的 SSR（服务器端渲染）能力和路由功能。前端使用了一系列技术栈，包括 antd 组件库和 lobe-ui AIGC 组件库、zustand 状态管理、swr 请求库、i18next 国际化库等。这些技术栈共同支持了 LobeVidol 的功能和特性。

前端架构中的组件包括 app、components、config、constants、features、lib、hooks、layout、locales、services、store、styles、types 和 utils。每个组件都有特定的职责，并与其他组件协同工作，以实现不同的功能。

## Edge Runtime API

Edge Runtime API 是 LobeVidol 的核心组件之一，负责处理 AI 会话的核心逻辑。它提供了与 AI 引擎的交互接口，包括自然语言处理、意图识别和回复生成等。EdgeRuntime API 与前端进行通信，接收用户的输入并返回相应的回复。

## 角色市场

角色市场是 LobeVidol 的一个重要组成部分，它提供了各种不同类型的 AI Agent，用以体验不同的角色。Agents 市场还提供了使用和上传 Agent 的功能，使用户能够发现其他人制作的 Agent ，也可以一键分享自己的 Agent 到市场上。

## 舞蹈市场

舞蹈市场是 LobeVidol 的另一个关键组件，它提供了各种舞蹈文件，用于丰富 LobeVidol 角色的交互。用户可以在舞蹈市场中查找和下载舞蹈文件，然后将其应用到自己的 Agent 中，以实现更加生动的交互体验。

## 安全性和性能优化

为了优化性能，LobeVidol 使用了 Next.js 的 SSR 功能，实现了快速的页面加载和响应时间。此外，还采用了一系列的性能优化措施，包括代码分割、缓存和资源压缩等。

## 开发和部署流程

LobeVidol 的开发流程包括版本控制、测试、持续集成和持续部署。开发团队使用版本控制系统进行代码管理，并进行单元测试和集成测试以确保代码质量。持续集成和持续部署流程确保了代码的快速交付和部署。

以上是 LobeVidol 的架构设计介绍简介，详细解释了各个组件的职责和协作方式，以及设计决策对应用功能和性能的影响。
