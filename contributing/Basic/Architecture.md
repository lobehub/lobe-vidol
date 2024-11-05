# Architecture Design

LobeVidol is an AI conversation application built on the Next.js framework, designed to provide a personalized AI dialogue platform that allows users to interact with AI using natural language. Below is an overview of the architecture design for LobeVidol:

#### TOC

- [Application Architecture Overview](#application-architecture-overview)
- [Frontend Architecture](#frontend-architecture)
- [Edge Runtime API](#edge-runtime-api)
- [Agent Marketplace](#agent-marketplace)
- [Dance Marketplace](#dance-marketplace)
- [Security and Performance Optimization](#security-and-performance-optimization)
- [Development and Deployment Process](#development-and-deployment-process)

## Application Architecture Overview

The overall architecture of LobeVidol consists of the frontend, Edge Runtime API, Agent Marketplace, and Dance Marketplace. These components work together to provide a complete AI experience.

## Frontend Architecture

The frontend of LobeVidol utilizes the Next.js framework, leveraging its powerful SSR (Server-Side Rendering) capabilities and routing features. The frontend employs a range of technology stacks, including the antd component library, lobe-ui AIGC component library, zustand for state management, swr for data fetching, and i18next for internationalization. These technologies collectively support the functionality and features of LobeVidol.

Components in the frontend architecture include app, components, config, constants, features, lib, hooks, layout, locales, services, store, styles, types, and utils. Each component has specific responsibilities and collaborates with others to achieve various functionalities.

## Edge Runtime API

The Edge Runtime API is one of the core components of LobeVidol, responsible for handling the core logic of AI conversations. It provides an interface for interaction with the AI engine, including natural language processing, intent recognition, and response generation. The Edge Runtime API communicates with the frontend, receiving user input and returning appropriate responses.

## Agent Marketplace

The Agent Marketplace is an important part of LobeVidol, offering a variety of AI Agents for users to experience different roles. The marketplace also provides functionality for using and uploading Agents, allowing users to discover Agents created by others and easily share their own Agents with the community.

## Dance Marketplace

The Dance Marketplace is another key component of LobeVidol, providing various dance files to enrich the interactions of LobeVidol's characters. Users can search for and download dance files from the marketplace, which can then be applied to their Agents for a more dynamic interaction experience.

## Security and Performance Optimization

To optimize performance, LobeVidol utilizes Next.js's SSR capabilities, achieving fast page loading and response times. Additionally, a series of performance optimization measures are implemented, including code splitting, caching, and resource compression.

## Development and Deployment Process

The development process for LobeVidol includes version control, testing, continuous integration, and continuous deployment. The development team uses a version control system for code management and conducts unit tests and integration tests to ensure code quality. The continuous integration and continuous deployment processes ensure rapid delivery and deployment of code.

This overview provides a brief introduction to the architecture design of LobeVidol, detailing the responsibilities and collaboration of each component, as well as the impact of design decisions on application functionality and performance.
