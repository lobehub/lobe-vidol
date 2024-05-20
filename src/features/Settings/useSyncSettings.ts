import { FormInstance } from 'antd/es/form/hooks/useForm';
import { useEffect } from 'react';

import { useConfigStore } from '@/store/config';

export const useSyncSettings = (form: FormInstance) => {
  useEffect(() => {
    // set the first time
    form.setFieldsValue(useConfigStore.getState().config);

    // sync with later updated settings
    const unsubscribe = useConfigStore.subscribe(
      (s) => s.config,
      (config) => {
        form.setFieldsValue(config);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);
};
