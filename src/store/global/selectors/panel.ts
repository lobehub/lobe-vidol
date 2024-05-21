import { INITIAL_Z_INDEX } from '@/constants/token';
import { GlobalStore } from '@/store/global';
import { PanelKey } from '@/types/config';

const getPanelZIndex = (s: GlobalStore, panelKey: PanelKey) => {
  const focusList = s.focusList;
  const index = focusList.indexOf(panelKey);
  return index === -1 ? INITIAL_Z_INDEX : INITIAL_Z_INDEX + index;
};

export const globalSelectors = {
  getPanelZIndex,
};
