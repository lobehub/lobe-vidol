# How to Develop a New Feature: Frontend Implementation

LobeVidol is built on the Next.js framework, using TypeScript as the primary development language. When developing new features, we need to follow a specific development process to ensure code quality and stability. The general process can be divided into the following five steps:

1. Routing: Define routes (`src/app`)
2. Data Structure: Define data structures (`src/types`)
3. Business Logic Implementation: Zustand store (`src/store`)
4. Page Display: Write static components/pages (`src/app/<new-page>/features/<new-feature>.tsx`)
5. Function Binding: Bind the store to the page triggers (`const [state, function] = useNewStore(s => [s.state, s.function])`)

Taking the "Chat Messages" feature as an example, here are the brief steps to implement this feature:

#### TOC

- [1. Define Routes](#1-define-routes)
- [2. Define Data Structures](#2-define-data-structures)
- [3. Create Zustand Store](#3-create-zustand-store)
- [4. Create Pages and Components](#4-create-pages-and-components)
- [5. Function Binding](#5-function-binding)

## 1. Define Routes

In the `src/app` directory, we need to define a new route to host the "Chat Messages" page. Generally, we would create a new folder under `src/app`, for example, `chat`, and within this folder, create a `page.tsx` file that exports a React component as the main body of the page.

```tsx
// src/app/chat/page.tsx
import ChatPage from './features/chat';

export default ChatPage;
```

## 2. Define Data Structures

In the `src/types` directory, we need to define the data structure for "Chat Messages." For example, we can create a `chat.ts` file and define the `ChatMessage` type within it:

```ts
// src/types/chat.ts

export type ChatMessage = {
  id: string;
  content: string;
  timestamp: number;
  sender: 'user' | 'bot';
};
```

## 3. Create Zustand Store

In the `src/store` directory, we need to create a new Zustand Store to manage the state of "Chat Messages." For example, we can create a `chatStore.ts` file and define a Zustand Store within it:

```ts
// src/store/chatStore.ts
import create from 'zustand';

type ChatState = {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
```

## 4. Create Pages and Components

In `src/app/<new-page>/features/<new-feature>.tsx`, we need to create a new page or component to display "Chat Messages." In this file, we can use the Zustand Store created above, as well as Ant Design components to build the UI:

```jsx
// src/features/chat/index.tsx
import { List, Typography } from 'antd';
import { useChatStore } from 'src/store/chatStore';

const ChatPage = () => {
  const messages = useChatStore((state) => state.messages);

  return (
    <List
      dataSource={messages}
      renderItem={(message) => (
        <List.Item>
          <Typography.Text>{message.content}</Typography.Text>
        </List.Item>
      )}
    />
  );
};

export default ChatPage;
```

## 5. Function Binding

In the page or component, we need to bind the Zustand Store's state and methods to the UI. In the example above, we have already bound the `messages` state to the `dataSource` property of the list. Now, we also need a method to add new messages. We can define this method in the Zustand Store and then use it in the page or component:

```jsx
import { Button } from 'antd';

const ChatPage = () => {
  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);

  const handleSend = () => {
    addMessage({ id: '1', content: 'Hello, world!', timestamp: Date.now(), sender: 'user' });
  };

  return (
    <>
      <List
        dataSource={messages}
        renderItem={(message) => (
          <List.Item>
            <Typography.Text>{message.content}</Typography.Text>
          </List.Item>
        )}
      />
      <Button onClick={handleSend}>Send</Button>
    </>
  );
};

export default ChatPage;
```

These are the steps to implement the "Chat Messages" feature in LobeVidol. Of course, in the actual development of LobeVidol, the business demands and scenarios faced are far more complex than the demo above, so please develop according to the actual situation.
