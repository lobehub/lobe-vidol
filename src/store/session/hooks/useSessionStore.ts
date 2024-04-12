import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { SESSION_STORAGE_KEY, SessionStore, createSessonStore } from '@/store/session';

export const useSessionStore = createWithEqualityFn<SessionStore>()(
  persist(
    devtools(createSessonStore, {
      name: 'VIDOL_SESSION_STORE',
    }),
    {
      name: SESSION_STORAGE_KEY, // name of the item in the storage (must be unique)
    },
  ),
  shallow,
);
