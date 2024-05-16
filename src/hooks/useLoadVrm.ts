import localforage from 'localforage';
import { useState } from 'react';

import { Viewer } from '@/features/vrmViewer/viewer';

export const useLoadVrm = (viewer: Viewer) => {
  const [loading, setLoading] = useState(false);

  const loadVrm = async (url?: string) => {
    let vrmUrl = url;
    if (url && url.startsWith('model:')) {
      const blob = await localforage.getItem(url);
      if (blob) {
        vrmUrl = window.URL.createObjectURL(blob as Blob);
      } else {
        vrmUrl = undefined;
      }
    }
    if (vrmUrl) {
      setLoading(true);
      viewer.loadVrm(vrmUrl).finally(() => {
        setLoading(false);
      });
    } else {
      viewer.unloadVRM();
    }
  };

  return { loading, loadVrm };
};
