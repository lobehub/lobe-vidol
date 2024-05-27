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

export interface CreateTouchAction {
  payload: {
    action: TouchAction;
    touchArea: TouchAreaEnum;
  };
  type: 'CREATE_TOUCH_ACTION';
}

export type TouchActionType = DeleteTouchAction | UpdateTouchAction | CreateTouchAction;

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
    case 'CREATE_TOUCH_ACTION': {
      return produce(state, (draft) => {
        const { touchArea, action: newAction } = action.payload;
        draft[touchArea].push(newAction);
      });
    }
    default: {
      return produce(state, () => []);
    }
  }
};
