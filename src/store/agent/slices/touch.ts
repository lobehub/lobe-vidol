import { StateCreator } from 'zustand/vanilla';

import { AgentStore, agentSelectors } from '@/store/agent';
import { TouchActionType, touchReducer } from '@/store/agent/reducers/touch';
import { TouchAction, TouchAreaEnum } from '@/types/touch';

export interface TouchStore {
  /**
   * 创建触摸配置
   * @param currentTouchArea
   * @param action
   */
  createTouchAction: (currentTouchArea: TouchAreaEnum, action: TouchAction) => void;
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
  removeTouchAction: (currentTouchArea: TouchAreaEnum, index: number) => void;
  /**
   * 更新触摸配置
   * @param currentTouchArea
   * @param index
   * @param action
   */
  updateTouchAction: (currentTouchArea: TouchAreaEnum, index: number, action: TouchAction) => void;
}

const createTouchStore: StateCreator<AgentStore, [['zustand/devtools', never]], [], TouchStore> = (
  set,
  get,
) => {
  return {
    dispatchTouchAction: (payload) => {
      const { setAgentConfig } = get();
      const agent = agentSelectors.currentAgentItem(get());
      const touch = agentSelectors.currentAgentTouch(get());

      if (!touch || !agent) {
        return;
      }

      const config = touchReducer(touch, payload);

      setAgentConfig({ ...agent, touch: config });
    },
    removeTouchAction: (currentTouchArea, index) => {
      const { dispatchTouchAction } = get();
      dispatchTouchAction({
        type: 'DELETE_TOUCH_ACTION',
        payload: {
          touchArea: currentTouchArea,
          index: index,
        },
      });
    },
    updateTouchAction: (currentTouchArea, index, action) => {
      const { dispatchTouchAction } = get();
      dispatchTouchAction({
        type: 'UPDATE_TOUCH_ACTION',
        payload: {
          touchArea: currentTouchArea,
          index: index,
          action,
        },
      });
    },
    createTouchAction: (currentTouchArea, action) => {
      const { dispatchTouchAction } = get();

      dispatchTouchAction({
        type: 'CREATE_TOUCH_ACTION',
        payload: {
          touchArea: currentTouchArea,
          action,
        },
      });
    },
  };
};

export default createTouchStore;
