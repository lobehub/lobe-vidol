# Code Style and Contribution Guidelines

Welcome to the LobeVidol Code Style and Contribution Guidelines. This guide will help you understand our coding standards and contribution process, ensuring consistency in our code and the smooth progress of the project.

## TOC

- [Code Style](#code-style)
  - [ESLint](#eslint)
  - [Prettier](#prettier)
  - [remarklint](#remarklint)
  - [stylelint](#stylelint)
- [Contribution Process](#contribution-process)
  - [Gitmoji](#gitmoji)
  - [Semantic Release](#semantic-release)
  - [Commitlint](#commitlint)
  - [How to Contribute](#how-to-contribute)

## Code Style

In LobeVidol, we use the `@lobehub/lint` package to unify our code style. This package includes configurations for `ESLint`, `Prettier`, `remarklint`, and `stylelint` to ensure that our JavaScript, Markdown, and CSS files adhere to the same coding standards.

### ESLint

Our project uses ESLint to check for issues in JavaScript code. You can find the `.eslintrc.js` file in the root directory of the project, which contains our extensions and custom rules for the ESLint configuration from `@lobehub/lint`.

To ensure compatibility with the Next.js framework, we have added `plugin:@next/next/recommended` to the configuration. Additionally, we have disabled some rules to accommodate the specific needs of our project.

Please run ESLint before submitting your code to ensure it meets the project standards.

### Prettier

Prettier is responsible for code formatting to maintain consistency. You can find our Prettier configuration in `.prettierrc.js`, which is imported from `@lobehub/lint`.

It is recommended that you configure your editor to automatically run Prettier on file save, or run it manually before submitting.

### remarklint

For Markdown files, we use remarklint to ensure uniformity in document formatting. You can find the corresponding configuration file in the project.

### stylelint

We use stylelint to enforce style guidelines for CSS code. In the `stylelint` configuration file, we have made some adjustments to the custom rules based on the configuration from `@lobehub/lint`.

Make sure your style code passes the stylelint checks before submission.

## Contribution Process

LobeVidol adopts gitmoji and semantic release as our code submission and release processes.

### Gitmoji

When submitting code, please use gitmoji to annotate your commit messages. This helps other contributors quickly understand the content and purpose of your submission.

Gitmoji commit messages use specific emojis to indicate the type or intent of the commit. Here is an example:

```
📝 Update README with contribution guidelines

- Added section about code style preferences
- Included instructions for running tests
- Corrected typos and improved formatting
```

In this example, the 📝 emoji represents a documentation update. The commit message clearly describes the changes made, providing specific details.

### Semantic Release

We use semantic release to automate version control and the release process. Please ensure your commit messages follow the semantic release conventions so that when code is merged into the main branch, the system can automatically create a new version and release it.

### Commitlint

To ensure consistency in commit messages, we use `commitlint` to check the format of commit messages. You can find the relevant rules in the `.commitlintrc.js` configuration file.

Before submitting your code, please ensure your commit messages adhere to our standards.

### How to Contribute

1. Fork the project to your account.
2. Create a new branch for development.
3. After development is complete, ensure your code passes the aforementioned style checks.
4. Submit your changes and annotate your commit message with the appropriate gitmoji.
5. Create a Pull Request to the main branch of the original project.
6. Wait for code review and make necessary modifications based on feedback.

Thank you for following these guidelines; they help us maintain the quality and consistency of the project. We look forward to your contributions!
