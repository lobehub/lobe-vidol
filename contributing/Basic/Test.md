# Testing Guide

LobeVidol's testing strategy includes unit testing and end-to-end (E2E) testing. Below is a detailed description of each type of testing:

#### TOC

- [Unit Testing](#unit-testing)
- [🚧 End-to-End Testing](#-end-to-end-testing)
- [Development Testing](#development-testing)
  - [1. Unit Testing](#1-unit-testing)
- [Testing Strategy](#testing-strategy)

## Unit Testing

Unit testing is used to test the functionality of independent units in the application (such as components, functions, utility functions, etc.). We use [vitest][vitest-url] for unit testing.

To run unit tests, you can use the following command:

```
npm run test
```

This will run all unit tests and generate a test report.

We encourage developers to write corresponding unit tests while writing code to ensure the quality and stability of the code.

## 🚧 End-to-End Testing

End-to-end testing is used to test the functionality and performance of the application in a real environment. It simulates real user operations and verifies the application's performance in different scenarios.

Currently, LobeVidol does not have integrated end-to-end testing, but we will gradually introduce it in future iterations.

## Development Testing

### 1. Unit Testing

Unit testing is conducted on the smallest testable units in the application, typically targeting functions, components, or modules. In LobeVidol, we use [vitest][vitest-url] for unit testing.

#### Writing Test Cases

Before writing unit tests, you need to create a directory that matches the directory of the file being tested and name the test file `<filename>.test.ts`. For example, if you want to test the `src/utils/formatDate.ts` file, the test file should be named `src/utils/formatDate.test.ts`.

In the test file, you can use the `describe` and `it` functions to organize and write test cases. The `describe` function is used to create a test suite, while the `it` function is used to write specific test cases.

```typescript
import { formatNumber } from './formatNumber';

describe('formatNumber', () => {
  it('should format number with comma separator', () => {
    const result = formatNumber(1000);
    expect(result).toBe('1,000');
  });

  it('should return the same number if it is less than 1000', () => {
    const result = formatNumber(500);
    expect(result).toBe('500');
  });
});
```

In the test cases, you can use the `expect` function to assert whether the test results meet expectations. The `expect` function can be used with various matchers, such as `toBe`, `toEqual`, `toBeTruthy`, etc.

#### Running Unit Tests

To execute the unit tests, run the following command:

```
npm run test
```

This will run all unit tests and output the test results.

## Testing Strategy

To write effective test cases, you can consider the following testing strategies:

- **Boundary Condition Testing**: Test the boundary conditions of inputs, such as minimum values, maximum values, null values, etc.
- **Exception Handling Testing**: Test the code that handles exceptional situations, such as error handling and fallbacks in exceptional cases.
- **Functional Testing**: Test whether various functional modules of the application work correctly, including user interactions and data processing.
- **Compatibility Testing**: Test the application's compatibility across different browsers and devices.
- **Performance Testing**: Test the application's performance under different loads, such as response time and resource usage.

Additionally, ensure that your test cases have good coverage, addressing key code and functionality within the application.

By properly writing and executing unit tests, integration tests, and end-to-end tests, you can enhance the quality and stability of the application and promptly identify and fix potential issues.

[vitest-url]: https://vitest.dev/
