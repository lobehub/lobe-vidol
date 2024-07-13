import { produce } from 'immer';

import { GenderEnum } from '@/types/agent';
import { TouchConfig } from '@/types/config';
import { TouchAction, TouchAreaEnum } from '@/types/touch';

export interface DeleteTouchAction {
  payload: {
    gender: GenderEnum;
    index: number;
    touchArea: TouchAreaEnum;
  };
  type: 'DELETE_TOUCH_ACTION';
}

export interface UpdateTouchAction {
  payload: {
    action: TouchAction;
    gender: GenderEnum;
    index: number;
    touchArea: TouchAreaEnum;
  };
  type: 'UPDATE_TOUCH_ACTION';
}

export interface CreateTouchAction {
  payload: {
    action: TouchAction;
    gender: GenderEnum;
    touchArea: TouchAreaEnum;
  };
  type: 'CREATE_TOUCH_ACTION';
}

export type TouchActionType = DeleteTouchAction | UpdateTouchAction | CreateTouchAction;

export const touchReducer = (state: TouchConfig, action: TouchActionType): TouchConfig => {
  switch (action.type) {
    case 'DELETE_TOUCH_ACTION': {
      return produce(state, (draft) => {
        const { index, touchArea, gender } = action.payload;
        draft[gender][touchArea].splice(index, 1);
      });
    }
    case 'UPDATE_TOUCH_ACTION': {
      return produce(state, (draft) => {
        const { index, touchArea, action: newAction, gender } = action.payload;
        draft[gender][touchArea][index] = newAction;
      });
    }
    case 'CREATE_TOUCH_ACTION': {
      return produce(state, (draft) => {
        const { touchArea, action: newAction, gender } = action.payload;
        draft[gender][touchArea].push(newAction);
      });
    }
    default: {
      return produce(state, () => []);
    }
  }
};
