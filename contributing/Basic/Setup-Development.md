# Environment Setup Guide

Welcome to the development environment setup guide for LobeVidol.

#### TOC

- [Online Development](#online-development)
- [Local Development](#local-development)
  - [Development Environment Requirements](#development-environment-requirements)
  - [Project Setup](#project-setup)

## Online Development

If you have access to GitHub CodeSpaces, you can click the button below to enter the online development environment with one click:

[![][codespaces-shield]][codespaces-link]

## Local Development

Before you start developing LobeVidol, you need to install and configure some necessary software and tools in your local environment. This document will guide you through these steps.

### Development Environment Requirements

First, you need to install the following software:

- Node.js: LobeVidol is built on Node.js, so you need to install it. We recommend installing the latest stable version.
- Bun: We use Bun as our preferred package manager. You can download and install it from the official Bun website.
- PNPM: We use PNPM as a supplementary package manager. You can download and install it from the official PNPM website.
- Git: We use Git for version control. You can download and install it from the official Git website.
- IDE: You can choose your favorite Integrated Development Environment (IDE). We recommend using WebStorm, which is a powerful IDE particularly suited for TypeScript development.

### Project Setup

After installing the software mentioned above, you can start setting up the LobeVidol project.

1. **Get the Code**: First, you need to clone the LobeVidol repository from GitHub. Run the following command in your terminal:

```bash
git clone https://github.com/lobehub/lobe-vidol.git
```

2. **Install Dependencies**: Next, navigate to the project directory and use Bun to install the project's dependencies:

```bash
cd lobe-vidol
bun i
```

If you are using PNPM, you can execute:

```bash
cd lobe-vidol
pnpm i
```

3. **Start the Development Server**: After installing the dependencies, you can start the development server:

```bash
bun run dev
```

Now, you can open your browser and go to `http://localhost:3010`, where you should see the welcome page of LobeVidol. This indicates that you have successfully set up the development environment.

![](https://github-production-user-asset-6210df.s3.amazonaws.com/28616219/274655364-414bc31e-8511-47a3-af17-209b530effc7.png)

If you encounter any issues with the environment setup during development, or if you have any questions regarding LobeVidol development, feel free to reach out to us. We look forward to seeing your contributions!

[codespaces-link]: https://codespaces.new/lobehub/lobe-vidol
[codespaces-shield]: https://github.com/codespaces/badge.svg
