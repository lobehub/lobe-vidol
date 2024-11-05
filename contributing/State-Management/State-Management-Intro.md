# Best Practices for State Management

LobeVidol differs from traditional CRUD web applications by offering a wealth of interactive capabilities. Designing a data flow architecture that is easy to develop and maintain is crucial. This document will introduce best practices for data flow management in LobeVidol.

## TOC

- [Conceptual Elements](#conceptual-elements)
- [Structural Layers](#structural-layers)
  - [Best Practices for LobeVidol SessionStore Directory Structure](#best-practices-for-lobevidol-sessionstore-directory-structure)
- [Implementation of SessionStore](#implementation-of-sessionstore)

## Conceptual Elements

| Term     | Explanation                                                                                                                                                                                                                                                                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| store    | A state library (store) that contains the application's state and actions. It allows access to and modification of the state during application rendering.                                                                                                                                                                                                                 |
| state    | State refers to the data of the application, which holds the current status of the application. Changes in state **will always trigger a re-render** of the application to reflect the new state.                                                                                                                                                                          |
| action   | An action is an operation function that describes interaction events occurring within the application. Actions are typically triggered by user interactions, network requests, or timers. Actions can be **synchronous** or **asynchronous**.                                                                                                                              |
| reducer  | A reducer is a pure function that takes the current state and an action as parameters and returns a new state. It is used to update the application's state based on the action type. Reducers are pure functions with no side effects, thus they must be **synchronous** functions.                                                                                       |
| selector | A selector is a function used to retrieve specific data from the application's state. It takes the application's state as a parameter and returns computed or transformed data. Selectors can combine parts of the state or multiple states to generate derived data. They are typically used to map the application's state to component props for use by the components. |
| slice    | A slice is a concept used to represent a portion of the data model's state. It specifies a state slice, along with the associated state, actions, reducers, and selectors. Using slices allows for breaking down a large store into smaller, more maintainable subtypes.                                                                                                   |

## Structural Layers

Depending on the complexity, the organization of the store's structure can vary significantly:

- **Low Complexity**: Typically includes 2 to 5 states and 3 to 4 actions. The structure usually consists of a single `store.ts` and an `initialState.ts`.

```bash
DataFill/store
├── index.ts
└── initialState.ts
```

- **Medium Complexity**: Generally contains 5 to 15 states and 5 to 10 actions. There may be selectors to implement derived states, and reducers to simplify some data changes. The structure typically includes a `store.ts`, an `initialState.ts`, and either a `selectors.ts` or `reducer.ts`.

```bash
IconPicker/store
├── index.ts
├── initialState.ts
├── selectors.ts
└── store.ts
```

```bash
SortableList/store
├── index.ts
├── initialState.ts
├── listDataReducer.ts
└── store.ts
```

- **Moderate Complexity**: Contains 15 to 30 states and 10 to 20 actions. It is likely to have selectors to aggregate derived states and reducers to simplify some data changes.

At this point, maintaining a single action store becomes challenging, often leading to the breakdown into multiple slices to manage different actions. The following code represents the internal data flow of the `SortableTree` component:

```bash
SortableTree/store
├── index.ts
├── initialState.ts
├── selectors.ts
├── slices
├── crudSlice.ts
├── dndSlice.ts
└── selectionSlice.ts
├── store.ts
└── treeDataReducer.ts
```

- **High Complexity**: Contains more than 30 states and over 20 actions. Modular cohesion through slices is essential. Each slice declares its own initState, actions, reducers, and selectors.

The following directory structure represents a previous version of the SessionStore, which has high complexity and implements a significant amount of business logic. However, with the modularization of slices and a fractal architecture mindset, it becomes easy to locate corresponding modules, making it straightforward to add features and iterate.

```bash
LobeVidol SessionStore
├── index.ts
├── initialState.ts
├── selectors.ts
├── slices
│ ├── agentConfig
│ │ ├── action.ts
│ │ ├── index.ts
│ │ ├── initialState.ts
│ │ └── selectors.ts
│ ├── chat
│ │ ├── actions
│ │ │ ├── index.ts
│ │ │ ├── message.ts
│ │ │ └── topic.ts
│ │ ├── index.ts
│ │ ├── initialState.ts
│ │ ├── reducers
│ │ │ ├── message.ts
│ │ │ └── topic.ts
│ │ ├── selectors
│ │ │ ├── chat.ts
│ │ │ ├── index.ts
│ │ │ ├── token.ts
│ │ │ ├── topic.ts
│ │ │ └── utils.ts
│ │ └── utils.ts
│ └── session
│ ├── action.ts
│ ├── index.ts
│ ├── initialState.ts
│ ├── reducers
│ │ └── session.ts
│ └── selectors
│ ├── export.ts
│ ├── index.ts
│ └── index.ts
└── store.ts
```

### Best Practices for LobeVidol SessionStore Directory Structure

In the LobeVidol application, session management is a complex functional module, so we adopted the [slice pattern](https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md) to organize the data flow. Below is the directory structure of the LobeVidol SessionStore, where each directory and file has its specific purpose:

```fish
src/store/session
├── index.ts                           # Aggregated export file for SessionStore
├── initialState.ts                    # Aggregates all slices' initial states
├── selectors.ts                       # Selectors exported from various slices
├── store.ts                           # Creation and usage of SessionStore
├── helpers.ts                         # Helper functions
└── slices                             # Independent functional slices
    ├── agent                          # Assistant Slice
    │   ├── action.ts
    │   ├── index.ts
    │   └── selectors.ts
    └── session                        # Session Slice
        ├── action.ts
        ├── helpers.ts
        ├── initialState.ts
        └── selectors
            ├── export.ts
            ├── index.ts
            └── index.ts
```

## Implementation of SessionStore

In LobeVidol, the SessionStore is designed as the core module for managing session state and logic. It consists of multiple Slices, each managing a portion of related state and logic. Below is a simplified example of the implementation of SessionStore:

#### store.ts

```ts
import { PersistOptions, devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { devtools } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

import { SessionStoreState, initialState } from './initialState';
import { AgentAction, createAgentSlice } from './slices/agent/action';
import { SessionAction, createSessionSlice } from './slices/session/action';

//  ===============  Aggregate createStoreFn ============ //

export type SessionStore = SessionAction & AgentAction & SessionStoreState;
const createStore: StateCreator<SessionStore, [['zustand/devtools', never]]> = (...parameters) => ({
  ...initialState,
  ...createAgentSlice(...parameters),
  ...createSessionSlice(...parameters),
});

//  ===============  Implement useStore ============ //

export const useSessionStore = createWithEqualityFn<SessionStore>()(
  persist(
    subscribeWithSelector(
      devtools(createStore, {
        name: 'LobeChat_Session' + (isDev ? '_DEV' : ''),
      }),
    ),
    persistOptions,
  ),
  shallow,
);
```

In this `store.ts` file, we create a `useSessionStore` hook that utilizes the `zustand` library to create a global state manager. We merge the initialState with the state and actions of each Slice to form a complete SessionStore.

#### slices/session/action.ts

```ts
import { StateCreator } from 'zustand';

import { SessionStore } from '@/store/session';

export interface SessionActions {
  /**
   * A custom hook that uses SWR to fetch sessions data.
   */
  useFetchSessions: () => SWRResponse<any>;
}

export const createSessionSlice: StateCreator<
  SessionStore,
  [['zustand/devtools', never]],
  [],
  SessionAction
> = (set, get) => ({
  useFetchSessions: () => {
    // ...logic to initialize sessions
  },
  // ...implementation of other actions
});
```

In the `action.ts` file, we define a `SessionActions` interface to describe session-related actions and implement a `useFetchSessions` function to create these actions. We then merge these actions with the initial state to form the session-related Slice.

Through this structured, layered, and modular approach, we can ensure that LobeVidol's SessionStore is clear, maintainable, and also easy to extend and test.
