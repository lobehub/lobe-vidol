import { StateCreator } from 'zustand/vanilla';

import { SettingStore, configSelectors } from '@/store/setting';
import { TouchActionType, touchReducer } from '@/store/setting/reducers/touch';
import { GenderEnum } from '@/types/agent';
import { TouchAction, TouchAreaEnum } from '@/types/touch';

export interface TouchStore {
  /**
   * 创建触摸配置
   * @param currentTouchArea
   * @param action
   */
  createTouchAction: (
    gender: GenderEnum,
    currentTouchArea: TouchAreaEnum,
    action: TouchAction,
  ) => void;
  /**
   * touch Reducer
   * @param payload
   */
  dispatchTouchAction: (payload: TouchActionType) => void;
  /**
   * 删除触摸配置
   * @param currentTouchArea
   * @param index
   */
  removeTouchAction: (gender: GenderEnum, currentTouchArea: TouchAreaEnum, index: number) => void;
  /**
   * 更新触摸配置
   * @param currentTouchArea
   * @param index
   * @param action
   */
  updateTouchAction: (
    gender: GenderEnum,
    currentTouchArea: TouchAreaEnum,
    index: number,
    action: TouchAction,
  ) => void;
}

const createTouchStore: StateCreator<
  SettingStore,
  [['zustand/devtools', never]],
  [],
  TouchStore
> = (set, get) => {
  return {
    dispatchTouchAction: (payload) => {
      const { setConfig } = get();
      const touch = configSelectors.currentTouchConfig(get());

      if (!touch) {
        return;
      }

      const config = touchReducer(touch, payload);

      setConfig({ touch: config });
    },
    removeTouchAction: (gender, currentTouchArea, index) => {
      const { dispatchTouchAction } = get();
      dispatchTouchAction({
        type: 'DELETE_TOUCH_ACTION',
        payload: {
          gender,
          touchArea: currentTouchArea,
          index: index,
        },
      });
    },
    updateTouchAction: (gender, currentTouchArea, index, action) => {
      const { dispatchTouchAction } = get();
      dispatchTouchAction({
        type: 'UPDATE_TOUCH_ACTION',
        payload: {
          gender,
          touchArea: currentTouchArea,
          index: index,
          action,
        },
      });
    },
    createTouchAction: (gender, currentTouchArea, action) => {
      const { dispatchTouchAction } = get();

      dispatchTouchAction({
        type: 'CREATE_TOUCH_ACTION',
        payload: {
          gender,
          touchArea: currentTouchArea,

          action,
        },
      });
    },
  };
};

export default createTouchStore;
