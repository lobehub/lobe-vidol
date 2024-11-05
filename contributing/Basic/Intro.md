# Technical Development Getting Started Guide

Welcome to the LobeVidol Technical Development Getting Started Guide. LobeVidol is an AI conversation application built on the Next.js framework, integrating a variety of technology stacks to achieve diverse functionalities and features. This guide will detail the main technical components of LobeVidol, as well as how to configure and use these technologies in your development environment.

#### TOC

- [Basic Technology Stack](#basic-technology-stack)
- [Folder Directory Structure](#folder-directory-structure)
- [Local Development Environment Setup](#local-development-environment-setup)
- [Code Style and Contribution Guidelines](#code-style-and-contribution-guidelines)
- [Internationalization Implementation Guide](#internationalization-implementation-guide)
- [Appendix: Resources and References](#appendix-resources-and-references)

## Basic Technology Stack

The core technology stack of LobeVidol is as follows:

- **Framework**: We chose [Next.js](https://nextjs.org/), a powerful React framework that provides key features such as server-side rendering, routing framework, and Router Handler for our project.
- **Component Library**: We use [Ant Design (antd)](https://ant.design/) as our base component library, along with [lobe-ui](https://github.com/lobehub/lobe-ui) as our business component library.
- **State Management**: We selected [zustand](https://github.com/pmndrs/zustand), a lightweight and easy-to-use state management library.
- **Network Requests**: We adopted [swr](https://swr.vercel.app/), a React Hooks library for data fetching.
- **Routing**: We directly use the routing solution provided by [Next.js](https://nextjs.org/).
- **Internationalization**: We use [i18next](https://www.i18next.com/) to implement multi-language support for the application.
- **Styling**: We use [antd-style](https://github.com/ant-design/antd-style), a CSS-in-JS library that works with Ant Design.
- **Unit Testing**: We use [vitest](https://github.com/vitest-dev/vitest) for unit testing.

## Folder Directory Structure

The folder directory structure of LobeVidol is as follows:

```bash
src
├── app        # Code related to the main logic and state management of the application
├── components # Reusable UI components
├── constants  # Definitions of constants, such as action types, route names, etc.
├── features   # Functional modules related to business features, such as Agent settings, plugin development pop-ups, etc.
├── hooks      # Custom utility hooks reused throughout the application
├── layout     # Layout components of the application, such as navigation bars, sidebars, etc.
├── locales    # Internationalization language files
├── lib        # General utility libraries, such as plugins, VMD animation implementations, etc.
├── panels     # Panel components for display
├── services   # Encapsulated backend service interfaces, such as HTTP requests
├── store      # Zustand store for state management
├── styles     # Global style files
├── types      # TypeScript type definition files
└── utils      # General utility functions
```

For a detailed introduction to the directory structure, see: [Folder Directory Structure](Folder-Structure.en-US.md)

## Local Development Environment Setup

This section will outline how to set up the development environment for local development. Before you begin, please ensure that Node.js, Git, and your chosen package manager (Bun or PNPM) are installed in your local environment.

We recommend using WebStorm as your Integrated Development Environment (IDE).

1. **Get the Code**: Clone the LobeVidol repository to your local machine:

```bash
git clone https://github.com/lobehub/lobe-vidol.git
```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies:

```bash
cd lobe-vidol
# If you are using Bun
bun install
# If you are using PNPM
pnpm install
```

3. **Run and Debug**: Start the local development server and begin your development journey:

```bash
# Start the development server using Bun
bun run dev
# Access the application at http://localhost:3010
```

> \[!IMPORTANT]\
> If you encounter the error `Could not find "stylelint-config-recommended"` when installing dependencies with `npm`, please reinstall the dependencies using `pnpm` or `bun`.

Now, you should be able to see the welcome page of LobeVidol in your browser. For a detailed environment configuration guide, please refer to [Development Environment Setup Guide](Setup-Development.en-US.md).

## Code Style and Contribution Guidelines

In the LobeVidol project, we place great importance on code quality and consistency. To this end, we have established a set of code style standards and contribution processes to ensure that every developer can smoothly participate in the project. Below are the code style and contribution guidelines you need to follow as a developer.

- **Code Style**: We use `@lobehub/lint` to unify the code style, including ESLint, Prettier, remarklint, and stylelint configurations. Please adhere to our coding standards to maintain consistency and readability in the code.
- **Contribution Process**: We adopt gitmoji and semantic release for our code submission and release processes. Please use gitmoji to annotate your commit messages and ensure compliance with semantic release standards so that our automation system can correctly handle version control and releases.

All contributions will undergo code review. Maintainers may suggest modifications or requests. Please respond positively to review comments and make timely adjustments; we look forward to your participation and contributions.

For detailed code style and contribution guidelines, please refer to [Code Style and Contribution Guidelines](Contributing-Guidelines.en-US.md).

## Internationalization Implementation Guide

LobeVidol uses `i18next` and `lobe-i18n` to implement multi-language support, ensuring a global user experience.

The internationalization files are located in `src/locales`, containing the default language (Chinese). We will automatically generate JSON files for other languages through `lobe-i18n`.

If you want to add a new language, you need to follow specific steps, detailed in the [New Language Addition Guide](../Internationalization/Add-New-Locale.en-US.md). We encourage you to participate in our internationalization efforts to provide better services for users worldwide.

For a detailed internationalization implementation guide, please refer to [Internationalization Implementation Guide](../Internationalization/Internationalization-Implementation.en-US.md).

## Appendix: Resources and References

To support developers in better understanding and utilizing the LobeVidol technology stack, we provide a comprehensive list of resources and references — [LobeVidol Resources and References](https://github.com/lobehub/lobe-vidol/wiki/Resources.en-US) - visit our maintained resource list, which includes tutorials, articles, and other useful links.

We encourage developers to take advantage of these resources to deepen their learning and enhance their skills. Join community discussions through [LobeVidol GitHub Discussions](https://github.com/lobehub/lobe-vidol/discussions) or [Discord](https://discord.com/invite/AYFPHvv2jT) to ask questions or share your experiences.

If you have any questions or need further assistance, please do not hesitate to reach out to us through the channels mentioned above.
