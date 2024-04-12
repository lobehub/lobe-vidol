import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Viewer } from '@/features/vrmViewer/viewer';

interface ViewerStore {
  viewer: Viewer;
}

const viewer = new Viewer();

export const useViewerStore = createWithEqualityFn<ViewerStore>()(
  () => ({
    viewer,
  }),
  shallow,
);
