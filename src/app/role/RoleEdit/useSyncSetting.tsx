import { FormInstance } from 'antd/es/form/hooks/useForm';
import { isEqual } from 'lodash-es';
import { useLayoutEffect } from 'react';

import { agentSelectors, useAgentStore } from '@/store/agent';

export const useSyncSettings = (form: FormInstance) => {
  useLayoutEffect(() => {
    const currentAgent = agentSelectors.currentAgentItem(useAgentStore.getState());
    form.setFieldsValue(currentAgent);

    // sync with later updated settings
    const unsubscribe = useAgentStore.subscribe(
      (s) => agentSelectors.currentAgentItem(s),
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
