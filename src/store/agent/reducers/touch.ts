import { produce } from 'immer';

import { TouchActionConfig, TouchAreaEnum } from '@/types/touch';

export interface DeleteTouchAction {
  payload: {
    index: number;
    touchArea: TouchAreaEnum;
  };
  type: 'DELETE_TOUCH_ACTION';
}

export type TouchActionType = DeleteTouchAction;

export const touchReducer = (
  state: TouchActionConfig,
  action: TouchActionType,
): TouchActionConfig => {
  switch (action.type) {
    case 'DELETE_TOUCH_ACTION': {
      console.log(action.payload);
      return produce(state, (draft) => {
        const { index, touchArea } = action.payload;
        draft[touchArea].splice(index, 1);
      });
    }
    default: {
      return produce(state, () => []);
    }
  }
};
