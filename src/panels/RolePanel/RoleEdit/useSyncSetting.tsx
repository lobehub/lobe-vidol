import { FormInstance } from 'antd/es/form/hooks/useForm';
import { isEqual } from 'lodash-es';
import { useLayoutEffect } from 'react';

import { agentListSelectors, useAgentStore } from '@/store/agent';

export const useSyncSettings = (form: FormInstance) => {
  useLayoutEffect(() => {
    const currentAgent = agentListSelectors.currentAgentItem(useAgentStore.getState());
    console.log('currentAgent', currentAgent);
    form.setFieldsValue(currentAgent);

    // sync with later updated settings
    const unsubscribe = useAgentStore.subscribe(
      (s) => agentListSelectors.currentAgentItem(s),
      (agent) => {
        form.setFieldsValue(agent);
      },
      { equalityFn: isEqual },
    );

    return () => {
      unsubscribe();
    };
  }, []);
};
