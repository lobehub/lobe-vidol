import { produce } from 'immer';

import { TouchAction, TouchActionConfig, TouchAreaEnum } from '@/types/touch';

export interface DeleteTouchAction {
  payload: {
    index: number;
    touchArea: TouchAreaEnum;
  };
  type: 'DELETE_TOUCH_ACTION';
}

export interface UpdateTouchAction {
  payload: {
    action: TouchAction;
    index: number;
    touchArea: TouchAreaEnum;
  };
  type: 'UPDATE_TOUCH_ACTION';
}

export type TouchActionType = DeleteTouchAction | UpdateTouchAction;

export const touchReducer = (
  state: TouchActionConfig,
  action: TouchActionType,
): TouchActionConfig => {
  switch (action.type) {
    case 'DELETE_TOUCH_ACTION': {
      return produce(state, (draft) => {
        const { index, touchArea } = action.payload;
        draft[touchArea].splice(index, 1);
      });
    }
    case 'UPDATE_TOUCH_ACTION': {
      return produce(state, (draft) => {
        const { index, touchArea, action: newAction } = action.payload;
        draft[touchArea][index] = newAction;
      });
    }
    default: {
      return produce(state, () => []);
    }
  }
};
