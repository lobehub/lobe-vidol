# 目录架构

LobeVidol 的文件夹目录架构如下：

```bash
src
├── app        # 应用主要逻辑和状态管理相关的代码
├── components # 可复用的 UI 组件
├── constants  # 用于定义常量，如 action 类型、路由名等
├── features   # 与业务功能相关的功能模块，如 Agent 设置、插件开发弹窗等
├── hooks      # 全应用复用自定义的工具 Hooks
├── layout     # 应用的布局组件，如导航栏、侧边栏等
├── locales    # 国际化的语言文件
├── lib        # 通用的工具库，如插件，VMD 动画实现 等
├── panels     # 用于展示的面板组件
├── services   # 封装的后端服务接口，如 HTTP 请求
├── store      # 用于状态管理的 zustand store
├── styles     # 全局样式文件
├── types      # TypeScript 的类型定义文件
└── utils      # 通用的工具函数
```
